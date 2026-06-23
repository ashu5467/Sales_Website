"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, ShieldCheck, Zap, HelpCircle, Terminal, Laptop } from "lucide-react";
import RazorpayButton from "@/components/RazorpayButton";

export default function LinkedInApplier() {
  const features = [
    {
      title: "Bypass Daily Limits",
      desc: "Our agent uses smart session management and natural, randomized delay profiles to apply without triggering rate limit blocks.",
    },
    {
      title: "Self-Learning Forms",
      desc: "The agent learns answers to common application forms (experience, address, visas) and stores them locally. It asks you only when it encounters a new question.",
    },
    {
      title: "Humanized Behavior",
      desc: "Simulates actual mouse moves, scrolls, and keypresses instead of REST API requests, keeping your account completely secure.",
    },
    {
      title: "Run Fully Locally",
      desc: "Runs completely as a desktop agent. No cloud storage of your passwords, cookies, or resume data. Your privacy remains 100% yours.",
    },
  ];

  const faqs = [
    {
      q: "Is this safe for my LinkedIn profile?",
      a: "Yes. Unlike typical Chrome extensions or cloud scrapers that spam APIs, the LinkedIn Auto-Applier runs as an isolated desktop browser agent. It scrolls, pauses, reads, and types at human speeds, avoiding automated detection algorithms.",
    },
    {
      q: "How does it handle complex application questions?",
      a: "The first time it encounters a question it hasn't seen (e.g., 'How many years of experience do you have with Rust?'), it pauses and prompts you for the answer. Once you input it, it remembers that answer and applies it to all future applications containing similar keywords.",
    },
    {
      q: "What OS does this support?",
      a: "We support Windows (.exe) and macOS (.dmg, optimized for Apple Silicon and Intel).",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden py-16">
      {/* Decorative Gradients */}
      <div className="absolute top-0 -left-1/4 h-[800px] w-[800px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-sm font-semibold text-indigo-300">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>LinkedIn Auto-Applier Desktop Agent</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Apply to 100s of Jobs <span className="bg-gradient-to-r from-indigo-400 via-indigo-200 to-white bg-clip-text text-transparent">On Autopilot</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              Stop spending hours daily clicking "Easy Apply". Let our secure local desktop agent match your profile, answer questions, and submit applications while you focus on interview prep.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <RazorpayButton
                productName="LinkedIn Auto-Applier"
                productKey="linkedin-applier"
                priceUSD={49}
                colorTheme="indigo"
              />
              <div className="text-xs text-slate-500 max-w-[200px]">
                <p className="font-semibold text-slate-300">One-time payment.</p>
                <p>Includes lifetime updates and unlimited local submissions.</p>
              </div>
            </div>
          </div>

          {/* Desktop Visual/Preview Mockup */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md shadow-2xl relative overflow-hidden"
            >
              {/* Window Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800/80">
                <span className="w-3 h-3 rounded-full bg-rose-500/60" />
                <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                <span className="text-xs text-slate-500 font-mono ml-2">linkedin-applier-v1.4</span>
              </div>
              {/* Terminal Logs Mock */}
              <div className="font-mono text-xs space-y-2 text-slate-300">
                <p className="text-indigo-400 flex gap-2"><Terminal className="w-4 h-4" /> $ linkedin-applier --start</p>
                <p className="text-slate-500">[12:44:01] Loaded cookies securely from Local Vault...</p>
                <p className="text-slate-500">[12:44:03] Searching query: "Frontend Developer" in US...</p>
                <p className="text-slate-200 font-semibold">[12:44:05] Found 142 Easy Apply jobs. Initiating...</p>
                <p className="text-emerald-400">✓ [12:44:18] Applied: Vercel (Frontend Engineer) - auto-answered</p>
                <p className="text-emerald-400">✓ [12:44:45] Applied: Stripe (React Developer) - auto-answered</p>
                <p className="text-amber-400">⚠ [12:45:10] Paused: Custom question found on Retool app.</p>
                <p className="text-indigo-300">➜ "Describe your experience with WebGL:" (Awaiting response)</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features grid */}
        <section className="py-20 border-t border-slate-900 mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Engineered for Performance & Security</h2>
            <p className="text-slate-400 mt-2">Why professionals choose the HustleOS desktop app over extensions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="rounded-xl border border-slate-900 bg-slate-900/20 p-6 hover:border-slate-800 hover:bg-slate-900/40 transition-all">
                <CheckCircle2 className="w-6 h-6 text-indigo-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 border-t border-slate-900">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-slate-900 bg-slate-900/10 p-6">
                <div className="flex gap-3 items-start">
                  <HelpCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-white text-base mb-2">{faq.q}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
