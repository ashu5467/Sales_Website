"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mail, MessageSquare, Loader2, CheckCircle2, ShieldAlert } from "lucide-react";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit support ticket.");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none" />

      <div className="relative w-full max-w-xl rounded-2xl border border-slate-900 bg-slate-900/40 p-8 backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="h-6 w-6 text-indigo-400" />
          <h1 className="text-2xl font-bold text-white">HustleOS Support Portal</h1>
        </div>

        <p className="text-sm text-slate-400 mb-8">
          Have a question about your license, or need help setting up your desktop agent? Drop us a message and our support team will get back to you shortly.
        </p>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-4"
          >
            <div className="mx-auto bg-emerald-500/10 w-12 h-12 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Message Sent Successfully</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              Thank you for contacting support. We have received your inquiry and will email you back within 24 hours.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-4 px-6 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="support-name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="support-name"
                  required
                  disabled={loading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div>
                <label htmlFor="support-email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="support-email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="support-subject" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Subject
              </label>
              <input
                type="text"
                id="support-subject"
                required
                disabled={loading}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="License Activation / Technical Support"
                className="w-full rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label htmlFor="support-message" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                id="support-message"
                required
                disabled={loading}
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how we can help you..."
                className="w-full rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-400">
                <ShieldAlert className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Submitting Ticket...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
