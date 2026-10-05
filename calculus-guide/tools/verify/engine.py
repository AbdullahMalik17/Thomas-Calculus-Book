"""
Symbolic Mathematical Verification Engine for Thomas' Calculus Guide.

Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
Powered by SymPy (https://www.sympy.org/)

Provides robust symbolic equivalence checking using an AST and simplification cascade:
1. AST structural comparison
2. Polynomial expansion / factor comparison
3. Standard symbolic simplification (simplify)
4. Rational function simplification (together, cancel)
5. Trigonometric identity simplification (trigsimp)
6. Radical expression simplification (radsimp)
7. Logarithmic & power expansion (expand_log with force=True, powsimp)
8. Multi-method combined simplification
9. SymPy zero-equivalence probe (.equals(0))
10. Multi-point numerical evaluation probe
"""

from __future__ import annotations

import re
import math
import random
from typing import Any, Dict, List, Optional, Tuple, Union

import sympy as sp
from sympy.parsing.sympy_parser import (
    parse_expr,
    standard_transformations,
    implicit_multiplication_application,
    convert_xor,
)

# Standard SymPy transformations for mathematical inputs
PARSER_TRANSFORMATIONS = standard_transformations + (
    implicit_multiplication_application,
    convert_xor,
)

# Canonical dictionary of common mathematical symbols and constants
DEFAULT_SYMBOLS: Dict[str, Any] = {
    # Real-valued standard variables
    "x": sp.Symbol("x", real=True),
    "y": sp.Symbol("y", real=True),
    "z": sp.Symbol("z", real=True),
    "t": sp.Symbol("t", real=True),
    "h": sp.Symbol("h", real=True),
    "a": sp.Symbol("a", real=True),
    "b": sp.Symbol("b", real=True),
    "c": sp.Symbol("c", real=True),
    "k": sp.Symbol("k", real=True),
    "m": sp.Symbol("m", real=True),
    "n": sp.Symbol("n", real=True),
    "p": sp.Symbol("p", real=True),
    "q": sp.Symbol("q", real=True),
    "r": sp.Symbol("r", real=True),
    "s": sp.Symbol("s", real=True),
    "u": sp.Symbol("u", real=True),
    "v": sp.Symbol("v", real=True),
    "w": sp.Symbol("w", real=True),
    "theta": sp.Symbol("theta", real=True),
    "phi": sp.Symbol("phi", real=True),
    # Constants
    "e": sp.E,
    "E": sp.E,
    "pi": sp.pi,
    "pi_sym": sp.pi,
    "oo": sp.oo,
    "inf": sp.oo,
    # Functions
    "ln": sp.log,
    "log": sp.log,
    "exp": sp.exp,
    "sqrt": sp.sqrt,
    "Abs": sp.Abs,
    "abs": sp.Abs,
    "sin": sp.sin,
    "cos": sp.cos,
    "tan": sp.tan,
    "sec": sp.sec,
    "csc": sp.csc,
    "cot": sp.cot,
    "asin": sp.asin,
    "acos": sp.acos,
    "atan": sp.atan,
    "sinh": sp.sinh,
    "cosh": sp.cosh,
    "tanh": sp.tanh,
}


