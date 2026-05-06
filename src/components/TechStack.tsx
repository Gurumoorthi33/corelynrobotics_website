"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Zap, Blocks, Shield, LayoutDashboard, Link2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollLock, useSwipe } from "@/lib/useScrollLock";

const tech = [
  {
    num: "01", icon: Compass,
    title: "Autonomous Navigation", short: "SLAM-based precision routing",
    description: "Advanced SLAM with local path planning for efficient, obstacle-aware autonomous operation in dynamic environments. Re-routes in real time when workers or forklifts enter its path.",
    detail: "Moves material between stations without a driver — even when the floor layout changes.",
    specs: [
      { label: "Algorithm", value: "LiDAR SLAM + Vision fusion" },
      { label: "Obstacle response", value: "< 200ms re-route" },
      { label: "Map update", value: "OTA, no downtime" },
      { label: "Environment", value: "Dynamic industrial floors" },
    ],
    stat: "< 200ms", statLabel: "obstacle response",
  },
  {
    num: "02", icon: Zap,
    title: "Motor Control", short: "High-torque precision drive",
    description: "High-torque precision motor systems with encoder feedback and electromagnetic braking for industrial duty cycles. Engineered for payloads up to 1,000 kg across multi-shift operations.",
    detail: "Handles 500–1,000 kg loads across 20-hour shifts without degradation.",
    specs: [
      { label: "Max payload", value: "1,000 kg" },
      { label: "Braking", value: "Electromagnetic, fail-safe" },
      { label: "Feedback", value: "Encoder + current sensing" },
      { label: "Duty cycle", value: "Up to 20 hrs/day" },
    ],
    stat: "1,000 kg", statLabel: "max payload",
  },
  {
    num: "03", icon: Blocks,
    title: "Modular Architecture", short: "Upgradeable without redesign",
    description: "Scalable platform design enables rapid hardware customisation and software upgrades without full system redesign. Sensor modules and navigation stacks are hot-swappable.",
    detail: "Add a new sensor or change the payload attachment — no new robot required.",
    specs: [
      { label: "Sensor mounts", value: "Modular, tool-free" },
      { label: "Software", value: "OTA updates included" },
      { label: "Payload attach", value: "Configurable per site" },
      { label: "Upgrade path", value: "No full redesign needed" },
    ],
    stat: "OTA", statLabel: "zero downtime updates",
  },
  {
    num: "04", icon: Shield,
    title: "Safety Systems", short: "Multi-layer collision avoidance",
    description: "Multi-layer collision avoidance, emergency stop protocols, and configurable safety zones. Redundant LiDAR and depth sensors ensure no single point of detection failure.",
    detail: "Certified safe to operate alongside workers on a live factory floor.",
    specs: [
      { label: "Sensors", value: "LiDAR + depth cameras" },
      { label: "E-stop", value: "Hardware + software" },
      { label: "Safety zones", value: "Configurable per site" },
      { label: "Standard", value: "Industrial safety compliant" },
    ],
    stat: "Redundant", statLabel: "sensor layers",
  },
  {
    num: "05", icon: LayoutDashboard,
    title: "Fleet Dashboard", short: "Live tracking from any device",
    description: "Live tracking interface providing real-time mission data, uptime metrics, and fleet health — accessible from any device. Corelyn's ops team monitors your fleet remotely.",
    detail: "See every robot's location, battery, and mission status from your phone.",
    specs: [
      { label: "Access", value: "Web + mobile" },
      { label: "Data", value: "Real-time telemetry" },
      { label: "Alerts", value: "Proactive, not reactive" },
      { label: "Monitoring", value: "Corelyn ops team included" },
    ],
    stat: "Real-time", statLabel: "fleet telemetry",
  },
  {
    num: "06", icon: Link2,
    title: "Custom Integration", short: "WMS, ERP, and factory systems",
    description: "Workflow-specific integration for WMS, ERP, and factory management systems. REST APIs and webhooks mean Corelyn robots fit into your existing software stack.",
    detail: "Plugs into your existing WMS or ERP — no rip-and-replace required.",
    specs: [
      { label: "Protocol", value: "REST API + Webhooks" },
      { label: "Systems", value: "WMS, ERP, SCADA" },
      { label: "Setup", value: "Included in deployment" },
      { label: "Custom work", value: "Scoped per project" },
    ],
    stat: "API-first", statLabel: "existing stack",
  },
];

const INTERVAL = 3500;

