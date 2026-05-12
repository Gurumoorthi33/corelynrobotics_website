"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingDown, IndianRupee, ArrowRight, Users, Bot, CheckCircle2 } from "lucide-react";

const ROBOT_PRICING = {
  "C100":     { hourlyRate: 30, tag: "Research & Sorting",   payload: "Light",     },
  "C100_4WD": { hourlyRate: 40, tag: "Outdoor Inspection",   payload: "Light", },
  "C500":     { hourlyRate: 50, tag: "Industrial AMR",        payload: "500 kg",   },
  "C1000":    { hourlyRate: 70, tag: "Heavy Lifter",          payload: "1,000 kg",  },
};

type RobotType = keyof typeof ROBOT_PRICING;
const MAX_SUBSCRIPTION_RATIO = 0.40;

const formatINR = (val: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

export default function ROICalculator() {
  const [robotType, setRobotType] = useState<RobotType>("C500");
  const [shifts, setShifts] = useState(1);
  const [hoursPerShift, setHoursPerShift] = useState(8);
  const [workers, setWorkers] = useState(3);
  const [workerCostPerMonth, setWorkerCostPerMonth] = useState(18000);
  const [robots, setRobots] = useState(1);

  const selectedRobot = ROBOT_PRICING[robotType];

  const results = useMemo(() => {
    const robotHoursPerMonth = robots * shifts * hoursPerShift * 26;
    const humanCostPerMonth = workers * workerCostPerMonth;
    const maxAllowedSubscriptionCost = humanCostPerMonth * MAX_SUBSCRIPTION_RATIO;
    const calculatedRobotCost = robotHoursPerMonth * selectedRobot.hourlyRate;
    const robotCostPerMonth = Math.min(calculatedRobotCost, maxAllowedSubscriptionCost);
    const actualHourlyRate = robotHoursPerMonth > 0 ? robotCostPerMonth / robotHoursPerMonth : selectedRobot.hourlyRate;
    const savings = humanCostPerMonth - robotCostPerMonth;
    const savingsPercent = humanCostPerMonth > 0 ? Math.round((savings / humanCostPerMonth) * 100) : 0;
    const annualSavings = savings * 12;
    const subscriptionRatio = humanCostPerMonth > 0 ? (robotCostPerMonth / humanCostPerMonth) * 100 : 0;
    return {
      robotCostPerMonth, humanCostPerMonth, savings, savingsPercent,
      annualSavings, robotHoursPerMonth, actualHourlyRate, subscriptionRatio,
      isCapped: calculatedRobotCost > maxAllowedSubscriptionCost,
    };
  }, [shifts, hoursPerShift, workers, workerCostPerMonth, robots, selectedRobot.hourlyRate]);

  const hasSavings = results.savings >= 0;

  return (
    <section id="roi-calculator" className="relative bg-[#1a1a1a] py-24 md:py-32 overflow-hidden">

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* Teal glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#51B8AB]/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-[#51B8AB]/10 border border-[#51B8AB]/25 rounded-full px-5 py-2 mb-6">
            <Calculator className="w-3.5 h-3.5 text-[#51B8AB]" />
            <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#51B8AB]">ROI Calculator</span>
          </div>
          <h2 className="font-heading font-bold text-[38px] md:text-[56px] lg:text-[68px] leading-[1.05] text-white mb-5">
            See What Automation
            <br />
            <span className="text-[#51B8AB]">Saves You.</span>
          </h2>
          <p className="text-[17px] text-white/45 leading-[1.75] max-w-2xl mx-auto">
            Enter your current operation details. We'll show you the exact monthly cost difference between your workforce and a Corelyn subscription.
          </p>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-5">

          {/* ── Left: Inputs ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-7 md:p-9 space-y-8"
          >
            {/* Platform selector */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/35 mb-4">Select Robot Platform</p>
              <div className="grid grid-cols-2 gap-2.5">
                {(Object.keys(ROBOT_PRICING) as RobotType[]).map((type) => {
                  const r = ROBOT_PRICING[type];
                  const isSelected = robotType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setRobotType(type)}
                      className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-250 overflow-hidden ${
                        isSelected
                          ? "border-[#51B8AB] bg-[#51B8AB]/10"
                          : "border-white/8 bg-white/4 hover:border-white/15 hover:bg-white/6"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#51B8AB] to-transparent" />
                      )}
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[18px] leading-none">{r.icon}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected ? "bg-[#51B8AB] text-slate-950" : "bg-white/8 text-white/50"
                        }`}>
                          ₹{r.hourlyRate}/hr
                        </span>
                      </div>
                      <p className={`font-heading font-bold text-[15px] leading-tight mb-0.5 ${isSelected ? "text-white" : "text-white/70"}`}>
                        {type.replace("_", " ")}
                      </p>
                      <p className={`text-[11px] ${isSelected ? "text-[#51B8AB]" : "text-white/30"}`}>{r.tag}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-white/8" />

            {/* Sliders */}
            <div className="space-y-7">
              <SliderField label="Shifts per Day" value={shifts} min={1} max={3} step={1}
                display={`${shifts} shift${shifts > 1 ? "s" : ""}`} onChange={setShifts} />
              <SliderField label="Hours per Shift" value={hoursPerShift} min={4} max={12} step={1}
                display={`${hoursPerShift} hrs`} onChange={setHoursPerShift} />
              <SliderField label="Workers on Material Movement" value={workers} min={1} max={20} step={1}
                display={`${workers} worker${workers > 1 ? "s" : ""}`} onChange={setWorkers} />
              <SliderField label="Monthly Cost per Worker" value={workerCostPerMonth} min={10000} max={60000} step={1000}
                display={formatINR(workerCostPerMonth)} onChange={setWorkerCostPerMonth} />
              <SliderField label="Corelyn Robots to Deploy" value={robots} min={1} max={10} step={1}
                display={`${robots} robot${robots > 1 ? "s" : ""}`} onChange={setRobots} />
            </div>

            <p className="text-[12px] text-white/25 pt-2 border-t border-white/8 leading-relaxed">
              Base rate ₹{selectedRobot.hourlyRate}/hr · 26 working days/month · Subscription capped at 40% of workforce cost
            </p>
          </motion.div>

          {/* ── Right: Results ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >

            {/* Cost comparison cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-white/8 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 text-white/50" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/35">Workforce</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={results.humanCostPerMonth}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-heading font-bold text-[22px] text-white leading-none mb-1"
                  >
                    {formatINR(results.humanCostPerMonth)}
                  </motion.p>
                </AnimatePresence>
                <p className="text-[11px] text-white/30">{workers} workers / mo</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-[#51B8AB]/15 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-[#51B8AB]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/35">Corelyn</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={results.robotCostPerMonth}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-heading font-bold text-[22px] text-[#51B8AB] leading-none mb-1"
                  >
                    {formatINR(results.robotCostPerMonth)}
                  </motion.p>
                </AnimatePresence>
                <p className="text-[11px] text-white/30">{results.robotHoursPerMonth} hrs / mo</p>
              </div>
            </div>

            {/* Savings hero card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={hasSavings ? "savings" : "nosavings"}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-3xl p-7 overflow-hidden ${
                  hasSavings
                    ? "bg-gradient-to-br from-[#51B8AB] to-[#2d9d8f]"
                    : "bg-white/5 backdrop-blur-sm border border-white/10"
                }`}
              >
                {hasSavings && (
                  <>
                    <div className="absolute inset-0 opacity-10" style={{
                      backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)"
                    }} />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-x-4 translate-y-8" />
                  </>
                )}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown className={`w-5 h-5 ${hasSavings ? "text-slate-950/70" : "text-white/40"}`} />
                    <span className={`text-[11px] font-bold tracking-[0.18em] uppercase ${hasSavings ? "text-slate-950/60" : "text-white/35"}`}>
                      {hasSavings ? "Monthly Savings" : "Monthly Difference"}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={results.savings}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`font-heading font-bold text-[44px] md:text-[52px] leading-none mb-4 ${hasSavings ? "text-slate-950" : "text-white"}`}
                    >
                      {hasSavings ? formatINR(results.savings) : `–`}
                    </motion.div>
                  </AnimatePresence>

                  {hasSavings ? (
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-950/70 shrink-0" />
                        <p className="text-[14px] text-slate-950/80 font-medium">
                          {results.savingsPercent}% reduction in material movement costs
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-950/70 shrink-0" />
                        <p className="text-[14px] text-slate-950/80 font-medium">
                          Subscription is only {Math.round(results.subscriptionRatio)}% of workforce cost
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-950/15">
                        <p className="text-[12px] text-slate-950/55 uppercase tracking-widest font-bold mb-1">Annual savings</p>
                        <p className="font-heading font-bold text-[26px] text-slate-950">
                          {formatINR(results.annualSavings)}
                        </p>
                      </div>
                      {results.isCapped && (
                        <p className="text-[12px] bg-slate-950/10 rounded-xl px-3 py-2 text-slate-950/60">
                          Rate adjusted to maintain 40% cost ratio
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-[14px] text-white/50 leading-relaxed">
                      Try increasing shifts or workers to see savings at this scale.
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Zero capex note */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#51B8AB]/10 border border-[#51B8AB]/20 flex items-center justify-center shrink-0 mt-0.5">
                <IndianRupee className="w-4 h-4 text-[#51B8AB]" />
              </div>
              <p className="text-[13px] text-white/45 leading-[1.65]">
                <span className="text-white font-semibold">₹0 upfront.</span> A robot purchase costs ₹15–40L. With Corelyn, that's zero — you pay only for productive runtime.
              </p>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2.5 w-full bg-[#51B8AB] text-slate-950 py-4 rounded-2xl font-bold text-[15px] hover:bg-[#3FA89A] active:scale-[0.98] transition-all shadow-[0_8px_28px_rgba(81,184,171,0.25)] hover:shadow-[0_12px_36px_rgba(81,184,171,0.35)]"
            >
              Get a Deployment Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SliderField({ label, value, min, max, step, display, onChange }: {
  label: string; value: number; min: number; max: number; step: number; display: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="text-[13px] font-medium text-white/55">{label}</label>
        <motion.span
          key={display}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-[13px] font-bold text-white bg-white/8 border border-white/10 px-3 py-1 rounded-lg tabular-nums"
        >
          {display}
        </motion.span>
      </div>
      <div className="relative h-5 flex items-center">
        {/* Track */}
        <div className="absolute inset-x-0 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#51B8AB] to-[#2d9d8f] rounded-full transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Animated dot */}
        <motion.div
          className="absolute w-5 h-5 rounded-full bg-white shadow-[0_0_10px_rgba(81,184,171,0.6)] border-2 border-[#51B8AB] pointer-events-none z-10"
          animate={{ left: `calc(${pct}% - 10px)` }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#51B8AB]/40 animate-ping" />
        </motion.div>

        {/* Hidden native input for interaction */}
        <input
          type="range"
          min={min} max={max} step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between text-[11px] text-white/20 mt-1.5">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