def sanitize_math_string(expr_str: str) -> str:
    """
    Sanitize mathematical strings and LaTeX snippets into standard SymPy syntax.
    Handles delimiters, fractions, exponents, radicals, and Greek characters.
    """
    if not isinstance(expr_str, str):
        return str(expr_str)

    s = expr_str.strip()

    # Strip enclosing LaTeX math markers ($...$ or $$...$$)
    if s.startswith("$$") and s.endswith("$$"):
        s = s[2:-2].strip()
    elif s.startswith("$") and s.endswith("$"):
        s = s[1:-1].strip()

    # Remove LaTeX \left and \right
    s = re.sub(r"\\left\b", "", s)
    s = re.sub(r"\\right\b", "", s)

    # Normalize common LaTeX operators
    s = re.sub(r"\\cdot\b", " * ", s)
    s = re.sub(r"\\times\b", " * ", s)
    s = re.sub(r"\\div\b", " / ", s)
    s = re.sub(r"\\pm\b", " +/- ", s)
    s = re.sub(r"\\le(q)?\b", " <= ", s)
    s = re.sub(r"\\ge(q)?\b", " >= ", s)
    s = re.sub(r"\\ne(q)?\b", " != ", s)

    # Convert LaTeX functions
    s = re.sub(r"\\sin\b", "sin", s)
    s = re.sub(r"\\cos\b", "cos", s)
    s = re.sub(r"\\tan\b", "tan", s)
    s = re.sub(r"\\sec\b", "sec", s)
    s = re.sub(r"\\csc\b", "csc", s)
    s = re.sub(r"\\cot\b", "cot", s)
    s = re.sub(r"\\arcsin\b", "asin", s)
    s = re.sub(r"\\arccos\b", "acos", s)
    s = re.sub(r"\\arctan\b", "atan", s)
    s = re.sub(r"\\ln\b", "log", s)
    s = re.sub(r"\\log\b", "log", s)
    s = re.sub(r"\\exp\b", "exp", s)
    s = re.sub(r"\\theta\b", "theta", s)
    s = re.sub(r"\\pi\b", "pi", s)
    s = re.sub(r"\\infty\b", "oo", s)

    # Convert \sqrt{x} -> sqrt(x)
    while r"\sqrt" in s:
        # Match \sqrt[n]{arg}
        m_root = re.search(r"\\sqrt\[([^\]]+)\]\{([^{}]+)\}", s)
        if m_root:
            n_idx = m_root.group(1)
            arg = m_root.group(2)
            s = s[: m_root.start()] + f"(({arg})**(1/({n_idx})))" + s[m_root.end() :]
            continue
        # Match \sqrt{arg}
        m_sqrt = re.search(r"\\sqrt\{([^{}]+)\}", s)
        if m_sqrt:
            arg = m_sqrt.group(1)
            s = s[: m_sqrt.start()] + f"sqrt({arg})" + s[m_sqrt.end() :]
            continue
        break

    # Convert \frac{num}{den} -> ((num)/(den))
    while r"\frac" in s:
        m_frac = re.search(r"\\frac\{([^{}]+)\}\{([^{}]+)\}", s)
        if m_frac:
            num = m_frac.group(1)
            den = m_frac.group(2)
            s = s[: m_frac.start()] + f"(({num})/({den}))" + s[m_frac.end() :]
        else:
            break

    # Convert LaTeX braces for exponents and indices: x^{2} -> x**(2)
    s = re.sub(r"\^{([^{}]+)}", r"**(\1)", s)
    s = re.sub(r"\_([a-zA-Z0-9]+)", r"_\1", s)

    # Convert absolute value |x| -> Abs(x) for simple cases
    # e.g. |x + 1| -> Abs(x + 1)
    s = re.sub(r"\|([^|]+)\|", r"Abs(\1)", s)

    return s.strip()


