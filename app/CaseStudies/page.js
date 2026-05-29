import Link from 'next/link';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';


async function getCaseStudies() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/case-studies`, {
    cache: 'no-store',
    next: { revalidate: 0 },
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
    <>
    <Navigation />
    <div className="min-h-screen ">
     

      <main className="pt-24">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm uppercase tracking-[2px] font-mono text-zinc-400">Featured Work</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            Case Studies
          </h1>
          
          <p className=" text-center mx-auto text-xl text-zinc-400 leading-relaxed">
            Real results. Real impact. Explore how we&apos;ve transformed brands through 
            strategic design and cutting-edge development.
          </p>
        </div>

        {/* Case Studies Section */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          {caseStudies && caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <CaseStudyCard key={study.id} study={study} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32">
              <div className="mx-auto w-20 h-20 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">📂</span>
              </div>
              <p className="text-2xl font-medium text-zinc-300 mb-3">No case studies yet</p>
              <p className="text-zinc-500 max-w-sm mx-auto">
                We&apos;re busy creating amazing work. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="border-t border-b border-zinc-800 bg-zinc-900 py-12">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold  mb-1">50+</div>
              <div className="text-zinc-400 text-sm tracking-widest">PROJECTS DELIVERED</div>
            </div>
            <div>
              <div className="text-5xl font-bold  mb-1">98%</div>
              <div className="text-zinc-400 text-sm tracking-widest">CLIENT RETENTION</div>
            </div>
            <div>
              <div className="text-5xl font-bold  mb-1">4.9x</div>
              <div className="text-zinc-400 text-sm tracking-widest">AVERAGE ROI</div>
            </div>
            <div>
              <div className="text-5xl font-bold  mb-1">25</div>
              <div className="text-zinc-400 text-sm tracking-widest">COUNTRIES REACHED</div>
            </div>
          </div>
        </div>

        {/* Work Showcase Teaser */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-5/12">
              <h2 className="text-5xl font-bold tracking-tighter mb-6">
                More <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">incredible work</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                From brand identities to complex web platforms, we craft digital experiences that stand out.
              </p>
              <Link 
                href="/work" 
                className="inline-flex items-center gap-3 group text-lg font-medium"
              >
                Browse all projects
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
            </div>
            
            <div className="md:w-7/12 grid grid-cols-2 gap-4">
              <div className="aspect-video bg-zinc-900 rounded-3xl overflow-hidden">
                <div className="h-full w-full bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px]"></div>
              </div>
              <div className="aspect-video bg-zinc-900 rounded-3xl overflow-hidden mt-12">
                <div className="h-full w-full bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px]"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
    <Footer />
      </>
  );
}

function CaseStudyCard({ study }) {
  return (
    <Link
      href={`/CaseStudies/${study.slug}`}
      className="group  rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        {study.featured_image ? (
          <img
            src={study.featured_image}
            alt={study.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
            <span className="text-6xl opacity-30">✦</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="bg-white/10 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-2xl border border-white/20">
            {study.category}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <div className="text-blue-400 text-sm font-medium tracking-widest mb-3">
          {study.client}
        </div>

        <h3 className="text-2xl font-semibold leading-tight mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
          {study.title}
        </h3>

        <p className="text-zinc-400 line-clamp-3 mb-8 flex-1">
          {study.description}
        </p>

        {/* Tags */}
        {study.tags && study.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {study.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto flex items-center justify-between text-sm">
          <span className="font-medium text-blue-400 group-hover:gap-2 inline-flex items-center gap-2 transition-all">
            View full case study
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
            </svg>
          </span>
          
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">READ →</div>
        </div>
      </div>
    </Link>
  );
}