export default function TechStack() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(performance.now());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const item = tech[active];
  const Icon = item.icon;

  useEffect(() => {
    if (paused) { setProgress(0); return; }
    startRef.current = performance.now();
    const tick = (now: number) => {
      const pct = Math.min((now - startRef.current) / INTERVAL, 1);
      setProgress(pct);
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setActive(a => (a + 1) % tech.length);
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
    setActive(a => { const n = Math.min(a + 1, tech.length - 1); return n; });
    setProgress(0); startRef.current = performance.now();
  }, []);

  const goPrev = useCallback(() => {
    setActive(a => Math.max(a - 1, 0));
    setProgress(0); startRef.current = performance.now();
  }, []);

  useScrollLock(sectionRef, active, tech.length, goNext, goPrev);
  const swipeProps = useSwipe(goNext, goPrev);

  return (
    <section id="technology" ref={sectionRef} className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6 md:mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#4A4A4A] mb-1 block">Technology</span>
            <h2 className="font-heading font-bold text-[26px] sm:text-[32px] md:text-[48px] leading-[1.05] text-[#1A1A1A]">
              Engineering Excellence
            </h2>
          </div>
          <p className="text-[13px] md:text-[15px] text-[#4A4A4A] leading-[1.6] md:max-w-xs md:text-right">
            Built for industrial reliability — not controlled demonstrations.
          </p>
        </div>

        {/* Layout: sidebar on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">

          {/* ── Desktop sidebar list (hidden on mobile) ── */}
          <div className="hidden lg:flex flex-col gap-1.5">
            {tech.map((t, i) => {
              const TIcon = t.icon;
              const isActive = active === i;
              return (
                <button
                  key={t.num}
                  onClick={() => handleSelect(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200
                    ${isActive ? "bg-[#2DBD6E] border-[#2DBD6E]" : "bg-[#F5F5F5] border-[#EEEEEE] hover:bg-white hover:border-[#D0D0D0]"}`}
                >
                  <span className={`font-bold text-[11px] tracking-widest w-5 shrink-0 ${isActive ? "text-white/30" : "text-[#D0D0D0]"}`}>{t.num}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isActive ? "bg-white/20 text-white" : "bg-white text-[#1A1A1A] border border-[#EEEEEE]"}`}>
                    <TIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-heading font-bold text-[13px] leading-tight ${isActive ? "text-white" : "text-[#1A1A1A]"}`}>{t.title}</p>
                    <p className={`text-[11px] mt-0.5 truncate ${isActive ? "text-white/50" : "text-[#4A4A4A]"}`}>{t.short}</p>
                  </div>
                  <div className={`w-1 h-5 rounded-full overflow-hidden shrink-0 ${isActive ? "bg-white/20" : "bg-transparent"}`}>
                    {isActive && <motion.div className="w-full bg-white/90 rounded-full origin-top" style={{ scaleY: progress, height: "100%" }} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Detail panel ── */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-[#2DBD6E] rounded-2xl p-5 sm:p-6 md:p-8 touch-pan-y"
                {...swipeProps}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/30">{item.num} / 06</span>
                  </div>
                  <div className="bg-white/20 border border-white/30 rounded-xl px-3 py-2 text-right shrink-0">
                    <p className="font-heading font-bold text-[16px] sm:text-[18px] text-white leading-none">{item.stat}</p>
                    <p className="text-[10px] text-white/50 mt-0.5 leading-tight">{item.statLabel}</p>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-[20px] sm:text-[22px] md:text-[28px] text-white leading-[1.1] mb-2">{item.title}</h3>
                <p className="text-[13px] sm:text-[14px] text-white/70 leading-[1.6] mb-3">{item.description}</p>
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                  <div className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                  <p className="text-[12px] text-white/50 italic">{item.detail}</p>
                </div>

                {/* Specs */}
                <p className="text-[10px] font-bold tracking-widest uppercase text-white/30 mb-2.5">Technical Specs</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {item.specs.map((s, idx) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      className="bg-white/10 border border-white/20 rounded-xl p-3"
                    >
                      <p className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-white/30 mb-1">{s.label}</p>
                      <p className="text-[12px] sm:text-[13px] font-bold text-white leading-tight">{s.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-2">
                  <a href="#contact" className="flex-1 bg-white text-[#1A1A1A] text-center py-3 rounded-xl font-bold text-[12px] sm:text-[13px] hover:bg-[#F5F5F5] transition-colors flex items-center justify-center gap-1.5">
                    Discuss Requirements <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a href="#platforms" className="flex-1 bg-white/20 border border-white/30 text-white text-center py-3 rounded-xl font-bold text-[12px] sm:text-[13px] hover:bg-white/30 transition-colors">
                    See Platforms
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Mobile: dot indicators + prev/next ── */}
            <div className="flex lg:hidden items-center justify-between mt-4 px-1">
              <button
                onClick={() => active > 0 && handleSelect(active - 1)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${active > 0 ? "border-[#D0D0D0] text-[#1A1A1A] hover:bg-[#F5F5F5]" : "border-[#EEEEEE] text-[#D0D0D0] cursor-not-allowed"}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {tech.map((_, i) => (
                  <button key={i} onClick={() => handleSelect(i)} className="p-1">
                    <div className={`rounded-full transition-all duration-300 ${i === active ? "w-5 h-2 bg-[#2DBD6E]" : "w-2 h-2 bg-[#D0D0D0]"}`} />
                  </button>
                ))}
              </div>

              <button
                onClick={() => active < tech.length - 1 && handleSelect(active + 1)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${active < tech.length - 1 ? "border-[#D0D0D0] text-[#1A1A1A] hover:bg-[#F5F5F5]" : "border-[#EEEEEE] text-[#D0D0D0] cursor-not-allowed"}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { value: "ROS 2", label: "Autonomy stack" },
            { value: "≥ 95%", label: "Uptime SLA" },
            { value: "4–8 wks", label: "Deploy time" },
            { value: "OTA", label: "SW updates" },
          ].map((s, i) => (
            <div key={i} className="bg-[#F5F5F5] border border-[#EEEEEE] rounded-xl px-3 py-3">
              <p className="font-heading font-bold text-[16px] sm:text-[18px] text-[#1A1A1A] leading-none mb-0.5">{s.value}</p>
              <p className="text-[9px] sm:text-[10px] text-[#4A4A4A] font-medium uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




