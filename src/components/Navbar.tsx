"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Menu } from "lucide-react";
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
          "text-[#4A4A4A] group-hover:text-[#51B8AB]"
        )}
      >
        <span>{category.name}</span>
        <ChevronDown size={16} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-7 w-64 z-[999]"
          >
            <div className="bg-white backdrop-blur-xl border border-[#51B8AB]/20 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.15),0_0_0_1px_rgba(81,184,171,0.08)] overflow-hidden p-2 relative">
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#51B8AB]/50 to-transparent" />
              <div className="flex flex-col space-y-1">
                {category.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex flex-col p-3 rounded-2xl hover:bg-[#E8F7F5] transition-all duration-200 group/item border border-transparent hover:border-[#51B8AB]/20"
                  >
                    <span className="text-[15px] font-semibold text-[#1A1A1A] group-hover/item:text-[#3FA89A]">
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
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "pointer-events-auto w-full max-w-5xl transition-all duration-500 relative",
            "rounded-2xl border backdrop-blur-xl bg-white/80",
            isScrolled
              ? "bg-white/90 border-[#51B8AB]/30 shadow-[0_8px_40px_rgba(81,184,171,0.12),0_2px_12px_rgba(0,0,0,0.08)]"
              : "bg-white/70 border-[#51B8AB]/15 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          )}
        >
          <div className="px-5 md:px-8 py-3 flex items-center justify-between relative">

            {/* Logo */}
            <a href="/" className="flex shrink-0 items-center">
              <img src="/assets/logo/corelyn robotics.png" alt="Corelyn Robotics" className="h-16 w-auto object-contain" />
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
                className="bg-[#51B8AB] text-[#0A0A0A] px-5 py-2.5 rounded-2xl hover:bg-[#3FA89A] transition-colors font-bold text-[14px] shrink-0 shadow-[0_0_16px_rgba(81,184,171,0.35)]"
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
                <Menu size={24} />
              </button>
            </div>

            {/* Green bottom lighting — flush at nav bottom */}
            <div className="absolute bottom-0 left-6 right-6 h-px overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#51B8AB] to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-[100dvh] z-[60] bg-white flex flex-col transition-transform duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 flex justify-between items-center border-b border-[#D0D0D0] h-[72px] shrink-0">
          <div className="flex shrink-0 items-center">
            <img src="/assets/logo/corelyn robotics.png" alt="Corelyn Robotics" className="h-12 w-auto object-contain" />
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
              className="block bg-[#51B8AB] text-[#0A0A0A] px-6 py-4 rounded-2xl font-bold text-base w-full text-center hover:bg-[#3FA89A] transition-colors shadow-[0_0_20px_rgba(81,184,171,0.3)]"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
