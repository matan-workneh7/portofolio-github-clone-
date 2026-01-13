"""Utility helper functions."""
from datetime import datetime
from typing import Optional


def generate_commit_hash() -> str:
    """Generate a random commit hash (simplified version)."""
    import secrets
    return secrets.token_hex(20)


def format_datetime(dt: Optional[datetime]) -> Optional[str]:
    """Format datetime to ISO string."""
    if dt is None:
        return None
    return dt.isoformat()
