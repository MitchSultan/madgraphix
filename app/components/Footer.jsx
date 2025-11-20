'use client';

import { Phone, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">M.A.D Graphix</h3>
            <p className="text-slate-400 italic mb-4">Art Straight from the Heart</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Creating memorable designs that elevate brands and inspire audiences worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-400">
                <Phone size={18} className="text-emerald-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Mail size={18} className="text-emerald-500" />
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
                  className="block text-slate-400 hover:text-emerald-500 transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 p-4 text-center">
          <p className="text-slate-400 flex items-center justify-center gap-2">
            <span>&copy; {currentYear} Mirror Arts Designs. Made with</span>
            <Heart size={16} className="text-blue-500 fill-emerald-500" />
            <span>by M.A.D Graphix</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
