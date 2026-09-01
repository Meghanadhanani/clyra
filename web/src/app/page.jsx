"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/service/auth.service";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function redirectUser() {
      try {
        const response = await getCurrentUser();
        const role = response.data?.user?.role;

        if (role === "owner") {
          router.replace("/dashboard");
          return;
        }

        router.replace("/login");
      } catch {
        router.replace("/signup");
      }
    }

    redirectUser();
  }, [router]);

  return (
    <main className="min-h-screen bg-[#FFFDF9] flex items-center justify-center">
      <p className="text-sm font-medium text-stone-600">Loading CLYRA...</p>
    </main>
  );
}
