import Link from 'next/link';
import { ArrowLeft, CheckCircle, Target, TrendingUp } from 'lucide-react';
import { notFound } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/case-studies/${slug}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return { title: 'Case Study Not Found' };
    
    const caseStudy = await res.json();
    
    return {
      title: `${caseStudy.title} - MAD Graphix Case Study`,
      description: caseStudy.description,
      openGraph: {
        title: caseStudy.title,
        description: caseStudy.description,
        images: caseStudy.featured_image ? [caseStudy.featured_image] : [],
      },
    };
  } catch (error) {
    return { title: 'Case Study Not Found' };
  }
}

async function getCaseStudy(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/case-studies/${slug}`, {
    cache: 'no-store',
  });
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

export default async function CaseStudyPage(props) {
  const params = await props.params;
  const { slug } = params;
  const caseStudy = await getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div>
      <Navigation />

      <main className="min-h-screen bg-gray-50 pt-24">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <Link
              href="/CaseStudies"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Case Studies</span>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-blue-800 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-4">
              <span className="bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full">
                {caseStudy.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-emerald-50 max-w-3xl">
              {caseStudy.description}
            </p>
            <div className="mt-6">
              <p className="text-emerald-100">
                <span className="font-semibold">Client:</span> {caseStudy.client}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {caseStudy.featured_image && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src={caseStudy.featured_image}
                alt={caseStudy.title}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          {/* Challenge */}
          <Section
            icon={Target}
            title="The Challenge"
            content={caseStudy.challenge}
            bgColor="bg-red-50"
            iconColor="text-red-600"
          />

          {/* Solution */}
          <Section
            icon={CheckCircle}
            title="Our Solution"
            content={caseStudy.solution}
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />

          {/* Results */}
          <Section
            icon={TrendingUp}
            title="The Results"
            content={caseStudy.results}
            bgColor="bg-green-50"
            iconColor="text-green-600"
          />

          {/* Gallery Images */}
          {caseStudy.gallery_images && caseStudy.gallery_images.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.gallery_images.map((image, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden shadow-md">
                    <img
                      src={image}
                      alt={`${caseStudy.title} - Gallery ${idx + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {caseStudy.tags && caseStudy.tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {caseStudy.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Ready for Similar Results?</h3>
            <p className="text-emerald-50 mb-6 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with our proven strategies and creative solutions.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-emerald-600 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ icon: Icon, title, content, bgColor, iconColor }) {
  // Format content: convert newlines to paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim());

  return (
    <div className={`${bgColor} rounded-xl p-8`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`${iconColor} bg-white p-3 rounded-lg shadow-sm`}>
          <Icon size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="prose prose-lg max-w-none">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx} className="text-gray-700 mb-4 whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
