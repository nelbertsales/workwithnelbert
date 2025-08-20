#!/usr/bin/env python3
"""
Comprehensive Backend API Test Suite for Nelbert Tomicos' Virtual Assistant Portfolio
Tests all core API endpoints with realistic data
"""

import requests
import json
import os
from datetime import datetime
import sys

# Get backend URL from environment
BACKEND_URL = "https://nelbert-resume.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}Testing: {test_name}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.ENDC}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.ENDC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.ENDC}")

class BackendTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.test_results = {
            "passed": 0,
            "failed": 0,
            "total": 0,
            "details": []
        }
        
    def log_result(self, test_name, passed, message, response_data=None):
        self.test_results["total"] += 1
        if passed:
            self.test_results["passed"] += 1
            print_success(f"{test_name}: {message}")
        else:
            self.test_results["failed"] += 1
            print_error(f"{test_name}: {message}")
        
        self.test_results["details"].append({
            "test": test_name,
            "passed": passed,
            "message": message,
            "response_data": response_data
        })

    def test_health_endpoints(self):
        """Test basic health and root endpoints"""
        print_test_header("Health & Base Endpoints")
        
        # Test root endpoint
        try:
            response = self.session.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                if "Nelbert Tomicos" in data.get("message", ""):
                    self.log_result("Root Endpoint", True, "API root accessible with correct message")
                else:
                    self.log_result("Root Endpoint", False, f"Unexpected message: {data}")
            else:
                self.log_result("Root Endpoint", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Root Endpoint", False, f"Connection error: {str(e)}")

        # Test health endpoint
        try:
            response = self.session.get(f"{self.base_url}/health")
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy":
                    self.log_result("Health Check", True, "Health endpoint working correctly")
                else:
                    self.log_result("Health Check", False, f"Unexpected health status: {data}")
            else:
                self.log_result("Health Check", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Health Check", False, f"Connection error: {str(e)}")

    def test_profile_endpoints(self):
        """Test profile management endpoints"""
        print_test_header("Profile Management")
        
        # Test GET profile
        try:
            response = self.session.get(f"{self.base_url}/profile/")
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "Nelbert Tomicos" in data.get("data", {}).get("name", ""):
                    self.log_result("Get Profile", True, "Profile retrieved successfully")
                    profile_data = data.get("data", {})
                    print_info(f"Profile Name: {profile_data.get('name')}")
                    print_info(f"Title: {profile_data.get('title')}")
                    print_info(f"Email: {profile_data.get('email')}")
                else:
                    self.log_result("Get Profile", False, f"Invalid profile data: {data}")
            else:
                self.log_result("Get Profile", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Get Profile", False, f"Connection error: {str(e)}")

        # Test PUT profile update
        try:
            update_data = {
                "bio": "I'm a resourceful and detail-oriented General Virtual Assistant with extensive experience in helping businesses streamline operations and achieve their goals efficiently."
            }
            response = self.session.put(f"{self.base_url}/profile/", json=update_data)
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_result("Update Profile", True, "Profile updated successfully")
                else:
                    self.log_result("Update Profile", False, f"Update failed: {data}")
            else:
                self.log_result("Update Profile", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Update Profile", False, f"Connection error: {str(e)}")

    def test_contact_endpoints(self):
        """Test contact form endpoints"""
        print_test_header("Contact Form Management")
        
        # Test POST contact submission with realistic VA inquiry
        contact_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@techstartup.com",
            "subject": "Virtual Assistant Services for Growing Tech Startup",
            "message": "Hi Nelbert, I'm the founder of a growing tech startup and we're looking for a reliable virtual assistant to help with administrative tasks, customer support, and social media management. I came across your portfolio and I'm impressed with your experience. Could we schedule a call to discuss our needs and your availability? We're particularly interested in someone who can help us streamline our operations as we scale. Looking forward to hearing from you!"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/contact/", json=contact_data)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "24 hours" in data.get("message", ""):
                    self.log_result("Submit Contact", True, "Contact form submitted successfully")
                    print_info(f"Contact ID: {data.get('contact', {}).get('id')}")
                else:
                    self.log_result("Submit Contact", False, f"Unexpected response: {data}")
            else:
                self.log_result("Submit Contact", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Submit Contact", False, f"Connection error: {str(e)}")

        # Test GET contacts (admin)
        try:
            response = self.session.get(f"{self.base_url}/contact/")
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "contacts" in data.get("data", {}):
                    contacts = data.get("data", {}).get("contacts", [])
                    self.log_result("Get Contacts", True, f"Retrieved {len(contacts)} contact submissions")
                    if contacts:
                        print_info(f"Latest contact from: {contacts[0].get('name')}")
                else:
                    self.log_result("Get Contacts", False, f"Invalid contacts data: {data}")
            else:
                self.log_result("Get Contacts", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Get Contacts", False, f"Connection error: {str(e)}")

    def test_blog_endpoints(self):
        """Test blog management endpoints"""
        print_test_header("Blog Management")
        
        # Test GET all blog posts
        try:
            response = self.session.get(f"{self.base_url}/blog/")
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "posts" in data.get("data", {}):
                    posts = data.get("data", {}).get("posts", [])
                    self.log_result("Get Blog Posts", True, f"Retrieved {len(posts)} blog posts")
                    if posts:
                        print_info(f"Latest post: {posts[0].get('title')}")
                else:
                    self.log_result("Get Blog Posts", False, f"Invalid blog data: {data}")
            else:
                self.log_result("Get Blog Posts", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Get Blog Posts", False, f"Connection error: {str(e)}")

        # Test GET blog posts with category filter
        try:
            response = self.session.get(f"{self.base_url}/blog/?category=Productivity")
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    posts = data.get("data", {}).get("posts", [])
                    self.log_result("Filter by Category", True, f"Retrieved {len(posts)} Productivity posts")
                else:
                    self.log_result("Filter by Category", False, f"Filter failed: {data}")
            else:
                self.log_result("Filter by Category", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Filter by Category", False, f"Connection error: {str(e)}")

        # Test GET blog posts with search
        try:
            response = self.session.get(f"{self.base_url}/blog/?search=virtual assistant")
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    posts = data.get("data", {}).get("posts", [])
                    self.log_result("Search Posts", True, f"Search returned {len(posts)} posts")
                else:
                    self.log_result("Search Posts", False, f"Search failed: {data}")
            else:
                self.log_result("Search Posts", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Search Posts", False, f"Connection error: {str(e)}")

        # Test GET specific blog post by slug
        try:
            response = self.session.get(f"{self.base_url}/blog/5-essential-tools-virtual-assistant-2025")
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "Essential Tools" in data.get("data", {}).get("title", ""):
                    self.log_result("Get Blog by Slug", True, "Retrieved specific blog post successfully")
                    print_info(f"Post title: {data.get('data', {}).get('title')}")
                else:
                    self.log_result("Get Blog by Slug", False, f"Invalid post data: {data}")
            else:
                self.log_result("Get Blog by Slug", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Get Blog by Slug", False, f"Connection error: {str(e)}")

        # Test POST create new blog post
        new_post = {
            "title": "Time Management Strategies for Virtual Assistants in 2025",
            "excerpt": "Discover proven time management techniques that help VAs maximize productivity and deliver exceptional results to clients.",
            "content": "As a virtual assistant, effective time management is crucial for success. Here are the top strategies I've learned through years of experience working with diverse clients across different industries...",
            "category": "Productivity",
            "tags": ["Time Management", "Productivity", "Virtual Assistant", "Efficiency"],
            "image": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "readTime": "8 min read",
            "published": True
        }
        
        try:
            response = self.session.post(f"{self.base_url}/blog/", json=new_post)
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "slug" in data.get("data", {}):
                    self.log_result("Create Blog Post", True, "New blog post created successfully")
                    print_info(f"New post slug: {data.get('data', {}).get('slug')}")
                else:
                    self.log_result("Create Blog Post", False, f"Creation failed: {data}")
            else:
                self.log_result("Create Blog Post", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Create Blog Post", False, f"Connection error: {str(e)}")

    def test_analytics_endpoints(self):
        """Test analytics endpoints"""
        print_test_header("Analytics Management")
        
        # Test GET analytics
        try:
            response = self.session.get(f"{self.base_url}/analytics/")
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "websiteViews" in data.get("data", {}):
                    analytics = data.get("data", {})
                    self.log_result("Get Analytics", True, "Analytics retrieved successfully")
                    print_info(f"Website Views: {analytics.get('websiteViews')}")
                    print_info(f"Blog Views: {analytics.get('blogViews')}")
                    print_info(f"Contact Inquiries: {analytics.get('contactInquiries')}")
                else:
                    self.log_result("Get Analytics", False, f"Invalid analytics data: {data}")
            else:
                self.log_result("Get Analytics", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Get Analytics", False, f"Connection error: {str(e)}")

        # Test POST track website view
        try:
            response = self.session.post(f"{self.base_url}/analytics/view?view_type=website")
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "tracked" in data.get("message", "").lower():
                    self.log_result("Track Website View", True, "Website view tracked successfully")
                else:
                    self.log_result("Track Website View", False, f"Tracking failed: {data}")
            else:
                self.log_result("Track Website View", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Track Website View", False, f"Connection error: {str(e)}")

        # Test POST track blog view
        try:
            response = self.session.post(f"{self.base_url}/analytics/view?view_type=blog")
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "tracked" in data.get("message", "").lower():
                    self.log_result("Track Blog View", True, "Blog view tracked successfully")
                else:
                    self.log_result("Track Blog View", False, f"Tracking failed: {data}")
            else:
                self.log_result("Track Blog View", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Track Blog View", False, f"Connection error: {str(e)}")

    def test_data_persistence(self):
        """Test data persistence by submitting and retrieving data"""
        print_test_header("Data Persistence Testing")
        
        # Submit a contact and verify it's stored
        test_contact = {
            "name": "Michael Chen",
            "email": "michael.chen@digitalagency.com",
            "subject": "Partnership Opportunity - Digital Marketing Support",
            "message": "Hello Nelbert, I run a digital marketing agency and we're looking for a skilled virtual assistant to help with client communication and project management. Your background looks perfect for what we need. Would you be interested in discussing a potential partnership?"
        }
        
        try:
            # Submit contact
            submit_response = self.session.post(f"{self.base_url}/contact/", json=test_contact)
            if submit_response.status_code == 200:
                submit_data = submit_response.json()
                contact_id = submit_data.get("contact", {}).get("id")
                
                if contact_id:
                    # Retrieve contacts to verify persistence
                    get_response = self.session.get(f"{self.base_url}/contact/")
                    if get_response.status_code == 200:
                        get_data = get_response.json()
                        contacts = get_data.get("data", {}).get("contacts", [])
                        
                        # Check if our contact exists
                        found_contact = None
                        for contact in contacts:
                            if contact.get("id") == contact_id:
                                found_contact = contact
                                break
                        
                        if found_contact and found_contact.get("name") == test_contact["name"]:
                            self.log_result("Data Persistence", True, "Contact data persisted correctly in database")
                        else:
                            self.log_result("Data Persistence", False, "Submitted contact not found in database")
                    else:
                        self.log_result("Data Persistence", False, "Failed to retrieve contacts for verification")
                else:
                    self.log_result("Data Persistence", False, "No contact ID returned from submission")
            else:
                self.log_result("Data Persistence", False, f"Contact submission failed: {submit_response.status_code}")
        except Exception as e:
            self.log_result("Data Persistence", False, f"Persistence test error: {str(e)}")

    def test_error_handling(self):
        """Test error handling for invalid requests"""
        print_test_header("Error Handling")
        
        # Test invalid blog post slug
        try:
            response = self.session.get(f"{self.base_url}/blog/non-existent-post")
            if response.status_code == 404:
                self.log_result("404 Error Handling", True, "Correctly returns 404 for non-existent blog post")
            else:
                self.log_result("404 Error Handling", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_result("404 Error Handling", False, f"Error handling test failed: {str(e)}")

        # Test invalid contact data
        try:
            invalid_contact = {
                "name": "Test User",
                "email": "invalid-email",  # Invalid email format
                "subject": "Test",
                "message": "Test message"
            }
            response = self.session.post(f"{self.base_url}/contact/", json=invalid_contact)
            if response.status_code == 422:  # Validation error
                self.log_result("Validation Error Handling", True, "Correctly validates email format")
            else:
                self.log_result("Validation Error Handling", False, f"Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_result("Validation Error Handling", False, f"Validation test failed: {str(e)}")

    def run_all_tests(self):
        """Run all test suites"""
        print(f"{Colors.BOLD}{Colors.BLUE}")
        print("🚀 Starting Comprehensive Backend API Testing")
        print("=" * 60)
        print(f"Backend URL: {self.base_url}")
        print("=" * 60)
        print(f"{Colors.ENDC}")
        
        # Run all test suites
        self.test_health_endpoints()
        self.test_profile_endpoints()
        self.test_contact_endpoints()
        self.test_blog_endpoints()
        self.test_analytics_endpoints()
        self.test_data_persistence()
        self.test_error_handling()
        
        # Print final results
        self.print_final_results()

    def print_final_results(self):
        """Print comprehensive test results"""
        print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.ENDC}")
        print(f"{Colors.BOLD}{Colors.BLUE}FINAL TEST RESULTS{Colors.ENDC}")
        print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.ENDC}")
        
        total = self.test_results["total"]
        passed = self.test_results["passed"]
        failed = self.test_results["failed"]
        success_rate = (passed / total * 100) if total > 0 else 0
        
        print(f"\n{Colors.BOLD}Total Tests: {total}{Colors.ENDC}")
        print(f"{Colors.GREEN}✅ Passed: {passed}{Colors.ENDC}")
        print(f"{Colors.RED}❌ Failed: {failed}{Colors.ENDC}")
        print(f"{Colors.BOLD}Success Rate: {success_rate:.1f}%{Colors.ENDC}")
        
        if failed > 0:
            print(f"\n{Colors.RED}{Colors.BOLD}FAILED TESTS:{Colors.ENDC}")
            for result in self.test_results["details"]:
                if not result["passed"]:
                    print(f"{Colors.RED}❌ {result['test']}: {result['message']}{Colors.ENDC}")
        
        print(f"\n{Colors.BOLD}{'='*60}{Colors.ENDC}")
        
        if success_rate >= 90:
            print(f"{Colors.GREEN}{Colors.BOLD}🎉 EXCELLENT! Backend API is working great!{Colors.ENDC}")
        elif success_rate >= 70:
            print(f"{Colors.YELLOW}{Colors.BOLD}⚠️  GOOD! Some issues need attention.{Colors.ENDC}")
        else:
            print(f"{Colors.RED}{Colors.BOLD}🚨 CRITICAL! Major issues found in backend API.{Colors.ENDC}")
        
        return success_rate >= 70

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)