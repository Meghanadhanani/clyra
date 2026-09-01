"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/service/auth.service";

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
      <main className="min-h-screen bg-[#FFFDF9] flex items-center justify-center">
        <p className="text-sm font-medium text-stone-600">
          Checking your session...
        </p>
      </main>
    );
  }

  if (!isAllowed) {
    return null;
  }

  return children;
}
