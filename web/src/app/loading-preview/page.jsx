"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const FUN_MESSAGES = [
  "Brewing digital espresso & warming up the AI... ☕",
  "Teaching CLYRA how to speak fluent human... 🧠",
  "Polishing pixels and untangling neural wires... ✨",
  "Charging the flux capacitors... almost ready! ⚡",
  "Consulting the oracle to fetch your workspace... 🔮",
];

export default function LoadingPreviewPage() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % FUN_MESSAGES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 font-sans select-none overflow-hidden text-white bg-transparent">
      {/* Background preview container so user sees page behind the transparent loader */}
      <div
        className="absolute inset-0 bg-cover bg-[center_35%] opacity-40 pointer-events-none -z-10"
        style={{ backgroundImage: "url('/images/bgImg.png')" }}
      />

      {/* Top return link */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-zinc-200 flex items-center gap-2 transition-all backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Landing</span>
      </Link>

      {/* Floating on Top of Screen: Minimalist Logo Only + Fun Message */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 max-w-md text-center">
        {/* Logo with Pure Floating Breathing Glow */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-28 h-28 bg-[#E8FD07]/30 rounded-full blur-2xl animate-pulse" />
          <img
            src="/assets/bg-removed-logo.png"
            alt="CLYRA"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain animate-float-glow drop-shadow-[0_0_30px_rgba(232,253,7,0.85)]"
          />
        </div>

        {/* Fun Waiting Message */}
        <div className="flex flex-col items-center gap-2 px-4">
          <p
            key={messageIndex}
            className="text-sm sm:text-base font-semibold text-white tracking-wide animate-fade-in transition-all drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          >
            {FUN_MESSAGES[messageIndex]}
          </p>

          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8FD07] animate-bounce [animation-delay:-0.3s] shadow-[0_0_8px_#E8FD07]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8FD07] animate-bounce [animation-delay:-0.15s] shadow-[0_0_8px_#E8FD07]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8FD07] animate-bounce shadow-[0_0_8px_#E8FD07]" />
          </div>
        </div>
      </div>
    </div>
  );
}
