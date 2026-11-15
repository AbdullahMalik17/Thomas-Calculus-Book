"""
Multiple-Choice Question (MCQ) Mathematical Verifier.

Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
Powered by SymPy

Validates higher-mathematics MCQs under strict pedagogical and mathematical criteria:
1. Cardinality check: Exactly 4 options with identifiers ['A', 'B', 'C', 'D'].
2. Correct answer check: correctId exists and matches expected solution (if provided).
3. Distractor non-equivalence: Every distractor is mathematically non-equivalent to the correct option.
4. Distractor pairwise distinction: No two distractors are mathematically equivalent to each other.
5. Pedagogical metadata check: Every distractor possesses a substantive misconception explanation (>= 10 chars).
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from itertools import combinations
from typing import Any, Dict, List, Optional, Tuple, Union

from .engine import SymPyEngine, are_algebraically_equivalent, sanitize_math_string


@dataclass
class MCQVerificationResult:
    """Structured report of MCQ verification outcome."""
    valid: bool
    item_id: Optional[str] = None
    errors: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)
    details: Dict[str, Any] = field(default_factory=dict)

    def summary(self) -> str:
        status = "PASS" if self.valid else "FAIL"
        id_str = f"[{self.item_id}] " if self.item_id else ""
        lines = [f"{id_str}MCQ Verification {status}"]
        for err in self.errors:
            lines.append(f"  - ERROR: {err}")
        for warn in self.warnings:
            lines.append(f"  - WARNING: {warn}")
        return "\n".join(lines)


class MCQVerifier:
    """Verifier for multiple choice mathematical questions."""

    REQUIRED_OPTION_IDS = {"A", "B", "C", "D"}

    def __init__(self, engine: Optional[SymPyEngine] = None):
        self.engine = engine or SymPyEngine()

    def _extract_option_value(self, opt: Dict[str, Any]) -> str:
        """Extract the mathematical or textual expression from an option dictionary."""
        for key in ("value", "latex", "text", "expr", "content", "math"):
            if key in opt and isinstance(opt[key], str) and opt[key].strip():
                return opt[key].strip()
        # Fallback to stringifying option
        return str(opt)

    _EQUATION_PREFIX_RE = re.compile(
        r"^(?:[a-zA-Z]\s*'*\s*\([a-zA-Z0-9_,\s]+\)|[yYzZ]|\\frac\{d[a-zA-Z]\}\{d[a-zA-Z]\})\s*=\s*(.+)$"
    )
    _INTERVAL_KEYWORDS = {"R", "Reals", "\\mathbb{R}", "empty", "EmptySet", "{}", "\\emptyset"}

    def _strip_delimiters(self, text: str) -> str:
        s = text.strip()
        if s.startswith("$$") and s.endswith("$$") and len(s) >= 4:
            return s[2:-2].strip()
        if s.startswith("$") and s.endswith("$") and len(s) >= 2:
            return s[1:-1].strip()
        return s

    def _extract_rhs_if_function_def(self, text: str) -> Tuple[Optional[str], str]:
        """
        If text is of the form 'f(x) = expr' or 'y = expr', return (lhs_normalized, rhs).
        Otherwise return (None, text).
        """
        clean = self._strip_delimiters(text)
        m = self._EQUATION_PREFIX_RE.match(clean)
        if m and "=" not in m.group(1):
            lhs = clean[: clean.find("=")].strip().replace(" ", "")
            return lhs, m.group(1).strip()
        return None, clean

    def _are_options_equivalent(
        self, val1: str, val2: str, allow_prefix_strip: bool = False
    ) -> Tuple[bool, str]:
        """
        Check whether two option values are equivalent.
        Attempts symbolic equivalence first; falls back to interval set equality
        and normalized string equality if unparseable.
        """
        s1 = self._strip_delimiters(val1)
        s2 = self._strip_delimiters(val2)

        # Direct string equality
        if s1 == s2 or s1.lower() == s2.lower():
            return True, "text_identical"

        lhs1, rhs1 = self._extract_rhs_if_function_def(s1)
        lhs2, rhs2 = self._extract_rhs_if_function_def(s2)

        # Candidate pairs to test symbolically
        candidate_pairs = [(s1, s2)]
        if lhs1 and lhs2 and lhs1 == lhs2:
            candidate_pairs.append((rhs1, rhs2))
        elif allow_prefix_strip and (lhs1 or lhs2):
            candidate_pairs.append((rhs1, rhs2))

        for expr_a, expr_b in candidate_pairs:
            try:
                equiv, method = self.engine.are_equivalent(expr_a, expr_b)
                if equiv:
                    return True, f"symbolic_{method}"
            except Exception:
                pass

        # Try interval set equivalence if values look like interval or set notations
        looks_like_set_1 = any(c in s1 for c in ("[", "(")) or s1 in self._INTERVAL_KEYWORDS
        looks_like_set_2 = any(c in s2 for c in ("[", "(")) or s2 in self._INTERVAL_KEYWORDS
        if looks_like_set_1 and looks_like_set_2:
            try:
                from .calculus_verifier import CalculusVerifier

                calc = CalculusVerifier(self.engine)
                set1 = calc.parse_interval_string(s1)
                set2 = calc.parse_interval_string(s2)
                if set1 == set2 or (set1 ^ set2).is_empty:
                    return True, "interval_set_equal"
            except Exception:
                pass

        # Normalized math string comparison (e.g. whitespace differences)
        clean1 = re.sub(r"\s+", "", sanitize_math_string(s1))
        clean2 = re.sub(r"\s+", "", sanitize_math_string(s2))
        if clean1 == clean2:
            return True, "normalized_string"

        return False, "distinct"

    def verify(self, mcq_data: Dict[str, Any]) -> MCQVerificationResult:
        """
        Perform complete validation on an MCQ data structure.

        Expected schema:
        {
            "id": "optional-item-id",
            "question": "Question stem...",
            "options": [
                {"id": "A", "text": "...", "misconception": "..."},
                {"id": "B", "text": "...", "misconception": "..."},
                {"id": "C", "text": "...", "misconception": "..."},
                {"id": "D", "text": "...", "misconception": "..."}
            ],
            "correctId": "A",
            "expectedSolution": "optional expected answer string"
        }
        """
        item_id = mcq_data.get("id")
        errors: List[str] = []
        warnings: List[str] = []
        details: Dict[str, Any] = {"options_checked": {}}

        # 1. Cardinality check: exactly 4 options
        options = mcq_data.get("options")
        if not isinstance(options, list):
            errors.append(f"Options must be a list of 4 items, got {type(options).__name__}")
            return MCQVerificationResult(valid=False, item_id=item_id, errors=errors)

        if len(options) != 4:
            errors.append(f"Expected exactly 4 options (A, B, C, D), got {len(options)}")

        # Map options by ID
        opt_dict: Dict[str, Dict[str, Any]] = {}
        found_ids = set()
        for idx, opt in enumerate(options):
            if not isinstance(opt, dict):
                errors.append(f"Option at index {idx} must be a dictionary, got {type(opt).__name__}")
                continue
            opt_id = opt.get("id")
            if not opt_id:
                errors.append(f"Option at index {idx} is missing an 'id' attribute")
                continue
            if opt_id in found_ids:
                errors.append(f"Duplicate option ID '{opt_id}' found")
            found_ids.add(opt_id)
            opt_dict[opt_id] = opt

        if found_ids != self.REQUIRED_OPTION_IDS:
            missing = self.REQUIRED_OPTION_IDS - found_ids
            extras = found_ids - self.REQUIRED_OPTION_IDS
            if missing:
                errors.append(f"Missing required option IDs: {sorted(list(missing))}")
            if extras:
                errors.append(f"Unexpected option IDs: {sorted(list(extras))}")

        # 2. Check correctId
        correct_id = mcq_data.get("correctId")
        if not correct_id:
            errors.append("MCQ is missing required 'correctId'")
        elif correct_id not in self.REQUIRED_OPTION_IDS:
            errors.append(f"Invalid correctId '{correct_id}'; must be one of 'A', 'B', 'C', 'D'")
        elif correct_id not in opt_dict:
            errors.append(f"correctId '{correct_id}' does not correspond to any provided option")

        # 3. Check expected solution if provided (handle numeric 0 properly)
        expected = None
        for exp_key in ("expectedSolution", "expectedAnswer", "expected"):
            if exp_key in mcq_data and mcq_data[exp_key] is not None and str(mcq_data[exp_key]).strip() != "":
                expected = mcq_data[exp_key]
                break
        if expected is not None and correct_id and correct_id in opt_dict:
            correct_val = self._extract_option_value(opt_dict[correct_id])
            equiv, method = self._are_options_equivalent(
                correct_val, str(expected), allow_prefix_strip=True
            )
            if not equiv:
                errors.append(
                    f"Option '{correct_id}' ({correct_val}) does not evaluate to expected solution '{expected}'"
                )
            else:
                details["correct_option_evaluation"] = {
                    "matched": True,
                    "method": method,
                }

        # If options structure had fundamental errors, exit early
        if errors and not opt_dict:
            return MCQVerificationResult(valid=False, item_id=item_id, errors=errors)

        # 4. Pedagogical misconception check on all distractors
        for opt_id, opt in opt_dict.items():
            opt_val = self._extract_option_value(opt)
            details["options_checked"][opt_id] = opt_val

            if opt_id != correct_id:
                misconception = opt.get("misconception")
                if not misconception or not isinstance(misconception, str) or len(misconception.strip()) < 10:
                    errors.append(
                        f"Distractor '{opt_id}' must have a substantive 'misconception' explanation (minimum 10 characters). Found: '{misconception}'"
                    )

        # 5. Distractor non-equivalence against correct answer
        if correct_id and correct_id in opt_dict:
            correct_val = self._extract_option_value(opt_dict[correct_id])
            for opt_id, opt in opt_dict.items():
                if opt_id == correct_id:
                    continue
                dist_val = self._extract_option_value(opt)
                is_equiv, method = self._are_options_equivalent(dist_val, correct_val)
                if is_equiv:
                    errors.append(
                        f"Ambiguous MCQ: distractor '{opt_id}' ('{dist_val}') is mathematically equivalent to correct answer '{correct_id}' ('{correct_val}') via {method}"
                    )

        # 6. Distractor pairwise distinction (distractor vs distractor)
        distractor_ids = [oid for oid in opt_dict if oid != correct_id]
        for id1, id2 in combinations(distractor_ids, 2):
            val1 = self._extract_option_value(opt_dict[id1])
            val2 = self._extract_option_value(opt_dict[id2])
            is_equiv, method = self._are_options_equivalent(val1, val2)
            if is_equiv:
                errors.append(
                    f"Duplicate distractors: distractor '{id1}' ('{val1}') and distractor '{id2}' ('{val2}') are mathematically equivalent via {method}"
                )

        is_valid = len(errors) == 0
        return MCQVerificationResult(
            valid=is_valid,
            item_id=item_id,
            errors=errors,
            warnings=warnings,
            details=details,
        )


def verify_mcq_data(mcq_data: Dict[str, Any]) -> MCQVerificationResult:
    """Convenience function to verify an MCQ structure with the default verifier."""
    verifier = MCQVerifier()
    return verifier.verify(mcq_data)
