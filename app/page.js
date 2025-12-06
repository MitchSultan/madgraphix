import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WorkShowcase from './components/WorkShowcase';
import CaseStudies from './components/CaseStudies';
import Partners from './components/Partners';
import LogoTicker from './components/LogoTicker';
import Testimonials from './components/Testimonials';
import PartnershipTestimonials from './components/PartnershipTestimonials';
import Contact from './components/Contact';
import FAQs from './components/FAQs';
import Footer from './components/Footer';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'Mirror Arts Designs - M.A.D Graphix | Creative Graphic Design Studio',
  description: 'Professional graphic design services including logo design, brand identity, web design, packaging, print, motion graphics, and illustrations. Art straight from the heart.',
  keywords: 'graphic design, logo design, brand identity, web design, packaging design, print design, motion graphics, illustrations, creative agency',
  openGraph: {
    title: 'Mirror Arts Designs - M.A.D Graphix',
    description: 'Art Straight from the Heart - Professional creative design solutions for your brand',
    type: 'website',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'Mirror Arts Designs - Creative Graphic Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mirror Arts Designs - M.A.D Graphix',
    description: 'Art Straight from the Heart - Professional creative design solutions',
  },
};

export default function Home() {
  return (
    <ClientLayout>
      <main>
        <Navigation />
        <Hero />
        <About />
        <Services />
        
        <WorkShowcase />

        <PartnershipTestimonials />
        <CaseStudies />
        <Partners />
        <FAQs />
          
        
        <Footer />
      </main>
    </ClientLayout>
  );
}
