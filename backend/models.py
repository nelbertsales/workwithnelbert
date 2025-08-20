from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Profile Models
class Profile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    email: EmailStr
    phone: str
    location: str
    bio: str
    profileImage: str
    linkedin: str
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    profileImage: Optional[str] = None
    linkedin: Optional[str] = None

# Contact Models
class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    status: str = "new"
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    repliedAt: Optional[datetime] = None

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactUpdate(BaseModel):
    status: Optional[str] = None
    repliedAt: Optional[datetime] = None

# Blog Models
class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    author: str = "Nelbert Tomicos"
    category: str
    tags: List[str] = []
    image: str
    readTime: str
    published: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    category: str
    tags: List[str] = []
    image: str
    readTime: str
    published: bool = True

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    image: Optional[str] = None
    readTime: Optional[str] = None
    published: Optional[bool] = None

# Analytics Models
class Analytics(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    websiteViews: int = 0
    blogViews: int = 0
    contactInquiries: int = 0
    socialMediaFollowers: int = 0
    date: datetime = Field(default_factory=datetime.utcnow)

class AnalyticsUpdate(BaseModel):
    websiteViews: Optional[int] = None
    blogViews: Optional[int] = None
    contactInquiries: Optional[int] = None
    socialMediaFollowers: Optional[int] = None

# Response Models
class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None

class ContactResponse(BaseModel):
    success: bool
    message: str
    contact: Contact