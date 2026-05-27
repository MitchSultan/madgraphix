'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" rounded-t-[3rem] mt-12 overflow-hidden shadow-2xl relative">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-12 sm:px-8 relative z-10">
        <div className="mx-auto max-w-md flex flex-col justify-space-between text-center">
          <strong className="block text-2xl font-bold  sm:text-3xl mb-2">
            Get Quality Newsletters to your inbox?
          </strong>
          <p className=" mb-6">Stay updated with our latest creative insights.</p>

          <form className="mt-2 w-full">
            <div className="relative max-w-lg mx-auto">
              <label className="sr-only" htmlFor="email"> Email </label>

              <input 
                className="w-full rounded-pill border-2 border-white/20 bg-white/10 p-4 pr-36 text-sm font-medium  focus:outline-none focus:border-white/50 backdrop-blur-sm transition-colors" 
                id="email" 
                type="email" 
                placeholder="john@doe.com" 
              />

              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-pill bg-accent px-6 py-2.5 text-sm font-bold  transition hover:bg-[#e67e00] shadow-lg">
                Subscribe
              </button>
            </div>
          </form>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-32">
          <div className="mx-auto max-w-sm lg:max-w-none lg:text-left text-center">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <img src="/logos/mad.png" alt="MAD Graphix" className="h-10 w-auto " />
              <span className="font-bold text-xl  tracking-tight">M.A.D Graphix</span>
            </div>
            
            <p className="mt-4  lg:text-lg leading-relaxed max-w-md">
              We are all about bringing your brand to life with creative
              and eye-catching designs. Art straight from the heart.
            </p>

            <div className="mt-8 flex justify-center gap-5 lg:justify-start">
              {/* Social Icons mapping omitted for brevity, keeping existing SVG paths */}
              {[
                { name: 'Facebook', d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
                { name: 'Instagram', d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" },
                { name: 'Twitter', d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 016.29 1.84" }
              ].map(social => (
                <a key={social.name} className="text-white/80 hover:text-accent transition-colors bg-white/10 p-2 rounded-full" href="#" target="_blank" rel="noreferrer">
                  <span className="sr-only"> {social.name} </span>
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d={social.d} clipRule="evenodd"></path>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-left lg:grid-cols-3">
            <div>
              <strong className="font-bold text-white uppercase tracking-wider text-sm"> Services </strong>
              <ul className="mt-6 space-y-3">
                {['Brand Identity', 'Graphic Design', 'Web Design', 'Marketing'].map(item => (
                  <li key={item}>
                    <a className="text-purple-100 hover:text-white hover:translate-x-1 inline-block transition-all" href="#">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <strong className="font-bold  uppercase tracking-wider text-sm"> About </strong>
              <ul className="mt-6 space-y-3">
                {['About Us', 'Case Studies', 'Blog', 'Our Team'].map(item => (
                  <li key={item}>
                    <a className="text-purple-100 hover:text-white hover:translate-x-1  transition-all" href="#">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <strong className="font-bold text-white uppercase tracking-wider text-sm"> Support </strong>
              <ul className="mt-6 space-y-3">
                {['FAQs', 'Contact', 'Live Chat'].map(item => (
                  <li key={item}>
                    <a className="text-purple-100 hover:text-white hover:translate-x-1 inline-block transition-all" href="#">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm ">
            © {currentYear} M.A.D Graphix. All rights reserved.
          </p>
          <p className="text-sm ">
            <a href="https://www.madebymitch.com" target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors">Made By Mitch</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
