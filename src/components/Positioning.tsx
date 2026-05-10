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
    <section className="bg-[#0A0A0A] py-24 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#51B8AB]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-12 justify-center"
        >
          <div className="h-px w-8 bg-[#51B8AB]" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#51B8AB]">
            Our Positioning
          </span>
          <div className="h-px w-8 bg-[#51B8AB]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Side: Video */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(81,184,171,0.15)] border border-[#51B8AB]/20 group"
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
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#51B8AB] rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#51B8AB] rounded-br-3xl" />
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading font-bold text-[36px] md:text-[56px] lg:text-[64px] leading-[1.05] text-white mb-6">
                A <span className="text-[#51B8AB]">Robotics Infrastructure</span> Company.
                <br />
                <span className="text-white/70">Not a Robot Seller.</span>
              </h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-[#51B8AB] to-[#51B8AB]/20 rounded-full mb-8" />
            </div>
          
            <div className="space-y-5 text-white/80 text-[17px] md:text-[19px] leading-[1.75]">
              <p>
                Corelyn Robotics is a <span className="text-[#51B8AB] font-semibold">robotics infrastructure company</span>. We don't sell machines — we operate them, maintain them, and scale them alongside your business. Think of it as <span className="text-white font-semibold">cloud computing, applied to your factory floor</span>.
              </p>
              <p>
                Our clients subscribe to robotic operations. You define the workflow; we handle everything else — deployment, uptime, upgrades, and support.
              </p>
            </div>

            {/* CTA Button */}
            <motion.a
              href="#how-it-works"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-[#51B8AB] text-[#0A0A0A] px-8 py-4 rounded-2xl font-bold text-[15px] hover:bg-[#3FA89A] transition-all duration-300 shadow-[0_0_30px_rgba(81,184,171,0.4)] hover:shadow-[0_0_40px_rgba(81,184,171,0.6)] group"
            >
              Learn How It Works
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 hover:border-[#51B8AB]/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#51B8AB]/0 group-hover:bg-[#51B8AB]/5 transition-all duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-[#51B8AB]/15 border border-[#51B8AB]/30 flex items-center justify-center text-[#51B8AB] mb-4 group-hover:bg-[#51B8AB]/25 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-[16px] text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-[14px] text-white/60 leading-[1.6]">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-[#1A1A1A] rounded-3xl p-8 border border-white/5 overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#51B8AB] via-[#51B8AB]/50 to-transparent" />
            <div className="absolute inset-0 bg-[#51B8AB]/0 group-hover:bg-[#51B8AB]/5 transition-all duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#51B8AB]" />
                <h4 className="font-heading font-bold text-[14px] text-[#51B8AB] tracking-[0.2em] uppercase">
                  Vision
                </h4>
              </div>
              <p className="text-[17px] text-white/80 leading-[1.7]">
                To make industrial-grade robotics accessible to every manufacturer in India — without the barrier of capital investment.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative bg-[#1A1A1A] rounded-3xl p-8 border border-white/5 overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#51B8AB] via-[#51B8AB]/50 to-transparent" />
            <div className="absolute inset-0 bg-[#51B8AB]/0 group-hover:bg-[#51B8AB]/5 transition-all duration-500" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#51B8AB]" />
                <h4 className="font-heading font-bold text-[14px] text-[#51B8AB] tracking-[0.2em] uppercase">
                  Mission
                </h4>
              </div>
              <p className="text-[17px] text-white/80 leading-[1.7]">
                To build a Robotics-as-a-Service platform that enables businesses — from Coimbatore textile mills to enterprise warehouses — to scale operations without ownership complexity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}




