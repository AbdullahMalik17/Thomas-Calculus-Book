#!/usr/bin/env python3
"""
Standalone Math Verification CLI for Thomas' Calculus Guide.

Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
Powered by SymPy (https://www.sympy.org/)

Zero-argument execution:
    Runs all 24 mathematical edge-case test fixtures and validates Section 1.1
    content if present. Exits with code 0 if all tests pass.

Subcommands:
    test              Run test fixtures with filtering and verbosity
    verify-expr       Verify algebraic equivalence of two expressions
    verify-mcq        Verify an MCQ JSON item for distractor separation
    verify-calculus   Verify a domain, derivative, integral, or symmetry JSON payload
    validate-section  Scan and validate an entire chapter/section directory
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

# Ensure project root and package directory are in sys.path
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))
if str(SCRIPT_DIR.parent) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR.parent))
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

try:
    from tools.verify.engine import SymPyEngine, are_algebraically_equivalent
    from tools.verify.mcq_verifier import MCQVerifier, verify_mcq_data
    from tools.verify.calculus_verifier import CalculusVerifier, verify_calculus_payload
    from tools.verify.fixtures import FIXTURES, run_all_fixtures
    from tools.verify.section_validator import SectionValidator, validate_section_dir
except ImportError:
    # Direct local imports if imported inside tools/verify
    from engine import SymPyEngine, are_algebraically_equivalent
    from mcq_verifier import MCQVerifier, verify_mcq_data
    from calculus_verifier import CalculusVerifier, verify_calculus_payload
    from fixtures import FIXTURES, run_all_fixtures
    from section_validator import SectionValidator, validate_section_dir


APP_BANNER = r"""
================================================================================
   THOMAS' CALCULUS MATHEMATICAL VERIFICATION ENGINE
   Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
   SymPy Symbolic Simplification & Proof Verification Suite
