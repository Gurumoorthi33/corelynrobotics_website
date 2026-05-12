"use client";

import { motion } from "framer-motion";
import { Building2, Wrench, TrendingUp, Shield } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Infrastructure Model",
    description: "We operate, maintain, and scale robots alongside your business"
  },
  {
    icon: Wrench,
    title: "Full Service",
    description: "Deployment, uptime, upgrades, and support — all included"
  },
  {
    icon: TrendingUp,
    title: "Scale Flexibly",
    description: "Add or reduce capacity as your operations evolve"
  },
  {
    icon: Shield,
    title: "Zero Capital Risk",
    description: "No upfront investment, no ownership complexity"
  }
];

export default function Positioning() {
  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgb(148 163 184 / 0.1) 1px, transparent 1px), linear-gradient(90deg, rgb(148 163 184 / 0.1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,1000px)] h-[480px] bg-[#51B8AB]/[0.06] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px", amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-12 justify-center"
        >
          <div className="h-px w-8 bg-[#51B8AB]" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#2d9d8f]">
            Our Positioning
          </span>
          <div className="h-px w-8 bg-[#51B8AB]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.01 }}
            className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-slate-200/90 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#51B8AB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
            <video 
              src="/assets/section/vdo_1.mp4" 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop
              playsInline
            />
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#51B8AB] rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#51B8AB] rounded-br-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading font-bold text-[28px] md:text-[48px] lg:text-[64px] leading-[1.1] text-slate-900 mb-6">
                A <span className="text-[#2d9d8f]">Robotics Infrastructure</span> Company.
                <br />
                <span className="text-slate-500">Not a Robot Seller.</span>
              </h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-[#51B8AB] to-[#51B8AB]/20 rounded-full mb-8" />
            </div>
          
            <div className="space-y-4 text-slate-600 text-[16px] md:text-[19px] leading-[1.75]">
              <p>
                Corelyn Robotics is a <span className="text-[#2d9d8f] font-semibold">robotics infrastructure company</span>. We don&apos;t sell machines — we operate them, maintain them, and scale them alongside your business. Think of it as <span className="text-slate-900 font-semibold">cloud computing, applied to your factory floor</span>.
              </p>
              <p>
                Our clients subscribe to robotic operations. You define the workflow; we handle everything else — deployment, uptime, upgrades, and support.
              </p>
            </div>

            <motion.a
              href="#how-it-works"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-[#51B8AB] text-slate-950 px-8 py-4 rounded-2xl font-bold text-[15px] hover:bg-[#3FA89A] transition-all duration-300 shadow-[0_8px_28px_rgba(81,184,171,0.28)] group"
            >
              Learn How It Works
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px", amount: 0.12 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                className="group relative bg-slate-50 rounded-2xl p-6 border border-slate-200/90 hover:border-[#51B8AB]/35 hover:shadow-[0_12px_32px_rgba(81,184,171,0.1)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#51B8AB]/0 group-hover:bg-[#51B8AB]/[0.04] transition-all duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#2d9d8f] mb-4 group-hover:border-[#51B8AB]/40 group-hover:scale-105 transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-[16px] text-slate-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-[14px] text-slate-600 leading-[1.6]">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px", amount: 0.12 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-slate-50 rounded-3xl p-8 border border-slate-200/90 overflow-hidden group hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-shadow duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#51B8AB] via-[#51B8AB]/50 to-transparent" />
            <div className="absolute inset-0 bg-[#51B8AB]/0 group-hover:bg-[#51B8AB]/[0.03] transition-all duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#51B8AB]" />
                <h4 className="font-heading font-bold text-[14px] text-[#2d9d8f] tracking-[0.2em] uppercase">
                  Vision
                </h4>
              </div>
              <p className="text-[17px] text-slate-600 leading-[1.7]">
                To make industrial-grade robotics accessible to every manufacturer in India — without the barrier of capital investment.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px", amount: 0.12 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-slate-50 rounded-3xl p-8 border border-slate-200/90 overflow-hidden group hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-shadow duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#51B8AB] via-[#51B8AB]/50 to-transparent" />
            <div className="absolute inset-0 bg-[#51B8AB]/0 group-hover:bg-[#51B8AB]/[0.03] transition-all duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#51B8AB]" />
                <h4 className="font-heading font-bold text-[14px] text-[#2d9d8f] tracking-[0.2em] uppercase">
                  Mission
                </h4>
              </div>
              <p className="text-[17px] text-slate-600 leading-[1.7]">
                To build a Robotics-as-a-Service platform that enables businesses — from Coimbatore textile mills to enterprise warehouses — to scale operations without ownership complexity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
