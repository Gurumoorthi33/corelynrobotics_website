"use client";

import { motion } from "framer-motion";
import { Settings, Map, BarChart3, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: <Settings className="w-8 h-8 text-[#1A1A1A]" />,
    title: "Define Your Workflow",
    description: "Tell us your floor layout, shift hours, and material movement needs.",
  },
  {
    icon: <Map className="w-8 h-8 text-[#1A1A1A]" />,
    title: "We Deploy & Configure",
    description: "Corelyn handles installation, mapping, sensor calibration, and go-live.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-[#1A1A1A]" />,
    title: "Subscribe & Scale",
    description: "Pay per productive hour. Add robots as your operation grows.",
  },
];

const inclusions = [
  "No upfront capital expenditure",
  "Scheduled + unscheduled maintenance covered",
  "Remote monitoring via live fleet dashboard",
  "Software & firmware updates included",
  "Flexible scale-up or scale-down",
  "Dedicated support, Coimbatore-region response",
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F5F5F5] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-16"
        >
          <h2 className="font-heading font-bold text-[36px] md:text-[64px] leading-[1.1] text-[#1A1A1A] mb-6">
            You D<span id="wheel-end" style={{ opacity: 0, display: 'inline-block', width: '1.2ch', height: '1em' }}>o</span>n&apos;t Buy a Robot. <br className="hidden sm:block" />
            You Subscribe to an Operation.
          </h2>
          <p className="text-[18px] md:text-[20px] text-[#4A4A4A] leading-[1.7]">
            Billing is tied directly to productive runtime — hours the robot is
            actively working on your floor. When the robot is idle, charging, or
            offline, you&apos;re not charged.
          </p>
        </motion.div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative">
          <div className="hidden md:block absolute top-6 left-12 right-12 h-[1px] bg-[#D0D0D0] -z-10" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="bg-white p-8 rounded-lg shadow-sm border border-[#EEEEEE] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-6 relative z-10">
                {step.icon}
              </div>
              <h4 className="font-heading font-bold text-[24px] text-[#1A1A1A] mb-3">
                Step {index + 1} <br />
                {step.title}
              </h4>
              <p className="text-[18px] text-[#4A4A4A] leading-[1.6]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Inclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inclusions.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="flex items-start bg-white p-6 rounded-lg border border-[#EEEEEE]"
            >
              <CheckCircle2 className="w-6 h-6 text-[#1A1A1A] mr-4 shrink-0 mt-0.5" />
              <p className="text-[16px] text-[#1A1A1A] font-medium leading-[1.5]">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
