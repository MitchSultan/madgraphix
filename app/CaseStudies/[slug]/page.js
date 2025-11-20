// app/case-studies/[slug]/page.js

import { notFound } from "next/navigation";
import React from "react";
import Navigation from "@/app/components/Navigation";

import Footer from "@/app/components/Footer";

export default function CaseStudyPage({ params }) {
  // The dynamic segment is available under params.slug
  const { slug } = params;

  // 1. Fetch data based on the slug
  const caseStudyData = fetchCaseStudyBySlug(slug);

  if (!caseStudyData) {
    // Next.js helper to show a 404 page
    notFound();
  }

  return (
    <>
      <Navigation />
      <div className="case-study-container mt-32">
        <div>
          <h1>Case Study: {caseStudyData.title}</h1>
          <p>{caseStudyData.content}</p>
        </div>

        <div className=" w-full bg-black text-blue-50">
            <h2>Background</h2>
            <p>{caseStudyData.background}  </p>
            <img src={caseStudyData.src}></img>
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
    theotherguyskenya: {
      title: "The Other Guys Kenya",
      content: "A charity organization making a difference...",
      background: "The Other Guys Kenya is a leading company in the automotive industry, known for its exceptional services and customer satisfaction. They approached us with the need to revamp their digital presence to better connect with their audience and showcase their offerings.",
      src: "/images/tshrts.jpg",
    },
    "retail-tech": {
      title: "Retail Tech Solution",
      content: "Revolutionizing the retail experience...",
        background: "Retail Tech Solution is an innovative e-commerce platform that aims to streamline retail operations and enhance customer experiences. They sought our expertise to develop a cutting-edge solution that would set them apart in the competitive retail market.",
        src: "/images/5.png",
    },
  };
  return data[slug];
}
