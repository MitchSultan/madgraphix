import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Services from '@/app/components/Services';
import ServiceTicker from '@/app/components/ServiceTicker';
import Portfolio from '@/app/components/Portfolio';
import WorkShowcase from '@/app/components/WorkShowcase';
import CaseStudies from '@/app/components/CaseStudies';
import Partners from '@/app/components/Partners';
import LogoTicker from '@/app/components/LogoTicker';
import Testimonials from '@/app/components/Testimonials';
import PartnershipTestimonials from '@/app/components/PartnershipTestimonials';
import Contact from '@/app/components/Contact';
import FAQs from '@/app/components/FAQs';
import Footer from '@/app/components/Footer';
import ClientLayout from '@/app/ClientLayout';
import { createClient } from '@/lib/supabase/server';

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
    <ClientLayout>
      <main>
        <Navigation />
        <Hero />
        <About />
        <Services />
        <ServiceTicker />
        
        <WorkShowcase works={works} />

        <PartnershipTestimonials />
        <CaseStudies />
        <Partners />
        <FAQs />
          
        
        <Footer />
      </main>
    </ClientLayout>
  );
}
