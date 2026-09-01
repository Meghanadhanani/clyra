"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";
import { LOGIN_API } from "@/utils/ApiHelper";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        LOGIN_API,
        {
          email: formData.email.trim(),
          password: formData.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const user = response.data?.data?.user;
      const workspace = response.data?.data?.workspace;

      setSuccessData({
        userName: user?.name || "User",
        workspaceName: workspace?.name || "Workspace",
      });

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (err) {
      if (err.response?.data?.error?.message) {
        setError(err.response.data.error.message);
      } else if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        if (Array.isArray(detail)) {
          setError(detail.map((d) => d.msg || d).join(", "));
        } else {
          setError(String(detail));
        }
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFFDF9] via-[#FFF8E7] to-[#FDF1CC] p-4 sm:p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-[1050px] bg-white/90 backdrop-blur-md rounded-[32px] shadow-xl border border-[#E8DFC8]/80 overflow-hidden flex flex-col md:flex-row min-h-[620px]">
        
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-[#FAF7EF] p-8 lg:p-10 flex-col justify-between border-r border-[#EFE8D6] relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border-2 border-[#1A1C1E] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-[#1A1C1E] border-t-transparent rotate-45" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[#1A1C1E]">
                CLYRA
              </span>
            </Link>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Customer Support & Automation
            </p>
          </div>

          <div className="space-y-4 my-6 relative z-10">
            <div className="bg-gradient-to-b from-[#FEF08A] to-[#FFFDF9] border border-[#FDE047] rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-white/80 px-2 py-0.5 rounded-md shadow-2xs">
                    AI Automation Live
                  </span>
                  <h4 className="text-xs font-bold text-[#1A1C1E] mt-1.5">
                    Autonomous Order Inquiries & Tracking
                  </h4>
                </div>
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-bold text-stone-700">80% Instant Resolution</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/80 border border-[#EBE3D3] rounded-2xl p-3 shadow-2xs">
                <span className="text-[10px] font-semibold text-stone-400">Response Speed</span>
                <p className="text-lg font-extrabold text-[#1A1C1E] mt-0.5">1.8s</p>
                <span className="text-[9px] font-semibold text-emerald-700">Sub-second answers</span>
              </div>
              <div className="bg-white/80 border border-[#EBE3D3] rounded-2xl p-3 shadow-2xs">
                <span className="text-[10px] font-semibold text-stone-400">Avg Satisfaction</span>
                <p className="text-lg font-extrabold text-[#1A1C1E] mt-0.5">99.2%</p>
                <span className="text-[9px] font-semibold text-amber-700">5-Star feedback</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 relative z-10">
            <div className="w-2 h-2 rounded-full bg-[#FBBF24] animate-pulse" />
            <span>CLYRA Engine Active</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="max-w-sm w-full mx-auto space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1E] tracking-tight">
                Welcome back
              </h2>
              <p className="text-xs sm:text-sm font-medium text-stone-500 mt-1">
                Enter your credentials to continue
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{error}</span>
              </div>
            )}

            {successData && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Login Successful!</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Redirecting {successData.userName} to {successData.workspaceName}...
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#EBE3D3] rounded-full py-2.5 pl-10 pr-4 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-700">
                    Password
                  </label>
                  <span className="text-[11px] font-semibold text-stone-500 hover:text-stone-800 cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-white border border-[#EBE3D3] rounded-full py-2.5 pl-10 pr-10 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#EBE3D3] text-[#1E2024] focus:ring-[#FBBF24] accent-[#1E2024]"
                  />
                  <span className="text-xs font-medium text-stone-600">Remember this device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !!successData}
                className="w-full mt-2 bg-[#1E2024] hover:bg-stone-900 text-white rounded-full py-3 px-5 text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : successData ? (
                  <>
                    <Check className="w-4 h-4 text-[#FBBF24]" />
                    <span>Signed In</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-[#EBE3D3] text-center text-xs font-medium text-stone-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-[#1A1C1E] hover:underline underline-offset-2"
              >
                Create one now
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
