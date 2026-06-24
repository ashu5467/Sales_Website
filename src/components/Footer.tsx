import Link from "next/link";
import { Sparkles, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/60 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Pitch */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white mb-4">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              <span>devmotive</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm">
              We design and build premium, locally-run desktop applications for developers, job hunters, and technical professionals.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/linkedin-applier" className="hover:text-white transition-colors">
                  LinkedIn Auto-Applier
                </Link>
              </li>
              <li>
                <Link href="/intai" className="hover:text-white transition-colors">
                  intAi Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Secure Purchase Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Security</h4>
            <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 rounded-lg p-3 text-slate-400">
              <Shield className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-200">Razorpay Secured</p>
                <p className="text-slate-500">256-bit SSL encrypted payments.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-4">
          <p>&copy; {new Date().getFullYear()} devmotive. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
