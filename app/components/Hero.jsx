import React from "react";

export default function Hero() {
  return (
    <>
      <section className="hero-section h-screen pt-32 md:pt-0  flex flex-col md:flex-row       items-center bg-gradient-to-r from-purple-100 via-pink-200 to-red-200 text-white">
        <div className="container">
          <div className="hero-content p-4 md:p-20">
            <h1 className="hero-title text-2xl md:text-4xl lg:text-6xl font-extrabold">
              {/*Where Imagination Meets Design:*/} 
              Where Creativity Goes Mad
            </h1>
            <p className="hero-subtitle text-black">
              We are all about bringing your brand to life with creative and
              eye-catching designs. At Mirror Arts Designs Graphix, we mix a
              love for design with a knack for making your brand pop.
            </p>
            <button className=" bg-blue-600 px-4 rounded-2xl">
            <a href="#get-started" className="hero-button">
              Get Started
            </a>
            </button>
          </div>
        </div>
        <div>
          <img src="/images/herr.png" className="max-w-full h-auto"></img>
        </div>
      </section>
    </>
  );
}
