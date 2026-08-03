"""
satellite.py — Satellite API Routes for FastAPI Service
Exposes endpoints for Sentinel-2 multispectral index calculation & GeoJSON boundary analysis.
"""

from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any, Optional
from app.services.earth_engine import (
    compute_ndvi,
    compute_evi,
    analyze_geojson_boundary,
)

router = APIRouter(prefix="/satellite", tags=["Satellite Processing"])

@router.post("/analyze")
async def analyze_boundary(payload: Dict[str, Any] = Body(...)):
    """
    Analyzes a GeoJSON boundary over Sentinel-2 multispectral imagery.
    Returns current mean NDVI, EVI, 6-month growth trend, and vegetation health.
    """
    geojson = payload.get("geojsonBoundary") or payload.get("geojson") or payload
    if not geojson:
        raise HTTPException(status_code=400, detail="GeoJSON boundary data is required.")

    months_history = payload.get("monthsHistory", 6)
    analysis = analyze_geojson_boundary(geojson, months_history=months_history)

    return {
        "success": True,
        "message": "Sentinel-2 spectral analysis completed successfully.",
        "data": analysis,
    }

@router.post("/ndvi")
async def get_ndvi(payload: Dict[str, float] = Body(...)):
    """Calculates NDVI from Red (B4) and NIR (B8) reflectance values."""
    red_b4 = payload.get("red_b4")
    nir_b8 = payload.get("nir_b8")

    if red_b4 is None or nir_b8 is None:
        raise HTTPException(status_code=400, detail="Both 'red_b4' and 'nir_b8' are required.")

    ndvi_val = compute_ndvi(red_b4, nir_b8)
    return {
        "success": True,
        "data": {
            "index": "NDVI",
            "value": ndvi_val,
            "formula": "(B8 - B4) / (B8 + B4)",
        },
    }

@router.post("/evi")
async def get_evi(payload: Dict[str, float] = Body(...)):
    """Calculates EVI from Red (B4), NIR (B8), and Blue (B2) reflectance values."""
    red_b4 = payload.get("red_b4")
    nir_b8 = payload.get("nir_b8")
    blue_b2 = payload.get("blue_b2", 0.05)

    if red_b4 is None or nir_b8 is None:
        raise HTTPException(status_code=400, detail="Both 'red_b4' and 'nir_b8' are required.")

    evi_val = compute_evi(red_b4, nir_b8, blue_b2)
    return {
        "success": True,
        "data": {
            "index": "EVI",
            "value": evi_val,
            "formula": "2.5 * (B8 - B4) / (B8 + 6*B4 - 7.5*B2 + 1)",
        },
    }
