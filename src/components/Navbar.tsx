"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    name: "Platform",
    items: [
      { name: "Platforms", href: "/platforms", description: "Our robotic fleet and software stack." },
      { name: "Technology", href: "#technology", description: "The core innovation behind Corelyn." },
      { name: "How It Works", href: "#how-it-works", description: "Step-by-step process of our RaaS model." },
    ],
  },
  {
    name: "Impact",
    items: [
      { name: "Industries", href: "#industries", description: "Sectors we currently serve." },
      { name: "ROI Calculator", href: "#roi-calculator", description: "Calculate your savings with Corelyn." },
    ],
  },
  {
    name: "Company",
    items: [
      { name: "Partners", href: "#partners", description: "Our global network of collaborators." },
      { name: "Contact", href: "#contact", description: "Get in touch with our team." },
    ],
  },
];

function NavDropdown({ category }: { category: typeof navLinks[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          "flex items-center space-x-1 text-[16px] transition-colors duration-300 font-medium py-2",
          "text-[#4A4A4A] group-hover:text-[#1A1A1A]"
        )}
      >
        <span>{category.name}</span>
        <ChevronDown 
          size={16} 
          className={cn("transition-transform duration-300", isOpen && "rotate-180")} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-64 z-[999]"
          >
            <div className="bg-white backdrop-blur-xl border border-[#E0E0E0] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.3),0_10px_25px_rgba(0,0,0,0.15)] overflow-hidden p-2 ring-1 ring-black/10 relative">
              <div className="flex flex-col space-y-1">
                {category.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex flex-col p-3 rounded-xl hover:bg-[#F5F5F5] transition-all duration-200 group/item"
                  >
                    <span className="text-[15px] font-semibold text-[#1A1A1A] group-hover/item:text-black">
                      {item.name}
                    </span>
                    <span className="text-[12px] text-[#4A4A4A] leading-snug mt-0.5">
                      {item.description}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <>
      {/* Floating navbar wrapper — positions the pill in the center top */}
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "pointer-events-auto w-full max-w-5xl transition-all duration-300 relative",
            "rounded-2xl border backdrop-blur-xl",
            "bg-gradient-to-br from-white/20 via-white/10 to-white/5",
            "shadow-[0_8px_32px_rgba(45,189,110,0.15),0_4px_24px_rgba(0,0,0,0.08)]",
            "border-white/20 border-l-white/30 border-t-white/40",
            "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:z-[-1]",
            isScrolled
              ? "bg-white/30 border-[#2DBD6E]/30 shadow-[0_8px_40px_rgba(45,189,110,0.25),0_4px_24px_rgba(0,0,0,0.12)]"
              : "bg-white/20 border-white/30 shadow-[0_8px_32px_rgba(45,189,110,0.15),0_4px_24px_rgba(0,0,0,0.08)]"
          )}
        >
          <div className="px-5 md:px-8 py-3 flex items-center justify-between relative">
            {/* Logo */}
            <a href="/" className="flex flex-col shrink-0">
              <span className="font-heading font-bold text-lg md:text-xl tracking-tight leading-none text-[#1A1A1A]">
                CORELYN
              </span>
              <span className="text-[10px] mt-0.5 text-[#4A4A4A]">by Transista</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              <ul className="flex items-center gap-6">
                {navLinks.map((category) => (
                  <NavDropdown key={category.name} category={category} />
                ))}
              </ul>
              <a
                href="#contact"
                className="bg-[#2DBD6E] text-white px-5 py-2.5 rounded-xl hover:bg-[#22A05C] transition-colors font-bold text-[14px] shrink-0"
              >
                Get a Quote
              </a>
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#1A1A1A] active:scale-90 transition-transform"
                aria-label="Open menu"
              >
                <Settings size={24} />
              </button>
            </div>

            {/* Green glowing border animation at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(45,189,110)] to-transparent opacity-0"></div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(45,189,110)] to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(45,189,110)] to-transparent opacity-30 blur-sm"></div>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-[100dvh] z-[60] bg-white flex flex-col transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 flex justify-between items-center border-b border-[#D0D0D0] h-[72px] shrink-0">
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl tracking-tight text-[#1A1A1A] leading-none">CORELYN</span>
            <span className="text-[10px] text-[#4A4A4A] mt-0.5">by Transista</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[#1A1A1A]" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-6 space-y-6 overflow-y-auto flex-1 pb-12">
          {navLinks.map((category) => (
            <div key={category.name} className="flex flex-col space-y-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#999]">{category.name}</h3>
              <div className="flex flex-col space-y-3 pl-2">
                {category.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl font-heading font-bold text-[#1A1A1A]"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="pt-4">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-[#2DBD6E] text-white px-6 py-4 rounded-xl font-bold text-base w-full text-center hover:bg-[#22A05C] transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </>
  );
}