================================================================================
"""

SECTION_1_1_REL_PATHS = [
    Path("content/ch01-functions/1.1-functions-and-graphs"),
    Path("calculus-guide/content/ch01-functions/1.1-functions-and-graphs"),
]


def print_banner() -> None:
    """Print the official attribution banner."""
    print(APP_BANNER)


def locate_all_sections() -> List[Path]:
    """Search common paths for all chapter/section content directories."""
    content_dirs = [
        PROJECT_ROOT / "content",
        Path.cwd() / "content",
        Path.cwd() / "calculus-guide" / "content",
    ]
    for cdir in content_dirs:
        if cdir.exists() and cdir.is_dir():
            sections = []
            for ch in sorted(cdir.glob("ch*")):
                if ch.is_dir():
                    for sec in sorted(ch.iterdir()):
                        if sec.is_dir() and any(sec.glob("**/*.json")):
                            sections.append(sec.resolve())
            if sections:
                return sections
    return []


def locate_section_1_1() -> Optional[Path]:
    """Search common paths for the Section 1.1 content directory."""
    candidates = [
        PROJECT_ROOT / "content" / "ch01-functions" / "1.1-functions-and-graphs",
        Path.cwd() / "content" / "ch01-functions" / "1.1-functions-and-graphs",
        Path.cwd() / "calculus-guide" / "content" / "ch01-functions" / "1.1-functions-and-graphs",
    ]
    for p in candidates:
        if p.exists() and p.is_dir():
            return p.resolve()
    return None


def run_default_workflow() -> int:
    """
    Default workflow when CLI is invoked with zero arguments:
    1. Runs all 24 edge-case test fixtures
    2. Validates all content sections across Chapters 1-4 if present
    3. Exits with 0 on total success, 1 on failure
    """
    print_banner()
    print("Executing automated test suite: 24 edge-case mathematical fixtures...\n")

    fixture_summary = run_all_fixtures(verbose=True)

    print(f"{'#':<3} | {'Category':<22} | {'Fixture Name':<35} | {'Status':<6}")
    print("-" * 75)
    for res in fixture_summary["results"]:
        status_color = res["status"]
        print(f"{res['id']:<3} | {res['category']:<22} | {res['name']:<35} | {status_color}")
        if not res["passed"]:
            print(f"    --> ERROR: {res['message']}")

    print("-" * 75)
    print(
        f"Fixture Summary: {fixture_summary['passed']}/{fixture_summary['total']} passed "
        f"({fixture_summary['failed']} failed)\n"
    )

    if not fixture_summary["all_passed"]:
        print("FAIL: One or more test fixtures failed.")
        return 1

    # Validate all discovered sections
    all_sections = locate_all_sections()
    if all_sections:
        print(f"Discovered {len(all_sections)} content section(s) to mathematically validate:")
        failed_sections = []
        total_payloads = 0
        total_payloads_passed = 0
        for sec_path in all_sections:
            sec_report = validate_section_dir(sec_path)
            total_payloads += sec_report.payload_count
            total_payloads_passed += sec_report.payload_passed
            if not sec_report.valid:
                print(f"[FAIL] {sec_path.name}")
                for err in sec_report.errors:
                    print(f"    --> ERROR: {err}")
                failed_sections.append(sec_path.name)
            else:
                print(f"[PASS] {sec_path.name} ({sec_report.solution_count} solutions, {sec_report.payload_passed}/{sec_report.payload_count} payloads)")

        print("-" * 75)
        print(f"Section Summary: {len(all_sections) - len(failed_sections)}/{len(all_sections)} sections passed.")
        print(f"Total Payloads Evaluated: {total_payloads_passed}/{total_payloads} passed.")

        if failed_sections:
            print(f"FAIL: {len(failed_sections)} section(s) failed validation: {', '.join(failed_sections)}")
            return 1
    else:
        print("Note: No section JSON content found.")

    print("\nSUCCESS: All mathematical verification checks passed cleanly (exit code 0).\n")
    return 0


def cmd_test(args: argparse.Namespace) -> int:
    """Run test fixtures with optional category/name filtering."""
    print_banner()
    summary = run_all_fixtures(verbose=args.verbose)

    category_filter = (args.category or "").lower()
    name_filter = (args.filter or "").lower()

    filtered_results = []
    for r in summary["results"]:
        if category_filter and category_filter not in r["category"].lower():
            continue
        if name_filter and name_filter not in r["name"].lower():
            continue
        filtered_results.append(r)

    print(f"{'#':<3} | {'Category':<22} | {'Fixture Name':<35} | {'Status':<6}")
    print("-" * 75)
    all_passed = True
    for res in filtered_results:
        print(f"{res['id']:<3} | {res['category']:<22} | {res['name']:<35} | {res['status']}")
        if not res["passed"]:
            all_passed = False
            print(f"    --> ERROR: {res['message']}")

    print("-" * 75)
    print(f"Results: {len(filtered_results)} fixtures matched.")
    return 0 if all_passed else 1


def cmd_verify_expr(args: argparse.Namespace) -> int:
    """Verify algebraic equivalence of two expressions."""
    engine = SymPyEngine()
    print(f"Checking algebraic equivalence:")
    print(f"  Expr 1:   {args.expr}")
    print(f"  Expected: {args.expected}")

    try:
        is_equiv, method = engine.are_equivalent(args.expr, args.expected)
    except Exception as e:
        print(f"ERROR: Verification raised exception: {e}")
        return 1

    if is_equiv:
        print(f"RESULT: PASS (Equivalence established via {method})")
        return 0
    else:
        print(f"RESULT: FAIL (Expressions are not algebraically equivalent)")
        return 1


def cmd_verify_mcq(args: argparse.Namespace) -> int:
    """Verify an MCQ JSON item."""
    verifier = MCQVerifier()

    mcq_data = None
    if args.file:
        file_path = Path(args.file)
        if not file_path.exists():
            print(f"ERROR: File not found: {file_path}")
            return 1
        with open(file_path, "r", encoding="utf-8") as f:
            mcq_data = json.load(f)
    elif args.json:
        mcq_data = json.loads(args.json)
    else:
        print("ERROR: Provide either --file or --json")
        return 1

    result = verifier.verify(mcq_data)
    print(result.summary())
    return 0 if result.valid else 1


def cmd_verify_calculus(args: argparse.Namespace) -> int:
    """Verify a calculus JSON payload."""
    verifier = CalculusVerifier()

    payload = None
    if args.file:
        file_path = Path(args.file)
        if not file_path.exists():
            print(f"ERROR: File not found: {file_path}")
            return 1
        with open(file_path, "r", encoding="utf-8") as f:
            payload = json.load(f)
    elif args.stdin:
        payload = json.load(sys.stdin)
    elif args.json:
        payload = json.loads(args.json)
    else:
        print("ERROR: Provide --file, --stdin, or --json")
        return 1

    result = verifier.verify_payload(payload)
    print(result.summary())
    return 0 if result.valid else 1


def cmd_validate_section(args: argparse.Namespace) -> int:
    """Scan and validate all content items in a section directory."""
    sec_dir = Path(args.dir)
    if not sec_dir.exists():
        print(f"ERROR: Section directory not found: {sec_dir}")
        return 1

    report = validate_section_dir(sec_dir)
    print(report.summary())
    return 0 if report.valid else 1


def build_parser() -> argparse.ArgumentParser:
    """Construct command-line argument parser."""
    parser = argparse.ArgumentParser(
        description="Thomas' Calculus Symbolic Math Verification Engine by Muhammad Abdullah Athar",
        epilog="Invoke without arguments to run the standard 24-fixture test suite.",
    )
    parser.add_argument(
        "--version",
        action="version",
        version="Thomas' Calculus Verification Engine 1.0.0 by Muhammad Abdullah Athar (SymPy)",
    )

    subparsers = parser.add_subparsers(dest="subcommand", help="Available subcommands")

    # Subcommand: test
    parser_test = subparsers.add_parser("test", help="Execute 24 edge-case test fixtures")
    parser_test.add_argument("-v", "--verbose", action="store_true", help="Verbose test reporting")
    parser_test.add_argument("-c", "--category", type=str, help="Filter fixtures by category")
    parser_test.add_argument("-f", "--filter", type=str, help="Filter fixtures by name substring")

    # Subcommand: verify-expr
    parser_expr = subparsers.add_parser("verify-expr", help="Check algebraic equivalence of two expressions")
    parser_expr.add_argument("--expr", required=True, type=str, help="First mathematical expression")
    parser_expr.add_argument("--expected", required=True, type=str, help="Expected mathematical expression")

    # Subcommand: verify-mcq
    parser_mcq = subparsers.add_parser("verify-mcq", help="Verify MCQ distractors and misconception schema")
    parser_mcq.add_argument("--file", type=str, help="Path to MCQ JSON file")
    parser_mcq.add_argument("--json", type=str, help="Inline MCQ JSON string")

    # Subcommand: verify-calculus
    parser_calc = subparsers.add_parser("verify-calculus", help="Verify domain, derivative, integral, or symmetry payload")
    parser_calc.add_argument("--file", type=str, help="Path to payload JSON file")
    parser_calc.add_argument("--stdin", action="store_true", help="Read payload JSON from standard input")
    parser_calc.add_argument("--json", type=str, help="Inline payload JSON string")

    # Subcommand: validate-section
    parser_sec = subparsers.add_parser("validate-section", help="Scan and validate an entire section directory")
    parser_sec.add_argument("--dir", required=True, type=str, help="Path to chapter/section directory")

    return parser
def main() -> None:
    # Zero-argument execution defaults to full test suite and section check
    if len(sys.argv) == 1:
        sys.exit(run_default_workflow())

    parser = build_parser()
    args = parser.parse_args()

    if args.subcommand == "test":
        sys.exit(cmd_test(args))
    elif args.subcommand == "verify-expr":
        sys.exit(cmd_verify_expr(args))
    elif args.subcommand == "verify-mcq":
        sys.exit(cmd_verify_mcq(args))
    elif args.subcommand == "verify-calculus":
        sys.exit(cmd_verify_calculus(args))
    elif args.subcommand == "validate-section":
        sys.exit(cmd_validate_section(args))
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
