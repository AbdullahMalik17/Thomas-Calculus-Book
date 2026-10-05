"""
Section Content Validator for Thomas' Calculus Guide.

Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
Powered by SymPy

Scans and validates mathematical content items within chapter/section directories:
- Multiple-Choice Questions (mcq/*.json):
  - Exactly 4 options (A, B, C, D)
  - Distractors non-equivalent to correct answer
  - Distractors pairwise non-equivalent
  - Misconceptions >= 10 chars per distractor
  - Mathematical correctness of correct option
- Textbook Solutions (solutions/*.json) and Practice Items (practice/*.json):
  - Evaluates all embedded 'sympyVerification' payloads (domain, derivative, integral, equivalence)
  - Checks pedagogical step requirements ('why' justifications)
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional, Union

from .calculus_verifier import CalculusVerifier
from .engine import SymPyEngine
from .mcq_verifier import MCQVerifier


@dataclass
class SectionValidationReport:
    """Detailed summary of section mathematical validation."""
    section_path: str
    exists: bool = True
    total_files: int = 0
    mcq_count: int = 0
    mcq_passed: int = 0
    solution_count: int = 0
    solution_passed: int = 0
    practice_count: int = 0
    practice_passed: int = 0
    payload_count: int = 0
    payload_passed: int = 0
    errors: List[str] = field(default_factory=list)
    warnings: List[str] = field(default_factory=list)

    @property
    def valid(self) -> bool:
        return self.exists and len(self.errors) == 0

    def summary(self) -> str:
        lines = [
            f"Validation Report for Section: {self.section_path}",
            f"  Status: {'PASS' if self.valid else 'FAIL'}",
            f"  Total Content Files Scanned: {self.total_files}",
            f"  MCQ Items: {self.mcq_passed}/{self.mcq_count} passed",
            f"  Solution Items: {self.solution_passed}/{self.solution_count} passed",
            f"  Practice Items: {self.practice_passed}/{self.practice_count} passed",
            f"  SymPy Verification Payloads: {self.payload_passed}/{self.payload_count} passed",
        ]
        if self.errors:
            lines.append("  Errors:")
            for err in self.errors:
                lines.append(f"    - {err}")
        if self.warnings:
            lines.append("  Warnings:")
            for warn in self.warnings:
                lines.append(f"    - {warn}")
        return "\n".join(lines)


class SectionValidator:
    """Validates all mathematical and pedagogical JSON files in a section directory."""

    def __init__(self, engine: Optional[SymPyEngine] = None):
        self.engine = engine or SymPyEngine()
        self.mcq_verifier = MCQVerifier(engine=self.engine)
        self.calc_verifier = CalculusVerifier(engine=self.engine)

    def validate_section(self, section_dir: Union[str, Path]) -> SectionValidationReport:
        """Scan and validate all items in a section directory."""
        dir_path = Path(section_dir)
        report = SectionValidationReport(section_path=str(dir_path))

        if not dir_path.exists():
            report.exists = False
            report.warnings.append(f"Section directory does not exist: {dir_path}")
            return report

        # Discover all json files in section directory and subdirectories
        json_files = list(dir_path.glob("**/*.json"))
        report.total_files = len(json_files)

        if not json_files:
            report.warnings.append(f"No JSON content files found in {dir_path}")
            return report

        for file_path in json_files:
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
            except Exception as e:
                report.errors.append(f"JSON syntax error in {file_path.name}: {e}")
                continue

            rel_str = str(file_path.relative_to(dir_path)).replace("\\", "/")
            item_id = data.get("id", file_path.stem)

            # Classify item by path or structure
            is_mcq = "mcq" in rel_str or ("options" in data and "correctId" in data)
            is_solution = "solutions" in rel_str or "exercise" in rel_str
            is_practice = "practice" in rel_str

            if is_mcq:
                report.mcq_count += 1
                mcq_res = self.mcq_verifier.verify(data)
                if mcq_res.valid:
                    report.mcq_passed += 1
                else:
                    for err in mcq_res.errors:
                        report.errors.append(f"[{rel_str}] MCQ error: {err}")

            elif is_practice:
                report.practice_count += 1
                item_valid = self._validate_content_payloads(data, rel_str, report)
                if item_valid:
                    report.practice_passed += 1

            elif is_solution:
                report.solution_count += 1
                item_valid = self._validate_content_payloads(data, rel_str, report)
                if item_valid:
                    report.solution_passed += 1

            else:
                # General content item with possible verification payload
                self._validate_content_payloads(data, rel_str, report)

        return report

    def _validate_content_payloads(
        self, data: Dict[str, Any], rel_path: str, report: SectionValidationReport
    ) -> bool:
        """Evaluate any embedded sympyVerification payloads in a content item."""
        has_error = False

        # Check solution steps 'why' annotations and step-level payloads
        steps = data.get("steps")
        if isinstance(steps, list):
            for idx, step in enumerate(steps):
                if isinstance(step, dict):
                    why = step.get("why")
                    if not why or not isinstance(why, str) or len(why.strip()) < 5:
                        report.warnings.append(
                            f"[{rel_path}] Step {step.get('stepNumber', idx+1)} has missing or short 'why' annotation"
                        )
                    step_payload = step.get("sympyVerification") or step.get("verification")
                    if step_payload:
                        payloads = step_payload if isinstance(step_payload, list) else [step_payload]
                        for p in payloads:
                            if isinstance(p, dict):
                                report.payload_count += 1
                                v_res = self.calc_verifier.verify_payload(p)
                                if v_res.valid:
                                    report.payload_passed += 1
                                else:
                                    has_error = True
                                    for err in v_res.errors:
                                        report.errors.append(f"[{rel_path}] Step {step.get('stepNumber', idx+1)} math verification error: {err}")

        # Check root or metadata sympyVerification field
        metadata = data.get("metadata") if isinstance(data.get("metadata"), dict) else {}
        payload_data = data.get("sympyVerification") or data.get("verification") or metadata.get("sympyVerification")
        if payload_data:
            payloads = payload_data if isinstance(payload_data, list) else [payload_data]
            for p in payloads:
                if not isinstance(p, dict):
                    continue
                report.payload_count += 1
                v_res = self.calc_verifier.verify_payload(p)
                if v_res.valid:
                    report.payload_passed += 1
                else:
                    has_error = True
                    for err in v_res.errors:
                        report.errors.append(f"[{rel_path}] Math payload verification error: {err}")

        return not has_error


def validate_section_dir(section_dir: Union[str, Path]) -> SectionValidationReport:
    """Convenience function to validate a section directory."""
    validator = SectionValidator()
    return validator.validate_section(section_dir)
