import Link from 'next/link';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';

import WorkShowcase from '../components/WorkShowcase';

import Partners from '../components/Partners';
import Numbers from '../components/Numbers';

import Print from '../components/Print';
import PartnershipTestimonials from '../components/PartnershipTestimonials';

import FAQs from '../components/FAQs';
import Footer from '../components/Footer';

import { createClient } from '../../lib/supabase/server';

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

export default async function Home() {
  const supabase = await createClient();
  const { data: caseStudies } = await supabase
    .from('case_studies')
    .select('title, slug, featured_image, tags')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(6);

  const works = (caseStudies || []).map(study => ({
    title: study.title,
    image: study.featured_image,
    link: `/CaseStudies/${study.slug}`,
    services: study.tags
  }));

  return (
    <>
      <main>
        <Navigation />
        <Hero />
        <Print />
        <About />
        <Services />
        
        
        <WorkShowcase works={works} />
        <Numbers/>

        <PartnershipTestimonials />
        
        <Partners />
        <FAQs />
          
        
        <Footer />
      </main>
    </>
  );
}
