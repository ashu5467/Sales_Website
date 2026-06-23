"use client";

import { motion } from "framer-motion";
import { Brain, CheckCircle2, ShieldCheck, Zap, HelpCircle, Terminal, EyeOff, Radio } from "lucide-react";
import RazorpayButton from "@/components/RazorpayButton";

export default function IntAiPage() {
  const features = [
    {
      title: "Real-Time Audio Sync",
      desc: "Connects directly to your system loopback audio. Captures interviewer speech and transcribes it instantly without sound delay.",
    },
    {
      title: "Stealth Overlay UI",
      desc: "Renders as a semi-transparent, borderless desktop window that is invisible to screen-sharing software (Zoom, Teams, Google Meet, Webex).",
    },
    {
      title: "Intelligent Guidance",
      desc: "Fed by local LLM orchestration. Generates structural code templates, key-concepts bullet points, or algorithmic hints tailored to the transcribed prompt.",
    },
    {
      title: "Zero Remote Cloud Logs",
      desc: "Audio transcription and answers are computed on-device or via secure private keys. Your interview data remains completely confidential.",
    },
  ];

  const faqs = [
    {
      q: "Is it really undetectable during screen share?",
      a: "Yes. The desktop assistant uses OS-specific graphics APIs (dwmapi on Windows and CGWindow on macOS) to exclude the overlay window from recording/capture streams. When you share your screen or entire desktop, the interviewer sees nothing but your code editor.",
    },
    {
      q: "Does it support multiple interview formats?",
      a: "Absolutely. It works for algorithmic coding challenges, system design discussions, and behavioral Q&A. You can switch modes dynamically via hotkeys.",
    },
    {
      q: "Does it need a high-end GPU to run?",
      a: "No. The audio engine is highly optimized, and the assistant coordinates with lightweight cloud API models or local nodes, consuming minimal CPU.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden py-16">
      {/* Decorative Gradients */}
      <div className="absolute top-0 -left-1/4 h-[800px] w-[800px] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[110px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm font-semibold text-cyan-300">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span>intAi Stealth Interview Assistant</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Your Secret Interview <span className="bg-gradient-to-r from-cyan-400 via-cyan-200 to-white bg-clip-text text-transparent">Copilot</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              Get real-time, undetectable assistance during live video calls. Listen, transcribe, and view optimal code structures and algorithms inside a stealth desktop overlay.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <RazorpayButton
                productName="intAi Assistant"
                productKey="intai"
                priceUSD={99}
                colorTheme="cyan"
              />
              <div className="text-xs text-slate-500 max-w-[200px]">
                <p className="font-semibold text-slate-300">One-time payment.</p>
                <p>Includes lifetime updates, full features, and stealth overlay framework.</p>
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
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/60" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="text-xs text-slate-500 font-mono ml-2">intai-assistant-v2.1</span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                  <Radio className="w-3.5 h-3.5 animate-pulse" /> Live Listening
                </span>
              </div>
              {/* Transcription & Answers Visual Simulator */}
              <div className="space-y-4 font-sans text-xs">
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/40">
                  <p className="text-slate-500 text-[10px] font-mono mb-1">INTERVIEWER (TRANSCRIPTION)</p>
                  <p className="text-slate-300 font-medium">"...write a function that takes a binary tree and returns the maximum path sum..."</p>
                </div>
                <div className="bg-cyan-950/20 p-3 rounded-lg border border-cyan-500/10">
                  <p className="text-cyan-400 text-[10px] font-mono mb-1">INTAI SUGGESTION (STEALTH OVERLAY)</p>
                  <pre className="text-cyan-300 font-mono text-[11px] leading-relaxed">
{`// DFS post-order traversal
function maxPathSum(root) {
  let max = -Infinity;
  function getSum(node) {
    if (!node) return 0;
    let left = Math.max(0, getSum(node.left));
    let right = Math.max(0, getSum(node.right));
    max = Math.max(max, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  getSum(root);
  return max;
}`}
                  </pre>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                  <EyeOff className="w-3.5 h-3.5" /> Invisible on screen sharing
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features grid */}
        <section className="py-20 border-t border-slate-900 mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Engineered for Stealth and Speed</h2>
            <p className="text-slate-400 mt-2">Features designed to give you complete confidence in live calls.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="rounded-xl border border-slate-900 bg-slate-900/20 p-6 hover:border-slate-800 hover:bg-slate-900/40 transition-all">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 mb-4" />
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
                  <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
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
