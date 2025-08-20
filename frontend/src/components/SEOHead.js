import { useEffect } from 'react';

const SEOHead = () => {
  useEffect(() => {
    // Update document title and meta tags
    document.title = "Nelbert Tomicos - Professional Virtual Assistant | Administrative Support & Social Media Management";
    
    // Update existing meta tags or create new ones
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.getElementsByTagName('head')[0].appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updateMetaProperty = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.getElementsByTagName('head')[0].appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', 'Professional Virtual Assistant Nelbert Tomicos offers comprehensive administrative support, social media management, and business operations assistance. Based in Cebu, Philippines, available for remote work globally.');
    updateMetaTag('keywords', 'virtual assistant, administrative support, social media management, customer service, Cebu Philippines, remote work, business assistance, data entry, calendar management');
    updateMetaTag('author', 'Nelbert Tomicos');
    updateMetaTag('robots', 'index, follow');

    // Open Graph tags
    updateMetaProperty('og:title', 'Nelbert Tomicos - Professional Virtual Assistant');
    updateMetaProperty('og:description', 'Professional Virtual Assistant offering administrative support, social media management, and business operations assistance. Available for remote work globally.');
    updateMetaProperty('og:type', 'website');
    updateMetaProperty('og:url', window.location.href);
    updateMetaProperty('og:image', 'https://customer-assets.emergentagent.com/job_0514d4c0-8919-46e5-8284-36a12b4ff7cf/artifacts/aieijo2h_Profile%20Photo.jpeg');
    updateMetaProperty('og:locale', 'en_US');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', 'Nelbert Tomicos - Professional Virtual Assistant');
    updateMetaTag('twitter:description', 'Professional Virtual Assistant offering comprehensive business support services. Available for remote work globally.');
    updateMetaTag('twitter:image', 'https://customer-assets.emergentagent.com/job_0514d4c0-8919-46e5-8284-36a12b4ff7cf/artifacts/aieijo2h_Profile%20Photo.jpeg');

    // Additional SEO tags
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#8b5cf6');
    
    // Structured data for local business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Nelbert Tomicos",
      "jobTitle": "Virtual Assistant",
      "description": "Professional Virtual Assistant specializing in administrative support, social media management, and business operations assistance.",
      "url": window.location.href,
      "image": "https://customer-assets.emergentagent.com/job_0514d4c0-8919-46e5-8284-36a12b4ff7cf/artifacts/aieijo2h_Profile%20Photo.jpeg",
      "email": "nelberttomicos@gmail.com",
      "telephone": "+63-975-912-0840",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mandaue City",
        "addressRegion": "Cebu",
        "addressCountry": "Philippines"
      },
      "sameAs": [
        "https://www.linkedin.com/in/nelbertt"
      ],
      "knowsAbout": [
        "Administrative Support",
        "Social Media Management",
        "Customer Service",
        "Data Entry",
        "Calendar Management",
        "Inbox Management"
      ]
    };

    // Add or update structured data script
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      document.getElementsByTagName('head')[0].appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, []);

  return null; // This component doesn't render anything
};

export default SEOHead;