"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, Clock, IndianRupee } from "lucide-react";

const ROBOT_PRICING = {
  "C100": { hourlyRate: 30, name: "C100 - Compact Sorter", description: "Research & Sorting" },
  "C100_4WD": { hourlyRate: 40, name: "C100 4WD - Outdoor Inspection", description: "All-terrain" },
  "C500": { hourlyRate: 50, name: "C500 - Industrial AMR", description: "500 kg payload" },
  "C1000": { hourlyRate: 70, name: "C1000 - Heavy Lifter", description: "1,000 kg payload" },
};

type RobotType = keyof typeof ROBOT_PRICING;

const MAX_SUBSCRIPTION_RATIO = 0.40; // Subscription cost must be <= 40% of worker cost

export default function ROICalculator() {
  const [robotType, setRobotType] = useState<RobotType>("C500");
  const [shifts, setShifts] = useState(1);
  const [hoursPerShift, setHoursPerShift] = useState(8);
  const [workers, setWorkers] = useState(3);
  const [workerCostPerMonth, setWorkerCostPerMonth] = useState(18000);
  const [robots, setRobots] = useState(1);

  const selectedRobot = ROBOT_PRICING[robotType];

  const results = useMemo(() => {
    const robotHoursPerMonth = robots * shifts * hoursPerShift * 26; // 26 working days
    const humanCostPerMonth = workers * workerCostPerMonth;
    const maxAllowedSubscriptionCost = humanCostPerMonth * MAX_SUBSCRIPTION_RATIO;
    const calculatedRobotCost = robotHoursPerMonth * selectedRobot.hourlyRate;
    
    // Cap the robot cost at 40% of worker cost
    const robotCostPerMonth = Math.min(calculatedRobotCost, maxAllowedSubscriptionCost);
    const actualHourlyRate = robotHoursPerMonth > 0 ? robotCostPerMonth / robotHoursPerMonth : selectedRobot.hourlyRate;
    
    const savings = humanCostPerMonth - robotCostPerMonth;
    const savingsPercent = humanCostPerMonth > 0 ? Math.round((savings / humanCostPerMonth) * 100) : 0;
    const annualSavings = savings * 12;
    const breakEvenMonths = savings > 0 ? null : Math.abs(Math.round(savings / (humanCostPerMonth / 12)));
    const subscriptionRatio = humanCostPerMonth > 0 ? (robotCostPerMonth / humanCostPerMonth) * 100 : 0;

    return {
      robotCostPerMonth,
      humanCostPerMonth,
      savings,
      savingsPercent,
      annualSavings,
      robotHoursPerMonth,
      breakEvenMonths,
      actualHourlyRate,
      subscriptionRatio,
      isCapped: calculatedRobotCost > maxAllowedSubscriptionCost,
    };
  }, [shifts, hoursPerShift, workers, workerCostPerMonth, robots, selectedRobot.hourlyRate]);

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  return (
    <section id="roi-calculator" className="bg-[#0A0A0A] py-24 md:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-bold tracking-wider uppercase text-white/70">ROI Calculator</span>
          </div>
          <h2 className="font-heading font-bold text-[36px] md:text-[48px] leading-[1.1] text-white mb-6">
            See What Automation Saves You
          </h2>
          <p className="text-[18px] text-white/70 leading-[1.7]">
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
            className="bg-[#1A1A1A] p-8 md:p-10 rounded-xl space-y-8"
          >
            <h3 className="font-heading font-bold text-[22px] text-white">Your Current Operation</h3>

            <div className="space-y-6">
              {/* Robot Type Selector */}
              <div>
                <label className="text-[15px] font-medium text-white mb-3 block">Select Robot Platform</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(ROBOT_PRICING) as RobotType[]).map((type) => {
                    const robot = ROBOT_PRICING[type];
                    const isSelected = robotType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setRobotType(type)}
                        className={`text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? "bg-[#51B8AB] border-[#51B8AB] text-white shadow-lg"
                            : "bg-[#0A0A0A] border-white/10 text-white hover:border-[#51B8AB]/40"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="font-heading font-bold text-[16px]">{type.replace('_', ' ')}</span>
                          <span className={`text-[12px] font-bold px-2 py-1 rounded ${
                            isSelected ? "bg-white/20" : "bg-[#51B8AB]/20 text-[#51B8AB]"
                          }`}>
                            ₹{robot.hourlyRate}/hr
                          </span>
                        </div>
                        <p className={`text-[12px] ${
                          isSelected ? "text-white/70" : "text-white/60"
                        }`}>
                          {robot.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

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

            <p className="text-[13px] text-white/70 border-t border-white/20 pt-4">
              {selectedRobot.name} base rate: ₹{selectedRobot.hourlyRate}/hr · 26 working days/month · Subscription capped at 40% of worker cost
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
            <h3 className="font-heading font-bold text-[22px] text-white">Monthly Comparison</h3>

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
                sub={`${results.robotHoursPerMonth} hrs × ₹${Math.round(results.actualHourlyRate)}/hr${results.isCapped ? ' (capped)' : ''}`}
                highlight={false}
              />
            </div>

            <div className={`rounded-xl p-8 border-2 ${results.savings >= 0 ? "bg-[#51B8AB] border-[#51B8AB] text-white" : "bg-[#1A1A1A] border-white/20 text-white"}`}>
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
                  <p className="mt-2 text-[14px] opacity-80">
                    Subscription is {Math.round(results.subscriptionRatio)}% of worker cost (max 40%)
                  </p>
                  <p className="mt-4 font-bold text-[20px]">
                    {formatINR(results.annualSavings)} saved annually
                  </p>
                  {results.isCapped && (
                    <p className="mt-3 text-[13px] bg-white/20 rounded-lg px-3 py-2">
                      💡 Rate adjusted to maintain 40% cost ratio
                    </p>
                  )}
                </>
              ) : (
                <p className="opacity-70 text-[16px]">
                  Robots cost more at this scale — try increasing shifts or workers to see savings.
                </p>
              )}
            </div>

            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/10">
              <p className="text-[15px] text-white/70 leading-[1.6]">
                <strong className="text-white">No capital expenditure.</strong> These numbers reflect operating cost only. A robot purchase would cost ₹15–40L upfront — with Corelyn, that&apos;s zero.
              </p>
            </div>

            <a
              href="#contact"
              className="block w-full bg-[#51B8AB] text-white text-center py-4 rounded-lg font-bold text-[18px] hover:bg-[#3FA89A] transition-colors"
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
        <label className="text-[15px] font-medium text-white">{label}</label>
        <span className="text-[15px] font-bold text-white bg-[#0A0A0A] px-3 py-1 rounded border border-white/20">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-[#D0D0D0] rounded-full appearance-none cursor-pointer accent-[#51B8AB]"
      />
      <div className="flex justify-between text-[12px] text-white/70 mt-1">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

function ResultCard({ icon, label, value, sub, highlight }: {
  icon: React.ReactNode; label: string; value: string; sub: string; highlight: boolean;
}) {
  return (
    <div className={`p-6 rounded-xl border ${highlight ? "bg-[#51B8AB] text-white border-[#51B8AB]" : "bg-[#1A1A1A] border-white/10 text-white"}`}>
      <div className={`mb-3 ${highlight ? "text-white" : "text-white/70"}`}>{icon}</div>
      <p className={`text-[13px] font-bold tracking-wider uppercase mb-1 ${highlight ? "opacity-70" : "text-white/70"}`}>{label}</p>
      <p className="font-heading font-bold text-[28px] leading-tight">{value}</p>
      <p className={`text-[13px] mt-1 ${highlight ? "opacity-60" : "text-white/70"}`}>{sub}</p>
    </div>
  );
}




