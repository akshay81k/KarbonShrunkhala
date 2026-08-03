"""
KarbonShrunkhala — Python Satellite Processing Service

Purpose:
  Provides REST API endpoints for satellite image processing
  using Google Earth Engine and Sentinel-2 imagery.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from app.routes.satellite import router as satellite_router

app = FastAPI(
    title="KarbonShrunkhala Satellite Service",
    description="Satellite processing microservice for Blue Carbon MRV",
    version="1.0.0",
)

# CORS — Express backend client authorization
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Satellite Processing Endpoints
app.include_router(satellite_router)

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
