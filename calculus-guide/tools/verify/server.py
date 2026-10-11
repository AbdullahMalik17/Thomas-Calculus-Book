"""
WSGI HTTP Service Entrypoint for Thomas' Calculus Verification Engine.

Author: Muhammad Abdullah Athar (https://github.com/AbdullahMalik17)
Powered by SymPy (https://www.sympy.org/)
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any, Callable, Dict, List

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


def app(environ: Dict[str, Any], start_response: Callable) -> List[bytes]:
    """Standard WSGI application entrypoint for Vercel Python runtime."""
    method = environ.get("REQUEST_METHOD", "GET").upper()
    path = environ.get("PATH_INFO", "/")

    # Route: GET / or /health
    if path in ("/", "/health", "/api/health"):
        status = "200 OK"
        headers = [("Content-Type", "application/json")]
        start_response(status, headers)
        body = {
            "status": "ok",
            "service": "verify",
            "engine": "SymPy Mathematical Verification Engine",
            "author": "Muhammad Abdullah Athar",
        }
        return [json.dumps(body).encode("utf-8")]

    # Parse JSON body for POST requests
    body_data: Dict[str, Any] = {}
    if method == "POST":
        try:
            content_length = int(environ.get("CONTENT_LENGTH", 0) or 0)
        except (ValueError, TypeError):
            content_length = 0

        if content_length > 0:
            raw_body = environ["wsgi.input"].read(content_length)
            try:
                body_data = json.loads(raw_body.decode("utf-8"))
            except Exception as e:
                start_response("400 Bad Request", [("Content-Type", "application/json")])
                return [json.dumps({"error": f"Invalid JSON payload: {e}"}).encode("utf-8")]

    # Route: POST /verify-expr or /api/verify-expr
    if path in ("/verify-expr", "/api/verify-expr"):
        expr = body_data.get("expr", "")
        expected = body_data.get("expected", "")
        if not expr or not expected:
            start_response("400 Bad Request", [("Content-Type", "application/json")])
            return [json.dumps({"error": "'expr' and 'expected' are required fields"}).encode("utf-8")]

        try:
            is_equiv, method_used = engine.are_equivalent(expr, expected)
            start_response("200 OK", [("Content-Type", "application/json")])
            return [json.dumps({
                "equivalent": is_equiv,
                "method": method_used,
                "expr": expr,
                "expected": expected,
            }).encode("utf-8")]
        except Exception as e:
            start_response("500 Internal Server Error", [("Content-Type", "application/json")])
            return [json.dumps({"error": str(e)}).encode("utf-8")]

    # Route: POST /verify-mcq or /api/verify-mcq
    if path in ("/verify-mcq", "/api/verify-mcq"):
        if not body_data:
            start_response("400 Bad Request", [("Content-Type", "application/json")])
            return [json.dumps({"error": "MCQ payload required"}).encode("utf-8")]
        try:
            res = mcq_verifier.verify(body_data)
            start_response("200 OK", [("Content-Type", "application/json")])
            return [json.dumps({
                "valid": res.valid,
                "item_id": res.item_id,
                "errors": res.errors,
                "warnings": res.warnings,
                "details": res.details,
            }).encode("utf-8")]
        except Exception as e:
            start_response("500 Internal Server Error", [("Content-Type", "application/json")])
            return [json.dumps({"error": str(e)}).encode("utf-8")]

    # Route: POST /verify-calculus or /api/verify-calculus
    if path in ("/verify-calculus", "/api/verify-calculus"):
        if not body_data:
            start_response("400 Bad Request", [("Content-Type", "application/json")])
            return [json.dumps({"error": "Calculus payload required"}).encode("utf-8")]
        try:
            res = calculus_verifier.verify_payload(body_data)
            start_response("200 OK", [("Content-Type", "application/json")])
            return [json.dumps({
                "valid": res.valid,
                "errors": res.errors,
                "warnings": res.warnings,
                "details": res.details,
            }).encode("utf-8")]
        except Exception as e:
            start_response("500 Internal Server Error", [("Content-Type", "application/json")])
            return [json.dumps({"error": str(e)}).encode("utf-8")]

    # 404 for unknown routes
    start_response("404 Not Found", [("Content-Type", "application/json")])
    return [json.dumps({"error": "Not Found", "path": path}).encode("utf-8")]


if __name__ == "__main__":
    from wsgiref.simple_server import make_server
    port = 8000
    print(f"Starting Thomas' Calculus Verification WSGI server on port {port}...")
    with make_server("", port, app) as httpd:
        httpd.serve_forever()
