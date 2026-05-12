import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white text-slate-900 pt-20 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mb-16">
          
          <div className="flex flex-col col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <img src="/assets/logo/corelyn robotics new.png" alt="Corelyn Robotics" className="h-28 w-auto object-contain" />
            </div>
            <p className="text-slate-600 text-[16px] leading-[1.7] max-w-xs mb-6">
              Industrial-grade autonomous mobile robots for Indian industry — subscription-based,
              locally supported, built to last.
            </p>
            <div className="flex items-center gap-3">
              <a href="mailto:info@transista.in" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#51B8AB] hover:text-white flex items-center justify-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#51B8AB] focus-visible:ring-offset-2" aria-label="Email us">
                <Mail size={18} />
              </a>
              <a href="tel:+919367952877" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#51B8AB] hover:text-white flex items-center justify-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#51B8AB] focus-visible:ring-offset-2" aria-label="Call us">
                <Phone size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-[18px] mb-6 text-[#2d9d8f]">Platforms</h4>
            <ul className="space-y-3 text-slate-600 text-[16px]">
              <li><a href="#platforms" className="hover:text-[#51B8AB] transition-colors inline-flex items-center gap-1 focus-visible:text-[#51B8AB]">C100 <ExternalLink size={12} className="opacity-0 group-hover:opacity-100" /></a></li>
              <li><a href="#platforms" className="hover:text-[#51B8AB] transition-colors focus-visible:text-[#51B8AB]">C100 4WD</a></li>
              <li><a href="#platforms" className="hover:text-[#51B8AB] transition-colors focus-visible:text-[#51B8AB]">C500</a></li>
              <li><a href="#platforms" className="hover:text-[#51B8AB] transition-colors focus-visible:text-[#51B8AB]">C1000</a></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-[18px] mb-6 text-[#2d9d8f]">Company</h4>
            <ul className="space-y-3 text-slate-600 text-[16px]">
              <li><a href="#" className="hover:text-[#51B8AB] transition-colors focus-visible:text-[#51B8AB]">About</a></li>
              <li><a href="#how-it-works" className="hover:text-[#51B8AB] transition-colors focus-visible:text-[#51B8AB]">How It Works</a></li>
              <li><a href="#roi-calculator" className="hover:text-[#51B8AB] transition-colors focus-visible:text-[#51B8AB]">ROI Calculator</a></li>
              <li><a href="#industries" className="hover:text-[#51B8AB] transition-colors focus-visible:text-[#51B8AB]">Industries</a></li>
              <li><a href="#technology" className="hover:text-[#51B8AB] transition-colors focus-visible:text-[#51B8AB]">Technology</a></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-[18px] mb-6 text-[#2d9d8f]">Contact</h4>
            <ul className="space-y-4 text-slate-600 text-[16px]">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#51B8AB]/10 flex items-center justify-center text-[#51B8AB] shrink-0">
                  <Mail size={16} />
                </div>
                <a href="mailto:info@transista.in" className="hover:text-[#51B8AB] transition-colors focus-visible:text-[#51B8AB]">
                  info@transista.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#51B8AB]/10 flex items-center justify-center text-[#51B8AB] shrink-0">
                  <Phone size={16} />
                </div>
                <a href="tel:+919367952877" className="hover:text-[#51B8AB] transition-colors focus-visible:text-[#51B8AB]">
                  +91 93679 52877
                </a>
              </li>
              <li className="flex items-start gap-3 pt-1">
                <div className="w-8 h-8 rounded-full bg-[#51B8AB]/10 flex items-center justify-center text-[#51B8AB] shrink-0 mt-1">
                  <MapPin size={16} />
                </div>
                <span className="leading-[1.6]">
                  SRM TRP Engineering College,<br />
                  Trichy, Tamil Nadu, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-slate-500 text-[14px]">
          <p>© {currentYear} Corelyn Robotics. Made in India.</p>
          <p className="text-left lg:text-right max-w-xl leading-[1.6]">
            A Transista Technologies Company | Incubated at R Shivakumar Foundation – TBIF,
            SRM TRP Engineering College, Trichy
          </p>
        </div>
      </div>
    </footer>
  );
}




