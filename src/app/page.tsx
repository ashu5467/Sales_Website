"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Brain, ArrowRight, CheckCircle2, Cpu, Sparkles, Zap, Shield, HelpCircle, Calculator } from "lucide-react";

export default function Home() {
  const [hoursSpent, setHoursSpent] = useState(3); // hours per day job hunting
  const [hourlyRate, setHourlyRate] = useState(25); // value of user's time per hour

  // Calculator logic
  const daysSpentYearly = 250; // assuming 250 job hunt days per year
  const totalHoursYearly = hoursSpent * daysSpentYearly;
  const hoursSavedYearly = Math.round(totalHoursYearly * 0.85); // 85% time savings
  const dollarSavedYearly = hoursSavedYearly * hourlyRate;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 -left-1/4 h-[850px] w-[850px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[35%] -right-1/4 h-[700px] w-[700px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[110px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center pt-24 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Tagline Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Introducing HustleOS Automation Suite</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl"
          >
            Automate Your <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Career</span>
          </motion.h1>

          {/* Intro Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Premium desktop tools designed to give you an unfair advantage. 
            Pay once, use forever. No subscriptions, no hidden limits, fully run locally.
          </motion.p>

          {/* Explore Button */}
          <motion.div variants={itemVariants}>
            <Link 
              href="#products" 
              className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] cursor-pointer"
            >
              Explore Desktop Agents
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy / Trust Banner */}
      <section className="border-y border-slate-900 bg-slate-950/40 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-400">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">Instant Edge</h4>
                <p className="text-sm text-slate-400 mt-1">Deploy locally to streamline workflows in seconds.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="bg-purple-500/10 p-3 rounded-xl text-purple-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">100% Privacy</h4>
                <p className="text-sm text-slate-400 mt-1">Runs fully on your machine. Your credentials never leave your system.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="bg-cyan-500/10 p-3 rounded-xl text-cyan-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white">Lifetime Access</h4>
                <p className="text-sm text-slate-400 mt-1">Pay once, use forever. Free minor upgrades included.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full py-20">
        <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-8 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Calculator className="w-32 h-32 text-indigo-400" />
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-bold text-white">HustleOS ROI Calculator</h3>
          </div>

          <p className="text-sm text-slate-400 mb-8 max-w-xl">
            See how much time and money you are currently spending on manual job searching and how much a lifetime license of HustleOS saves you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Input Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-slate-300">Daily Job Hunting Time</span>
                  <span className="text-indigo-400 font-bold">{hoursSpent} Hours</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={hoursSpent}
                  onChange={(e) => setHoursSpent(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-slate-300">Value of Your Time</span>
                  <span className="text-indigo-400 font-bold">${hourlyRate} / hour</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            {/* Calculations Result */}
            <div className="bg-slate-950/60 rounded-xl border border-slate-800/80 p-6 flex flex-col justify-center space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimated Time Saved</p>
                <p className="text-3xl font-extrabold text-white mt-1">
                  {hoursSavedYearly} <span className="text-sm font-normal text-slate-400">Hours / Year</span>
                </p>
              </div>
              <div className="border-t border-slate-850 pt-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Annual Time Value Saved</p>
                <p className="text-3xl font-extrabold text-emerald-400 mt-1">
                  ${dollarSavedYearly.toLocaleString()} <span className="text-sm font-normal text-slate-400">/ Year</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section id="products" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-16 scroll-mt-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold">Select Your Software</h2>
          <p className="text-slate-400 mt-3 text-sm md:text-base">Click on any product to explore deep details or proceed with checkout.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* LinkedIn Applier Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative rounded-2xl border border-slate-900 bg-slate-900/30 p-8 overflow-hidden backdrop-blur-md flex flex-col justify-between hover:border-slate-800 hover:bg-slate-900/60"
          >
            <div>
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Briefcase className="w-32 h-32 text-indigo-400" />
              </div>
              <div className="bg-indigo-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-indigo-400 border border-indigo-500/20">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">LinkedIn Auto-Applier</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                An intelligent desktop agent that applies to thousands of Easy Apply jobs on autopilot, customized to your profile and answers.
              </p>
              <ul className="space-y-3 mb-8">
                {["Bypass daily search limits safely", "Smart answers learning engine", "Humanized delays & mouse moves", "Fully local execution"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link 
              href="/linkedin-applier" 
              className="inline-flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors w-fit group/btn cursor-pointer"
            >
              <span>View Details & Purchase</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </motion.div>

          {/* intAi Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative rounded-2xl border border-slate-900 bg-slate-900/30 p-8 overflow-hidden backdrop-blur-md flex flex-col justify-between hover:border-slate-800 hover:bg-slate-900/60"
          >
            <div>
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Brain className="w-32 h-32 text-cyan-400" />
              </div>
              <div className="bg-cyan-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-cyan-400 border border-cyan-500/20">
                <Brain className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">intAi Assistant</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                The ultimate stealth interview copilot. Get real-time, undetectable guidance, transcripts, and answers during live technical interviews.
              </p>
              <ul className="space-y-3 mb-8">
                {["Real-time audio speech-to-text", "Undetectable overlay UI layout", "Smart contextual answers", "Works with Zoom, Teams, Meet"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link 
              href="/intai" 
              className="inline-flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors w-fit group/btn cursor-pointer"
            >
              <span>View Details & Purchase</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
