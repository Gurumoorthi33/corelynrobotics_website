"use client";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1 */}
          <div className="flex flex-col">
            <span className="font-heading font-bold text-3xl tracking-tight mb-4 leading-none">
              CORELYN
            </span>
            <p className="text-[#D0D0D0] text-[16px] leading-[1.7] max-w-xs">
              Robotics infrastructure for Indian industry — subscription-based,
              locally supported, built to last.
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-[18px] mb-6">Platforms</h4>
            <ul className="space-y-3 text-[#D0D0D0] text-[16px]">
              <li><a href="#platforms" className="hover:text-white transition-colors">C100</a></li>
              <li><a href="#platforms" className="hover:text-white transition-colors">C100 4WD</a></li>
              <li><a href="#platforms" className="hover:text-white transition-colors">C500</a></li>
              <li><a href="#platforms" className="hover:text-white transition-colors">C1000</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-[18px] mb-6">Company</h4>
            <ul className="space-y-3 text-[#D0D0D0] text-[16px]">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#roi-calculator" className="hover:text-white transition-colors">ROI Calculator</a></li>
              <li><a href="#industries" className="hover:text-white transition-colors">Industries</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Technology</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">Partners</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-[18px] mb-6">Contact</h4>
            <ul className="space-y-3 text-[#D0D0D0] text-[16px]">
              <li>
                <a href="mailto:info@transista.in" className="hover:text-white transition-colors">
                  info@transista.in
                </a>
              </li>
              <li>
                <a href="tel:+919367952877" className="hover:text-white transition-colors">
                  +91 93679 52877
                </a>
              </li>
              <li className="pt-2 max-w-[200px] leading-[1.6]">
                SRM TRP Engineering College, Trichy, Tamil Nadu, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2B2B2B] pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-[#D0D0D0] text-[14px]">
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
