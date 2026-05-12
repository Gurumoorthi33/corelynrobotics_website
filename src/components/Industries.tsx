"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Factory, PackageSearch, GraduationCap, ShieldCheck, ShieldAlert, HardHat, Tractor, ArrowRight, ChevronLeft, ChevronRight, Wrench, Briefcase, Zap } from "lucide-react";
import { useSwipe } from "@/lib/useScrollLock";

const industries = [
  {
    id: "manufacturing", name: "Manufacturing", shortName: "Manufacturing",
    application: "Automated material handling and in-plant logistics — assembly line feeding, part transfer, and finished goods transport without a driver.",
    outcome: "Moves parts between stations without a worker.",
    badge: "C500 / C1000", image: "/assets/industries/manufacturing.png",
    icon: Factory, stat: "3× faster", statLabel: "material cycle time",
  },
  {
    id: "warehousing", name: "Warehousing & Logistics", shortName: "Warehousing",
    application: "Pallet movement, cart tugging, cross-docking, and pick-and-place support across single and multi-shift warehouse operations.",
    outcome: "Runs pallet routes across your warehouse floor, every shift.",
    badge: "C100 / C500 / C1000", image: "/assets/industries/warehousing.png",
    icon: PackageSearch, stat: "20 hrs/day", statLabel: "continuous operation",
  },
  {
    id: "education", name: "Education & Research", shortName: "Education",
    application: "ROS-ready platforms for robotics curriculum, autonomous algorithm testing, and rapid prototyping in lab environments.",
    outcome: "Deploy a real AMR in your lab — not a simulation.",
    badge: "C100", image: "/assets/industries/education.png",
    icon: GraduationCap, stat: "ROS 2", statLabel: "ready out of the box",
  },
  {
    id: "inspection", name: "Inspection & Surveillance", shortName: "Inspection",
    application: "Autonomous perimeter monitoring, structural inspection, and security patrol — without stationing a person.",
    outcome: "Patrols your perimeter on a schedule, autonomously.",
    badge: "C100 4WD", image: "/assets/industries/inspection.png",
    icon: ShieldCheck, stat: "360°", statLabel: "camera coverage",
  },
  {
    id: "defence", name: "Defence & Tactical", shortName: "Defence",
    application: "Ruggedised surveillance, reconnaissance, and field logistics support in environments where human exposure is a risk.",
    outcome: "Sends the robot in first.",
    badge: "C100 4WD / Custom", image: "/assets/industries/defence.png",
    icon: ShieldAlert, stat: "All-terrain", statLabel: "4WD off-road chassis",
  },
  {
    id: "mining", name: "Mining & Heavy Industry", shortName: "Mining",
    application: "Hazardous environment monitoring and heavy material movement in conditions that are unsafe or impractical for human workers.",
    outcome: "Hauls material in environments humans shouldn't enter.",
    badge: "C1000 / Custom", image: "/assets/industries/mining.png",
    icon: HardHat, stat: "1,000 kg", statLabel: "max payload capacity",
  },
  {
    id: "agriculture", name: "Agriculture & Outdoor", shortName: "Agriculture",
    application: "Field inspection, crop monitoring, and autonomous outdoor mobility across uneven terrain and open environments.",
    outcome: "Covers ground your team can't cover cost-effectively.",
    badge: "C100 4WD", image: "/assets/industries/agriculture.png",
    icon: Tractor, stat: "GPS + SLAM", statLabel: "outdoor navigation",
  },
];

const INTERVAL = 3500;

