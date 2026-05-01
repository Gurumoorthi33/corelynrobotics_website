"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Platforms", href: "#platforms" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Industries", href: "#industries" },
  { name: "Technology", href: "#technology" },
  { name: "Partners", href: "#partners" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
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
          ? "bg-white border-b border-[#D0D0D0] py-4 shadow-sm" 
          : "bg-white py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex flex-col">
          <span className={cn(
            "font-heading font-bold text-2xl tracking-tight leading-none transition-colors duration-300",
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
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={cn(
                    "text-[16px] transition-colors duration-300 font-medium",
                    "text-[#4A4A4A] hover:text-[#1A1A1A]"
                  )}
                >
                  {link.name}
                </a>
              </li>
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
              "p-2 transition-colors duration-300",
              "text-[#1A1A1A]"
            )}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-white flex flex-col transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 md:px-12 flex justify-between items-center border-b border-[#D0D0D0]">
          <div className="flex flex-col">
            <span className="font-heading font-bold text-2xl tracking-tight text-[#1A1A1A] leading-none">
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
        
        <div className="flex flex-col p-6 space-y-6 overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-heading font-bold text-[#1A1A1A]"
            >
              {link.name}
            </a>
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
