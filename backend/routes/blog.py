from fastapi import APIRouter, HTTPException, Query
from models import BlogPost, BlogPostCreate, BlogPostUpdate, APIResponse
from database import blog_collection, analytics_collection
from datetime import datetime
from typing import List, Optional
import logging
import re

router = APIRouter(prefix="/api/blog", tags=["blog"])
logger = logging.getLogger(__name__)

def create_slug(title: str) -> str:
    """Create URL-friendly slug from title"""
    slug = title.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug.strip('-')

@router.get("/")
async def get_blog_posts(
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search in title and excerpt"),
    published: bool = Query(True, description="Filter by published status")
):
    """Get all blog posts with optional filtering"""
    try:
        # Build filter query
        filter_query = {"published": published}
        
        if category and category != "all":
            filter_query["category"] = category
        
        if search:
            filter_query["$or"] = [
                {"title": {"$regex": search, "$options": "i"}},
                {"excerpt": {"$regex": search, "$options": "i"}},
                {"content": {"$regex": search, "$options": "i"}}
            ]
        
        # Get blog posts
        posts = await blog_collection.find(filter_query).sort("createdAt", -1).to_list(50)
        
        # Remove MongoDB _id field
        for post in posts:
            post.pop('_id', None)
            # Format dates for frontend
            if isinstance(post.get('createdAt'), datetime):
                post['date'] = post['createdAt'].strftime('%Y-%m-%d')
        
        return APIResponse(
            success=True,
            message="Blog posts retrieved successfully",
            data={"posts": posts, "total": len(posts)}
        )
    
    except Exception as e:
        logger.error(f"Error retrieving blog posts: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/{slug}")
async def get_blog_post(slug: str):
    """Get specific blog post by slug"""
    try:
        post = await blog_collection.find_one({"slug": slug, "published": True})
        
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        post.pop('_id', None)
        
        # Track blog view
        await analytics_collection.update_one(
            {},
            {"$inc": {"blogViews": 1}}
        )
        
        return APIResponse(
            success=True,
            message="Blog post retrieved successfully",
            data=post
        )
    
    except Exception as e:
        logger.error(f"Error retrieving blog post: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/")
async def create_blog_post(post_data: BlogPostCreate):
    """Create new blog post"""
    try:
        # Create slug from title
        slug = create_slug(post_data.title)
        
        # Check if slug already exists
        existing_post = await blog_collection.find_one({"slug": slug})
        if existing_post:
            # Make slug unique by appending number
            counter = 1
            while existing_post:
                new_slug = f"{slug}-{counter}"
                existing_post = await blog_collection.find_one({"slug": new_slug})
                if not existing_post:
                    slug = new_slug
                    break
                counter += 1
        
        # Create blog post
        post_dict = post_data.dict()
        post_dict["slug"] = slug
        post_obj = BlogPost(**post_dict)
        
        # Insert into database
        result = await blog_collection.insert_one(post_obj.dict())
        
        if result.inserted_id:
            return APIResponse(
                success=True,
                message="Blog post created successfully",
                data={"slug": slug, "id": post_obj.id}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to create blog post")
    
    except Exception as e:
        logger.error(f"Error creating blog post: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/{post_id}")
async def update_blog_post(post_id: str, post_update: BlogPostUpdate):
    """Update blog post"""
    try:
        update_data = post_update.dict(exclude_unset=True)
        update_data["updatedAt"] = datetime.utcnow()
        
        # If title is being updated, update slug too
        if "title" in update_data:
            update_data["slug"] = create_slug(update_data["title"])
        
        result = await blog_collection.update_one(
            {"id": post_id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        return APIResponse(
            success=True,
            message="Blog post updated successfully"
        )
    
    except Exception as e:
        logger.error(f"Error updating blog post: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.delete("/{post_id}")
async def delete_blog_post(post_id: str):
    """Delete blog post"""
    try:
        result = await blog_collection.delete_one({"id": post_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        return APIResponse(
            success=True,
            message="Blog post deleted successfully"
        )
    
    except Exception as e:
        logger.error(f"Error deleting blog post: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")