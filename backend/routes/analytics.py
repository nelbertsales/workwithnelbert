from fastapi import APIRouter, HTTPException
from models import Analytics, AnalyticsUpdate, APIResponse
from database import analytics_collection
from datetime import datetime
import logging

router = APIRouter(prefix="/api/analytics", tags=["analytics"])
logger = logging.getLogger(__name__)

@router.get("/")
async def get_analytics():
    """Get analytics data"""
    try:
        analytics_doc = await analytics_collection.find_one()
        if not analytics_doc:
            # Create default analytics if none exist
            default_analytics = {
                "id": "current",
                "websiteViews": 0,
                "blogViews": 0,
                "contactInquiries": 0,
                "socialMediaFollowers": 456,
                "date": datetime.utcnow()
            }
            await analytics_collection.insert_one(default_analytics)
            analytics_doc = default_analytics
        
        # Remove MongoDB _id field
        analytics_doc.pop('_id', None)
        
        return APIResponse(
            success=True,
            message="Analytics retrieved successfully",
            data=analytics_doc
        )
    
    except Exception as e:
        logger.error(f"Error retrieving analytics: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/view")
async def track_view(view_type: str = "website"):
    """Track a page view"""
    try:
        field_map = {
            "website": "websiteViews",
            "blog": "blogViews"
        }
        
        field_to_increment = field_map.get(view_type, "websiteViews")
        
        # Increment the appropriate view counter
        result = await analytics_collection.update_one(
            {},
            {"$inc": {field_to_increment: 1}}
        )
        
        if result.matched_count == 0:
            # Create analytics document if it doesn't exist
            new_analytics = {
                "id": "current",
                "websiteViews": 1 if view_type == "website" else 0,
                "blogViews": 1 if view_type == "blog" else 0,
                "contactInquiries": 0,
                "socialMediaFollowers": 456,
                "date": datetime.utcnow()
            }
            await analytics_collection.insert_one(new_analytics)
        
        return APIResponse(
            success=True,
            message=f"{view_type.capitalize()} view tracked successfully"
        )
    
    except Exception as e:
        logger.error(f"Error tracking view: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/")
async def update_analytics(analytics_update: AnalyticsUpdate):
    """Update analytics manually (admin)"""
    try:
        update_data = analytics_update.dict(exclude_unset=True)
        
        result = await analytics_collection.update_one(
            {},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Analytics not found")
        
        return APIResponse(
            success=True,
            message="Analytics updated successfully"
        )
    
    except Exception as e:
        logger.error(f"Error updating analytics: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")