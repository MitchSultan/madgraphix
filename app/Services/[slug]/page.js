// app/case-studies/[slug]/page.js

import { notFound } from "next/navigation";
import React from "react";
import Navigation from "@/app/components/Navigation";

import Footer from "@/app/components/Footer";

export default function ServicesPage({ params }) {
  // The dynamic segment is available under params.slug
  const { slug } = params;

  // 1. Fetch data based on the slug
  const ServicesData = fetchCaseStudyBySlug(slug);

  if (!ServicesData) {
    // Next.js helper to show a 404 page
    notFound();
  }

  return (
    <>
      <Navigation />
      <div className=" mt-32">
        <div>
          <h1>Case Study: {ServicesData.title}</h1>
          <p>{ServicesData.content}</p>
        </div>

      

        {/* Dynamic UI goes here */}
      </div>
      <Footer />
    </>
  );
}

// Assume this function fetches data from your API or local source
function fetchCaseStudyBySlug(slug) {
  // Example: Replace with your actual API call
  const data = {
    "branding": {
      title: "Branding Excellence",
      content: "A charity organization making a difference...",
      background: "The Other Guys Kenya is a leading company in the automotive industry, known for its exceptional services and customer satisfaction. They approached us with the need to revamp their digital presence to better connect with their audience and showcase their offerings.",
      src: "/images/tshrts.jpg",
    },
    "design": {
      title: "Design Innovation",
      content: "Revolutionizing the retail experience...",      
  },
    "web-development": {
      title: "Web Development Mastery",
      content: "A deep dive into our first project...",      
    },
    "motion-graphics": {
      title: "Motion Graphics Mastery",
      content: "A deep dive into our first project...",      
    },
    "illustration": {
      title: "Illustration Mastery",
      content: "A deep dive into our first project...",      
    },
    
  } ;
  return data[slug];
}
