from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Import routes
from routes import profile, contact, blog, analytics

# Import database initialization
from database import init_database, close_database

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="Nelbert Tomicos Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Original hello world endpoint
@api_router.get("/")
async def root():
    return {"message": "Nelbert Tomicos Portfolio API - Virtual Assistant Services"}

# Health check endpoint
@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is running successfully"}

# Include all route modules
app.include_router(profile.router)
app.include_router(contact.router)
app.include_router(blog.router)
app.include_router(analytics.router)

# Include the base API router
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db():
    """Initialize database on startup"""
    try:
        await init_database()
        logger.info("✅ Database initialized successfully")
        logger.info("✅ Portfolio API started successfully")
        logger.info("📁 Available endpoints:")
        logger.info("  - GET /api/ - API root")
        logger.info("  - GET /api/health - Health check")
        logger.info("  - GET /api/profile - Get profile")
        logger.info("  - PUT /api/profile - Update profile")
        logger.info("  - POST /api/contact - Submit contact form")
        logger.info("  - GET /api/contact - Get contacts (admin)")
        logger.info("  - GET /api/blog - Get blog posts")
        logger.info("  - POST /api/blog - Create blog post")
        logger.info("  - GET /api/analytics - Get analytics")
        logger.info("  - POST /api/analytics/view - Track page view")
    except Exception as e:
        logger.error(f"❌ Database initialization failed: {e}")

@app.on_event("shutdown")
async def shutdown_db():
    """Close database connection on shutdown"""
    try:
        await close_database()
        logger.info("✅ Database connection closed")
    except Exception as e:
        logger.error(f"❌ Error closing database: {e}")