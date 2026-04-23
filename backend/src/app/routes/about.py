from __future__ import annotations

from fastapi import APIRouter

from ..core.settings import settings

router = APIRouter()


@router.get("/", summary="About the API")
def about_info() -> dict:
    """Return basic information about the API and project."""
    return {
        "app_name": settings.app_name,
        "version": settings.app_version,
        "description": "Backend API for a Filipino family-run bakery (products, orders, admin).",
        "contact": {"email": "owner@example.com"},
    }
