"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, Clock, IndianRupee } from "lucide-react";

const HOURLY_RATE = 500;

export default function ROICalculator() {
  const [shifts, setShifts] = useState(1);
  const [hoursPerShift, setHoursPerShift] = useState(8);
  const [workers, setWorkers] = useState(3);
  const [workerCostPerMonth, setWorkerCostPerMonth] = useState(18000);
  const [robots, setRobots] = useState(1);

  const results = useMemo(() => {
    const robotHoursPerMonth = robots * shifts * hoursPerShift * 26; // 26 working days
    const robotCostPerMonth = robotHoursPerMonth * HOURLY_RATE;
    const humanCostPerMonth = workers * workerCostPerMonth;
    const savings = humanCostPerMonth - robotCostPerMonth;
    const savingsPercent = humanCostPerMonth > 0 ? Math.round((savings / humanCostPerMonth) * 100) : 0;
    const annualSavings = savings * 12;
    const breakEvenMonths = savings > 0 ? null : Math.abs(Math.round(savings / (humanCostPerMonth / 12)));

    return {
      robotCostPerMonth,
      humanCostPerMonth,
      savings,
      savingsPercent,
      annualSavings,
      robotHoursPerMonth,
      breakEvenMonths,
    };
  }, [shifts, hoursPerShift, workers, workerCostPerMonth, robots]);

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <section id="roi-calculator" className="bg-white py-24 md:py-32 border-t border-[#EEEEEE]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center">
              <Calculator className="w-5 h-5 text-[#1A1A1A]" />
            </div>
            <span className="text-sm font-bold tracking-wider uppercase text-[#4A4A4A]">ROI Calculator</span>
          </div>
          <h2 className="font-heading font-bold text-[36px] md:text-[48px] leading-[1.1] text-[#1A1A1A] mb-6">
            See What Automation Saves You
          </h2>
          <p className="text-[18px] text-[#4A4A4A] leading-[1.7]">
            Enter your current operation details. We&apos;ll show you the monthly cost difference between your existing workforce and a Corelyn subscription.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#F5F5F5] p-8 md:p-10 rounded-xl space-y-8"
          >
            <h3 className="font-heading font-bold text-[22px] text-[#1A1A1A]">Your Current Operation</h3>

            <div className="space-y-6">
              <SliderField
                label="Number of Shifts per Day"
                value={shifts}
                min={1} max={3} step={1}
                display={`${shifts} shift${shifts > 1 ? "s" : ""}`}
                onChange={setShifts}
              />
              <SliderField
                label="Hours per Shift"
                value={hoursPerShift}
                min={4} max={12} step={1}
                display={`${hoursPerShift} hrs`}
                onChange={setHoursPerShift}
              />
              <SliderField
                label="Workers Handling Material Movement"
                value={workers}
                min={1} max={20} step={1}
                display={`${workers} workers`}
                onChange={setWorkers}
              />
              <SliderField
                label="Monthly Cost per Worker (₹)"
                value={workerCostPerMonth}
                min={10000} max={60000} step={1000}
                display={formatINR(workerCostPerMonth)}
                onChange={setWorkerCostPerMonth}
              />
              <SliderField
                label="Corelyn Robots to Deploy"
                value={robots}
                min={1} max={10} step={1}
                display={`${robots} robot${robots > 1 ? "s" : ""}`}
                onChange={setRobots}
              />
            </div>

            <p className="text-[13px] text-[#4A4A4A] border-t border-[#D0D0D0] pt-4">
              Assumes ₹{HOURLY_RATE}/hr per robot · 26 working days/month · productive hours only billed
            </p>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="space-y-6"
          >
            <h3 className="font-heading font-bold text-[22px] text-[#1A1A1A]">Monthly Comparison</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard
                icon={<IndianRupee className="w-5 h-5" />}
                label="Current Workforce Cost"
                value={formatINR(results.humanCostPerMonth)}
                sub={`${workers} workers × ${formatINR(workerCostPerMonth)}`}
                highlight={false}
              />
              <ResultCard
                icon={<Clock className="w-5 h-5" />}
                label="Corelyn Subscription Cost"
                value={formatINR(results.robotCostPerMonth)}
                sub={`${results.robotHoursPerMonth} hrs × ₹${HOURLY_RATE}`}
                highlight={false}
              />
            </div>

            <div className={`rounded-xl p-8 border-2 ${results.savings >= 0 ? "bg-[#2DBD6E] border-[#2DBD6E] text-white" : "bg-[#F5F5F5] border-[#D0D0D0] text-[#1A1A1A]"}`}>
              <div className="flex items-center gap-3 mb-2">
                <TrendingDown className="w-6 h-6" />
                <span className="text-sm font-bold tracking-wider uppercase opacity-70">
                  {results.savings >= 0 ? "Monthly Savings" : "Monthly Difference"}
                </span>
              </div>
              <div className="font-heading font-bold text-[48px] leading-none mb-2">
                {results.savings >= 0 ? formatINR(results.savings) : `+${formatINR(Math.abs(results.savings))}`}
              </div>
              {results.savings >= 0 ? (
                <>
                  <p className="opacity-70 text-[16px]">
                    {results.savingsPercent}% reduction in material movement costs
                  </p>
                  <p className="mt-4 font-bold text-[20px]">
                    {formatINR(results.annualSavings)} saved annually
                  </p>
                </>
              ) : (
                <p className="opacity-70 text-[16px]">
                  Robots cost more at this scale — try increasing shifts or workers to see savings.
                </p>
              )}
            </div>

            <div className="bg-[#F5F5F5] rounded-xl p-6 border border-[#EEEEEE]">
              <p className="text-[15px] text-[#4A4A4A] leading-[1.6]">
                <strong className="text-[#1A1A1A]">No capital expenditure.</strong> These numbers reflect operating cost only. A robot purchase would cost ₹15–40L upfront — with Corelyn, that&apos;s zero.
              </p>
            </div>

            <a
              href="#contact"
              className="block w-full bg-[#2DBD6E] text-white text-center py-4 rounded-lg font-bold text-[18px] hover:bg-[#22A05C] transition-colors"
            >
              Get a Deployment Quote →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SliderField({
  label, value, min, max, step, display, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number; display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-[15px] font-medium text-[#1A1A1A]">{label}</label>
        <span className="text-[15px] font-bold text-[#1A1A1A] bg-white px-3 py-1 rounded border border-[#D0D0D0]">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-[#D0D0D0] rounded-full appearance-none cursor-pointer accent-[#2DBD6E]"
      />
      <div className="flex justify-between text-[12px] text-[#4A4A4A] mt-1">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

function ResultCard({ icon, label, value, sub, highlight }: {
  icon: React.ReactNode; label: string; value: string; sub: string; highlight: boolean;
}) {
  return (
    <div className={`p-6 rounded-xl border ${highlight ? "bg-[#2DBD6E] text-white border-[#2DBD6E]" : "bg-[#F5F5F5] border-[#EEEEEE] text-[#1A1A1A]"}`}>
      <div className={`mb-3 ${highlight ? "text-white" : "text-[#4A4A4A]"}`}>{icon}</div>
      <p className={`text-[13px] font-bold tracking-wider uppercase mb-1 ${highlight ? "opacity-70" : "text-[#4A4A4A]"}`}>{label}</p>
      <p className="font-heading font-bold text-[28px] leading-tight">{value}</p>
      <p className={`text-[13px] mt-1 ${highlight ? "opacity-60" : "text-[#4A4A4A]"}`}>{sub}</p>
    </div>
  );
}




