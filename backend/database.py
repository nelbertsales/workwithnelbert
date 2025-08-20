from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio_db')]

# Collections
profile_collection = db.profile
contacts_collection = db.contacts
blog_collection = db.blog_posts
analytics_collection = db.analytics

async def init_database():
    """Initialize database with default data"""
    
    # Initialize default profile if it doesn't exist
    existing_profile = await profile_collection.find_one()
    if not existing_profile:
        default_profile = {
            "id": "default",
            "name": "Nelbert Tomicos",
            "title": "General Virtual Assistant",
            "email": "nelberttomicos@gmail.com",
            "phone": "+63 975-912-0840",
            "location": "Mandaue City, Cebu, Philippines",
            "bio": "I'm a resourceful and detail-oriented General Virtual Assistant with a passion for helping businesses run smoothly and smartly. I thrive in creating order out of chaos - whether it's managing schedules, handling customer interactions, or streamlining workflows.",
            "profileImage": "https://customer-assets.emergentagent.com/job_0514d4c0-8919-46e5-8284-36a12b4ff7cf/artifacts/aieijo2h_Profile%20Photo.jpeg",
            "linkedin": "https://www.linkedin.com/in/nelbertt",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        await profile_collection.insert_one(default_profile)
        print("✅ Default profile created")
    
    # Initialize default analytics if it doesn't exist
    existing_analytics = await analytics_collection.find_one()
    if not existing_analytics:
        default_analytics = {
            "id": "current",
            "websiteViews": 1250,
            "blogViews": 890,
            "contactInquiries": 23,
            "socialMediaFollowers": 456,
            "date": datetime.utcnow()
        }
        await analytics_collection.insert_one(default_analytics)
        print("✅ Default analytics created")
    
    # Initialize sample blog posts if collection is empty
    blog_count = await blog_collection.count_documents({})
    if blog_count == 0:
        sample_posts = [
            {
                "id": "post1",
                "title": "5 Essential Tools Every Virtual Assistant Should Master in 2025",
                "slug": "5-essential-tools-virtual-assistant-2025",
                "excerpt": "Discover the must-have tools that will elevate your VA game and help you deliver exceptional results to your clients.",
                "content": "As a Virtual Assistant, staying ahead of the curve with the right tools is crucial for success. Here are the top 5 tools that have transformed my workflow and helped me deliver outstanding results...",
                "author": "Nelbert Tomicos",
                "category": "Productivity",
                "tags": ["Tools", "Productivity", "Virtual Assistant", "Technology"],
                "image": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
                "readTime": "5 min read",
                "published": True,
                "createdAt": datetime(2025, 1, 15),
                "updatedAt": datetime(2025, 1, 15)
            },
            {
                "id": "post2",
                "title": "Building Strong Client Relationships: A VA's Guide to Success",
                "slug": "building-strong-client-relationships-va-guide",
                "excerpt": "Learn the key strategies I use to build trust, communicate effectively, and maintain long-term partnerships with clients.",
                "content": "Building strong client relationships is the foundation of a successful virtual assistant career. Throughout my experience working with various clients, I've learned that trust and communication are paramount...",
                "author": "Nelbert Tomicos",
                "category": "Business",
                "tags": ["Client Relations", "Communication", "Business Growth", "Tips"],
                "image": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
                "readTime": "7 min read",
                "published": True,
                "createdAt": datetime(2025, 1, 10),
                "updatedAt": datetime(2025, 1, 10)
            },
            {
                "id": "post3",
                "title": "Social Media Management for Small Businesses: Best Practices",
                "slug": "social-media-management-small-businesses",
                "excerpt": "Effective social media strategies that help small businesses grow their online presence and engage with their audience.",
                "content": "Social media management is more than just posting content. It's about creating meaningful connections with your audience and building a community around your brand...",
                "author": "Nelbert Tomicos",
                "category": "Social Media",
                "tags": ["Social Media", "Marketing", "Small Business", "Strategy"],
                "image": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
                "readTime": "6 min read",
                "published": True,
                "createdAt": datetime(2025, 1, 5),
                "updatedAt": datetime(2025, 1, 5)
            }
        ]
        
        await blog_collection.insert_many(sample_posts)
        print("✅ Sample blog posts created")

async def close_database():
    """Close database connection"""
    client.close()