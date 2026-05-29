"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Print() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    return (
        <section className="md:py-24 overflow-hidden  relative">
            {/* Decorative backgrounds */}
            <div className="absolute top-0 left-0 w-full h-full  z-0"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-left justify-between mb-12">
                    <h2 className="text-4xl text-left md:text-5xl font-extrabold text-primary mb-4 md:mb-0">
                        Art Straight </h2>
                    <div className="hidden md:block">
                        <span className="bg-white text-primary px-6 py-2 rounded-full font-bold shadow-sm border border-purple-100">
                            Print & Design
                        </span>
                    </div>
                </div>

                <div className="slider-container -mx-4">
                    <Slider {...settings}>
                        <div className="px-4 outline-none">
                            <div className="rounded-3xl overflow-hidden shadow-lg border border-white hover:shadow-xl transition-shadow duration-300">
                                <img src="/posters/stan.webp" alt="Print Poster" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="px-4 outline-none">
                            <div className="rounded-3xl overflow-hidden shadow-lg border border-white hover:shadow-xl transition-shadow duration-300">
                                <img src="/posters/phon.webp" alt="Print Poster" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="px-4 outline-none">
                            <div className="rounded-3xl overflow-hidden shadow-lg border border-white hover:shadow-xl transition-shadow duration-300">
                                <img src="/posters/wall.webp" alt="Print Poster" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="px-4 outline-none">
                            <div className="rounded-3xl overflow-hidden shadow-lg border border-white hover:shadow-xl transition-shadow duration-300">
                                <img src="/posters/spost.webp" alt="Print Poster" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="px-4 outline-none">
                            <div className="rounded-3xl overflow-hidden shadow-lg border border-white hover:shadow-xl transition-shadow duration-300">
                                <img src="/posters/billb.webp" alt="Print Poster" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="px-4 outline-none">
                            <div className="rounded-3xl overflow-hidden shadow-lg border border-white hover:shadow-xl transition-shadow duration-300">
                                <img src="/posters/Billboards.webp" alt="Print Poster" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                    </Slider>
                </div>
                <div className="mt-12 text-right">
                 <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 md:mb-0">
                        From the Heart 
                    </h2>
                </div>
            </div>
        </section>
    );
}

export default Print;
