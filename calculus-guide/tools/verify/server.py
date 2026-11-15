"""
WSGI HTTP Service Entrypoint for Thomas' Calculus Verification Engine.

Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
Powered by SymPy (https://www.sympy.org/)
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path
from typing import Any, Callable, Dict, List, Tuple

# Ensure tools/verify and root are on sys.path
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
    from tools.verify.mcq_verifier import MCQVerifier
    from tools.verify.calculus_verifier import CalculusVerifier
except ImportError:
    from engine import SymPyEngine, are_algebraically_equivalent
    from mcq_verifier import MCQVerifier
    from calculus_verifier import CalculusVerifier

engine = SymPyEngine()
mcq_verifier = MCQVerifier(engine)
calculus_verifier = CalculusVerifier(engine)

# Maximum allowed request body size (64 KB) to prevent memory exhaustion DoS
MAX_BODY_BYTES = 65_536
ALLOWED_CORS_ORIGIN = os.environ.get("VERIFY_CORS_ORIGIN", "http://localhost:3000")


def _json_response(
    start_response: Callable,
    status: str,
    payload: Dict[str, Any],
    extra_headers: List[Tuple[str, str]] | None = None,
) -> List[bytes]:
    """Serialize payload to JSON before calling start_response, attaching security & CORS headers."""
    encoded = json.dumps(payload).encode("utf-8")
    headers: List[Tuple[str, str]] = [
        ("Content-Type", "application/json; charset=utf-8"),
        ("Content-Length", str(len(encoded))),
        ("X-Content-Type-Options", "nosniff"),
        ("Access-Control-Allow-Origin", ALLOWED_CORS_ORIGIN),
        ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),
        ("Access-Control-Allow-Headers", "Content-Type, Authorization"),
    ]
    if extra_headers:
        headers.extend(extra_headers)
    start_response(status, headers)
    return [encoded]


def app(environ: Dict[str, Any], start_response: Callable) -> List[bytes]:
    """Standard WSGI application entrypoint for Vercel Python runtime."""
    method = environ.get("REQUEST_METHOD", "GET").upper()
    path = environ.get("PATH_INFO", "/")

    # Handle CORS preflight requests
    if method == "OPTIONS":
        return _json_response(start_response, "204 No Content", {})

    # Route: GET / or /health
    if path in ("/", "/health", "/api/health"):
        if method != "GET":
            return _json_response(
                start_response,
                "405 Method Not Allowed",
                {"error": "Method Not Allowed"},
                [("Allow", "GET, OPTIONS")],
            )
        return _json_response(
            start_response,
            "200 OK",
            {
                "status": "ok",
                "service": "verify",
                "engine": "SymPy Mathematical Verification Engine",
                "author": "Muhammad Abdullah Athar",
            },
        )

    # Known POST verification routes
    post_routes = {
        "/verify-expr",
        "/api/verify-expr",
        "/verify-mcq",
        "/api/verify-mcq",
        "/verify-calculus",
        "/api/verify-calculus",
    }

    if path not in post_routes:
        return _json_response(
            start_response, "404 Not Found", {"error": "Not Found", "path": path}
        )

    if method != "POST":
        return _json_response(
            start_response,
            "405 Method Not Allowed",
            {"error": "Method Not Allowed; use POST"},
            [("Allow", "POST, OPTIONS")],
        )

    # Safely parse and bound JSON body for POST requests
    try:
        content_length = int(environ.get("CONTENT_LENGTH", 0) or 0)
    except (ValueError, TypeError):
        return _json_response(
            start_response, "400 Bad Request", {"error": "Invalid Content-Length header"}
        )

    if content_length < 0:
        return _json_response(
            start_response, "400 Bad Request", {"error": "Negative Content-Length header"}
        )
    if content_length > MAX_BODY_BYTES:
        return _json_response(
            start_response,
            "413 Payload Too Large",
            {"error": f"Request payload exceeds maximum limit of {MAX_BODY_BYTES} bytes"},
        )

    body_data: Dict[str, Any] = {}
    if content_length > 0:
        raw_body = environ["wsgi.input"].read(content_length)
        try:
            parsed_json = json.loads(raw_body.decode("utf-8"))
        except Exception:
            return _json_response(
                start_response, "400 Bad Request", {"error": "Invalid JSON payload"}
            )
        if not isinstance(parsed_json, dict):
            return _json_response(
                start_response,
                "400 Bad Request",
                {"error": "JSON payload must be an object"},
            )
        body_data = parsed_json

    # Route: POST /verify-expr or /api/verify-expr
    if path in ("/verify-expr", "/api/verify-expr"):
        expr = body_data.get("expr", "")
        expected = body_data.get("expected", "")
        if not isinstance(expr, str) or not isinstance(expected, str) or not expr.strip() or not expected.strip():
            return _json_response(
                start_response,
                "400 Bad Request",
                {"error": "'expr' and 'expected' must be non-empty strings"},
            )

        try:
            is_equiv, method_used = engine.are_equivalent(expr, expected)
            return _json_response(
                start_response,
                "200 OK",
                {
                    "equivalent": is_equiv,
                    "method": method_used,
                    "expr": expr,
                    "expected": expected,
                },
            )
        except (ValueError, TypeError) as ve:
            return _json_response(
                start_response, "400 Bad Request", {"error": str(ve)}
            )
        except Exception:
            return _json_response(
                start_response,
                "500 Internal Server Error",
                {"error": "Internal verification error"},
            )

    # Route: POST /verify-mcq or /api/verify-mcq
    if path in ("/verify-mcq", "/api/verify-mcq"):
        if not body_data:
            return _json_response(
                start_response, "400 Bad Request", {"error": "MCQ payload required"}
            )
        try:
            res = mcq_verifier.verify(body_data)
            return _json_response(
                start_response,
                "200 OK",
                {
                    "valid": res.valid,
                    "item_id": res.item_id,
                    "errors": res.errors,
                    "warnings": res.warnings,
                    "details": res.details,
                },
            )
        except (ValueError, TypeError) as ve:
            return _json_response(
                start_response, "400 Bad Request", {"error": str(ve)}
            )
        except Exception:
            return _json_response(
                start_response,
                "500 Internal Server Error",
                {"error": "Internal MCQ verification error"},
            )

    # Route: POST /verify-calculus or /api/verify-calculus
    if path in ("/verify-calculus", "/api/verify-calculus"):
        if not body_data:
            return _json_response(
                start_response, "400 Bad Request", {"error": "Calculus payload required"}
            )
        try:
            res = calculus_verifier.verify_payload(body_data)
            return _json_response(
                start_response,
                "200 OK",
                {
                    "valid": res.valid,
                    "operation": res.operation,
                    "item_id": res.item_id,
                    "computed": res.computed,
                    "expected": res.expected,
                    "errors": res.errors,
                    "warnings": res.warnings,
                    "details": res.details,
                },
            )
        except (ValueError, TypeError) as ve:
            return _json_response(
                start_response, "400 Bad Request", {"error": str(ve)}
            )
        except Exception:
            return _json_response(
                start_response,
                "500 Internal Server Error",
                {"error": "Internal calculus verification error"},
            )

    return _json_response(
        start_response, "404 Not Found", {"error": "Not Found", "path": path}
    )


verify_wsgi_app = app


if __name__ == "__main__":
    from wsgiref.simple_server import make_server
    port = 8000
    print(f"Starting Thomas' Calculus Verification WSGI server on port {port}...")
    with make_server("", port, app) as httpd:
        httpd.serve_forever()
