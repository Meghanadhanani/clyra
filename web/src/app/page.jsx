"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Lock,
  Menu,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-[#070709] text-white flex flex-col overflow-x-hidden font-sans select-none">
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

      {/* ================= 1ST SCREEN (HERO) WITH DEDICATED BG (bgImg.png) ================= */}
      <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
        {/* Background Image Layer (Strictly contained in Screen 1) */}
        <div
           className="absolute -inset-x-0 -top-12 -bottom-0 bg-cover bg-[center_35%] scale-110 -translate-y-8 bg-no-repeat pointer-events-none z-0 opacity-70 transition-opacity duration-700"
        style={{
          backgroundImage: "url('/assets/bgImg.png')",
        }}
        />

        {/* Top Black Gradient to cleanly mask top watermark */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#070709] via-[#070709]/90 to-transparent pointer-events-none z-0" />

        {/* Subtle Radial Glow & Bottom Transition Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#070709]/50 to-[#070709] pointer-events-none z-0" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-transparent pointer-events-none z-0" />

        {/* Center Logo Trigger */}
        <header className="relative z-30 w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-center">
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

        {/* Hero Content */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-8 md:py-12 flex flex-col items-center justify-center text-center my-auto">          {/* Hero Title with Deep Cinematic Text Shadow */}
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
      </div>

      {/* ================= 2ND SCREEN: BENTO GRID WITH LIQUID GLASS EFFECT (bgLandingImg2.png) ================= */}
      <section id="features" className="relative z-10 w-full min-h-screen py-20 lg:py-28 px-6 sm:px-12 lg:px-16 flex flex-col items-center justify-center overflow-hidden">
        {/* Full Background Graphic (bgLandingImg2.png) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-85 transition-opacity duration-700"
          style={{
            backgroundImage: "url('/assets/bgLandingImg2.png')",
          }}
        />

        {/* Liquid Glass Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709] via-transparent to-[#070709] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[#070709]/60 backdrop-blur-[2px] pointer-events-none z-0" />

        {/* Section Container */}
        <div className="relative z-10 w-full max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3.5 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151517]/90 backdrop-blur-xl border border-[#FFE600]/30 shadow-[0_0_15px_rgba(255,230,0,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFE600] animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#EDEDEF]">
                Autonomous Architecture
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#EDEDEF] tracking-tight leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              Next-Gen Support <span className="text-[#FFE600] drop-shadow-[0_0_25px_rgba(255,230,0,0.35)]">Intelligence</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9E9EA8] leading-relaxed">
              Engineered with sub-2s neural processing, deep Shopify synchronization, and deterministic safety guardrails.
            </p>
          </div>

          {/* Liquid Glass Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Bento Card 1 (Span 7) - Autonomous AI Agent Engine */}
            <div className="md:col-span-7 bg-[#0F0F10]/75 hover:bg-[#151517]/85 backdrop-blur-2xl border border-white/10 hover:border-[#FFE600]/40 rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.12)] transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              {/* Liquid ambient glow inside card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7B3DFF]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#7B3DFF]/25 transition-all" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#1E1E22] border border-[#7B3DFF]/40 flex items-center justify-center text-[#7B3DFF] shadow-[0_0_15px_rgba(123,61,255,0.25)]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#22C55E] bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.4)] px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    Sub-2s Latency
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#EDEDEF] group-hover:text-white transition-colors">
                    Autonomous Multi-Modal Resolver
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9E9EA8] mt-1.5 leading-relaxed">
                    Understands nuance, sentiment, and user intent across chats, emails, and tickets to execute instant end-to-end resolutions without human routing.
                  </p>
                </div>
              </div>

              {/* Mini Glass Ticket Mock */}
              <div className="mt-6 pt-4 border-t border-white/5 relative z-10 flex items-center justify-between bg-[#070709]/60 rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#FFE600] shadow-[0_0_6px_#FFE600]" />
                  <span className="text-xs font-mono text-[#D1D1D6]">#TK-8942 · &quot;Where is my shipment?&quot;</span>
                </div>
                <span className="text-[10px] font-semibold text-[#22C55E]">Resolved in 1.4s</span>
              </div>
            </div>

            {/* Bento Card 2 (Span 5) - Real-Time Order & Logistics Sync */}
            <div className="md:col-span-5 bg-[#0F0F10]/75 hover:bg-[#151517]/85 backdrop-blur-2xl border border-white/10 hover:border-[#FFE600]/40 rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.12)] transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFE600]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FFE600]/20 transition-all" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#1E1E22] border border-[#FFE600]/40 flex items-center justify-center text-[#FFE600] shadow-[0_0_15px_rgba(255,230,0,0.2)]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#4D7BFF] bg-[rgba(77,123,255,0.08)] border border-[rgba(77,123,255,0.4)] px-2.5 py-0.5 rounded-full">
                    Shopify Live
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#EDEDEF] group-hover:text-white transition-colors">
                    Direct Storefront & ERP Sync
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9E9EA8] mt-1.5 leading-relaxed">
                    Live inventory, courier status, address modifications, and automated return authorizations directly synchronized with your ecommerce stack.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 relative z-10 flex items-center justify-between text-xs text-[#9E9EA8]">
                <span>Order #40921 Tracking</span>
                <span className="font-semibold text-[#FFE600]">In Transit · Out for Delivery</span>
              </div>
            </div>

            {/* Bento Card 3 (Span 5) - Neural Guardrails */}
            <div className="md:col-span-5 bg-[#0F0F10]/75 hover:bg-[#151517]/85 backdrop-blur-2xl border border-white/10 hover:border-[#FFE600]/40 rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.12)] transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#4D7BFF]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#4D7BFF]/20 transition-all" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#1E1E22] border border-[#4D7BFF]/40 flex items-center justify-center text-[#4D7BFF] shadow-[0_0_15px_rgba(77,123,255,0.2)]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFE600] bg-[rgba(255,230,0,0.08)] border border-[rgba(255,230,0,0.4)] px-2.5 py-0.5 rounded-full">
                    Deterministic
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#EDEDEF] group-hover:text-white transition-colors">
                    Zero-Hallucination Guardrails
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9E9EA8] mt-1.5 leading-relaxed">
                    Custom rule definitions and threshold triggers prevent rogue responses, enforcing strict corporate policy on refunds and guarantees.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 relative z-10 flex items-center gap-2 text-xs text-[#22C55E]">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Policy Compliant</span>
              </div>
            </div>

            {/* Bento Card 4 (Span 7) - Real-Time Telemetry & Insights */}
            <div className="md:col-span-7 bg-[#0F0F10]/75 hover:bg-[#151517]/85 backdrop-blur-2xl border border-white/10 hover:border-[#FFE600]/40 rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.12)] transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFE600]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FFE600]/25 transition-all" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#1E1E22] border border-[#FFE600]/40 flex items-center justify-center text-[#FFE600] shadow-[0_0_15px_rgba(255,230,0,0.2)]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B3DFF] bg-[rgba(123,61,255,0.08)] border border-[rgba(123,61,255,0.4)] px-2.5 py-0.5 rounded-full">
                    Live Analytics
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#EDEDEF] group-hover:text-white transition-colors">
                    Adaptive Resolution Telemetry
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9E9EA8] mt-1.5 leading-relaxed">
                    Gain deep visibility into resolution speed, common customer bottlenecks, autonomous escalation paths, and user satisfaction metrics in real time.
                  </p>
                </div>
              </div>

              {/* Progress metric breakdown */}
              <div className="mt-6 pt-4 border-t border-white/5 relative z-10 grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#070709]/60 p-2.5 rounded-lg border border-white/5">
                  <p className="text-base font-bold text-white">84.2%</p>
                  <p className="text-[10px] text-[#9E9EA8]">Auto-Solved</p>
                </div>
                <div className="bg-[#070709]/60 p-2.5 rounded-lg border border-white/5">
                  <p className="text-base font-bold text-[#FFE600]">1.8s</p>
                  <p className="text-[10px] text-[#9E9EA8]">Avg Speed</p>
                </div>
                <div className="bg-[#070709]/60 p-2.5 rounded-lg border border-white/5">
                  <p className="text-base font-bold text-[#22C55E]">99.2%</p>
                  <p className="text-[10px] text-[#9E9EA8]">CSAT Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 w-full bg-[#09090A]/90 backdrop-blur-xl border-t border-[#1E1E22] py-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#85858D]">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="CLYRA" className="w-6 h-6 object-contain" />
            <span className="text-[#EDEDEF] font-bold tracking-wider">CLYRA</span>
            <span className="text-[#55555C]">·</span>
            <span>Autonomous Intelligence Suite</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <Link href="#features" className="hover:text-[#FFE600] transition-colors">Features</Link>
            <Link href="/login" className="hover:text-[#FFE600] transition-colors">Sign In</Link>
            <Link href="/signup" className="hover:text-[#FFE600] transition-colors">Sign Up</Link>
          </div>

          <p className="text-[#55555C] text-[11px]">© 2026 CLYRA Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
