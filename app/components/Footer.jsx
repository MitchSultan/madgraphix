'use client';

import { Phone, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-purple-600 text-black py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">M.A.D Graphix</h3>
            <p className="t italic mb-4">Art Straight from the Heart</p>
            <p className=" text-sm leading-relaxed">
              Creating memorable designs that elevate brands and inspire audiences worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 ">
                <Phone size={18} className="" />
                <span>+254 708 779284</span>
              </div>
              <div className="flex items-center gap-3 ">
                <Mail size={18} className="" />
                <span>hello@madgraphix.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Services', 'Portfolio', 'Partners', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const element = document.getElementById(link.toLowerCase());
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block  hover:text-emerald-500 transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 p-4 text-center">
          <p className=" flex items-center justify-center gap-2">
            <span>&copy; {currentYear} Mirror Arts Designs. Made with</span>
            <Heart size={16} className="text-blue-500 fill-emerald-500" />
            <span>by M.A.D Graphix</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
