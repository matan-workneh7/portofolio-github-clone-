"""
Helper utility functions
"""
import secrets
from datetime import datetime
from typing import Optional


def generate_commit_hash() -> str:
    """Generate a random commit hash (40 characters)"""
    return secrets.token_hex(20)


def format_datetime(dt: Optional[datetime]) -> Optional[str]:
    """Format datetime to ISO string"""
    if dt is None:
        return None
    return dt.isoformat()


def truncate_string(s: str, max_length: int = 100) -> str:
    """Truncate a string to a maximum length"""
    if len(s) <= max_length:
        return s
    return s[:max_length - 3] + "..."
