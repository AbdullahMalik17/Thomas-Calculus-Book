"""
Calculus Verification Engine for Thomas' Calculus Guide.

Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
Powered by SymPy

Verifies higher-calculus concepts using symbolic computation:
1. Real domain set equality: Evaluates continuous_domain and tests set equivalence.
2. Difference quotient and derivative: Evaluates (f(x+h)-f(x))/h and derivative limits.
3. Indefinite and definite integrals: Fundamental Theorem of Calculus consistency check.
4. Function symmetry: Evaluates even (f(-x) - f(x) = 0) and odd (f(-x) + f(x) = 0) parity.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple, Union

import sympy as sp
from sympy.calculus.util import continuous_domain

from .engine import SymPyEngine, are_algebraically_equivalent, sanitize_math_string


@dataclass
class CalculusVerificationResult:
    """Structured report of calculus verification outcome."""
    valid: bool
    operation: str
    item_id: Optional[str] = None
    errors: List[str] = field(default_factory=list)
    computed: Optional[str] = None
    expected: Optional[str] = None
    details: Dict[str, Any] = field(default_factory=dict)

    def summary(self) -> str:
        status = "PASS" if self.valid else "FAIL"
        id_str = f"[{self.item_id}] " if self.item_id else ""
        lines = [f"{id_str}Calculus Verification ({self.operation}) {status}"]
        if self.computed:
            lines.append(f"  - Computed: {self.computed}")
        if self.expected:
            lines.append(f"  - Expected: {self.expected}")
        for err in self.errors:
            lines.append(f"  - ERROR: {err}")
        return "\n".join(lines)


class CalculusVerifier:
    """Verifier for calculus operations and JSON payloads."""

    def __init__(self, engine: Optional[SymPyEngine] = None):
        self.engine = engine or SymPyEngine()

    def parse_interval_string(self, interval_str: str) -> sp.Set:
        """
        Parse standard interval notation into SymPy Set objects.
        Supports:
        - '(-oo, oo)', 'R', 'Reals' -> S.Reals
        - '[-3, 3]', '(0, 5]', '[-1, 2)'
        - Unions: '[-1, 2) U (2, oo)', '(-oo, 0) U (0, oo)'
        """
        s = interval_str.strip()
        if s.startswith("$$") and s.endswith("$$"):
            s = s[2:-2].strip()
        elif s.startswith("$") and s.endswith("$"):
            s = s[1:-1].strip()

        if s in ("R", "Reals", "(-oo, oo)", "(-inf, inf)", "(-oo, +oo)", "(-\\infty, \\infty)", "(-\\infty, +\\infty)"):
            return sp.S.Reals

        if s in ("empty", "EmptySet", "{}", "\\emptyset"):
            return sp.EmptySet

        # Handle unions split by 'U', '\cup', or '|'
        parts = [p.strip() for p in re.split(r"\s*(?:U|\\cup|\|)\s*", s) if p.strip()]
        if len(parts) > 1:
            subsets = [self.parse_interval_string(p) for p in parts]
            return sp.Union(*subsets)

        # Match single interval: [start, end)
        pattern = r"^([\[\(])\s*([^\s,]+)\s*,\s*([^\s,\]\)]+)\s*([\]\)])$"
        match = re.match(pattern, s)
        if match:
            left_bracket, start_str, end_str, right_bracket = match.groups()
            left_open = (left_bracket == "(")
            right_open = (right_bracket == ")")

            start_val = self._parse_endpoint(start_str)
            end_val = self._parse_endpoint(end_str)

            return sp.Interval(start_val, end_val, left_open=left_open, right_open=right_open)

        # Fallback: try sympify as set
        try:
            return sp.sympify(s)
        except Exception as e:
            raise ValueError(f"Unable to parse interval string '{interval_str}': {e}")

    def _parse_endpoint(self, endpoint_str: str) -> sp.Expr:
        """Parse an interval endpoint string (e.g. -oo, oo, sqrt(2), 3)."""
        ep = endpoint_str.strip()
        if ep in ("-oo", "-inf", "-infty", "-\\infty", "-oo"):
            return -sp.oo
        if ep in ("oo", "+oo", "inf", "+inf", "infty", "\\infty", "+oo", "+\\infty"):
            return sp.oo
        return self.engine.parse(ep)

    def intervals_spec_to_set(self, intervals: List[Dict[str, Any]]) -> sp.Set:
        """Convert a list of interval specification dictionaries to a SymPy Set."""
        sp_intervals = []
        for item in intervals:
            start = self._parse_endpoint(str(item["start"]))
            end = self._parse_endpoint(str(item["end"]))
            left_open = bool(item.get("left_open", False))
            right_open = bool(item.get("right_open", False))
            sp_intervals.append(sp.Interval(start, end, left_open=left_open, right_open=right_open))
        if not sp_intervals:
            return sp.EmptySet
        return sp.Union(*sp_intervals)

    def verify_domain(
        self,
        expr_input: Union[str, sp.Expr],
        var_name: str = "x",
        expected_domain_str: Optional[str] = None,
        intervals: Optional[List[Dict[str, Any]]] = None,
        item_id: Optional[str] = None,
    ) -> CalculusVerificationResult:
        """
        Verify the continuous real domain of a function.
        Calculates continuous_domain(expr, var, S.Reals) and asserts set equivalence.
        """
        errors = []
        var = sp.Symbol(var_name, real=True)
        expr = self.engine.parse(expr_input, extra_symbols={var_name: var})

        try:
            computed_set = continuous_domain(expr, var, sp.S.Reals)
        except Exception as e:
            errors.append(f"Failed to compute continuous domain for {expr}: {e}")
            return CalculusVerificationResult(
                valid=False, operation="domain", item_id=item_id, errors=errors
            )

        # Determine expected set
        expected_set = None
        if intervals is not None:
            try:
                expected_set = self.intervals_spec_to_set(intervals)
            except Exception as e:
                errors.append(f"Failed to parse intervals specification: {e}")
        elif expected_domain_str:
            try:
                expected_set = self.parse_interval_string(expected_domain_str)
            except Exception as e:
                errors.append(f"Failed to parse expected domain string '{expected_domain_str}': {e}")
        else:
            errors.append("No expected domain provided (expected_domain_str or intervals required)")

        if errors or expected_set is None:
            return CalculusVerificationResult(
                valid=False,
                operation="domain",
                item_id=item_id,
                computed=str(computed_set),
                errors=errors,
            )

        # Compare sets
        is_equal = (computed_set == expected_set)
        if not is_equal:
            # Check symmetric difference
            try:
                diff = computed_set ^ expected_set
                if diff.is_empty:
                    is_equal = True
            except Exception:
                pass

        if not is_equal:
            errors.append(
                f"Computed domain '{computed_set}' does not match expected domain '{expected_set}'"
            )

        return CalculusVerificationResult(
            valid=is_equal,
            operation="domain",
            item_id=item_id,
            computed=str(computed_set),
            expected=str(expected_set),
            errors=errors,
            details={"computed_set": computed_set, "expected_set": expected_set},
        )

    def verify_difference_quotient(
        self,
        expr_input: Union[str, sp.Expr],
        var_name: str = "x",
        h_name: str = "h",
        expected_quotient: Optional[Union[str, sp.Expr]] = None,
        expected_derivative: Optional[Union[str, sp.Expr]] = None,
        item_id: Optional[str] = None,
    ) -> CalculusVerificationResult:
        """
        Verify the difference quotient and limit derivative of a function.
        Computes Q(x, h) = (f(x+h) - f(x)) / h, verifies equivalence to expected_quotient,
        and confirms limit_{h -> 0} Q(x, h) matches diff(f, x) and expected_derivative.
        """
        errors = []
        x = sp.Symbol(var_name, real=True)
        h = sp.Symbol(h_name, real=True)

        expr = self.engine.parse(expr_input, extra_symbols={var_name: x, h_name: h})

        # Calculate difference quotient
        f_x_plus_h = expr.subs(x, x + h)
        raw_diff_quot = (f_x_plus_h - expr) / h
        computed_quot = sp.cancel(sp.together(raw_diff_quot))

        # Check expected difference quotient
        if expected_quotient is not None:
            is_equiv, method = self.engine.are_equivalent(
                computed_quot,
                expected_quotient,
                extra_symbols={var_name: x, h_name: h},
            )
            if not is_equiv:
                errors.append(
                    f"Computed difference quotient '{computed_quot}' is not equivalent to expected '{expected_quotient}'"
                )

        # Check derivative and limit as h -> 0
        computed_derivative = sp.diff(expr, x)
        try:
            quot_limit = sp.limit(raw_diff_quot, h, 0)
            if not self.engine.are_equivalent(quot_limit, computed_derivative)[0]:
                errors.append(
                    f"Difference quotient limit '{quot_limit}' does not match symbolic derivative '{computed_derivative}'"
                )
        except Exception as e:
            errors.append(f"Failed to evaluate limit of difference quotient: {e}")

        if expected_derivative is not None:
            is_equiv, method = self.engine.are_equivalent(
                computed_derivative,
                expected_derivative,
                extra_symbols={var_name: x},
            )
            if not is_equiv:
                errors.append(
                    f"Computed derivative '{computed_derivative}' is not equivalent to expected '{expected_derivative}'"
                )

        return CalculusVerificationResult(
            valid=len(errors) == 0,
            operation="difference_quotient",
            item_id=item_id,
            computed=f"quotient={computed_quot}, deriv={computed_derivative}",
            expected=f"quotient={expected_quotient}, deriv={expected_derivative}",
            errors=errors,
            details={
                "quotient": str(computed_quot),
                "derivative": str(computed_derivative),
            },
        )

    def verify_derivative(
        self,
        expr_input: Union[str, sp.Expr],
        var_name: str = "x",
        expected_derivative: Union[str, sp.Expr] = "",
        order: int = 1,
        item_id: Optional[str] = None,
    ) -> CalculusVerificationResult:
        """Verify symbolic derivative of an expression."""
        errors = []
        x = sp.Symbol(var_name, real=True)
        expr = self.engine.parse(expr_input, extra_symbols={var_name: x})
        computed = sp.diff(expr, x, order)

        is_equiv, method = self.engine.are_equivalent(
            computed, expected_derivative, extra_symbols={var_name: x}
        )
        if not is_equiv:
            errors.append(
                f"Computed derivative '{computed}' is not equivalent to expected '{expected_derivative}'"
            )

        return CalculusVerificationResult(
            valid=is_equiv,
            operation="derivative",
            item_id=item_id,
            computed=str(computed),
            expected=str(expected_derivative),
            errors=errors,
            details={"method": method, "order": order},
        )

    def verify_integral(
        self,
        expr_input: Union[str, sp.Expr],
        var_name: str = "x",
        kind: str = "indefinite",
        expected: Union[str, sp.Expr] = "",
        lower: Optional[Union[str, int, float]] = None,
        upper: Optional[Union[str, int, float]] = None,
        item_id: Optional[str] = None,
    ) -> CalculusVerificationResult:
        """
        Verify indefinite or definite integrals.
        For indefinite integrals, uses Fundamental Theorem of Calculus: d/dx[expected] - expr == 0.
        For definite integrals, evaluates integrate(expr, (x, lower, upper)) and checks equivalence.
        """
        errors = []
        x = sp.Symbol(var_name, real=True)
        expr = self.engine.parse(expr_input, extra_symbols={var_name: x})

        if kind.lower() in ("indefinite", "antiderivative"):
            # FTC test: diff(expected, x) - expr == 0
            expected_expr = self.engine.parse(expected, extra_symbols={var_name: x})
            derivative_of_expected = sp.diff(expected_expr, x)
            is_equiv, method = self.engine.are_equivalent(
                derivative_of_expected, expr, extra_symbols={var_name: x}
            )
            if not is_equiv:
                errors.append(
                    f"FTC check failed: d/dx[{expected}] = '{derivative_of_expected}', which does not equal integrand '{expr}'"
                )
            return CalculusVerificationResult(
                valid=is_equiv,
                operation="integral_indefinite",
                item_id=item_id,
                computed=str(derivative_of_expected),
                expected=str(expr),
                errors=errors,
                details={"ftc_method": method},
            )

        elif kind.lower() == "definite":
            if lower is None or upper is None:
                errors.append("Definite integral requires both 'lower' and 'upper' limits")
                return CalculusVerificationResult(
                    valid=False, operation="integral_definite", item_id=item_id, errors=errors
                )
            a = self.engine.parse(lower)
            b = self.engine.parse(upper)
            try:
                computed_val = sp.integrate(expr, (x, a, b))
                is_equiv, method = self.engine.are_equivalent(computed_val, expected)
                if not is_equiv:
                    errors.append(
                        f"Computed definite integral '{computed_val}' does not equal expected '{expected}'"
                    )
                return CalculusVerificationResult(
                    valid=is_equiv,
                    operation="integral_definite",
                    item_id=item_id,
                    computed=str(computed_val),
                    expected=str(expected),
                    errors=errors,
                )
            except Exception as e:
                errors.append(f"Failed to compute definite integral: {e}")
                return CalculusVerificationResult(
                    valid=False, operation="integral_definite", item_id=item_id, errors=errors
                )
        else:
            errors.append(f"Unknown integral kind '{kind}'; expected 'indefinite' or 'definite'")
            return CalculusVerificationResult(
                valid=False, operation="integral", item_id=item_id, errors=errors
            )

    def verify_symmetry(
        self,
        expr_input: Union[str, sp.Expr],
        var_name: str = "x",
        expected_symmetry: str = "odd",
        item_id: Optional[str] = None,
    ) -> CalculusVerificationResult:
        """
        Verify function symmetry:
        - Even: f(-x) - f(x) == 0
        - Odd: f(-x) + f(x) == 0
        - Neither: neither equality holds
        """
        errors = []
        x = sp.Symbol(var_name, real=True)
        expr = self.engine.parse(expr_input, extra_symbols={var_name: x})

        f_neg_x = expr.subs(x, -x)

        # Test even: f(-x) - f(x) == 0
        is_even, _ = self.engine.simplify_cascade(f_neg_x - expr)
        # Test odd: f(-x) + f(x) == 0
        is_odd, _ = self.engine.simplify_cascade(f_neg_x + expr)

        if is_even and is_odd:
            computed_sym = "both"  # Zero function
        elif is_even:
            computed_sym = "even"
        elif is_odd:
            computed_sym = "odd"
        else:
            computed_sym = "neither"

        expected_norm = expected_symmetry.strip().lower()
        matched = (computed_sym == expected_norm) or (computed_sym == "both" and expected_norm in ("even", "odd"))

        if not matched:
            errors.append(
                f"Computed symmetry '{computed_sym}' does not match expected symmetry '{expected_symmetry}'"
            )

        return CalculusVerificationResult(
            valid=matched,
            operation="symmetry",
            item_id=item_id,
            computed=computed_sym,
            expected=expected_symmetry,
            errors=errors,
            details={"is_even": is_even, "is_odd": is_odd},
        )

    def verify_payload(self, payload: Dict[str, Any]) -> CalculusVerificationResult:
        """
        Dispatch and verify a structured calculus JSON payload.

        Payload types supported:
        - 'domain'
        - 'difference_quotient'
        - 'derivative'
        - 'integral'
        - 'symmetry'
        - 'equivalence'
        """
        p_type = (payload.get("type") or payload.get("operation") or "").lower()
        item_id = payload.get("id")

        if p_type == "domain":
            return self.verify_domain(
                expr_input=payload["expression"],
                var_name=payload.get("variable", "x"),
                expected_domain_str=payload.get("expected_domain") or payload.get("expected"),
                intervals=payload.get("intervals"),
                item_id=item_id,
            )

        elif p_type in ("difference_quotient", "diff_quotient"):
            return self.verify_difference_quotient(
                expr_input=payload["expression"],
                var_name=payload.get("variable", "x"),
                h_name=payload.get("h_var", "h"),
                expected_quotient=payload.get("expected_quotient"),
                expected_derivative=payload.get("expected_derivative") or payload.get("expected"),
                item_id=item_id,
            )

        elif p_type == "derivative":
            order = int(payload.get("order", 1))
            return self.verify_derivative(
                expr_input=payload["expression"],
                var_name=payload.get("variable", "x"),
                expected_derivative=payload.get("expected_derivative") or payload.get("expected", ""),
                order=order,
                item_id=item_id,
            )

        elif p_type == "integral":
            return self.verify_integral(
                expr_input=payload["expression"],
                var_name=payload.get("variable", "x"),
                kind=payload.get("kind", "indefinite"),
                expected=payload.get("expected") or payload.get("expected_integral", ""),
                lower=payload.get("lower"),
                upper=payload.get("upper"),
                item_id=item_id,
            )

        elif p_type == "symmetry":
            return self.verify_symmetry(
                expr_input=payload["expression"],
                var_name=payload.get("variable", "x"),
                expected_symmetry=payload.get("expected_symmetry") or payload.get("expected", "odd"),
                item_id=item_id,
            )

        elif p_type in ("equivalence", "algebraic_equivalence"):
            expr1 = payload.get("expression") or payload.get("expr")
            expr2 = payload.get("expected") or payload.get("expr2")
            var_name = payload.get("variable")
            extra_syms = {var_name: sp.Symbol(var_name, real=True)} if var_name else {}
            is_equiv, method = self.engine.are_equivalent(expr1, expr2, extra_symbols=extra_syms)
            errors = [] if is_equiv else [f"Expressions '{expr1}' and '{expr2}' are not equivalent"]
            return CalculusVerificationResult(
                valid=is_equiv,
                operation="equivalence",
                item_id=item_id,
                computed=str(expr1),
                expected=str(expr2),
                errors=errors,
                details={"method": method},
            )

        else:
            return CalculusVerificationResult(
                valid=False,
                operation="unknown",
                item_id=item_id,
                errors=[f"Unsupported payload type '{p_type}'"],
            )


def verify_calculus_payload(payload: Dict[str, Any]) -> CalculusVerificationResult:
    """Convenience function to verify a calculus payload."""
    verifier = CalculusVerifier()
    return verifier.verify_payload(payload)
