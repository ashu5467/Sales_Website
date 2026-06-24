"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, ArrowRight, X, ShieldAlert } from "lucide-react";

interface RazorpayButtonProps {
  productName: string;
  productKey: string; // 'linkedin-applier' | 'intai'
  priceINR: number;
  colorTheme?: "indigo" | "cyan";
}

export default function RazorpayButton({
  productName,
  productKey,
  priceINR,
  colorTheme = "indigo",
}: RazorpayButtonProps) {
  const router = useRouter();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const themeClasses = {
    indigo: {
      bg: "bg-indigo-600 hover:bg-indigo-700",
      text: "text-indigo-400",
      shadow: "shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]",
      border: "border-indigo-500/30 bg-indigo-500/10",
      focus: "focus:border-indigo-500 focus:ring-indigo-500/20",
    },
    cyan: {
      bg: "bg-cyan-600 hover:bg-cyan-700",
      text: "text-cyan-400",
      shadow: "shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]",
      border: "border-cyan-500/30 bg-cyan-500/10",
      focus: "focus:border-cyan-500 focus:ring-cyan-500/20",
    },
  }[colorTheme];

  // Load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckoutInit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Load script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay payment gateway SDK.");
      }

      // 2. Create Order
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productKey,
          priceINR,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to initiate transaction order.");
      }

      const orderData = await res.json();

      // 3. Open Razorpay Checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_T52eSEEaoGoURo",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "devmotive",
        description: `Lifetime License: ${productName}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          setLoading(true);
          try {
            // 4. Verify payment
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                email,
                productKey,
              }),
            });

            if (!verifyRes.ok) {
              const verifyErr = await verifyRes.json();
              throw new Error(verifyErr.error || "Payment signature verification failed.");
            }

            const verifyData = await verifyRes.json();

            // Redirect to success page with transaction and download URL
            router.push(
              `/success?email=${encodeURIComponent(email)}&product=${encodeURIComponent(
                productKey
              )}&downloadUrl=${encodeURIComponent(verifyData.downloadUrl)}`
            );
          } catch (err: any) {
            setError(err.message || "An error occurred during verification.");
            setLoading(false);
          }
        },
        prefill: {
          email: email,
        },
        notes: {
          productKey,
          email,
        },
        theme: {
          color: colorTheme === "indigo" ? "#4f46e5" : "#06b6d4",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      setShowEmailModal(false);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowEmailModal(true)}
        className={`px-8 py-4 rounded-full text-white font-semibold flex items-center gap-2 cursor-pointer transition-all ${themeClasses.bg} ${themeClasses.shadow}`}
      >
        <span>Buy Lifetime License — ₹{priceINR.toLocaleString("en-IN")}</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Email Collection Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!loading) setShowEmailModal(false);
              }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/90 p-6 text-slate-100 shadow-2xl backdrop-blur-md"
            >
              {/* Close Button */}
              <button
                disabled={loading}
                onClick={() => setShowEmailModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6 flex items-center gap-2">
                <Sparkles className={`h-5 w-5 ${themeClasses.text}`} />
                <h3 className="text-xl font-bold">Activate Your License</h3>
              </div>

              <p className="text-sm text-slate-400 mb-6">
                Enter your email address. We will send your purchase receipt, license activation details, and a permanent download link here.
              </p>

              <form onSubmit={handleCheckoutInit} className="space-y-4">
                <div>
                  <label htmlFor="checkout-email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="checkout-email"
                    required
                    disabled={loading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3 text-white placeholder-slate-600 outline-none transition-all focus:ring-2 ${themeClasses.focus}`}
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
                  className={`w-full py-3.5 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${themeClasses.bg}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Initiating Payment Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Payment</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full-Screen Verification Loading Overlay */}
      <AnimatePresence>
        {loading && !showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md text-slate-100"
          >
            <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl border border-slate-900 bg-slate-900/50 max-w-sm text-center shadow-2xl">
              <Loader2 className={`h-12 w-12 animate-spin ${themeClasses.text}`} />
              <h3 className="text-xl font-bold">Verifying Payment</h3>
              <p className="text-sm text-slate-400">
                We are securing your license, preparing your download link, and sending your receipt. Please do not close or refresh this page.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
