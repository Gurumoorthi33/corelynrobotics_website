"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Settings, Map, BarChart3, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: (
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
        <Settings className="w-8 h-8 text-[#51B8AB]" />
      </motion.div>
    ),
    title: "Define Your Workflow",
    description: "Tell us your floor layout, shift hours, and material movement needs.",
  },
  {
    icon: (
      <motion.div animate={{ rotate: [-5, 5, -5], x: [-1, 1, -1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <Map className="w-8 h-8 text-[#51B8AB]" />
      </motion.div>
    ),
    title: "We Deploy & Configure",
    description: "Corelyn handles installation, mapping, sensor calibration, and go-live.",
  },
  {
    icon: (
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <BarChart3 className="w-8 h-8 text-[#51B8AB]" />
      </motion.div>
    ),
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

const inclusionRows = [inclusions.slice(0, 3), inclusions.slice(3, 6)];

interface StepCardProps {
  step: typeof steps[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}

function StepCard({ step, index, scrollYProgress }: StepCardProps) {
  const start = index * 0.33 + 0.1;
  const end = start + 0.25;
  const borderProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start - 0.05, start, end, end + 0.05], [0.5, 1, 1, 0.5]);
  const cardScale = useTransform(scrollYProgress, [start - 0.05, start, end, end + 0.05], [0.97, 1, 1, 0.97]);
  const glowOpacity = useTransform(scrollYProgress, [start - 0.05, start, end, end + 0.05], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity, scale: cardScale }} className="relative w-full max-w-2xl">
      {/* Outer glow ring — sits outside card, not clipped */}
      <motion.div
        className="absolute -inset-[8px] rounded-[32px] pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: "radial-gradient(circle at center, rgba(81,184,171,0.25) 0%, rgba(81,184,171,0.1) 50%, transparent 70%)",
          boxShadow: "0 0 0 3px rgba(81,184,171,0.7), 0 0 30px 8px rgba(81,184,171,0.4), 0 0 70px 15px rgba(81,184,171,0.2)",
        }}
      />

      {/* Card — no overflow-hidden so SVG border is fully visible */}
      <div className="relative bg-[#1A1A1A] p-8 rounded-3xl border border-white/10 overflow-hidden">
        {/* Animated border overlay */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, 
              #51B8AB 0deg, 
              #51B8AB calc(${borderProgress} * 360deg), 
              transparent calc(${borderProgress} * 360deg), 
              transparent 360deg)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            padding: "2px",
          }}
        />

        {/* Step badge */}
        <div className="absolute top-5 right-5 w-9 h-9 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center z-10">
          <span className="text-[12px] font-bold text-white/60">{String(index + 1).padStart(2, "0")}</span>
        </div>

        <div className="flex items-center gap-5 mb-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-[#51B8AB]/15 border border-[#51B8AB]/30 flex items-center justify-center shrink-0">
            {step.icon}
          </div>
          <h4 className="font-heading font-bold text-[24px] md:text-[32px] text-white leading-tight">
            {step.title}
          </h4>
        </div>
        <p className="text-[18px] md:text-[22px] text-white/70 leading-[1.6]">{step.description}</p>
      </div>
    </motion.div>
  );
}

function Connector({ index, scrollYProgress }: { index: number; scrollYProgress: MotionValue<number> }) {
  const start = index * 0.33;
  const end = start + 0.1;
  const heightProgress = useTransform(scrollYProgress, [start, end], ["0%", "100%"]);

  return (
    <div className="relative w-full h-24 md:h-32 flex justify-center">
      <div className="w-[2px] h-full bg-white/10 relative">
        <motion.div className="absolute top-0 left-0 w-full bg-[#51B8AB]" style={{ height: heightProgress }} />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#51B8AB] rounded-full shadow-[0_0_15px_rgba(81,184,171,0.9),0_0_30px_rgba(81,184,171,0.4)] z-10"
          style={{
            top: heightProgress,
            scale: useTransform(scrollYProgress, [start, end], [0, 1.2]),
            opacity: useTransform(scrollYProgress, [start, start + 0.02, end - 0.02, end], [0, 1, 1, 0]),
          }}
        />
      </div>
    </div>
  );
}

interface InclusionCardProps {
  text: string;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
}

function InclusionCard({ text, start, end, scrollYProgress }: InclusionCardProps) {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);
  const cardScale = useTransform(scrollYProgress, [start, end], [0.95, 1]);
  const lineScaleX = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale: cardScale }}
      className="flex items-start bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 shadow-sm hover:border-[#51B8AB]/40 hover:shadow-[0_4px_20px_rgba(81,184,171,0.15)] transition-all duration-300 relative overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-[#51B8AB]"
        style={{ scaleX: lineScaleX, transformOrigin: "left" }}
      />
      <CheckCircle2 className="w-6 h-6 text-[#51B8AB] mr-4 shrink-0 mt-0.5" />
      <p className="text-[16px] text-white/80 font-medium leading-[1.5]">{text}</p>
    </motion.div>
  );
}

