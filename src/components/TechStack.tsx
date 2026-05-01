"use client";

import { motion } from "framer-motion";
import { Compass, Zap, Blocks, Shield, LayoutDashboard, Link } from "lucide-react";

const tech = [
  {
    icon: <Compass className="w-8 h-8 text-[#1A1A1A]" />,
    title: "Autonomous Navigation",
    description: "Advanced SLAM algorithms ensuring precision routing even in dynamic, high-traffic environments.",
  },
  {
    icon: <Zap className="w-8 h-8 text-[#1A1A1A]" />,
    title: "Motor Control",
    description: "High-torque precision drive systems engineered for heavy payloads and continuous multi-shift operations.",
  },
  {
    icon: <Blocks className="w-8 h-8 text-[#1A1A1A]" />,
    title: "Modular Architecture",
    description: "Scalable design allowing seamless upgrades, easier maintenance, and rapid adaptation to new tasks.",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#1A1A1A]" />,
    title: "Safety Systems",
    description: "Multi-layer collision avoidance with redundant sensors, LiDAR, and safety-rated emergency stops.",
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 text-[#1A1A1A]" />,
    title: "Fleet Dashboard",
    description: "Live tracking interface providing real-time telemetry, analytics, and fleet health monitoring.",
  },
  {
    icon: <Link className="w-8 h-8 text-[#1A1A1A]" />,
    title: "Custom Integration",
    description: "Seamless connectivity with existing WMS, ERP, and factory automation systems via robust APIs.",
  },
];

export default function TechStack() {
  return (
    <section id="technology" className="bg-[#1A1A1A] py-24 md:py-32 relative overflow-hidden">
      {/* Background graphic element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2B2B2B] rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-16 text-center md:text-left mx-auto md:mx-0"
        >
          <h2 className="font-heading font-bold text-[36px] md:text-[48px] leading-[1.1] text-white mb-6">
            Engineering Excellence
          </h2>
          <p className="text-[18px] md:text-[20px] text-[#D0D0D0] leading-[1.7]">
            Every Corelyn platform is built on an integrated autonomous systems stack,
            designed for industrial reliability — not controlled demonstrations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tech.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              className="bg-white p-8 rounded-lg hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="font-heading font-bold text-[22px] text-[#1A1A1A] mb-3">
                {item.title}
              </h3>
              <p className="text-[16px] text-[#4A4A4A] leading-[1.6]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
