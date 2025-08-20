from fastapi import APIRouter, HTTPException
from models import Contact, ContactCreate, ContactUpdate, ContactResponse, APIResponse
from database import contacts_collection, analytics_collection
from datetime import datetime
from typing import List
import logging

router = APIRouter(prefix="/api/contact", tags=["contact"])
logger = logging.getLogger(__name__)

@router.post("/", response_model=ContactResponse)
async def submit_contact(contact_data: ContactCreate):
    """Submit contact form"""
    try:
        # Create contact document
        contact_dict = contact_data.dict()
        contact_obj = Contact(**contact_dict)
        
        # Insert into database
        result = await contacts_collection.insert_one(contact_obj.dict())
        
        if result.inserted_id:
            # Update analytics - increment contact inquiries
            await analytics_collection.update_one(
                {},
                {"$inc": {"contactInquiries": 1}}
            )
            
            return ContactResponse(
                success=True,
                message="Thank you for reaching out! I'll get back to you within 24 hours.",
                contact=contact_obj
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to submit contact form")
    
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/")
async def get_contacts():
    """Get all contact submissions (admin only)"""
    try:
        contacts = await contacts_collection.find().sort("createdAt", -1).to_list(100)
        
        # Remove MongoDB _id field
        for contact in contacts:
            contact.pop('_id', None)
        
        return APIResponse(
            success=True,
            message="Contacts retrieved successfully",
            data={"contacts": contacts, "total": len(contacts)}
        )
    
    except Exception as e:
        logger.error(f"Error retrieving contacts: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/{contact_id}")
async def update_contact(contact_id: str, contact_update: ContactUpdate):
    """Update contact status"""
    try:
        update_data = contact_update.dict(exclude_unset=True)
        
        result = await contacts_collection.update_one(
            {"id": contact_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return APIResponse(
            success=True,
            message="Contact updated successfully"
        )
    
    except Exception as e:
        logger.error(f"Error updating contact: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.delete("/{contact_id}")
async def delete_contact(contact_id: str):
    """Delete contact submission"""
    try:
        result = await contacts_collection.delete_one({"id": contact_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Contact not found")
        
        return APIResponse(
            success=True,
            message="Contact deleted successfully"
        )
    
    except Exception as e:
        logger.error(f"Error deleting contact: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")