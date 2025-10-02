import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
        url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
    <main>
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Partners />
      <Contact />
      <Footer />
    </main>
  );
}
