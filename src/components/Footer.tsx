import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-[#1A1A1A] pt-20 pb-8 border-t border-[#51B8AB]/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1 */}
          <div className="flex flex-col">
            <div className="mb-6">
              <img src="/assets/logo/corelyn robotics.png" alt="Corelyn Robotics" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-[#4A4A4A] text-[16px] leading-[1.7] max-w-xs">
              Industrial-grade autonomous mobile robots for Indian industry — subscription-based,
              locally supported, built to last.
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-[18px] mb-6 text-[#51B8AB]">Platforms</h4>
            <ul className="space-y-3 text-[#4A4A4A]/80 text-[16px]">
              <li><a href="#platforms" className="hover:text-[#51B8AB] transition-colors">C100</a></li>
              <li><a href="#platforms" className="hover:text-[#51B8AB] transition-colors">C100 4WD</a></li>
              <li><a href="#platforms" className="hover:text-[#51B8AB] transition-colors">C500</a></li>
              <li><a href="#platforms" className="hover:text-[#51B8AB] transition-colors">C1000</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-[18px] mb-6 text-[#51B8AB]">Company</h4>
            <ul className="space-y-3 text-[#4A4A4A]/80 text-[16px]">
              <li><a href="#" className="hover:text-[#51B8AB] transition-colors">About</a></li>
              <li><a href="#how-it-works" className="hover:text-[#51B8AB] transition-colors">How It Works</a></li>
              <li><a href="#roi-calculator" className="hover:text-[#51B8AB] transition-colors">ROI Calculator</a></li>
              <li><a href="#industries" className="hover:text-[#51B8AB] transition-colors">Industries</a></li>
              <li><a href="#technology" className="hover:text-[#51B8AB] transition-colors">Technology</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-[18px] mb-6 text-[#51B8AB]">Contact</h4>
            <ul className="space-y-4 text-[#4A4A4A]/80 text-[16px]">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#51B8AB]/10 flex items-center justify-center text-[#51B8AB] shrink-0">
                  <Mail size={16} />
                </div>
                <a href="mailto:info@transista.in" className="hover:text-[#51B8AB] transition-colors">
                  info@transista.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#51B8AB]/10 flex items-center justify-center text-[#51B8AB] shrink-0">
                  <Phone size={16} />
                </div>
                <a href="tel:+919367952877" className="hover:text-[#51B8AB] transition-colors">
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

        {/* Bottom Bar */}
        <div className="border-t border-[#1A1A1A]/10 pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-[#4A4A4A]/60 text-[14px]">
          <p>© 2026 Corelyn Robotics. Made in India 🇮🇳</p>
          <p className="text-left lg:text-right max-w-xl leading-[1.6]">
            A Transista Technologies Company | Incubated at R Shivakumar Foundation – TBIF,
            SRM TRP Engineering College, Trichy
          </p>
        </div>
      </div>
    </footer>
  );
}




