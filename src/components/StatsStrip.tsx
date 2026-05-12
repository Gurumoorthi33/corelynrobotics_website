"use client";

import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { IndianRupee, Cpu, Weight, ArrowRight } from "lucide-react";

const stats = [
  {
    icon: IndianRupee,
    prefix: "₹",
    value: 50,
    suffix: "/hr",
    label: "Starting Runtime Rate",
    sub: "Per robot · productive hours only · no idle billing",
    detail: "Pay only when the robot is actively working on your floor.",
    accent: "No upfront capital",
  },
  {
    icon: Cpu,
    prefix: "",
    value: 4,
    suffix: " Platforms",
    label: "Robot Platforms",
    sub: "AMR · Sorter · Inspection · Heavy Lifter",
    detail: "From compact lab sorters to 1,000 kg industrial tuggers.",
    accent: "One subscription model",
  },
  {
    icon: Weight,
    prefix: "",
    value: 2000,
    suffix: " kg",
    label: "Max Payload Capacity",
    sub: "100 kg entry · 1,000 kg heavy class",
    detail: "SME sorting lines to heavy manufacturing and cold chain.",
    accent: "Enterprise ready",
  },
];

function AnimatedNumber({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent =
            prefix +
            (value >= 1000 ? Math.round(v).toLocaleString("en-IN") : Math.round(v).toString()) +
            suffix;
        }
      },
    });
    return controls.stop;
  }, [inView, value, prefix, suffix, motionVal]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export default function StatsStrip() {
  return (
    <section className="w-full bg-slate-50 relative overflow-hidden border-y border-slate-200/80">

      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgb(148 163 184 / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(148 163 184 / 0.12) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#51B8AB]/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(90vw,800px)] h-[120px] bg-[#51B8AB]/6 rounded-full blur-[70px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px", amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="h-px w-8 bg-[#51B8AB]" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#2d9d8f]">
            Subscription Model
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px", amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-[0_4px_24px_rgba(15,23,42,0.05)] hover:border-[#51B8AB]/35 hover:shadow-[0_12px_40px_rgba(81,184,171,0.12)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#51B8AB]/0 to-[#51B8AB]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#51B8AB]/35 to-transparent" />

                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#e8f7f5] border border-[#51B8AB]/25 flex items-center justify-center text-[#2d9d8f] group-hover:bg-[#51B8AB]/15 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#2d9d8f] bg-[#e8f7f5] border border-[#51B8AB]/20 px-3 py-1.5 rounded-full">
                    {stat.accent}
                  </span>
                </div>

                <div className="font-heading font-bold text-[52px] md:text-[58px] leading-none text-slate-900 mb-1 tabular-nums tracking-tight">
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>

                <h3 className="font-heading font-semibold text-[15px] text-slate-600 mb-4 tracking-wide">
                  {stat.label}
                </h3>

                <div className="w-10 h-[2px] bg-gradient-to-r from-[#51B8AB] to-[#51B8AB]/20 rounded-full mb-4" />

                <p className="text-[12px] text-slate-500 tracking-wide mb-3 font-medium leading-relaxed">
                  {stat.sub}
                </p>

                <p className="text-[14px] text-slate-600 leading-[1.65]">
                  {stat.detail}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px", amount: 0.12 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_24px_rgba(15,23,42,0.05)] px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-gradient-to-b from-transparent via-[#51B8AB] to-transparent rounded-full" />
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#51B8AB]/25 to-transparent" />

          <div className="pl-4">
            <p className="text-[16px] font-semibold text-slate-900 leading-[1.6] mb-1">
              All platforms on a single subscription.
            </p>
            <p className="text-[14px] text-slate-600 leading-[1.6]">
              Scale up or down as your operation evolves — no lock-in, no capital expenditure.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <a
              href="#roi-calculator"
              className="text-[14px] font-bold text-slate-700 border border-slate-300 px-5 py-3 rounded-2xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
            >
              Calculate ROI
            </a>
            <a
              href="#platforms"
              className="inline-flex items-center gap-2 text-[14px] font-bold bg-[#51B8AB] text-slate-950 px-5 py-3 rounded-2xl hover:bg-[#3FA89A] transition-colors shadow-[0_4px_20px_rgba(81,184,171,0.25)] hover:shadow-[0_8px_28px_rgba(81,184,171,0.35)]"
            >
              Explore Platforms <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#51B8AB]/50 to-transparent" />
    </section>
  );
}
