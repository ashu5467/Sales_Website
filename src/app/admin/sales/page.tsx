import { getSales } from "@/lib/salesLogger";
import { 
  Lock, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Cpu, 
  Calendar, 
  Mail, 
  Receipt,
  ArrowRight
} from "lucide-react";

// Next.js 15+ / 16+ page props with async searchParams
interface PageProps {
  searchParams: Promise<{ code?: string }>;
}

export default async function AdminSalesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const enteredCode = resolvedParams.code;
  
  // Resolve admin passcode (defaults to devmotive2026 if not set in .env)
  const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "devmotive2026";
  const isAuthenticated = enteredCode === ADMIN_PASSCODE;

  if (!isAuthenticated) {
    // Render a premium, Lock Screen if passcode is missing or invalid
    return (
      <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
        
        <div className="relative w-full max-w-md rounded-2xl border border-slate-900 bg-slate-900/40 p-8 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-indigo-500/10 p-4 rounded-2xl text-indigo-400 border border-indigo-500/20 mb-4 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Portal</h1>
            <p className="text-sm text-slate-400 mt-2">
              Enter the administration passcode to view sales analytics.
            </p>
          </div>

          <form method="GET" className="space-y-4">
            <div>
              <label htmlFor="passcode-input" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Passcode
              </label>
              <input
                type="password"
                name="code"
                id="passcode-input"
                required
                placeholder="••••••••••••"
                className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-white placeholder-slate-700 outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            {enteredCode && (
              <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400 text-center">
                Incorrect passcode. Please try again.
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
            >
              <span>Unlock Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Load transaction data if authenticated
  const sales = getSales();

  // Metrics calculations (INR as primary)
  const totalSales = sales.length;
  const totalINR = sales.reduce((acc, curr) => acc + curr.amountINR, 0);
  const totalUSD = sales.reduce((acc, curr) => acc + curr.amountUSD, 0);

  // Product breakdown
  const linkedinSales = sales.filter(s => s.productKey === "linkedin-applier");
  const linkedinCount = linkedinSales.length;
  const linkedinRevenueINR = linkedinSales.reduce((acc, curr) => acc + curr.amountINR, 0);

  const intaiSales = sales.filter(s => s.productKey === "intai");
  const intaiCount = intaiSales.length;
  const intaiRevenueINR = intaiSales.reduce((acc, curr) => acc + curr.amountINR, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              devmotive Sales Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time transaction tracking and analytics ledger.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            System Live
          </div>
        </div>

        {/* Top-Level Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Total Revenue */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/20 p-6 backdrop-blur-md hover:border-slate-800/80 transition-all group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <DollarSign className="w-24 h-24 text-indigo-400" />
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-400 border border-indigo-500/20">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Revenue</p>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  ₹{totalINR.toLocaleString("en-IN")} <span className="text-sm font-semibold text-indigo-400">INR</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  ~${totalUSD.toLocaleString()} USD
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Licenses Sold */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/20 p-6 backdrop-blur-md hover:border-slate-800/80 transition-all group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <Users className="w-24 h-24 text-purple-400" />
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-purple-500/10 p-3 rounded-xl text-purple-400 border border-purple-500/20">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Licenses Sold</p>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {totalSales} <span className="text-sm font-semibold text-purple-400">Products</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Lifetime licenses activated
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Average Ticket */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/20 p-6 backdrop-blur-md hover:border-slate-800/80 transition-all group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
              <Receipt className="w-24 h-24 text-cyan-400" />
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-cyan-500/10 p-3 rounded-xl text-cyan-400 border border-cyan-500/20">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Average Ticket</p>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  ₹{totalSales > 0 ? Math.round(totalINR / totalSales).toLocaleString("en-IN") : 0} <span className="text-sm font-semibold text-cyan-400">INR</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  ~${totalSales > 0 ? Math.round(totalUSD / totalSales) : 0} USD
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Product-Specific Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LinkedIn Auto-Applier */}
          <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-6 backdrop-blur-md hover:border-slate-800/50 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500/10 p-2.5 rounded-xl text-indigo-400 border border-indigo-500/20">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">LinkedIn Auto-Applier</h4>
                  <p className="text-xs text-slate-500">Local job hunting desktop agent</p>
                </div>
              </div>
              <span className="text-xs bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-full font-medium">
                ₹3,999 License
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-4">
              <div>
                <p className="text-xs text-slate-400">Licenses Sold</p>
                <p className="text-xl font-extrabold text-white mt-1">{linkedinCount}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Total Revenue</p>
                <p className="text-xl font-extrabold text-emerald-400 mt-1">₹{linkedinRevenueINR.toLocaleString("en-IN")} INR</p>
              </div>
            </div>
          </div>

          {/* intAi Assistant */}
          <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-6 backdrop-blur-md hover:border-slate-800/50 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-500/10 p-2.5 rounded-xl text-cyan-400 border border-cyan-500/20">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">intAi Assistant</h4>
                  <p className="text-xs text-slate-500">AI-powered desktop automation agent</p>
                </div>
              </div>
              <span className="text-xs bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-full font-medium">
                ₹7,999 License
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-slate-900 pt-4">
              <div>
                <p className="text-xs text-slate-400">Licenses Sold</p>
                <p className="text-xl font-extrabold text-white mt-1">{intaiCount}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Total Revenue</p>
                <p className="text-xl font-extrabold text-emerald-400 mt-1">₹{intaiRevenueINR.toLocaleString("en-IN")} INR</p>
              </div>
            </div>
          </div>

        </div>

        {/* Transaction Ledger Table */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/20 overflow-hidden backdrop-blur-md">
          <div className="px-6 py-5 border-b border-slate-900">
            <h3 className="font-bold text-white text-lg">Transaction Ledger</h3>
            <p className="text-xs text-slate-400 mt-1">Audit log of verified purchases</p>
          </div>
          
          {sales.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Calendar className="w-12 h-12 mx-auto text-slate-600 mb-4 stroke-1" />
              <p className="font-medium">No Transactions Found</p>
              <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                No purchases have been logged yet. Check your Razorpay dashboard for checkout attempts.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/60 border-b border-slate-900 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-6">Timestamp</th>
                    <th className="py-3 px-6">Product</th>
                    <th className="py-3 px-6">Customer</th>
                    <th className="py-3 px-6">Paid</th>
                    <th className="py-3 px-6">Razorpay Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 text-sm">
                  {sales.map((sale) => (
                    <tr key={sale.paymentId} className="hover:bg-slate-900/20 transition-colors">
                      {/* Timestamp */}
                      <td className="py-4 px-6 text-xs text-slate-400 font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>
                            {new Date(sale.timestamp).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="py-4 px-6 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${sale.productKey === "linkedin-applier" ? "bg-indigo-400" : "bg-cyan-400"}`} />
                          <span>{sale.productName}</span>
                        </div>
                      </td>

                      {/* Customer Email */}
                      <td className="py-4 px-6 text-slate-300">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span>{sale.email}</span>
                        </div>
                      </td>

                      {/* Paid Amount */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-emerald-400">
                          ₹{sale.amountINR.toLocaleString("en-IN")} INR
                        </div>
                        <div className="text-[10px] text-slate-500 font-semibold">
                          ~${sale.amountUSD} USD
                        </div>
                      </td>

                      {/* Razorpay details */}
                      <td className="py-4 px-6 text-xs text-slate-400 font-mono">
                        <div>
                          <span className="text-slate-600 select-none font-sans mr-1">PAYID:</span> 
                          <span className="text-slate-300">{sale.paymentId}</span>
                        </div>
                        <div className="mt-0.5">
                          <span className="text-slate-600 select-none font-sans mr-1">ORDER:</span> 
                          <span className="text-slate-300">{sale.orderId}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