function InclusionRow({ row, rowIndex, scrollYProgress }: { row: string[]; rowIndex: number; scrollYProgress: MotionValue<number> }) {
  const start = 0.1 + rowIndex * 0.4;
  const end = start + 0.3;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {row.map((text, i) => (
        <InclusionCard key={i} text={text} start={start} end={end} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

export default function HowItWorks() {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const inclusionsContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: stepsProgress } = useScroll({ target: stepsContainerRef, offset: ["start 60%", "end 40%"] });
  const { scrollYProgress: inclusionsProgress } = useScroll({ target: inclusionsContainerRef, offset: ["start 70%", "end 30%"] });

  const blastScale1 = useTransform(stepsProgress, [0.95, 1], [0, 12]);
  const blastScale2 = useTransform(stepsProgress, [0.96, 1], [0, 8]);
  const blastScale3 = useTransform(stepsProgress, [0.97, 1], [0, 4]);
  const blastOpacity = useTransform(stepsProgress, [0.95, 0.98, 1], [0, 1, 0]);

  return (
    <section id="how-it-works" className="bg-[#0A0A0A] py-24 md:py-32 overflow-hidden relative">
      {/* Ambient green glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-[#51B8AB]/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Heading card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mb-20 mx-auto text-center relative"
        >
          {/* Glowing background card */}
          <div className="absolute inset-0 -mx-8 -my-8 bg-gradient-to-br from-[#1A1A1A] via-[#0A0A0A] to-[#1A1A1A] rounded-3xl border border-[#51B8AB]/20 shadow-[0_0_80px_rgba(81,184,171,0.15)] pointer-events-none" />
          
          {/* Animated border glow */}
          <div className="absolute inset-0 -mx-8 -my-8 rounded-3xl overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                background: "conic-gradient(from 0deg, transparent 0deg, #51B8AB 90deg, transparent 180deg, #51B8AB 270deg, transparent 360deg)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-[2px] bg-[#0A0A0A] rounded-3xl" />
          </div>

          <div className="relative px-8 py-10">
            {/* Top accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#51B8AB]" />
              <div className="w-3 h-3 rounded-full bg-[#51B8AB] shadow-[0_0_20px_rgba(81,184,171,0.8)]" />
              <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#51B8AB]" />
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#51B8AB]/10 border border-[#51B8AB]/30 rounded-full px-5 py-2 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[#51B8AB] animate-pulse" />
              <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#51B8AB]">
                Subscription Model
              </span>
            </motion.div>

            <h2 className="font-heading font-bold text-[40px] md:text-[56px] lg:text-[72px] leading-[1.05] text-white mb-6 mt-4">
              You <span className="text-white/50">Don't</span> Buy a Robot.
              <br />
              You <span className="text-[#51B8AB]">Subscribe</span> to an <span className="text-[#51B8AB]">Operation</span>.
            </h2>
            
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#51B8AB]/50" />
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-[#51B8AB]" />
                <div className="w-1 h-1 rounded-full bg-[#51B8AB]/60" />
                <div className="w-1 h-1 rounded-full bg-[#51B8AB]/30" />
              </div>
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#51B8AB]/50" />
            </div>

            <p className="text-[18px] md:text-[22px] text-white/70 leading-[1.75] max-w-2xl mx-auto">
              Billing is tied directly to <span className="text-[#51B8AB] font-semibold">productive runtime</span>. We handle the complexity; you reap the <span className="text-white font-semibold">productivity</span>.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              {[
                { icon: "⚡", text: "Pay per hour" },
                { icon: "🔧", text: "Zero maintenance" },
                { icon: "📈", text: "Scale on demand" },
                { icon: "🛡️", text: "No capital risk" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 bg-[#1A1A1A] border border-white/10 rounded-full px-4 py-2 hover:border-[#51B8AB]/40 hover:bg-[#51B8AB]/5 transition-all duration-300"
                >
                  <span className="text-[16px]">{item.icon}</span>
                  <span className="text-[13px] font-medium text-white/80">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div ref={stepsContainerRef} className="flex flex-col items-center py-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              <Connector index={index} scrollYProgress={stepsProgress} />
              <StepCard step={step} index={index} scrollYProgress={stepsProgress} />
            </div>
          ))}

          <div className="w-full h-32 flex justify-center relative">
            <div className="w-[2px] h-full bg-white/10 relative">
              <motion.div className="absolute top-0 left-0 w-full bg-[#51B8AB]" style={{ height: useTransform(stepsProgress, [0.95, 1], ["0%", "100%"]) }} />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-20">
                <motion.div style={{ scale: blastScale1, opacity: blastOpacity }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#51B8AB] rounded-full border-2 border-[#3FA89A]" />
                <motion.div style={{ scale: blastScale2, opacity: blastOpacity }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#3FA89A] rounded-full border border-white/20" />
                <motion.div style={{ scale: blastScale3, opacity: blastOpacity }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_30px_rgba(81,184,171,0.6),0_0_60px_rgba(81,184,171,0.3)]" />
              </div>
            </div>
          </div>
        </div>

        {/* Inclusions */}
        <div ref={inclusionsContainerRef} className="mt-32 flex flex-col gap-8 relative">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[2px] h-[100px] bg-white/10 overflow-hidden">
            <motion.div className="absolute top-0 left-0 w-full bg-[#51B8AB]" style={{ height: useTransform(inclusionsProgress, [0, 0.1], ["0%", "100%"]) }} />
          </div>
          {inclusionRows.map((row, idx) => (
            <InclusionRow key={idx} row={row} rowIndex={idx} scrollYProgress={inclusionsProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
