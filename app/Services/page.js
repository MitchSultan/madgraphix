import React from 'react';
import Navigation from '../components/Navigation';
import ServiceSection from '../components/Services';
import HowWeWork from '../components/howWeWork';
import HeroBlog from '../components/heroBlog';
import Footer from '../components/Footer';

export default function page() {
  return (
    <>
    <Navigation />
    <ServiceSection />
    <HeroBlog/>
    <HowWeWork/>
    <Footer />
    </>
  )
}

