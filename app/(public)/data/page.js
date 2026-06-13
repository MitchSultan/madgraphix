
'use client';
import React, { useState, useEffect } from 'react';

const STEPS = [
  {
    id: 'browser',
    title: '1. User Action (Browser)',
    description: 'User clicks a link or requests a protected route (e.g., `/dashboard`). The browser fires an HTTP Request.',
    color: 'bg-blue-500'
  },
  {
    id: 'middleware',
    title: '2. Middleware (Edge/Server)',
    description: 'Next.js Middleware intercepts the request. It checks for an auth token/cookie (e.g., Supabase session). If unauthenticated, it redirects to `/login`.',
    color: 'bg-purple-600'
  },
  {
    id: 'routing',
    title: '3. App Router Match',
    description: 'The server matches the URL path to your file system (`app/dashboard/page.js`). It triggers layout and page rendering.',
    color: 'bg-pink-500'
  },
  {
    id: 'rsc',
    title: '4. React Server Components (RSC)',
    description: 'Server Components fetch data directly from the database securely. They render to HTML/RSC payload without exposing sensitive API keys to the client.',
    color: 'bg-green-600'
  },
  {
    id: 'hydration',
    title: '5. Hydration & Interactivity',
    description: 'The browser receives HTML for an instant preview, then loads Client Component JS to make elements (like buttons or animations) fully interactive.',
    color: 'bg-amber-500'
  }
];

export default function NextjsSimulator() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [authStatus, setAuthStatus] = useState('authenticated'); // 'authenticated' or 'unauthenticated'

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          if (authStatus === 'unauthenticated' && prev === 1) {
            // Simulate Auth redirect back to browser/login
            setIsPlaying(false);
            alert("🔒 Access Denied by Middleware! Redirecting to /login...");
            return 0; 
          }
          if (prev === STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000); // Change step every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, authStatus]);

  const handleStart = () => {
    setActiveStep(0);
    setIsPlaying(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-slate-800 font-sans">
      
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Next.js Lifecycle & Web Flow Simulator</h2>
          <p className="text-slate-400 text-sm mt-1">Visualize how Routing, Middleware, Auth, and Rendering connect under the hood.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-800 p-2 rounded-lg border border-slate-700">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Simulate Auth:</label>
          <select 
            value={authStatus} 
            onChange={(e) => setAuthStatus(e.target.value)}
            disabled={isPlaying}
            className="bg-slate-900 border border-slate-600 text-sm rounded px-2 py-1 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
          >
            <option value="authenticated">Valid Token (Passes Middleware)</option>
            <option value="unauthenticated">No Token (Redirect to /login)</option>
          </select>

          <button
            onClick={handleStart}
            disabled={isPlaying}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm px-4 py-2 rounded transition-colors disabled:bg-slate-700 disabled:text-slate-500"
          >
            {isPlaying ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Middle Column: Visual Flow Diagram */}
        <div className="lg:col-span-2 space-y-4 relative">
          {STEPS.map((step, index) => {
            const isActive = index === activeStep;
            const isPast = index < activeStep;

            return (
              <div 
                key={step.id}
                className={`relative p-5 rounded-lg border transition-all duration-500 ${
                  isActive 
                    ? `border-slate-400 ring-2 ring-offset-2 ring-offset-slate-900 ${step.color} bg-opacity-10 translate-x-2` 
                    : isPast 
                    ? 'border-emerald-800 bg-emerald-950/10 opacity-70' 
                    : 'border-slate-800 bg-slate-950/40 opacity-40'
                }`}
              >
                {/* Connecting Line Indicator */}
                {index < STEPS.length - 1 && (
                  <div className={`absolute left-8 bottom-[-20px] w-0.5 h-5 z-0 ${isPast ? 'bg-emerald-600' : 'bg-slate-800'}`} />
                )}

                <div className="flex items-start gap-4">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
                    isActive ? step.color : isPast ? 'bg-emerald-600' : 'bg-slate-800'
                  }`}>
                    {isPast ? '✓' : index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base flex items-center gap-2">
                      {step.title}
                      {isActive && <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-sky-400"></span>}
                    </h3>
                    <p className="text-slate-300 text-sm mt-1 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Code/Terminal Sandbox Inspector */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between h-[500px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">File System & Engine Context</span>
              <span className="w-3 h-3 rounded-full bg-red-500 block shadow"></span>
            </div>
            
            <div className="font-mono text-xs space-y-4 overflow-y-auto max-h-[420px] text-slate-400">
              {activeStep === 0 && (
                <div>
                  <p className="text-blue-400">// Client-Side Action</p>
                  <p className="text-slate-200">fetch('/api/dashboard', &#123;</p>
                  <p className="pl-4">headers: &#123; Authorization: 'Bearer xyz' &#125;</p>
                  <p className="text-slate-200">&#125;);</p>
                  <p className="mt-4 text-slate-500 text-[11px] font-sans">The browser uses TCP/IP and DNS to locate the server, sending along cookies, headers, and payload parameters.</p>
                </div>
              )}

              {activeStep === 1 && (
                <div>
                  <p className="text-purple-400">// middleware.ts</p>
                  <p className="text-slate-300">export function middleware(req) &#123;</p>
                  <p className="pl-4 text-slate-300">const token = req.cookies.get('sb-access-token');</p>
                  {authStatus === 'unauthenticated' ? (
                    <p className="pl-4 text-red-400 font-bold">return NextResponse.redirect('/login');</p>
                  ) : (
                    <p className="pl-4 text-emerald-400">return NextResponse.next(); // Auth cleared</p>
                  )}
                  <p className="text-slate-300">&#125;</p>
                </div>
              )}

              {activeStep === 2 && (
                <div>
                  <p className="text-pink-400">// Next.js App Router Resolver</p>
                  <p className="text-slate-300">↳ app/</p>
                  <p className="pl-4 text-slate-300">↳ layout.tsx <span className="text-slate-600">(Global Wrappers)</span></p>
                  <p className="pl-4 text-emerald-400 font-bold">↳ dashboard/</p>
                  <p className="pl-8 text-emerald-400">↳ page.tsx <span className="text-slate-500">✔ Matched Route</span></p>
                </div>
              )}

              {activeStep === 3 && (
                <div>
                  <p className="text-green-400">// app/dashboard/page.tsx (Server Component)</p>
                  <p className="text-slate-300">async function DashboardPage() Oh dynamic data! &#123;</p>
                  <p className="pl-4 text-emerald-400">const data = await supabase.from('metrics').select('*');</p>
                  <p className="pl-4 text-slate-300">return &lt;div&gt;Rendered on Server safely&lt;/div&gt;;</p>
                  <p className="text-slate-300">&#125;</p>
                  <p className="mt-4 text-slate-500 text-[11px] font-sans">No client-side Javascript bundle size penalty incurred for fetching node modules or heavy database packages!</p>
                </div>
              )}

              {activeStep === 4 && (
                <div>
                  <p className="text-amber-400">// Client-Side Hydration Engine</p>
                  <p className="text-slate-300">"use client";</p>
                  <p className="text-slate-400">// HTML binds events listeners onto pre-rendered UI structure.</p>
                  <p className="text-slate-200">useEffect(() =&gt; &#123;</p>
                  <p className="pl-4 text-slate-200">console.log("Interactive & Animated components alive!");</p>
                  <p className="text-slate-200">&#125;, []);</p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-2 mt-2">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-700"></span>
              <span className="w-2 h-2 rounded-full bg-slate-700"></span>
              <span className="w-2 h-2 rounded-full bg-slate-700"></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}