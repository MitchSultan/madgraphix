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
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (
        <>
            <div className=" overflow-hidden bg-white">
                <h2 className="pl-10">Art Straight </h2>
                <div className="slider-container">
                    <Slider {...settings}>
                        <div>
                            <img src="/posters/poster6.png" alt="" />
                        </div>
                        <div>
                            <img src="/posters/poster1.png" alt="" />
                        </div>
                        <div>
                            <img src="/posters/poster2.png" alt="" />
                        </div>
                        <div>
                            <img src="/posters/poster3.png" alt="" />
                        </div>
                        <div>
                            <img src="/posters/poster4.png" alt="" />
                        </div>
                        <div>
                            <img src="/posters/poster5.png" alt="" />
                        </div>
                    </Slider>
                </div>
                <h2 className="text-right pt-10">From the Heart</h2>
            </div>
        </>
    );
}

export default Print;
