"""
Thomas' Calculus Mathematical Verification Package.

Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
Powered by SymPy
"""

from .engine import (
    SymPyEngine,
    parse_math_expr,
    are_algebraically_equivalent,
    sanitize_math_string,
)
from .mcq_verifier import (
    MCQVerifier,
    MCQVerificationResult,
    verify_mcq_data,
)
from .calculus_verifier import (
    CalculusVerifier,
    CalculusVerificationResult,
    verify_calculus_payload,
)
from .fixtures import (
    FIXTURES,
    create_fixtures,
    run_all_fixtures,
)
from .section_validator import (
    SectionValidator,
    SectionValidationReport,
    validate_section_dir,
)

__version__ = "1.0.0"
__author__ = "Muhammad Abdullah Athar"
__all__ = [
    "SymPyEngine",
    "parse_math_expr",
    "are_algebraically_equivalent",
    "sanitize_math_string",
    "MCQVerifier",
    "MCQVerificationResult",
    "verify_mcq_data",
    "CalculusVerifier",
    "CalculusVerificationResult",
    "verify_calculus_payload",
    "FIXTURES",
    "create_fixtures",
    "run_all_fixtures",
    "SectionValidator",
    "SectionValidationReport",
    "validate_section_dir",
]
