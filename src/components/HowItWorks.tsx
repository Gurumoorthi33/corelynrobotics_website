"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Settings, Map, BarChart3, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <Settings className="w-8 h-8 text-[#1A1A1A]" />
      </motion.div>
    ),
    title: "Define Your Workflow",
    description: "Tell us your floor layout, shift hours, and material movement needs.",
  },
  {
    icon: (
      <motion.div
        animate={{ 
          rotate: [-5, 5, -5],
          x: [-1, 1, -1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Map className="w-8 h-8 text-[#1A1A1A]" />
      </motion.div>
    ),
    title: "We Deploy & Configure",
    description: "Corelyn handles installation, mapping, sensor calibration, and go-live.",
  },
  {
    icon: (
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <BarChart3 className="w-8 h-8 text-[#1A1A1A]" />
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

// Group inclusions into rows of 3 for desktop
const inclusionRows = [
  inclusions.slice(0, 3),
  inclusions.slice(3, 6),
];

interface StepCardProps {
  step: typeof steps[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}

function StepCard({ step, index, scrollYProgress }: StepCardProps) {
  const start = index * 0.33 + 0.1; 
  const end = start + 0.2;
  const borderProgress = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start - 0.05, start, end, end + 0.05], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [start - 0.05, start, end, end + 0.05], [0.98, 1, 1, 0.98]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="relative w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-[#EEEEEE]"
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <motion.path
          d="M 50 0 L 0 0 L 0 100 L 50 100"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="1"
          style={{ pathLength: borderProgress }}
        />
        <motion.path
          d="M 50 0 L 100 0 L 100 100 L 50 100"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="1"
          style={{ pathLength: borderProgress }}
        />
      </svg>
      <div className="flex items-center gap-6 mb-6">
        <div className="shrink-0">{step.icon}</div>
        <h4 className="font-heading font-bold text-[24px] md:text-[32px] text-[#1A1A1A] leading-tight">
          <span className="text-[14px] md:text-[16px] uppercase tracking-wider text-[#999999]">Step {index + 1}</span> <br />
          {step.title}
        </h4>
      </div>
      <p className="text-[18px] md:text-[22px] text-[#4A4A4A] leading-[1.6]">{step.description}</p>
    </motion.div>
  );
}

function Connector({ index, scrollYProgress }: { index: number, scrollYProgress: MotionValue<number> }) {
  const start = index * 0.33;
  const end = start + 0.1;
  const heightProgress = useTransform(scrollYProgress, [start, end], ["0%", "100%"]);
  
  return (
    <div className="relative w-full h-24 md:h-32 flex justify-center">
      <div className="w-[2px] h-full bg-black/10 relative">
        <motion.div className="absolute top-0 left-0 w-full bg-black shadow-[0_0_10px_#fff]" style={{ height: heightProgress }} />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff,0_0_30px_#fff] z-10"
          style={{ 
            top: heightProgress,
            scale: useTransform(scrollYProgress, [start, end], [0, 1.2]),
            opacity: useTransform(scrollYProgress, [start, start + 0.02, end - 0.02, end], [0, 1, 1, 0])
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
  const scale = useTransform(scrollYProgress, [start, end], [0.95, 1]);
  const lineScaleX = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="flex items-start bg-white p-6 rounded-lg border border-[#EEEEEE] shadow-sm relative overflow-hidden"
    >
      <motion.div 
        className="absolute top-0 left-0 w-full h-[2px] bg-black"
        style={{ 
          scaleX: lineScaleX,
          transformOrigin: "left"
        }}
      />
      <CheckCircle2 className="w-6 h-6 text-[#1A1A1A] mr-4 shrink-0 mt-0.5" />
      <p className="text-[16px] text-[#1A1A1A] font-medium leading-[1.5]">{text}</p>
    </motion.div>
  );
}

function InclusionRow({ row, rowIndex, scrollYProgress }: { row: string[], rowIndex: number, scrollYProgress: MotionValue<number> }) {
  const start = 0.1 + rowIndex * 0.4;
  const end = start + 0.3;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {row.map((text, i) => (
        <InclusionCard 
          key={i} 
          text={text} 
          start={start} 
          end={end} 
          scrollYProgress={scrollYProgress} 
        />
      ))}
    </div>
  );
}

export default function HowItWorks() {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const inclusionsContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsContainerRef,
    offset: ["start center", "end center"]
  });

  const { scrollYProgress: inclusionsProgress } = useScroll({
    target: inclusionsContainerRef,
    offset: ["start 80%", "end 20%"]
  });

  // Multilayered Blast animation values
  const blastScale1 = useTransform(stepsProgress, [0.95, 1], [0, 12]); // Outer Black
  const blastScale2 = useTransform(stepsProgress, [0.96, 1], [0, 8]);  // Mid Grey
  const blastScale3 = useTransform(stepsProgress, [0.97, 1], [0, 4]);  // Inner White
  
  const blastOpacity = useTransform(stepsProgress, [0.95, 0.98, 1], [0, 1, 0]);

  return (
    <section id="how-it-works" className="bg-[#F5F5F5] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-16 mx-auto text-center"
        >
          <h2 className="font-heading font-bold text-[36px] md:text-[64px] leading-[1.1] text-[#1A1A1A] mb-6">
            You D<span id="wheel-end" style={{ opacity: 0, display: 'inline-block', width: '1.2ch', height: '1em' }}>o</span>n&apos;t Buy a Robot. <br />
            You Subscribe to an Operation.
          </h2>
          <p className="text-[18px] md:text-[20px] text-[#4A4A4A] leading-[1.7]">
            Billing is tied directly to productive runtime. We handle the complexity; you reap the productivity.
          </p>
        </motion.div>

        {/* Vertical Steps Section */}
        <div ref={stepsContainerRef} className="flex flex-col items-center py-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              <Connector index={index} scrollYProgress={stepsProgress} />
              <StepCard step={step} index={index} scrollYProgress={stepsProgress} />
            </div>
          ))}
          
          <div className="w-full h-32 flex justify-center relative">
            <div className="w-[2px] h-full bg-black/10 relative">
               <motion.div 
                className="absolute top-0 left-0 w-full bg-black shadow-[0_0_10px_#fff]"
                style={{ height: useTransform(stepsProgress, [0.95, 1], ["0%", "100%"]) }}
              />
              
              {/* Multi-layered Powerful Blast Effect */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-20">
                {/* Outer Black Wave */}
                <motion.div 
                  style={{ scale: blastScale1, opacity: blastOpacity }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border-2 border-black/50"
                />
                {/* Middle Grey Wave */}
                <motion.div 
                  style={{ scale: blastScale2, opacity: blastOpacity }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#4A4A4A] rounded-full border border-white/20"
                />
                {/* Inner White Core */}
                <motion.div 
                  style={{ scale: blastScale3, opacity: blastOpacity }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_30px_#fff,0_0_60px_#fff]"
                />
              </div>
            </div>
          </div>
        </div>

        <div ref={inclusionsContainerRef} className="mt-32 flex flex-col gap-8 relative">
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[2px] h-[100px] bg-black/20 overflow-hidden">
             <motion.div 
                className="absolute top-0 left-0 w-full bg-black"
                style={{ height: useTransform(inclusionsProgress, [0, 0.1], ["0%", "100%"]) }}
              />
          </div>

          {inclusionRows.map((row, idx) => (
            <InclusionRow key={idx} row={row} rowIndex={idx} scrollYProgress={inclusionsProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
