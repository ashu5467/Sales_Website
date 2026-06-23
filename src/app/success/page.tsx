"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Download, Mail, ArrowRight, Laptop, HelpCircle } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";
  const productKey = searchParams.get("product") || "";
  const downloadUrl = searchParams.get("downloadUrl") || "";

  const [downloadTriggered, setDownloadTriggered] = useState(false);

  const productNames: Record<string, string> = {
    "linkedin-applier": "LinkedIn Auto-Applier",
    intai: "intAi Assistant",
  };

  const productName = productNames[productKey] || "Desktop Software";

  useEffect(() => {
    if (downloadUrl && !downloadTriggered) {
      setDownloadTriggered(true);
      // Auto-trigger browser file download
      const timer = setTimeout(() => {
        window.location.href = downloadUrl;
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [downloadUrl, downloadTriggered]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none" />

      <div className="relative w-full max-w-xl rounded-2xl border border-slate-900 bg-slate-900/40 p-8 text-center backdrop-blur-md shadow-2xl">
        {/* Success Icon */}
        <div className="mx-auto bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-extrabold mb-2 text-white">Purchase Successful!</h1>
        <p className="text-slate-400 mb-6 text-sm">
          Thank you for choosing HustleOS. Your payment has been verified.
        </p>

        {/* Receipt Details Card */}
        <div className="bg-slate-950/60 rounded-xl border border-slate-800/60 p-5 text-left space-y-3 mb-8">
          <div className="flex justify-between text-xs text-slate-500">
            <span>PRODUCT</span>
            <span>LICENSE TYPE</span>
          </div>
          <div className="flex justify-between font-bold text-slate-200">
            <span>{productName}</span>
            <span className="text-indigo-400">Lifetime License</span>
          </div>
          <div className="border-t border-slate-800/60 pt-3 flex justify-between items-center text-sm text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400 text-xs">
              <Mail className="w-4 h-4 text-indigo-400" /> Deliver to:
            </span>
            <span className="font-semibold">{email}</span>
          </div>
        </div>

        {/* Download Section */}
        <div className="space-y-4 mb-8">
          {downloadUrl ? (
            <>
              <p className="text-xs text-slate-400 animate-pulse">
                Your download is starting automatically. If it didn't start, click the button below.
              </p>
              <a
                href={downloadUrl}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              >
                <Download className="w-5 h-5" />
                <span>Download Executable</span>
              </a>
            </>
          ) : (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-left text-sm text-amber-300">
              <p className="font-semibold mb-1">Download link unavailable</p>
              <p className="text-xs text-slate-400">
                Please check your email receipt. A backup link has been sent to your email address: <strong>{email}</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Supporting Notes */}
        <div className="text-left border-t border-slate-900 pt-6 text-xs text-slate-500 space-y-2">
          <p className="font-semibold text-slate-400 flex items-center gap-1">
            <Laptop className="w-4 h-4 text-indigo-400" /> Onboarding Instructions
          </p>
          <ol className="list-decimal pl-4 space-y-1">
            <li>Unzip/Open the downloaded application installer.</li>
            <li>Run the executable on your machine.</li>
            <li>Use the license key delivered to your email to activate.</li>
          </ol>
        </div>

        {/* Home Redirect */}
        <div className="mt-8 pt-4">
          <Link
            href="/"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
