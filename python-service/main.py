"""
KarbonShrunkhala — Python Satellite Processing Service

Purpose:
  Provides REST API endpoints for satellite image processing
  using Google Earth Engine and Sentinel-2 imagery.

Interactions:
  - Called exclusively by the Express backend (never by the frontend directly).
  - Processes GeoJSON boundaries to compute NDVI/EVI vegetation indices.
  - Returns analysis results to Express, which stores them in the database.

This service runs on port 8000.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI(
    title="KarbonShrunkhala Satellite Service",
    description="Satellite processing microservice for Blue Carbon MRV",
    version="1.0.0",
)

# CORS — Only the Express backend should call this service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    """Health check endpoint to verify the Python service is running."""
    return {
        "success": True,
        "message": "KarbonShrunkhala Python Service is running",
        "data": {
            "service": "FastAPI Satellite Service",
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat(),
        },
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
