import React from 'react';


export default function AboutPage() {
  return (
    <>
    <div className='mt-20 p-12'>
        <h2>About Us </h2>
        <p> At mad, we are passionate about helping businesses and organizations achieve their digital goals. </p>
    </div>

    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
          <p className="text-gray-700 mb-4">
          Our mission is to deliver innovative and effective digital solutions that drive growth and success for our clients. We strive to create user-centric designs and seamless experiences that resonate with audiences and elevate brands.
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
          <p className="text-gray-700 mb-4">
          Our vision is to be a leading digital agency known for creativity, excellence, and impact. We aim to empower businesses through cutting-edge technology and design, fostering long-term partnerships that fuel innovation and transformation in the digital landscape.
          </p>
        </div>
      </div>
    </section>



    < section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h3 className="text-3xl font-bold mb-6 text-center">Our Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-4">Innovation</h4>
            <p className="text-gray-700">We believe in embracing innovation and constantly pushing the boundaries of what's possible.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-4">Quality</h4>
            <p className="text-gray-700">We prioritize quality in everything we do, ensuring that our work meets the highest standards.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-4">Collaboration</h4>
            <p className="text-gray-700">We value collaboration and teamwork, working closely with clients and partners to achieve common goals.</p>
          </div>
        </div>
      </div>
    </section>


    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h3 className="text-3xl font-bold mb-6">Meet the Team</h3>
        <p className="text-gray-700 mb-8">
          Our team is made up of talented and dedicated professionals who are passionate about what they do. From designers and developers to strategists and marketers, we work together to deliver exceptional results for our clients.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-2">Joshua</h4>
            <p className="text-gray-700">Founder</p>
          </div>
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-2">Nancy </h4>
            <p className="text-gray-700">Designer</p>
          </div>
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-2">Mitch </h4>
            <p className="text-gray-700">Digital Strategist</p>
          </div>
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h4 className="text-xl font-semibold mb-2">Felix</h4>
            <p className="text-gray-700">Marketer</p>
          </div>
        </div>
      </div>
    </section>


    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
        <p className="text-gray-700 mb-8">
          Have a question or want to work with us? Reach out to us through our contact form or email us directly.
        </p>
      </div>
    </section>
    </>
  )
}
