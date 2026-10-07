"""
Pytest Unit Tests for Thomas' Calculus Verification Engine.

Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
Powered by SymPy
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

# Ensure project root and tools package are in sys.path
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))
if str(SCRIPT_DIR.parent) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR.parent))

try:
    import pytest
except ImportError:
    pytest = None

try:
    from tools.verify.engine import SymPyEngine, are_algebraically_equivalent
    from tools.verify.mcq_verifier import MCQVerifier, verify_mcq_data
    from tools.verify.calculus_verifier import CalculusVerifier, verify_calculus_payload
    from tools.verify.fixtures import create_fixtures, run_all_fixtures
except ImportError:
    from engine import SymPyEngine, are_algebraically_equivalent
    from mcq_verifier import MCQVerifier, verify_mcq_data
    from calculus_verifier import CalculusVerifier, verify_calculus_payload
    from fixtures import create_fixtures, run_all_fixtures


def _dummy_fixture(fn):
    return fn

fixture = pytest.fixture if pytest is not None else _dummy_fixture


@fixture
def engine():
    return SymPyEngine()


@fixture
def mcq_verifier():
    return MCQVerifier()


@fixture
def calculus_verifier():
    return CalculusVerifier()


def test_all_24_fixtures_pass():
    """Verify that all 24 mathematical edge-case fixtures pass without failure."""
    summary = run_all_fixtures(verbose=False)
    assert summary["total"] == 24, f"Expected 24 fixtures, found {summary['total']}"
    assert summary["all_passed"] is True, f"Failed fixtures: {summary['failed']}"


def test_algebraic_equivalence_polynomials(engine):
    """Test difference of cubes and binomial expansions."""
    equiv1, _ = engine.are_equivalent("(x - 3)*(x**2 + 3*x + 9)", "x**3 - 27")
    assert equiv1 is True

    equiv2, _ = engine.are_equivalent("(x + 2)**3", "x**3 + 6*x**2 + 12*x + 8")
    assert equiv2 is True


def test_algebraic_equivalence_trig(engine):
    """Test trigonometric identity simplification."""
    equiv1, _ = engine.are_equivalent("sin(x)**2 + cos(x)**2", "1")
    assert equiv1 is True

    equiv2, _ = engine.are_equivalent("sin(2*x)", "2*sin(x)*cos(x)")
    assert equiv2 is True


def test_algebraic_equivalence_radicals(engine):
    """Test radical rationalization and absolute value."""
    equiv1, _ = engine.are_equivalent("1/(sqrt(x) + sqrt(y))", "(sqrt(x) - sqrt(y))/(x - y)")
    assert equiv1 is True

    equiv2, _ = engine.are_equivalent("sqrt(x**2 + 2*x + 1)", "Abs(x + 1)")
    assert equiv2 is True


def test_algebraic_equivalence_logs_and_powers(engine):
    """Test logarithmic rules and fractional powers."""
    equiv1, _ = engine.are_equivalent("log(a*b)", "log(a) + log(b)")
    assert equiv1 is True

    equiv2, _ = engine.are_equivalent("(x**(1/3))*(x**(2/3))", "x")
    assert equiv2 is True


def test_mcq_valid_passes(mcq_verifier):
    """Test that a valid 4-choice MCQ with distinct options passes."""
    mcq = {
        "id": "test-valid",
        "question": "What is the derivative of x^2?",
        "options": [
            {"id": "A", "text": "2*x", "misconception": "None: algebraically correct."},
            {"id": "B", "text": "x", "misconception": "Forgot to multiply by the power."},
            {"id": "C", "text": "2", "misconception": "Treated x as a constant."},
            {"id": "D", "text": "x^2", "misconception": "Did not perform differentiation."},
        ],
        "correctId": "A",
        "expectedSolution": "2*x",
    }
    res = mcq_verifier.verify(mcq)
    assert res.valid is True
    assert len(res.errors) == 0


def test_mcq_rejects_equivalent_distractor(mcq_verifier):
    """Test that an MCQ with a distractor equivalent to the correct option is rejected."""
    mcq = {
        "id": "test-ambiguous",
        "question": "Factor x^2 - 4:",
        "options": [
            {"id": "A", "text": "(x - 2)*(x + 2)", "misconception": "None: correct."},
            {"id": "B", "text": "(x + 2)*(x - 2)", "misconception": "Commuted factors identical to correct."},
            {"id": "C", "text": "(x - 2)^2", "misconception": "Squared binomial."},
            {"id": "D", "text": "(x + 2)^2", "misconception": "Squared positive binomial."},
        ],
        "correctId": "A",
    }
    res = mcq_verifier.verify(mcq)
    assert res.valid is False
    assert any("Ambiguous MCQ" in e for e in res.errors)


def test_mcq_rejects_duplicate_distractors(mcq_verifier):
    """Test that an MCQ with two mutually equivalent distractors is rejected."""
    mcq = {
        "id": "test-duplicates",
        "question": "Value:",
        "options": [
            {"id": "A", "text": "1", "misconception": "None: correct."},
            {"id": "B", "text": "2*x", "misconception": "Distractor one misconception."},
            {"id": "C", "text": "x + x", "misconception": "Distractor two misconception."},
            {"id": "D", "text": "0", "misconception": "Distractor three misconception."},
        ],
        "correctId": "A",
    }
    res = mcq_verifier.verify(mcq)
    assert res.valid is False
    assert any("Duplicate distractors" in e for e in res.errors)


def test_mcq_rejects_missing_misconceptions(mcq_verifier):
    """Test that distractors with missing or short misconceptions are rejected."""
    mcq = {
        "id": "test-missing-misconception",
        "question": "Value:",
        "options": [
            {"id": "A", "text": "1", "misconception": "Correct"},
            {"id": "B", "text": "2", "misconception": "short"},  # < 10 chars
            {"id": "C", "text": "3", "misconception": ""},
            {"id": "D", "text": "4"},
        ],
        "correctId": "A",
    }
    res = mcq_verifier.verify(mcq)
    assert res.valid is False
    assert any("misconception" in e for e in res.errors)


def test_calculus_continuous_domain(calculus_verifier):
    """Test continuous domain verification on intervals."""
    res = calculus_verifier.verify_domain(
        expr_input="sqrt(9 - x**2)",
        var_name="x",
        expected_domain_str="[-3, 3]",
    )
    assert res.valid is True


def test_calculus_difference_quotient(calculus_verifier):
    """Test difference quotient and derivative check."""
    res = calculus_verifier.verify_difference_quotient(
        expr_input="x**2",
        var_name="x",
        h_name="h",
        expected_quotient="2*x + h",
        expected_derivative="2*x",
    )
    assert res.valid is True


def test_calculus_symmetry_odd_and_even(calculus_verifier):
    """Test symmetry verification for odd and even functions."""
    odd_res = calculus_verifier.verify_symmetry(
        expr_input="x**3 - x",
        var_name="x",
        expected_symmetry="odd",
    )
    assert odd_res.valid is True

    even_res = calculus_verifier.verify_symmetry(
        expr_input="x**4 - 2*x**2",
        var_name="x",
        expected_symmetry="even",
    )
    assert even_res.valid is True


def test_calculus_ftc_integral(calculus_verifier):
    """Test Fundamental Theorem of Calculus indefinite integral check."""
    res = calculus_verifier.verify_integral(
        expr_input="2*x / (x**2 + 1)",
        var_name="x",
        kind="indefinite",
        expected="log(x**2 + 1)",
    )
    assert res.valid is True


def test_all_sections_mathematical_validation():
    """Verify that all content sections across Chapters 1-4 pass mathematical validation."""
    from tools.verify.section_validator import validate_section_dir
    from tools.verify.verify import locate_all_sections

    sections = locate_all_sections()
    assert len(sections) >= 27, f"Expected at least 27 sections, found {len(sections)}"
    failures = []
    for sec in sections:
        rep = validate_section_dir(sec)
        if not rep.valid:
            failures.append(f"{sec.name}: {rep.errors}")
    assert len(failures) == 0, f"Section validation failed in: {failures}"


if __name__ == "__main__":
    eng = SymPyEngine()
    mcq_v = MCQVerifier()
    calc_v = CalculusVerifier()

    test_all_24_fixtures_pass()
    test_algebraic_equivalence_polynomials(eng)
    test_algebraic_equivalence_trig(eng)
    test_algebraic_equivalence_radicals(eng)
    test_algebraic_equivalence_logs_and_powers(eng)
    test_mcq_valid_passes(mcq_v)
    test_mcq_rejects_equivalent_distractor(mcq_v)
    test_mcq_rejects_duplicate_distractors(mcq_v)
    test_mcq_rejects_missing_misconceptions(mcq_v)
    test_calculus_continuous_domain(calc_v)
    test_calculus_difference_quotient(calc_v)
    test_calculus_symmetry_odd_and_even(calc_v)
    test_calculus_ftc_integral(calc_v)
    test_all_sections_mathematical_validation()
    print("ALL TEST_VERIFY CHECKS PASSED (including all 27 curriculum sections)!")
