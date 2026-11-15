"""
Pytest Unit Tests for Thomas' Calculus Verification Engine.

Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
Powered by SymPy
"""

from __future__ import annotations

import io
import json
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
    from tools.verify.server import app as verify_wsgi_app
except ImportError:
    from engine import SymPyEngine, are_algebraically_equivalent
    from mcq_verifier import MCQVerifier, verify_mcq_data
    from calculus_verifier import CalculusVerifier, verify_calculus_payload
    from fixtures import create_fixtures, run_all_fixtures
    from server import app as verify_wsgi_app


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

    # Test interval endpoints containing internal whitespace
    res_spaced = calculus_verifier.verify_domain(
        expr_input="sqrt(1 - x**2)",
        var_name="x",
        expected_domain_str="[-2 / 2, 2 / 2]",
    )
    assert res_spaced.valid is True


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


def test_security_blocks_code_injection_and_dos(engine):
    """Verify RCE payloads, unauthorized attribute access, and giant exponents are rejected."""
    malicious_inputs = [
        "__import__('os').system('echo pwn')",
        "eval('1+1')",
        "(1).__class__.__base__",
        "x.unsafe_method()",
        "x**100000",
        "9**9**9",
        "x + " * 300,
    ]
    for payload in malicious_inputs:
        raised = False
        try:
            engine.parse(payload)
        except ValueError:
            raised = True
        assert raised, f"Expected ValueError for unsafe payload: {payload!r}"


def test_numerical_probe_parity_and_bounded_domains(engine):
    """Verify Abs(x) is not falsely equated with x, and bounded [-1, 1] domains work."""
    is_equiv_abs, _ = engine.are_equivalent("Abs(x)", "x")
    assert is_equiv_abs is False, "Abs(x) must not be considered equivalent to x over real numbers"

    is_equiv_bounded, _ = engine.are_equivalent("asin(x) + acos(x)", "pi/2")
    assert is_equiv_bounded is True


def test_mcq_edge_cases_function_prefix_intervals_and_trig(mcq_verifier):
    """Verify MCQ distractor detection handles f(x)= prefixes, 'R' vs '(-oo, oo)', and rational trig."""
    # 1. Function prefix f(x) = ... and y = ...
    mcq_fn = {
        "id": "test-fn-prefix",
        "question": "Find f(x):",
        "options": [
            {"id": "A", "text": "$f(x) = x^2 + 2x + 1$", "misconception": "None: correct."},
            {"id": "B", "text": "$f(x) = (x + 1)^2$", "misconception": "Factored form equivalent to A."},
            {"id": "C", "text": "$f(x) = x^2 + 1$", "misconception": "Dropped middle term in binomial expansion."},
            {"id": "D", "text": "$f(x) = x^2 - 2x + 1$", "misconception": "Sign error on linear term."},
        ],
        "correctId": "A",
    }
    res_fn = mcq_verifier.verify(mcq_fn)
    assert res_fn.valid is False

    # 2. Interval keyword 'R' vs '(-oo, oo)'
    mcq_dom = {
        "id": "test-dom-keyword",
        "question": "Find domain:",
        "options": [
            {"id": "A", "text": "$(-\\infty, \\infty)$", "misconception": "None: correct."},
            {"id": "B", "text": "$\\mathbb{R}$", "misconception": "Equivalent set notation for all reals."},
            {"id": "C", "text": "$[0, \\infty)$", "misconception": "Restricted needlessly to non-negative reals."},
            {"id": "D", "text": "$(0, \\infty)$", "misconception": "Restricted needlessly to positive reals."},
        ],
        "correctId": "A",
    }
    res_dom = mcq_verifier.verify(mcq_dom)
    assert res_dom.valid is False

    # 3. Rational trig identity tan(x) + cot(x) == sec(x)*csc(x)
    mcq_trig = {
        "id": "test-trig-rational",
        "question": "Simplify tan(x) + cot(x):",
        "options": [
            {"id": "A", "text": "sec(x)*csc(x)", "misconception": "None: correct."},
            {"id": "B", "text": "tan(x) + cot(x)", "misconception": "Unreduced equivalent expression."},
            {"id": "C", "text": "sin(x)*cos(x)", "misconception": "Inverted reciprocal trig functions."},
            {"id": "D", "text": "sec(x) + csc(x)", "misconception": "Added instead of multiplied."},
        ],
        "correctId": "A",
    }
    res_trig = mcq_verifier.verify(mcq_trig)
    assert res_trig.valid is False


def test_wsgi_server_endpoints_and_security():
    """Verify server.py endpoints, JSON serialization of domain sets, CORS preflight, and error guards."""
    def call_wsgi(method: str, path: str, body: bytes = b""):
        captured = {}

        def start_response(status, headers):
            captured["status"] = status
            captured["headers"] = dict(headers)

        environ = {
            "REQUEST_METHOD": method,
            "PATH_INFO": path,
            "CONTENT_LENGTH": str(len(body)),
            "wsgi.input": io.BytesIO(body),
        }
        chunks = verify_wsgi_app(environ, start_response)
        raw = b"".join(chunks).decode("utf-8")
        return captured["status"], captured["headers"], (json.loads(raw) if raw else None)

    # 1. OPTIONS preflight returns 204 with CORS headers
    status, headers, _ = call_wsgi("OPTIONS", "/verify-calculus")
    assert status.startswith("204")
    assert "Access-Control-Allow-Origin" in headers

    # 2. POST /verify-calculus with domain operation returns 200 OK (no AttributeError or TypeError)
    payload = json.dumps({
        "type": "domain",
        "expression": "sqrt(9 - x**2)",
        "variable": "x",
        "expected_domain": "[-3, 3]",
    }).encode("utf-8")
    status, headers, data = call_wsgi("POST", "/verify-calculus", payload)
    assert status.startswith("200"), f"Expected 200 OK, got {status}: {data}"
    assert data["valid"] is True
    assert data["warnings"] == []

    # 3. GET on POST-only endpoint returns 405 Method Not Allowed
    status, _, data = call_wsgi("GET", "/verify-calculus")
    assert status.startswith("405")

    # 4. Non-dict JSON body (e.g. JSON array) returns 400 Bad Request
    status, _, data = call_wsgi("POST", "/verify-expr", b"[1, 2, 3]")
    assert status.startswith("400")


def test_all_sections_mathematical_validation():
    """Verify that all content sections across Chapters 1-16 pass mathematical validation."""
    from tools.verify.section_validator import validate_section_dir
    from tools.verify.verify import locate_all_sections

    sections = locate_all_sections()
    assert len(sections) == 119, f"Expected exactly 119 sections, found {len(sections)}"
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
    test_security_blocks_code_injection_and_dos(eng)
    test_numerical_probe_parity_and_bounded_domains(eng)
    test_mcq_edge_cases_function_prefix_intervals_and_trig(mcq_v)
    test_wsgi_server_endpoints_and_security()
    test_all_sections_mathematical_validation()
    print("ALL TEST_VERIFY CHECKS PASSED (including all 119 curriculum sections)!")
