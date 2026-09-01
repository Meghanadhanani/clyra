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
import { LOGIN_API } from "../../../utils/ApiHelper";

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
    <div className="min-h-screen w-full bg-[#0A0A0C] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#181920] via-[#0A0A0C] to-[#050507] p-4 sm:p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-[1050px] bg-[#121318]/90 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row min-h-[620px]">
        
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 bg-[#0E0F13] p-8 lg:p-10 flex-col justify-between border-r border-white/5 relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <Link href="/" className="inline-flex items-center gap-3.5">
              <img
                src="/assets/logo.png"
                alt="CLYRA"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_0_12px_rgba(255,230,0,0.45)]"
              />
              <span className="font-bold text-xl sm:text-2xl tracking-wider text-[#EDEDEF]">
                CLYRA
              </span>
            </Link>
            <p className="text-xs font-semibold text-[#85858D] uppercase tracking-wider">
              Customer Support & Automation
            </p>
          </div>

          <div className="space-y-4 my-6 relative z-10">
            <div className="bg-[#181A22] border border-[#E8FD07]/30 rounded-2xl p-4 shadow-sm space-y-3 relative group hover:border-[#E8FD07]/50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-[#E8FD07] px-2 py-0.5 rounded-md shadow-sm">
                    AI Automation Live
                  </span>
                  <h4 className="text-xs font-bold text-white mt-1.5">
                    Autonomous Order Inquiries & Tracking
                  </h4>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#E8FD07]/15 text-[#E8FD07] border border-[#E8FD07]/40 flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-bold text-zinc-300">80% Instant Resolution</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#14151B] border border-white/10 rounded-2xl p-3 shadow-sm hover:border-[#E8FD07]/30 transition-all">
                <span className="text-[10px] font-semibold text-zinc-400">Response Speed</span>
                <p className="text-lg font-extrabold text-white mt-0.5">1.8s</p>
                <span className="text-[9px] font-semibold text-[#E8FD07]">Sub-second answers</span>
              </div>
              <div className="bg-[#0F0F10] border border-[#1E1E22] rounded-xl p-3 shadow-sm hover:border-[#FFE600]/30 transition-all">
                <span className="text-[10px] font-semibold text-[#71717A]">Autonomous Fix</span>
                <p className="text-lg font-extrabold text-[#FFE600] mt-0.5">80%+</p>
                <span className="text-[9px] font-semibold text-[#A1A1AA]">Zero human touch</span>
              </div>
              <div className="bg-[#0F0F10] border border-[#1E1E22] rounded-xl p-3 shadow-sm hover:border-[#FFE600]/30 transition-all">
                <span className="text-[10px] font-semibold text-[#71717A]">Avg Satisfaction</span>
                <p className="text-lg font-extrabold text-white mt-0.5">99.2%</p>
                <span className="text-[9px] font-semibold text-[#A1A1AA]">5-Star feedback</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#A1A1AA] relative z-10">
            <div className="w-2 h-2 rounded-full bg-[#FFE600] shadow-[0_0_8px_#FFE600] animate-pulse" />
            <span>CLYRA Engine Active</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-7 sm:p-10 lg:p-12 flex flex-col justify-center bg-[#0F0F10]">
          <div className="max-w-sm w-full mx-auto space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#EDEDEF] tracking-tight">
                Welcome back
              </h2>
              <p className="text-xs sm:text-sm font-medium text-[#9E9EA8] mt-1">
                Enter your credentials to continue
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-lg bg-[#1F0E0E] border border-[#EF4444]/60 text-[#EF4444] text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#EF4444]" />
                <span className="leading-relaxed font-medium">{error}</span>
              </div>
            )}

            {successData && (
              <div className="p-3.5 rounded-lg bg-[#0E1F18] border border-[#10B981]/60 text-[#10B981] text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#FFE600]" />
                <div>
                  <p className="font-bold text-[#EDEDEF]">Login Successful!</p>
                  <p className="text-[11px] text-[#B8B8BE] mt-0.5">
                    Redirecting {successData.userName} to {successData.workspaceName}...
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#D1D1D6]">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#85858D] absolute left-3.5 top-1/2 -translate-y-1/2 opacity-90" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-12 bg-[#0F0F10] border border-[#2A2A30] hover:border-[#45454D] outline-none focus:outline-none focus:ring-0 focus:border-[#FFE600] rounded-lg pl-10 pr-4 text-sm text-[#EDEDEF] placeholder-[#707078] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#D1D1D6]">
                    Password
                  </label>
                  <span className="text-xs font-medium text-[#85858D] hover:text-[#FFE600] cursor-pointer transition-colors">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#85858D] absolute left-3.5 top-1/2 -translate-y-1/2 opacity-90" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full h-12 bg-[#0F0F10] border border-[#2A2A30] hover:border-[#45454D] outline-none focus:outline-none focus:ring-0 focus:border-[#FFE600] rounded-lg pl-10 pr-10 text-sm text-[#EDEDEF] placeholder-[#707078] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#85858D] hover:text-[#FFE600] cursor-pointer transition-colors"
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
                    className="w-4 h-4 rounded border-[#2A2A30] bg-[#0F0F10] text-[#FFE600] focus:ring-[#FFE600] accent-[#FFE600]"
                  />
                  <span className="text-xs font-medium text-[#85858D]">Remember this device</span>
                </label>
              </div>

              {/* CLYRA Design System Outline / Disabled Button */}
              <button
                type="submit"
                disabled={loading || !!successData}
                className="w-full mt-2 h-12 bg-transparent hover:bg-[#FFE600]/8 active:bg-[#FFE600]/14 border border-[#FFE600]/55 hover:border-[#FFE600] text-[#FFE600] rounded-lg px-5 text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:border-[#303035] disabled:text-[#55555C] disabled:bg-transparent disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#FFE600]/40 border-t-[#FFE600] rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : successData ? (
                  <>
                    <Check className="w-4 h-4 text-[#22C55E]" />
                    <span>Signed In</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-[#2A2A30] text-center text-xs font-medium text-[#85858D]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-white hover:text-[#FFE600] hover:underline underline-offset-2 transition-colors"
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
