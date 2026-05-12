"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Zap, Blocks, Shield, LayoutDashboard, Link2, ArrowRight, ChevronLeft, ChevronRight, Cpu, BarChart3 } from "lucide-react";
import { useSwipe } from "@/lib/useScrollLock";

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

  const swipeProps = useSwipe(goNext, goPrev);

  return (
    <section id="technology" ref={sectionRef} className="bg-white py-24 md:py-32 relative overflow-hidden border-y border-slate-200/80">
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
              Technology
            </span>
          </motion.div>

          {/* Main heading */}
          <h2 className="font-heading font-bold text-[42px] md:text-[64px] lg:text-[76px] leading-[1.05] text-slate-900 mb-6">
            <span className="text-[#2d9d8f]">Engineering</span> Excellence.
            <br />
            <span className="text-slate-500">Built for</span> <span className="text-[#2d9d8f] relative inline-block">
              Reliability
              <div className="absolute -bottom-2 inset-x-0 h-1 bg-[#51B8AB]/25 blur-sm rounded-full" />
            </span>.
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
            Industrial-grade <span className="text-[#2d9d8f] font-semibold">autonomy stack</span> and <span className="text-[#2d9d8f] font-semibold">modular architecture</span> — built for reliability, not demonstrations.
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {(
              [
                { icon: Cpu, text: "ROS 2 based" },
                { icon: Zap, text: "OTA Updates" },
                { icon: Shield, text: "Industrial Safe" },
                { icon: BarChart3, text: "Live Fleet Data" },
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
                className="flex items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-full px-4 py-2 hover:border-[#51B8AB]/35 hover:bg-white transition-all duration-300 shadow-sm"
              >
                <PillIcon className="w-4 h-4 text-[#2d9d8f] shrink-0" aria-hidden />
                <span className="text-[13px] font-medium text-slate-700">{item.text}</span>
              </motion.div>
            );})}
          </div>
        </motion.div>

        {/* Layout: sidebar on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">

          {/* ── Desktop sidebar list (hidden on mobile) ── */}
          <div className="hidden lg:flex flex-col gap-1.5">
            {tech.map((t, i) => {
              const TIcon = t.icon;
              const isActive = active === i;
              return (
                <motion.button
                  key={t.num}
                  onClick={() => handleSelect(i)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group
                    ${isActive 
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
                      : "bg-white border-slate-200 hover:bg-[#e8f7f5] hover:border-[#51B8AB]/40 hover:shadow-md text-slate-900"}`}
                >
                  <span className={`font-bold text-[11px] tracking-widest w-5 shrink-0 ${isActive ? "text-white/40" : "text-slate-400"}`}>{t.num}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isActive ? "bg-white/15 text-white" : "bg-slate-100 text-slate-800 border border-slate-200"}`}>
                    <TIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-heading font-bold text-[13px] leading-tight ${isActive ? "text-white" : "text-slate-900"}`}>{t.title}</p>
                    <p className={`text-[11px] mt-0.5 truncate ${isActive ? "text-white/55" : "text-slate-600"}`}>{t.short}</p>
                  </div>
                  <div className={`w-1 h-5 rounded-full overflow-hidden shrink-0 ${isActive ? "bg-white/25" : "bg-transparent"}`}>
                    {isActive && <motion.div className="w-full bg-[#51B8AB] rounded-full origin-top" style={{ scaleY: progress, height: "100%" }} />}
                  </div>
                </motion.button>
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
                className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 touch-pan-y border border-slate-200/90 shadow-[0_8px_32px_rgba(15,23,42,0.06)]"
                {...swipeProps}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{item.num} / 06</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-right shrink-0">
                    <p className="font-heading font-bold text-[16px] sm:text-[18px] text-slate-900 leading-none">{item.stat}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{item.statLabel}</p>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-[20px] sm:text-[22px] md:text-[28px] text-slate-900 leading-[1.1] mb-2">{item.title}</h3>
                <p className="text-[13px] sm:text-[14px] text-slate-600 leading-[1.6] mb-3">{item.description}</p>
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
                  <div className="w-1 h-1 rounded-full bg-[#51B8AB] shrink-0" />
                  <p className="text-[12px] text-slate-500 italic">{item.detail}</p>
                </div>

                <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2.5">Technical Specs</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {item.specs.map((s, idx) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3"
                    >
                      <p className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">{s.label}</p>
                      <p className="text-[12px] sm:text-[13px] font-bold text-slate-900 leading-tight">{s.value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a href="#contact" className="flex-1 bg-[#51B8AB] text-slate-950 text-center py-3 rounded-xl font-bold text-[12px] sm:text-[13px] hover:bg-[#3FA89A] transition-colors flex items-center justify-center gap-1.5">
                    Discuss Requirements <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a href="#platforms" className="flex-1 bg-slate-900 text-white text-center py-3 rounded-xl font-bold text-[12px] sm:text-[13px] hover:bg-slate-800 transition-colors border border-slate-900">
                    See Platforms
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Mobile: dot indicators + prev/next ── */}
            <div className="flex lg:hidden items-center justify-between mt-4 px-1">
              <button
                onClick={() => active > 0 && handleSelect(active - 1)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${active > 0 ? "border-slate-300 text-slate-700 hover:bg-slate-50" : "border-slate-200 text-slate-300 cursor-not-allowed"}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {tech.map((_, i) => (
                  <button key={i} onClick={() => handleSelect(i)} className="p-1">
                    <div className={`rounded-full transition-all duration-300 ${i === active ? "w-5 h-2 bg-[#51B8AB]" : "w-2 h-2 bg-slate-300"}`} />
                  </button>
                ))}
              </div>

              <button
                onClick={() => active < tech.length - 1 && handleSelect(active + 1)}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${active < tech.length - 1 ? "border-slate-300 text-slate-700 hover:bg-slate-50" : "border-slate-200 text-slate-300 cursor-not-allowed"}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px", amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2"
        >
          {[
            { value: "ROS 2", label: "Autonomy stack" },
            { value: "≥ 95%", label: "Uptime SLA" },
            { value: "4–8 wks", label: "Deploy time" },
            { value: "OTA", label: "SW updates" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="bg-slate-50 border border-slate-200/90 rounded-xl px-3 py-3 shadow-sm"
            >
              <p className="font-heading font-bold text-[16px] sm:text-[18px] text-slate-900 leading-none mb-0.5">{s.value}</p>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium uppercase tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}




