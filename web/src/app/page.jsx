"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  Sparkles,
  X,
} from "lucide-react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-[#070709] text-white flex flex-col justify-between overflow-x-hidden font-sans select-none">
      {/* Background Image Layer with Top Crop & Scaling to hide watermark */}
      <div
        className="absolute -inset-x-0 -top-12 -bottom-0 bg-cover bg-[center_35%] scale-110 -translate-y-8 bg-no-repeat pointer-events-none z-0 opacity-70 transition-opacity duration-700"
        style={{
          backgroundImage: "url('/assets/bgImg.png')",
        }}
      />

      {/* Top Black Gradient to cleanly mask top watermark */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#070709] via-[#070709]/90 to-transparent pointer-events-none z-0" />

      {/* Subtle Radial Glow & Contrast Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#070709]/60 to-[#070709] pointer-events-none z-0" />

      {/* ================= FLOATING CENTERED EXPANDED NAVBAR CARD ================= */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl bg-[#151517]/95 backdrop-blur-2xl border border-[#2A2A30] rounded-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(255,230,0,0.08)] transform-gpu origin-top transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen
            ? "translate-y-0 opacity-100 scale-100 blur-0 pointer-events-auto flex flex-col justify-between gap-4"
            : "-translate-y-6 opacity-0 scale-95 blur-md pointer-events-none flex flex-col justify-between gap-4"
        }`}
      >
        {/* Top Row: Brand on left + Sign In & Sign Up buttons on right (replacing close button) */}
        <div
          className={`w-full flex items-center justify-between pb-3.5 border-b border-[#2A2A30] transition-all duration-500 delay-75 ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <Link href="/" className="flex items-center gap-3.5 group">
            <img
              src="/assets/logo.png"
              alt="CLYRA"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_12px_rgba(255,230,0,0.45)] group-hover:scale-105 transition-transform"
            />
            <span className="font-bold text-xl sm:text-2xl tracking-wider text-[#EDEDEF]">
              CLYRA
            </span>
          </Link>

          {/* Action CTAs in Top Bar - Equal & Increased Width */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="w-28 sm:w-32 h-10 rounded-lg bg-transparent hover:bg-[#FFE600]/8 border border-[#2A2A30] hover:border-[#FFE600] text-xs sm:text-sm font-semibold text-[#EDEDEF] hover:text-[#FFE600] flex items-center justify-center transition-all text-center"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="w-28 sm:w-32 h-10 rounded-lg bg-[#FFE600] hover:bg-[#FFF033] active:bg-[#C9B800] text-[#0F0F10] text-xs sm:text-sm font-semibold transition-all shadow-[0_0_18px_rgba(255,230,0,0.15)] hover:shadow-[0_0_24px_rgba(255,230,0,0.30)] flex items-center justify-center gap-1.5 text-center"
            >
              <span>Sign Up</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Center: Navigation Links Row with staggered reveal */}
        <nav
          className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center transition-all duration-500 delay-100 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <Link
            href="#features"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 rounded-lg bg-[#0F0F10] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-[#FFE600]/55 text-xs font-semibold text-[#B8B8BE] hover:text-[#FFE600] transition-all"
          >
            Features
          </Link>
          <Link
            href="#automation"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 rounded-lg bg-[#0F0F10] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-[#FFE600]/55 text-xs font-semibold text-[#B8B8BE] hover:text-[#FFE600] transition-all"
          >
            AI Pilot
          </Link>
          <Link
            href="#integrations"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 rounded-lg bg-[#0F0F10] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-[#FFE600]/55 text-xs font-semibold text-[#B8B8BE] hover:text-[#FFE600] transition-all"
          >
            Integrations
          </Link>
          <Link
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 rounded-lg bg-[#0F0F10] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-[#FFE600]/55 text-xs font-semibold text-[#B8B8BE] hover:text-[#FFE600] transition-all"
          >
            Pricing
          </Link>
        </nav>
      </div>

      {/* Click-outside dismissal overlay (transparent so background opacity is not decreased) */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-transparent cursor-default"
        />
      )}

      {/* ================= CLEAN CENTERED TOP BAR (CENTER LOGO TRIGGER) ================= */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-center">
        {/* Centered Interactive Logo Trigger with Smooth Scale Transition */}
        <button
          onClick={() => setMenuOpen(true)}
          className={`flex items-center gap-3.5 px-6 py-3 rounded-lg bg-[#0F0F10]/95 hover:bg-[#151517] border border-[#2A2A30] hover:border-[#FFE600]/80 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(255,230,0,0.15)] group transition-all duration-300 ease-out cursor-pointer hover:scale-102 active:scale-98 ${
            menuOpen ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100 pointer-events-auto"
          }`}
          title="Click to open menu"
        >
          <img
            src="/assets/logo.png"
            alt="CLYRA"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_15px_rgba(255,230,0,0.5)] group-hover:scale-105 transition-all duration-300"
          />
          <span className="font-bold text-xl sm:text-2xl tracking-wider text-[#EDEDEF] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            CLYRA
          </span>
        </button>
      </header>

      {/* ================= HERO CONTENT ================= */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-8 md:py-12 flex flex-col items-center justify-center text-center my-auto">
        {/* Hero Title with Deep Cinematic Text Shadow */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)]">
          Customer Support That Resolves Itself in{" "}
          <span className="text-[#FFE600] drop-shadow-[0_0_35px_rgba(255,230,0,0.45)]">
            Real-Time
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-5 max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed font-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          Meet CLYRA — the autonomous AI engine that handles inquiries, tracks orders, and manages support workflows with sub-2s response times and 80%+ instant resolution.
        </p>

        {/* Hero CTA Action Group with Design System Primary & Outline Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          {/* Primary #FFE600 Button */}
          <Link
            href="/signup"
            className="w-full sm:w-auto px-7 py-3 rounded-lg bg-[#FFE600] hover:bg-[#ffe81a] active:bg-[#FFE600]/80 text-black text-xs sm:text-sm font-bold transition-all shadow-[0_4px_20px_rgba(255,230,0,0.35)] hover:shadow-[0_0_25px_#FFE600] hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Design System Outline Button */}
          <Link
            href="/login"
            className="w-full sm:w-auto px-7 py-3 rounded-lg bg-transparent hover:bg-[#FFE600]/10 border border-[#FFE600] text-[#FFE600] text-xs sm:text-sm font-semibold transition-all shadow-[0_0_15px_rgba(255,230,0,0.15)] hover:shadow-[0_0_20px_rgba(255,230,0,0.3)] flex items-center justify-center gap-2 hover:scale-102 active:scale-98"
          >
            <span>Launch Workspace</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Micro-Metrics Floating Glass Card with Ambient Shadow */}
        <div className="mt-10 max-w-xl w-full bg-[#0F0F10]/90 backdrop-blur-xl border border-[#1E1E22] rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(255,230,0,0.08)]">
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            <div className="space-y-0.5">
              <p className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">1.8s</p>
              <p className="text-[10px] sm:text-xs text-[#A1A1AA] font-medium">Avg Response Speed</p>
            </div>
            <div className="space-y-0.5 border-x border-[#1E1E22] px-2 sm:px-4">
              <p className="text-xl sm:text-2xl font-extrabold text-[#FFE600] drop-shadow-[0_0_15px_rgba(255,230,0,0.35)]">80%+</p>
              <p className="text-[10px] sm:text-xs text-[#A1A1AA] font-medium">Autonomous Fix</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">99.2%</p>
              <p className="text-[10px] sm:text-xs text-[#A1A1AA] font-medium">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER / TRUST TICKER WITH AMBIENT GLOW ================= */}
      {/* <footer className="relative z-10 w-full bg-[#0A0B0E]/90 backdrop-blur-xl border-t border-white/10 shadow-[0_-15px_35px_rgba(0,0,0,0.8)] py-4 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#E8FD07] shadow-[0_0_10px_#E8FD07] animate-pulse" />
            <span className="text-zinc-300 font-medium">CLYRA Neural Platform Live</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-zinc-400">
            <span>Enterprise Security</span>
            <span>Zero-Code Setup</span>
            <span>Omnichannel</span>
          </div>

          <p className="text-zinc-500 text-[11px]">© 2026 CLYRA. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}
