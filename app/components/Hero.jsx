import React from "react";

export default function Hero() {
  return (
    <>
      <section className="hero-section h-screen pt-32 md:pt-0  flex flex-col md:flex-row       items-center  text-white">
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
            <div className=" flex gap-2">
            <button className=" bg-blue-600 px-4 rounded-2xl">
            <a href="#get-started" className="hero-button">
              Our Work
            </a>
            </button>
            <button className=" blue-glass px-4 text-black rounded-2xl">
            <a href="https://wa.me/254708779284" className="hero-button">
              Let's Talk
            </a>
            </button>
            </div>
          </div>
        </div>
        <div className="glass">
          <img src="/images/herr.png" className="max-w-full h-auto"></img>
        </div>
      </section>
    </>
  );
}
