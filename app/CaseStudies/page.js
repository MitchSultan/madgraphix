import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function page() {
  return (
    <div>
    <Navigation />
    <div className="max-w-4xl mt-20 mx-auto px-4 glass ">
        <h1 className="text-4xl font-bold text-center mt-20">Case Studies</h1>
        <p className="text-center text-gray-600 mt-4">Explore our portfolio of successful projects and see how we've helped businesses achieve their goals.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-32">
        <div className="p-6 m-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4">The Other Guys Kenya</h2>
            <p className="text-gray-700">A comprehensive case study on how we transformed The Other Guys Kenya's digital presence, boosting their online engagement and sales through innovative design and development strategies.</p>
        <a href='/CaseStudies/theotherguyskenya'> View here</a>
        </div>
        <div className="p-6 m-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4">The Other Guys Kenya</h2>
            <p className="text-gray-700">A comprehensive case study on how we transformed The Other Guys Kenya's digital presence, boosting their online engagement and sales through innovative design and development strategies.</p>
        <a href='/CaseStudies/theotherguyskenya'> View here</a>
        </div>
        
        <div className="p-6 m-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4">Retail Tech Solution</h2>
            <p className="text-gray-700">An in-depth look at our collaboration with Retail Tech Solution, where we developed a cutting-edge e-commerce platform that streamlined their operations and enhanced customer experience.</p>
        </div>

    </div>
    <Footer />
    </div>
  )
}
