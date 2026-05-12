"use client";

import { motion } from "framer-motion";
import { Shield, Award, Users, TrendingUp, CheckCircle2, Star } from "lucide-react";

const trustMetrics = [
  {
    icon: Shield,
    value: "4 Platforms",
    label: "Deployment Ready",
    description: "From compact sorters to 1,000 kg heavy AMRs"
  },
  {
    icon: Award,
    value: "95%+",
    label: "Uptime SLA",
    description: "Guaranteed availability"
  },
  {
    icon: Users,
    value: "24/7",
    label: "Support",
    description: "Dedicated ops team"
  },
  {
    icon: TrendingUp,
    value: "3-6 mo",
    label: "ROI Timeline",
    description: "Typical payback period"
  }
];

const certifications = [
  "Made in India",
  "ROS 2 Compatible",
  "Industrial Grade",
  "CE Compliant",
  "Local Support"
];

export default function TrustSignals() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16 md:py-20 border-y border-slate-200/80 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgb(148 163 184 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(148 163 184 / 0.08) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {trustMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#51B8AB]/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e8f7f5] border border-[#51B8AB]/25 flex items-center justify-center text-[#2d9d8f] group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-[20px] text-slate-900 leading-none mb-1">{metric.value}</p>
                    <p className="text-[12px] font-bold text-slate-600 uppercase tracking-wide">{metric.label}</p>
                  </div>
                </div>
                <p className="text-[13px] text-slate-600 leading-relaxed">{metric.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#51B8AB] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-[15px] text-slate-900">Certified & Trusted</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 flex-1">
              {certifications.map((cert, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full hover:border-[#51B8AB]/40 transition-colors"
                >
                  <Star className="w-3 h-3 text-[#51B8AB]" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-[15px] text-slate-600 leading-relaxed max-w-3xl mx-auto">
            <span className="font-semibold text-slate-900">Trusted by manufacturers across Tamil Nadu.</span> Incubated at R Shivakumar Foundation – TBIF, SRM TRP Engineering College. Backed by industry expertise and local support infrastructure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
