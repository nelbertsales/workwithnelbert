from fastapi import APIRouter, HTTPException
from models import Profile, ProfileUpdate, APIResponse
from database import profile_collection
from datetime import datetime
import logging

router = APIRouter(prefix="/api/profile", tags=["profile"])
logger = logging.getLogger(__name__)

@router.get("/")
async def get_profile():
    """Get profile information"""
    try:
        profile_doc = await profile_collection.find_one()
        if not profile_doc:
            raise HTTPException(status_code=404, detail="Profile not found")
        
        # Remove MongoDB _id field for response
        profile_doc.pop('_id', None)
        return APIResponse(
            success=True,
            message="Profile retrieved successfully",
            data=profile_doc
        )
    
    except Exception as e:
        logger.error(f"Error retrieving profile: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/")
async def update_profile(profile_update: ProfileUpdate):
    """Update profile information"""
    try:
        # Get current profile
        current_profile = await profile_collection.find_one()
        if not current_profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        
        # Prepare update data
        update_data = profile_update.dict(exclude_unset=True)
        update_data["updatedAt"] = datetime.utcnow()
        
        # Update profile
        result = await profile_collection.update_one(
            {}, 
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Profile not found")
        
        # Get updated profile
        updated_profile = await profile_collection.find_one()
        updated_profile.pop('_id', None)
        
        return APIResponse(
            success=True,
            message="Profile updated successfully",
            data=updated_profile
        )
    
    except Exception as e:
        logger.error(f"Error updating profile: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/photo")
async def upload_profile_photo():
    """Upload profile photo - placeholder for future implementation"""
    try:
        # This would handle file upload logic
        # For now, return success message
        return APIResponse(
            success=True,
            message="Photo upload endpoint ready for implementation",
            data={"note": "File upload functionality to be implemented"}
        )
    
    except Exception as e:
        logger.error(f"Error uploading photo: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")