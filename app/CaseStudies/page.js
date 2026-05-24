import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import MultiItemCarousel from '@/app/components/card';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Case Studies - MAD Graphix | Our Success Stories',
  description: 'Explore our portfolio of successful projects and see how we\'ve helped businesses achieve their goals through exceptional design and development.',
};

async function getCaseStudies() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/case-studies`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    return [];
  }
  
  const data = await res.json();
  return data.caseStudies || [];
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className='bg-gray-100'>
      <Navigation />
      
      {/* Hero Section */}
      <div className="max-w-7xl bg-gray-100 mx-auto px-4 sm:px-6 mt-32 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Case Studies</h1>
        <p className="text-center text-gray-600 text-lg ">
          Explore our portfolio of successful projects and see how we've helped businesses achieve their goals through exceptional design and development.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {caseStudies && caseStudies.length > 0 ? (
          <MultiItemCarousel itemsPerView={3}>
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </MultiItemCarousel>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No case studies available yet.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function CaseStudyCard({ study }) {
  return (
    <Link
      href={`/CaseStudies/${study.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
    >
      {/* Featured Image */}
      {study.featured_image && (
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          <img
            src={study.featured_image}
            alt={study.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {study.category}
            </span>
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col flex-grow">
        {/* Client */}
        <p className="text-sm font-medium text-emerald-600 mb-2">{study.client}</p>

        {/* Title */}
        <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
          {study.title}
        </h4>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {study.description}
        </p>

        {/* Tags */}
        {study.tags && study.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {study.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View Link */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-emerald-600 font-medium text-sm group-hover:gap-2 inline-flex items-center gap-1 transition-all">
            View Case Study
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
