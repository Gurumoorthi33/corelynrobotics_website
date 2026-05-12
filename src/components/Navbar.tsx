"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    name: "Platform",
    items: [
      { name: "Platforms", href: "/platforms", description: "Explore the robotic fleet and software stack." },
      { name: "Technology", href: "#technology", description: "Autonomy, fleet intelligence, and uptime systems." },
      { name: "How It Works", href: "#how-it-works", description: "A clear path from survey to productive runtime." },
    ],
  },
  {
    name: "Impact",
    items: [
      { name: "Industries", href: "#industries", description: "Where Corelyn robots are already useful." },
      { name: "ROI Calculator", href: "#roi-calculator", description: "Estimate savings before deployment." },
    ],
  },
  {
    name: "Company",
    items: [
      { name: "Contact", href: "#contact", description: "Talk to the deployment team." },
    ],
  },
] as const;

type NavCategory = (typeof navLinks)[number];

function NavItemLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  if (href.startsWith("#")) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

function NavDropdown({ category }: { category: NavCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          "group inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-[14px] font-semibold text-slate-700",
          "transition-all duration-200 hover:bg-slate-100 hover:text-slate-950",
          "focus-visible:bg-slate-100 focus-visible:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51B8AB] focus-visible:ring-offset-2"
        )}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span>{category.name}</span>
        <ChevronDown
          size={15}
          strokeWidth={2.3}
          className={cn("text-slate-500 transition-transform duration-200 group-hover:text-[#2d9d8f]", isOpen && "rotate-180 text-[#2d9d8f]")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-[999] w-[21rem] -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.14)] ring-1 ring-[#51B8AB]/10">
              <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                <p className="text-[11px] font-bold uppercase text-[#2d9d8f]">{category.name}</p>
              </div>
              <div className="p-2" role="menu">
                {category.items.map((item) => (
                  <NavItemLink
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="group/item flex items-start justify-between gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-[#E8F7F5] focus-visible:bg-[#E8F7F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51B8AB]"
                  >
                    <span>
                      <span className="block text-[15px] font-bold leading-tight text-slate-950 group-hover/item:text-[#2d9d8f]">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-[12px] leading-snug text-slate-600">
                        {item.description}
                      </span>
                    </span>
                    <ArrowRight
                      size={16}
                      className="mt-0.5 shrink-0 text-slate-300 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-[#2d9d8f]"
                      aria-hidden="true"
                    />
                  </NavItemLink>
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
  const [mobileSection, setMobileSection] = useState<string>(navLinks[0].name);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 36);
  });

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 pointer-events-none md:top-5 md:px-6">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={cn(
            "pointer-events-auto relative w-full max-w-6xl rounded-[1.25rem] border backdrop-blur-2xl transition-all duration-300",
            isScrolled
              ? "border-slate-200/90 bg-white/97 shadow-[0_8px_16px_rgba(15,23,42,0.06),0_20px_60px_rgba(15,23,42,0.14),0_0_0_1px_rgba(81,184,171,0.10)]"
              : "border-white/80 bg-white/90 shadow-[0_4px_12px_rgba(15,23,42,0.06),0_12px_40px_rgba(15,23,42,0.10),0_0_0_1px_rgba(255,255,255,0.60)]"
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex h-[64px] items-center justify-between gap-4 px-3 md:h-[80px] md:px-3 lg:px-4">
            <Link href="/" className="flex min-w-0 shrink-0 items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51B8AB] focus-visible:ring-offset-2">
              <Image
                src="/assets/logo/corelyn robotics new.png"
                alt="Corelyn Robotics"
                width={296}
                height={112}
                priority
                className="h-[3.5rem] w-auto object-contain md:h-[10rem]"
              />
            </Link>

            <div className="hidden items-center gap-3 lg:flex">
              <ul className="flex items-center rounded-full border border-slate-200/80 bg-white/70 p-1 shadow-inner shadow-slate-100/80">
                {navLinks.map((category) => (
                  <NavDropdown key={category.name} category={category} />
                ))}
              </ul>
              <a
                href="#contact"
                className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-[#51B8AB] px-5 text-[14px] font-bold text-slate-950 shadow-[0_12px_26px_rgba(81,184,171,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3FA89A] hover:shadow-[0_16px_34px_rgba(81,184,171,0.34)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51B8AB] focus-visible:ring-offset-2"
              >
                Get a Quote
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-950 shadow-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51B8AB] focus-visible:ring-offset-2 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={23} aria-hidden="true" />
            </button>
          </div>

          <motion.div
            className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#51B8AB]/75 to-transparent"
            animate={{ opacity: isScrolled ? 0.45 : 0.9 }}
            transition={{ duration: 0.2 }}
          />
        </motion.nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-[59] bg-slate-950/35 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-[60] flex h-[100dvh] w-full max-w-[420px] flex-col bg-white shadow-[0_24px_80px_rgba(15,23,42,0.28)] lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-200 px-5">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51B8AB]">
                  <Image
                    src="/assets/logo/corelyn robotics new.png"
                    alt="Corelyn Robotics"
                    width={238}
                    height={90}
                    className="h-[3.5rem] w-auto object-contain"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-950 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51B8AB]"
                  aria-label="Close menu"
                >
                  <X size={22} aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <div className="mb-5 rounded-2xl border border-[#51B8AB]/25 bg-[#E8F7F5] p-4">
                  <p className="text-[11px] font-bold uppercase text-[#2d9d8f]">Robotics-as-a-Service</p>
                  <p className="mt-1 text-[15px] font-semibold leading-snug text-slate-950">
                    Navigate to platforms, deployment flow, ROI, or contact.
                  </p>
                </div>

                <div className="space-y-2">
                  {navLinks.map((category) => {
                    const isOpen = mobileSection === category.name;

                    return (
                      <section key={category.name} className="rounded-2xl border border-slate-200 bg-white">
                        <button
                          type="button"
                          onClick={() => setMobileSection(isOpen ? "" : category.name)}
                          className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51B8AB]"
                          aria-expanded={isOpen}
                        >
                          <span className="text-[16px] font-bold text-slate-950">{category.name}</span>
                          <ChevronDown className={cn("h-5 w-5 text-slate-500 transition-transform", isOpen && "rotate-180 text-[#2d9d8f]")} aria-hidden="true" />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-slate-100 p-2">
                                {category.items.map((item) => (
                                  <NavItemLink
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-start justify-between gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-slate-50 focus-visible:bg-[#E8F7F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51B8AB]"
                                  >
                                    <span>
                                      <span className="block text-[16px] font-bold text-slate-950">{item.name}</span>
                                      <span className="mt-0.5 block text-[13px] leading-snug text-slate-600">{item.description}</span>
                                    </span>
                                    <ArrowRight size={16} className="mt-1 shrink-0 text-[#2d9d8f]" aria-hidden="true" />
                                  </NavItemLink>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </section>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-200 p-5">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#51B8AB] px-6 text-center text-[15px] font-bold text-slate-950 shadow-[0_14px_30px_rgba(81,184,171,0.30)] transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51B8AB] focus-visible:ring-offset-2"
                >
                  Get a Quote
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