class SymPyEngine:
    """
    Mathematical verification engine using SymPy with simplification cascades.
    """

    def __init__(self, custom_symbols: Optional[Dict[str, Any]] = None):
        self.symbols_dict = dict(DEFAULT_SYMBOLS)
        if custom_symbols:
            self.symbols_dict.update(custom_symbols)

    def parse(
        self,
        expr_input: Union[str, sp.Expr, int, float],
        extra_symbols: Optional[Dict[str, Any]] = None,
        assumptions: Optional[Dict[str, Dict[str, bool]]] = None,
    ) -> sp.Expr:
        """
        Safely parse a mathematical expression into a SymPy expression.

        Args:
            expr_input: String expression or existing SymPy expression
            extra_symbols: Optional mapping of symbol names to SymPy objects
            assumptions: Optional dictionary of {var_name: {assumption_name: bool}}
                         e.g. {'x': {'positive': True}}
        """
        if isinstance(expr_input, sp.Expr):
            return expr_input
        if isinstance(expr_input, (int, float)):
            return sp.sympify(expr_input)

        if not isinstance(expr_input, str):
            raise TypeError(f"Expected str, Expr, int, or float, got {type(expr_input).__name__}")

        sanitized = sanitize_math_string(expr_input)
        local_scope = dict(self.symbols_dict)

        if assumptions:
            for sym_name, sym_assump in assumptions.items():
                local_scope[sym_name] = sp.Symbol(sym_name, **sym_assump)

        if extra_symbols:
            local_scope.update(extra_symbols)

        try:
            parsed = parse_expr(
                sanitized,
                local_dict=local_scope,
                transformations=PARSER_TRANSFORMATIONS,
                evaluate=True,
            )
            return parsed
        except Exception as e:
            # Fallback to standard sympify with local scope
            try:
                return sp.sympify(sanitized, locals=local_scope)
            except Exception as e2:
                raise ValueError(
                    f"Failed to parse mathematical expression '{expr_input}' (sanitized: '{sanitized}'): {e}; fallback: {e2}"
                ) from e

    def simplify_cascade(
        self,
        diff_expr: sp.Expr,
        timeout_budget: float = 3.0,
    ) -> Tuple[bool, Optional[str]]:
        """
        Attempt to reduce diff_expr to 0 using an ordered cascade of symbolic simplifiers.

        Cascade steps:
        1. Exact zero check: diff == 0
        2. Polynomial expansion: expand(diff) == 0
        3. Standard simplify: simplify(diff) == 0
        4. Rational simplification: together(diff) == 0, cancel(diff) == 0
        5. Trigonometric simplification: trigsimp(diff) == 0
        6. Radical simplification: radsimp(diff) == 0
        7. Logarithmic & power expansion: expand_log(diff, force=True) == 0, powsimp(diff, force=True) == 0
        8. Compound passes: simplify(trigsimp(diff)) == 0, simplify(expand_log(diff, force=True)) == 0
        9. SymPy zero-equivalence probe: diff.equals(0)
        10. Numerical multi-point evaluation probe

        Returns:
            (True, method_name) if diff_expr == 0, else (False, None)
        """
        # Step 1: Direct zero check
        if diff_expr == 0:
            return True, "exact_zero"

        # Step 2: Polynomial expansion
        try:
            expanded = sp.expand(diff_expr)
            if expanded == 0:
                return True, "expand"
        except Exception:
            pass

        # Step 3: Standard simplify
        try:
            simplified = sp.simplify(diff_expr)
            if simplified == 0:
                return True, "simplify"
        except Exception:
            pass

        # Step 4: Rational arithmetic
        try:
            if sp.together(diff_expr) == 0:
                return True, "together"
            if sp.cancel(diff_expr) == 0:
                return True, "cancel"
            if sp.cancel(sp.together(diff_expr)) == 0:
                return True, "together_cancel"
        except Exception:
            pass

        # Step 5: Trigonometric identities
        try:
            ts = sp.trigsimp(diff_expr)
            if ts == 0:
                return True, "trigsimp"
            if sp.simplify(ts) == 0:
                return True, "trigsimp_simplify"
        except Exception:
            pass

        # Step 6: Radical simplification
        try:
            rs = sp.radsimp(diff_expr)
            if rs == 0:
                return True, "radsimp"
            if sp.simplify(rs) == 0:
                return True, "radsimp_simplify"
        except Exception:
            pass

        # Step 7: Logarithmic and power simplification
        try:
            el = sp.expand_log(diff_expr, force=True)
            if el == 0:
                return True, "expand_log"
            if sp.simplify(el) == 0:
                return True, "expand_log_simplify"
        except Exception:
            pass

        try:
            ps = sp.powsimp(diff_expr, force=True)
            if ps == 0:
                return True, "powsimp"
            if sp.simplify(ps) == 0:
                return True, "powsimp_simplify"
        except Exception:
            pass

        try:
            epe = sp.expand_power_exp(diff_expr)
            if epe == 0:
                return True, "expand_power_exp"
            if sp.simplify(epe) == 0:
                return True, "expand_power_exp_simplify"
        except Exception:
            pass

        # Step 8: Radical radicand factoring (e.g. sqrt(x^2 + 2x + 1) -> Abs(x + 1))
        try:
            factored_rad = diff_expr.replace(
                lambda e: e.is_Pow and e.exp == sp.Rational(1, 2),
                lambda e: sp.sqrt(sp.factor(e.base)),
            )
            if factored_rad == 0 or sp.simplify(factored_rad) == 0:
                return True, "factor_radicand"
        except Exception:
            pass

        # Step 9: Factorization check
        try:
            if sp.factor(diff_expr) == 0:
                return True, "factor"
        except Exception:
            pass

        # Step 9: SymPy .equals(0) randomized algebraic & numerical probe
        try:
            eq_res = diff_expr.equals(0)
            if eq_res is True:
                return True, "sympy_equals"
        except Exception:
            pass

        # Step 10: Multi-point numerical probe for elusive transcendental equivalences
        try:
            if self._numerical_zero_probe(diff_expr):
                return True, "numerical_probe"
        except Exception:
            pass

        return False, None

    def _numerical_zero_probe(self, expr: sp.Expr, num_points: int = 5, tolerance: float = 1e-11) -> bool:
        """
        Evaluate expr at multiple random positive points away from singularities.
        Returns True only if all evaluations are well-defined and strictly within tolerance.
        """
        free_syms = list(expr.free_symbols)
        if not free_syms:
            try:
                val = complex(expr.evalf())
                return abs(val) < tolerance
            except Exception:
                return False

        # Test at several randomized distinct points (positive real, non-integer)
        seed_offsets = [1.37, 2.71, 3.14, 4.89, 5.23]
        for offset in seed_offsets[:num_points]:
            subs_dict = {}
            for i, sym in enumerate(free_syms):
                subs_dict[sym] = offset + (i * 0.73)
            try:
                eval_val = complex(expr.subs(subs_dict).evalf())
                if math.isnan(eval_val.real) or math.isinf(eval_val.real):
                    return False
                if abs(eval_val) >= tolerance:
                    return False
            except Exception:
                return False

        return True

    def are_equivalent(
        self,
        expr1: Union[str, sp.Expr, int, float],
        expr2: Union[str, sp.Expr, int, float],
        assumptions: Optional[Dict[str, Dict[str, bool]]] = None,
        extra_symbols: Optional[Dict[str, Any]] = None,
    ) -> Tuple[bool, Optional[str]]:
        """
        Determine whether two mathematical expressions are algebraically equivalent.

        Args:
            expr1: First expression (str or SymPy Expr)
            expr2: Second expression (str or SymPy Expr)
            assumptions: Optional variable assumptions (e.g. {'x': {'positive': True}})
            extra_symbols: Optional symbol mappings

        Returns:
            Tuple of (is_equivalent: bool, method_name: Optional[str])
        """
        p1 = self.parse(expr1, extra_symbols=extra_symbols, assumptions=assumptions)
        p2 = self.parse(expr2, extra_symbols=extra_symbols, assumptions=assumptions)

        # 1. Structural AST equality check
        if p1 == p2:
            return True, "ast_equal"

        # 2. Form difference expression
        diff = p1 - p2

        # 3. Execute simplification cascade
        is_zero, method = self.simplify_cascade(diff)
        if is_zero:
            return True, method

        # 4. Try symmetric difference or component-wise simplification
        # E.g., for radicals like 1/(sqrt(x)+sqrt(y)) vs (sqrt(x)-sqrt(y))/(x-y),
        # simplify(radsimp(p1) - radsimp(p2))
        try:
            r1 = sp.radsimp(p1)
            r2 = sp.radsimp(p2)
            if r1 == r2 or sp.simplify(r1 - r2) == 0:
                return True, "component_radsimp"
        except Exception:
            pass

        try:
            t1 = sp.trigsimp(p1)
            t2 = sp.trigsimp(p2)
            if t1 == t2 or sp.simplify(t1 - t2) == 0:
                return True, "component_trigsimp"
        except Exception:
            pass

        try:
            l1 = sp.expand_log(p1, force=True)
            l2 = sp.expand_log(p2, force=True)
            if l1 == l2 or sp.simplify(l1 - l2) == 0:
                return True, "component_expand_log"
        except Exception:
            pass

        try:
            ps1 = sp.powsimp(p1, force=True)
            ps2 = sp.powsimp(p2, force=True)
            if ps1 == ps2 or sp.simplify(ps1 - ps2) == 0:
                return True, "component_powsimp"
        except Exception:
            pass

        return False, None


# Module-level convenience functions
_default_engine = SymPyEngine()


def parse_math_expr(
    expr_str: Union[str, sp.Expr, int, float],
    assumptions: Optional[Dict[str, Dict[str, bool]]] = None,
) -> sp.Expr:
    """Parse a mathematical expression string into a SymPy expression."""
    return _default_engine.parse(expr_str, assumptions=assumptions)


def are_algebraically_equivalent(
    expr1: Union[str, sp.Expr, int, float],
    expr2: Union[str, sp.Expr, int, float],
    assumptions: Optional[Dict[str, Dict[str, bool]]] = None,
) -> Tuple[bool, Optional[str]]:
    """Check algebraic equivalence of two expressions using the simplification cascade."""
    return _default_engine.are_equivalent(expr1, expr2, assumptions=assumptions)