export default function Industries() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(performance.now());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const current = industries[active];
  const Icon = current.icon;

  useEffect(() => {
    if (paused) { setProgress(0); return; }
    startRef.current = performance.now();
    const tick = (now: number) => {
      const pct = Math.min((now - startRef.current) / INTERVAL, 1);
      setProgress(pct);
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setActive(a => (a + 1) % industries.length);
        setProgress(0);
        startRef.current = performance.now();
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused, active]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSelect = (i: number) => {
    setActive(i); setProgress(0); startRef.current = performance.now();
    setPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPaused(false), 4000);
  };

  const goNext = useCallback(() => {
    setActive(a => Math.min(a + 1, industries.length - 1));
    setProgress(0); startRef.current = performance.now();
  }, []);

  const goPrev = useCallback(() => {
    setActive(a => Math.max(a - 1, 0));
    setProgress(0); startRef.current = performance.now();
  }, []);

  const swipeProps = useSwipe(goNext, goPrev);

  return (
    <section id="industries" ref={sectionRef} className="bg-slate-50 py-24 md:py-32 relative overflow-hidden border-y border-slate-200/80">
      <div className="absolute inset-0 opacity-[0.35] pointer-events-none" style={{
        backgroundImage:
          "linear-gradient(rgb(148 163 184 / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(148 163 184 / 0.12) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#51B8AB]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center relative"
        >
          {/* Section badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-[#e8f7f5] border border-[#51B8AB]/30 rounded-full px-5 py-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#51B8AB] animate-pulse" />
            <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#2d9d8f]">
              Industries
            </span>
          </motion.div>

          {/* Main heading */}
          <h2 className="font-heading font-bold text-[42px] md:text-[64px] lg:text-[76px] leading-[1.05] text-slate-900 mb-6">
            <span className="text-[#2d9d8f]">Robots</span> for
            <br />
            <span className="text-slate-500">Every</span> <span className="text-[#2d9d8f]">Sector</span>.
          </h2>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[#51B8AB]/50" />
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-[#51B8AB]" />
              <div className="w-1 h-1 rounded-full bg-[#51B8AB]/60" />
              <div className="w-1 h-1 rounded-full bg-[#51B8AB]/30" />
            </div>
            <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[#51B8AB]/50" />
          </div>

          <p className="text-[18px] md:text-[22px] text-slate-600 leading-[1.75] max-w-3xl mx-auto">
            <span className="text-[#2d9d8f] font-semibold">Seven verticals</span>. One subscription model. From <span className="text-slate-900 font-semibold">manufacturing</span> to <span className="text-slate-900 font-semibold">defence</span>.
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {(
              [
                { icon: Factory, text: "7 Industries" },
                { icon: Wrench, text: "Custom solutions" },
                { icon: Briefcase, text: "B2B focused" },
                { icon: Zap, text: "Quick deploy" },
              ] as const
            ).map((item, i) => {
              const PillIcon = item.icon;
              return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2 bg-white border border-slate-200/90 rounded-full px-4 py-2 hover:border-[#51B8AB]/35 shadow-sm transition-all duration-300"
              >
                <PillIcon className="w-4 h-4 text-[#2d9d8f] shrink-0" aria-hidden />
                <span className="text-[13px] font-medium text-slate-700">{item.text}</span>
              </motion.div>
            );})}
          </div>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4">

          {/* Featured panel — swipeable on mobile */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative rounded-2xl overflow-hidden h-[360px] sm:h-[420px] md:h-[480px] touch-pan-y bg-white border border-slate-200/90 shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
                {...swipeProps}
              >
                <Image src={current.image} alt={current.name} fill className="object-cover opacity-30" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-900/75 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-transparent to-transparent" />
                {/* Glowing edge effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#51B8AB]/10 to-transparent opacity-50" />

                <div className="relative h-full flex flex-col justify-between p-5 sm:p-6 md:p-8">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="w-12 h-12 rounded-xl bg-[#51B8AB]/20 backdrop-blur-md border border-[#51B8AB]/40 flex items-center justify-center text-[#51B8AB] shadow-lg"
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                    <motion.span 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="bg-[#51B8AB] text-slate-950 text-[10px] font-bold tracking-widest uppercase px-3 py-2 rounded-lg border border-[#51B8AB]/30 shadow-lg"
                    >
                      {current.badge}
                    </motion.span>
                  </div>

                  {/* Bottom */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="mb-4 inline-flex items-center gap-3 bg-[#51B8AB]/15 backdrop-blur-md border border-[#51B8AB]/30 rounded-xl px-4 py-3 shadow-lg"
                    >
                      <span className="font-heading font-bold text-[20px] sm:text-[22px] text-white leading-none">{current.stat}</span>
                      <span className="text-[11px] sm:text-[12px] text-white/70 font-medium leading-tight max-w-[90px]">{current.statLabel}</span>
                    </motion.div>
                    <h3 className="font-heading font-bold text-[22px] sm:text-[26px] md:text-[32px] text-white leading-[1.1] mb-3">{current.name}</h3>
                    <p className="text-[14px] sm:text-[15px] text-white/80 leading-[1.6] max-w-xl mb-4 line-clamp-3 md:line-clamp-none">{current.application}</p>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#51B8AB] shrink-0" />
                      <p className="text-[13px] text-white/60 italic font-medium">{current.outcome}</p>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                      className="flex flex-wrap gap-3"
                    >
                      <a href="#contact" className="group inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-xl font-bold text-[13px] sm:text-[14px] hover:bg-[#51B8AB] hover:text-slate-950 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-slate-200">
                        Deploy in {current.shortName} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a href="#platforms" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/25 text-white px-5 py-3 rounded-xl font-bold text-[13px] sm:text-[14px] hover:bg-white/20 hover:border-white/40 transition-all duration-300">
                        {current.badge}
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile: dot indicators + prev/next */}
            <div className="flex lg:hidden items-center justify-between mt-6 px-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => active > 0 && handleSelect(active - 1)}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  active > 0 
                    ? "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 shadow-sm" 
                    : "border-slate-200 text-slate-300 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex items-center gap-2">
                {industries.map((_, i) => (
                  <motion.button 
                    key={i} 
                    onClick={() => handleSelect(i)} 
                    className="p-2"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <motion.div 
                      animate={{
                        width: i === active ? 20 : 8,
                        height: i === active ? 8 : 8,
                        backgroundColor: i === active ? "#51B8AB" : "rgba(255,255,255,0.3)"
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="rounded-full"
                    />
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => active < industries.length - 1 && handleSelect(active + 1)}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  active < industries.length - 1 
                    ? "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 shadow-sm" 
                    : "border-slate-200 text-slate-300 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Desktop sidebar list (hidden on mobile) */}
          <div className="hidden lg:flex flex-col gap-2">
            {industries.map((ind, i) => {
              const IndIcon = ind.icon;
              const isActive = active === i;
              return (
                <motion.button
                  key={ind.id}
                  onClick={() => handleSelect(i)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group
                    ${isActive 
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
                      : "bg-white border-slate-200 hover:bg-[#e8f7f5] hover:border-[#51B8AB]/40 hover:shadow-md text-slate-900"}`}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#51B8AB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <motion.div 
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      rotate: isActive ? 5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive 
                        ? "bg-white text-slate-900 shadow-lg" 
                        : "bg-slate-100 text-[#2d9d8f] group-hover:bg-white"
                    }`}
                  >
                    <IndIcon className="w-4.5 h-4.5" />
                  </motion.div>
                  <div className="min-w-0 flex-1 relative z-10">
                    <p className={`font-heading font-bold text-[13px] leading-tight truncate transition-colors duration-300 ${
                      isActive 
                        ? "text-white" 
                        : "text-slate-900 group-hover:text-slate-900"
                    }`}>{ind.shortName}</p>
                    <p className={`text-[10px] font-medium mt-0.5 truncate transition-colors duration-300 ${
                      isActive 
                        ? "text-white/70" 
                        : "text-slate-500 group-hover:text-slate-600"
                    }`}>{ind.badge}</p>
                  </div>
                  <motion.div 
                    animate={{ width: isActive ? "4px" : "2px" }}
                    className={`h-5 rounded-full overflow-hidden shrink-0 transition-all duration-300 ${
                      isActive ? "bg-white/40" : "bg-slate-300 group-hover:bg-slate-400"
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        className="w-full bg-[#51B8AB] rounded-full origin-top" 
                        animate={{ scaleY: progress }} 
                        style={{ height: "100%" }} 
                      />
                    )}
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bottom stats */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-40px", amount: 0.12 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {[
            { value: "7", label: "Verticals" },
            { value: "4", label: "Platforms" },
            { value: "₹50/hr", label: "Starting rate" },
            { value: "₹0", label: "Upfront capital" },
          ].map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group relative overflow-hidden rounded-xl bg-white border border-slate-200/90 p-4 hover:border-[#51B8AB]/35 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#51B8AB]/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="font-heading font-bold text-[22px] sm:text-[24px] text-slate-900 leading-none mb-1"
                >
                  {s.value}
                </motion.p>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium uppercase tracking-wider group-hover:text-[#2d9d8f] transition-colors duration-300">
                  {s.label}
                </p>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#51B8AB]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}




