"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Products", href: "/#products" },
    { name: "LinkedIn Applier", href: "/linkedin-applier" },
    { name: "intAi Assistant", href: "/intai" },
    { name: "Support", href: "/support" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              <span>HustleOS</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <div className="hidden md:block">
            <Link
              href="/#products"
              className="rounded-full bg-slate-900 border border-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
            >
              Get Tools
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-900 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-b border-slate-900 bg-slate-950 px-2 pt-2 pb-4 space-y-1 sm:px-3 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-slate-400 hover:bg-slate-900 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/#products"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center rounded-md bg-indigo-600 px-3 py-2.5 text-base font-semibold text-white hover:bg-indigo-500"
          >
            Get Tools
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
