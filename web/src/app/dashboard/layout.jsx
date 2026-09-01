"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "../../service/auth.service";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    async function protectDashboard() {
      try {
        const response = await getCurrentUser();

        if (response.data?.user?.role !== "owner") {
          router.replace("/login");
          return;
        }

        setIsAllowed(true);
      } catch {
        router.replace("/login");
      } finally {
        setIsCheckingSession(false);
      }
    }

    protectDashboard();
  }, [router]);

  if (isCheckingSession) {
    return (
      <main className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 font-sans select-none overflow-hidden text-white bg-black/40 backdrop-blur-md">
        <div className="relative z-10 flex flex-col items-center justify-center gap-7 max-w-md text-center">
          {/* Logo with Pure Floating Breathing Glow */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-28 h-28 bg-[#E8FD07]/30 rounded-full blur-2xl animate-pulse" />
            <img
              src="/assets/bg-removed-logo.png"
              alt="CLYRA"
              className="w-20 h-20 object-contain animate-float-glow drop-shadow-[0_0_30px_rgba(232,253,7,0.85)]"
            />
          </div>

          {/* Fun Waiting Message */}
          <div className="flex flex-col items-center gap-2 px-4">
            <p className="text-sm sm:text-base font-semibold text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Verifying secret handshake & session keys... 🔑
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8FD07] animate-bounce [animation-delay:-0.3s] shadow-[0_0_8px_#E8FD07]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8FD07] animate-bounce [animation-delay:-0.15s] shadow-[0_0_8px_#E8FD07]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8FD07] animate-bounce shadow-[0_0_8px_#E8FD07]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!isAllowed) {
    return null;
  }

  return children;
}
