import React from 'react';
import Navigation from '../components/Navigation';
import Carousel from '../components/car';
import SectionCarousel from '../components/cardiv';
import MultiItemCarousel from '../components/card';
import Footer from '../components/Footer';

export default function page() {
  return (
    <div>
      <Navigation />
        <Carousel />
        <SectionCarousel />
        <MultiItemCarousel />
      <Footer />

        
    </div>
  )
}
