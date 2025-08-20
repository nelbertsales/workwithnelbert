# API Contracts & Integration Plan

## Overview
This document outlines the backend integration plan for Nelbert Tomicos' Virtual Assistant portfolio website. The backend will replace mock data with real database operations and provide content management functionality.

## Current Mock Data (to be replaced)
- Contact form submissions (currently just showing success toast)
- Blog posts (3 mock articles in mockData.js)
- Profile information (hardcoded in AdminPanel.js)
- Analytics data (static numbers in mockData.js)
- Testimonials (2 mock testimonials)

## Database Models

### 1. Profile Model
```json
{
  "_id": "ObjectId",
  "name": "string",
  "title": "string", 
  "email": "string",
  "phone": "string",
  "location": "string",
  "bio": "string",
  "profileImage": "string (URL)",
  "linkedin": "string",
  "updatedAt": "datetime",
  "createdAt": "datetime"
}
```

### 2. Contact Model
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string",
  "status": "string (new/read/replied)",
  "createdAt": "datetime",
  "repliedAt": "datetime (optional)"
}
```

### 3. BlogPost Model
```json
{
  "_id": "ObjectId",
  "title": "string",
  "slug": "string",
  "excerpt": "string",
  "content": "string",
  "author": "string",
  "category": "string",
  "tags": ["string"],
  "image": "string (URL)",
  "readTime": "string",
  "published": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### 4. Analytics Model
```json
{
  "_id": "ObjectId",
  "websiteViews": "number",
  "blogViews": "number", 
  "contactInquiries": "number",
  "socialMediaFollowers": "number",
  "date": "datetime"
}
```

## API Endpoints

### Profile Management
- `GET /api/profile` - Get profile information
- `PUT /api/profile` - Update profile information
- `POST /api/profile/photo` - Upload profile photo

### Contact Management  
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)
- `PUT /api/contact/:id` - Update contact status
- `DELETE /api/contact/:id` - Delete contact submission

### Blog Management
- `GET /api/blog` - Get all published blog posts
- `GET /api/blog/:slug` - Get specific blog post
- `POST /api/blog` - Create new blog post (admin)
- `PUT /api/blog/:id` - Update blog post (admin)
- `DELETE /api/blog/:id` - Delete blog post (admin)

### Analytics
- `GET /api/analytics` - Get analytics data
- `POST /api/analytics/view` - Track page view
- `PUT /api/analytics` - Update analytics manually (admin)

## Frontend Integration Changes

### Contact Form (Contact.js)
- Remove mock submission delay
- Replace with actual API call to `/api/contact`
- Add proper error handling for API failures

### Admin Panel (AdminPanel.js)
- Replace hardcoded form data with API call to `/api/profile`
- Implement real save functionality with PUT `/api/profile`
- Add photo upload functionality
- Connect blog management to real API endpoints
- Connect analytics to real data

### Blog Section (Blog.js)
- Replace mockData.blogPosts with API call to `/api/blog`
- Add loading states and error handling
- Implement real search and filtering

### Analytics Dashboard
- Replace static numbers with real data from `/api/analytics`
- Add real-time tracking capabilities

## Implementation Priority
1. Profile management (basic info editing)
2. Contact form functionality
3. Blog management (CRUD operations)
4. Analytics tracking
5. Photo upload functionality

## Security Considerations
- Input validation for all form submissions
- Rate limiting for contact form
- Admin authentication (basic implementation)
- File upload validation and size limits

## Error Handling
- Proper HTTP status codes
- User-friendly error messages
- Graceful fallbacks for API failures
- Toast notifications for success/error states