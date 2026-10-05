"""
Comprehensive Test Fixtures for Thomas' Calculus Verification Engine.

Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
Powered by SymPy

Contains 24 edge-case test fixtures across 8 categories:
1. Factoring (Difference of cubes, quadratic factoring)
2. Expansion (Binomial cube, trinomial square)
3. Rational functions (Common denominator, complex fractions, cancellation)
4. Trigonometric identities (Pythagorean, double-angle sine/cosine, tangent addition)
5. Radical expressions (Conjugate rationalization, radical absolute value, fractional exponents)
6. Logarithmic and exponential identities (Product rule, power/quotient rule, exponential sum)
7. Calculus operations (Difference quotients, continuous domain, symmetry)
8. MCQ validation (Valid 4-choice separation, detection of ambiguous/equivalent distractors)
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Callable, Dict, List, Tuple

from .calculus_verifier import CalculusVerifier
from .engine import SymPyEngine
from .mcq_verifier import MCQVerifier


@dataclass
class VerificationFixture:
    """Represents a standalone verification test fixture."""
    id: int
    category: str
    name: str
    description: str
    run: Callable[[], Tuple[bool, str]]


def create_fixtures(engine: SymPyEngine = None) -> List[VerificationFixture]:
    """Instantiate the 24 verification test fixtures."""
    engine = engine or SymPyEngine()
    calc_verifier = CalculusVerifier(engine=engine)
    mcq_verifier = MCQVerifier(engine=engine)

    fixtures: List[VerificationFixture] = []

    # Category 1: Factoring
    def test_01() -> Tuple[bool, str]:
        expr1 = "(x - 3)*(x**2 + 3*x + 9)"
        expr2 = "x**3 - 27"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Factoring difference of cubes via {method}"

    fixtures.append(
        VerificationFixture(
            id=1,
            category="Factoring",
            name="Difference of Cubes",
            description="Factoring (x - 3)(x^2 + 3x + 9) == x^3 - 27",
            run=test_01,
        )
    )

    def test_02() -> Tuple[bool, str]:
        expr1 = "(2*x + 5)*(3*x - 4)"
        expr2 = "6*x**2 + 7*x - 20"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Factoring quadratic via {method}"

    fixtures.append(
        VerificationFixture(
            id=2,
            category="Factoring",
            name="Quadratic Factoring",
            description="Factoring (2x + 5)(3x - 4) == 6x^2 + 7x - 20",
            run=test_02,
        )
    )

    # Category 2: Expansion
    def test_03() -> Tuple[bool, str]:
        expr1 = "(x + 2)**3"
        expr2 = "x**3 + 6*x**2 + 12*x + 8"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Binomial cube expansion via {method}"

    fixtures.append(
        VerificationFixture(
            id=3,
            category="Expansion",
            name="Binomial Cube Expansion",
            description="Expanding (x + 2)^3 == x^3 + 6x^2 + 12x + 8",
            run=test_03,
        )
    )

    def test_04() -> Tuple[bool, str]:
        expr1 = "(x + y + z)**2"
        expr2 = "x**2 + y**2 + z**2 + 2*x*y + 2*x*z + 2*y*z"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Trinomial square expansion via {method}"

    fixtures.append(
        VerificationFixture(
            id=4,
            category="Expansion",
            name="Trinomial Square Expansion",
            description="Expanding (x + y + z)^2 == x^2 + y^2 + z^2 + 2xy + 2xz + 2yz",
            run=test_04,
        )
    )

    # Category 3: Rational Functions
    def test_05() -> Tuple[bool, str]:
        expr1 = "1/(x - 1) - 1/(x + 1)"
        expr2 = "2/(x**2 - 1)"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Rational common denominator via {method}"

    fixtures.append(
        VerificationFixture(
            id=5,
            category="Rational",
            name="Common Denominator Addition",
            description="Simplifying 1/(x-1) - 1/(x+1) == 2/(x^2 - 1)",
            run=test_05,
        )
    )

    def test_06() -> Tuple[bool, str]:
        expr1 = "(1/x + 1/y) / (1/x - 1/y)"
        expr2 = "(y + x)/(y - x)"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Complex rational fraction via {method}"

    fixtures.append(
        VerificationFixture(
            id=6,
            category="Rational",
            name="Complex Fraction Simplification",
            description="Simplifying ((1/x) + (1/y))/((1/x) - (1/y)) == (y + x)/(y - x)",
            run=test_06,
        )
    )

    def test_07() -> Tuple[bool, str]:
        expr1 = "(x**4 - 16)/(x**2 - 4)"
        expr2 = "x**2 + 4"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Rational cancellation via {method}"

    fixtures.append(
        VerificationFixture(
            id=7,
            category="Rational",
            name="Rational Factor Cancellation",
            description="Simplifying (x^4 - 16)/(x^2 - 4) == x^2 + 4",
            run=test_07,
        )
    )

    # Category 4: Trigonometric Identities
    def test_08() -> Tuple[bool, str]:
        expr1 = "sin(x)**2 + cos(x)**2"
        expr2 = "1"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Pythagorean identity via {method}"

    fixtures.append(
        VerificationFixture(
            id=8,
            category="Trigonometry",
            name="Pythagorean Trigonometric Identity",
            description="Verifying sin^2(x) + cos^2(x) == 1",
            run=test_08,
        )
    )

    def test_09() -> Tuple[bool, str]:
        expr1 = "sin(2*x)"
        expr2 = "2*sin(x)*cos(x)"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Double-angle sine identity via {method}"

    fixtures.append(
        VerificationFixture(
            id=9,
            category="Trigonometry",
            name="Double Angle Sine Identity",
            description="Verifying sin(2x) == 2sin(x)cos(x)",
            run=test_09,
        )
    )

    def test_10() -> Tuple[bool, str]:
        expr1 = "cos(2*x)"
        expr2 = "cos(x)**2 - sin(x)**2"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Double-angle cosine identity 1 via {method}"

    fixtures.append(
        VerificationFixture(
            id=10,
            category="Trigonometry",
            name="Double Angle Cosine Form 1",
            description="Verifying cos(2x) == cos^2(x) - sin^2(x)",
            run=test_10,
        )
    )

    def test_11() -> Tuple[bool, str]:
        expr1 = "cos(2*x)"
        expr2 = "1 - 2*sin(x)**2"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Double-angle cosine identity 2 via {method}"

    fixtures.append(
        VerificationFixture(
            id=11,
            category="Trigonometry",
            name="Double Angle Cosine Form 2",
            description="Verifying cos(2x) == 1 - 2sin^2(x)",
            run=test_11,
        )
    )

    def test_12() -> Tuple[bool, str]:
        expr1 = "tan(x + y)"
        expr2 = "(tan(x) + tan(y))/(1 - tan(x)*tan(y))"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Tangent addition formula via {method}"

    fixtures.append(
        VerificationFixture(
            id=12,
            category="Trigonometry",
            name="Tangent Addition Formula",
            description="Verifying tan(x + y) == (tan(x) + tan(y))/(1 - tan(x)tan(y))",
            run=test_12,
        )
    )

    # Category 5: Radical Expressions
    def test_13() -> Tuple[bool, str]:
        expr1 = "1/(sqrt(x) + sqrt(y))"
        expr2 = "(sqrt(x) - sqrt(y))/(x - y)"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Conjugate radical rationalization via {method}"

    fixtures.append(
        VerificationFixture(
            id=13,
            category="Radicals",
            name="Conjugate Radical Rationalization",
            description="Verifying 1/(sqrt(x) + sqrt(y)) == (sqrt(x) - sqrt(y))/(x - y)",
            run=test_13,
        )
    )

    def test_14() -> Tuple[bool, str]:
        expr1 = "sqrt(x**2 + 2*x + 1)"
        expr2 = "Abs(x + 1)"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Radical absolute value via {method}"

    fixtures.append(
        VerificationFixture(
            id=14,
            category="Radicals",
            name="Radical Absolute Value Identity",
            description="Verifying sqrt(x^2 + 2x + 1) == |x + 1|",
            run=test_14,
        )
    )

    def test_15() -> Tuple[bool, str]:
        expr1 = "(x**(1/3))*(x**(2/3))"
        expr2 = "x"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Fractional exponent multiplication via {method}"

    fixtures.append(
        VerificationFixture(
            id=15,
            category="Radicals",
            name="Fractional Exponent Product",
            description="Verifying (x^(1/3))*(x^(2/3)) == x for positive x",
            run=test_15,
        )
    )

    # Category 6: Logarithmic and Exponential Identities
    def test_16() -> Tuple[bool, str]:
        expr1 = "log(a*b)"
        expr2 = "log(a) + log(b)"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Logarithmic product rule via {method}"

    fixtures.append(
        VerificationFixture(
            id=16,
            category="Logarithms/Exponents",
            name="Logarithm Product Rule",
            description="Verifying log(ab) == log(a) + log(b)",
            run=test_16,
        )
    )

    def test_17() -> Tuple[bool, str]:
        expr1 = "log(x**3 / y)"
        expr2 = "3*log(x) - log(y)"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Logarithm power and quotient rule via {method}"

    fixtures.append(
        VerificationFixture(
            id=17,
            category="Logarithms/Exponents",
            name="Logarithm Power and Quotient Rule",
            description="Verifying log(x^3 / y) == 3log(x) - log(y)",
            run=test_17,
        )
    )

    def test_18() -> Tuple[bool, str]:
        expr1 = "exp(x + y)"
        expr2 = "exp(x)*exp(y)"
        equiv, method = engine.are_equivalent(expr1, expr2)
        return equiv, f"Exponential sum rule via {method}"

    fixtures.append(
        VerificationFixture(
            id=18,
            category="Logarithms/Exponents",
            name="Exponential Addition Law",
            description="Verifying exp(x + y) == exp(x)exp(y)",
            run=test_18,
        )
    )

    # Category 7: Section 1.1 Calculus Concepts
    def test_19() -> Tuple[bool, str]:
        res = calc_verifier.verify_difference_quotient(
            expr_input="x**2",
            var_name="x",
            h_name="h",
            expected_quotient="2*x + h",
            expected_derivative="2*x",
            item_id="fixture-19",
        )
        return res.valid, f"Quadratic difference quotient verified: {res.computed}"

    fixtures.append(
        VerificationFixture(
            id=19,
            category="Calculus Operations",
            name="Quadratic Difference Quotient",
            description="Evaluating ((x+h)^2 - x^2)/h == 2x + h and derivative 2x",
            run=test_19,
        )
    )

    def test_20() -> Tuple[bool, str]:
        res = calc_verifier.verify_difference_quotient(
            expr_input="1/x",
            var_name="x",
            h_name="h",
            expected_quotient="-1/(x*(x + h))",
            expected_derivative="-1/(x**2)",
            item_id="fixture-20",
        )
        return res.valid, f"Reciprocal difference quotient verified: {res.computed}"

    fixtures.append(
        VerificationFixture(
            id=20,
            category="Calculus Operations",
            name="Reciprocal Difference Quotient",
            description="Evaluating (1/(x+h) - 1/x)/h == -1/(x(x+h)) and derivative -1/x^2",
            run=test_20,
        )
    )

    def test_21() -> Tuple[bool, str]:
        res = calc_verifier.verify_domain(
            expr_input="sqrt(9 - x**2)",
            var_name="x",
            expected_domain_str="[-3, 3]",
            item_id="fixture-21",
        )
        return res.valid, f"Continuous real domain verified: {res.computed}"

    fixtures.append(
        VerificationFixture(
            id=21,
            category="Calculus Operations",
            name="Continuous Domain Set Equality",
            description="Verifying continuous domain of sqrt(9 - x^2) is [-3, 3]",
            run=test_21,
        )
    )

    def test_22() -> Tuple[bool, str]:
        res = calc_verifier.verify_symmetry(
            expr_input="x**3 - 5*x",
            var_name="x",
            expected_symmetry="odd",
            item_id="fixture-22",
        )
        return res.valid, f"Odd function symmetry verified: f(-x) + f(x) == 0"

    fixtures.append(
        VerificationFixture(
            id=22,
            category="Calculus Operations",
            name="Function Symmetry Test",
            description="Verifying x^3 - 5x exhibits odd parity symmetry",
            run=test_22,
        )
    )

    # Category 8: MCQ Verification & Negative Tests
    def test_23() -> Tuple[bool, str]:
        valid_mcq = {
            "id": "mcq-valid-sample",
            "question": "What is the domain of f(x) = sqrt(x + 2)?",
            "options": [
                {
                    "id": "A",
                    "text": "[-2, oo)",
                    "misconception": "None: this is the algebraically correct domain where radicand is non-negative.",
                },
                {
                    "id": "B",
                    "text": "(-2, oo)",
                    "misconception": "Omits the boundary point x = -2 where radicand equals zero, confusing with a denominator restriction.",
                },
                {
                    "id": "C",
                    "text": "[2, oo)",
                    "misconception": "Inverts the sign of the constant term inside the square root when solving x + 2 >= 0.",
                },
                {
                    "id": "D",
                    "text": "(-oo, -2]",
                    "misconception": "Reverses the direction of the inequality when solving x + 2 >= 0.",
                },
            ],
            "correctId": "A",
        }
        res = mcq_verifier.verify(valid_mcq)
        return res.valid, "Valid MCQ with 4 distinct options and misconceptions accepted"

    fixtures.append(
        VerificationFixture(
            id=23,
            category="MCQ Verification",
            name="Valid MCQ Distractor Separation",
            description="Asserting valid 4-choice MCQ with distinct options passes validation",
            run=test_23,
        )
    )

    def test_24() -> Tuple[bool, str]:
        invalid_mcq = {
            "id": "mcq-invalid-equivalent-distractor",
            "question": "Simplify 2(x + 1):",
            "options": [
                {
                    "id": "A",
                    "text": "2*x + 2",
                    "misconception": "None: correct answer.",
                },
                {
                    "id": "B",
                    "text": "2*(x + 1)",  # Algebraically equivalent to correct answer A!
                    "misconception": "Unexpanded factored form identical to correct answer.",
                },
                {
                    "id": "C",
                    "text": "2*x + 1",
                    "misconception": "Forgot to distribute 2 to the second term.",
                },
                {
                    "id": "D",
                    "text": "x + 2",
                    "misconception": "Distributed incorrectly by adding instead of multiplying.",
                },
            ],
            "correctId": "A",
        }
        res = mcq_verifier.verify(invalid_mcq)
        # Fixture passes if the verifier REJECTS the invalid MCQ and reports the equivalence error
        caught_ambiguity = (not res.valid) and any("Ambiguous MCQ" in err for err in res.errors)
        return caught_ambiguity, "Correctly caught and rejected ambiguous distractor equivalent to correct option"

    fixtures.append(
        VerificationFixture(
            id=24,
            category="MCQ Verification",
            name="MCQ Ambiguity Detection (Negative Test)",
            description="Asserting MCQ verifier catches distractor mathematically equivalent to correct option",
            run=test_24,
        )
    )

    return fixtures


FIXTURES = create_fixtures()


def run_all_fixtures(verbose: bool = True) -> Dict[str, Any]:
    """
    Execute all 24 verification test fixtures and return summary statistics.
    """
    fixtures = create_fixtures()
    total = len(fixtures)
    passed_count = 0
    failed_count = 0
    results = []

    for f in fixtures:
        try:
            passed, msg = f.run()
        except Exception as e:
            passed = False
            msg = f"Exception: {e}"

        if passed:
            passed_count += 1
            status = "PASS"
        else:
            failed_count += 1
            status = "FAIL"

        results.append({
            "id": f.id,
            "category": f.category,
            "name": f.name,
            "status": status,
            "passed": passed,
            "message": msg,
        })

    return {
        "total": total,
        "passed": passed_count,
        "failed": failed_count,
        "all_passed": (failed_count == 0),
        "results": results,
    }
