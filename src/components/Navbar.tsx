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
            className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-64 z-50"
          >
            <div className="bg-white/98 backdrop-blur-xl border border-[#E0E0E0] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden p-2 ring-1 ring-black/5 relative">
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
    <motion.nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled 
          ? "bg-white/95 border-b border-[#D0D0D0] py-3 md:py-4 shadow-sm" 
          : "bg-white/90 py-4 md:py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex flex-col">
          <span className={cn(
            "font-heading font-bold text-xl md:text-2xl tracking-tight leading-none transition-colors duration-300",
            "text-[#1A1A1A]"
          )}>
            CORELYN
          </span>
          <span className={cn(
            "text-xs mt-1 transition-colors duration-300",
            "text-[#4A4A4A]"
          )}>
            by Transista
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            {navLinks.map((category) => (
              <NavDropdown key={category.name} category={category} />
            ))}
          </ul>
          <a
            href="#contact"
            className="bg-[#1A1A1A] text-white px-6 py-3 rounded hover:bg-[#2B2B2B] transition-colors font-medium text-[16px]"
          >
            Get a Quote
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={cn(
              "p-2 transition-all duration-500 active:rotate-180",
              "text-[#1A1A1A]"
            )}
            aria-label="Open menu"
          >
            <Settings size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-[100dvh] z-[60] bg-white flex flex-col transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 md:px-12 flex justify-between items-center border-b border-[#D0D0D0] h-[80px] shrink-0">
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl md:text-2xl tracking-tight text-[#1A1A1A] leading-none">
              CORELYN
            </span>
            <span className="text-xs text-[#4A4A4A] mt-1">by Transista</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-[#1A1A1A]"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>
        
        <div className="flex flex-col p-6 space-y-6 md:space-y-8 overflow-y-auto h-[calc(100dvh-80px)] pb-12">
          {navLinks.map((category) => (
            <div key={category.name} className="flex flex-col space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#999999]">
                {category.name}
              </h3>
              <div className="flex flex-col space-y-4 pl-2">
                {category.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl md:text-2xl font-heading font-bold text-[#1A1A1A]"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="pt-8">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block bg-[#1A1A1A] text-white px-8 py-4 rounded hover:bg-[#2B2B2B] transition-colors font-medium text-lg w-full text-center"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
