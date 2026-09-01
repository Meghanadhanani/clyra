"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { signup } from "@/service/auth.service";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    workspace_name: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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

  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const getStrengthLabel = () => {
    if (formData.password.length === 0) return "";
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 3) return "Moderate";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-rose-500";
    if (passwordStrength <= 3) return "bg-amber-500";
    return "bg-emerald-600";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError("Full name must be at least 2 characters.");
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please provide a valid email address.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (
      !formData.workspace_name.trim() ||
      formData.workspace_name.trim().length < 2
    ) {
      setError("Workspace name must be at least 2 characters.");
      return;
    }
    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const response = await signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        workspace_name: formData.workspace_name.trim(),
      });

      const user = response?.data?.user;
      const workspace = response?.data?.workspace;

      setSuccessData({
        userName: user?.name || formData.name,
        workspaceName: workspace?.name || formData.workspace_name,
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
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
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFFDF9] via-[#FFF8E7] to-[#FDF1CC] p-4 sm:p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-[1080px] bg-white/90 backdrop-blur-md rounded-[32px] shadow-xl border border-[#E8DFC8]/80 overflow-hidden flex flex-col md:flex-row min-h-[680px]">
        
        {/* Left Brand Showcase */}
        <div className="hidden md:flex md:w-5/12 bg-[#FAF7EF] p-8 lg:p-10 flex-col justify-between border-r border-[#EFE8D6] relative overflow-hidden">
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
              Autonomous Support Intelligence
            </p>
          </div>

          <div className="space-y-4 my-6 relative z-10">
            <div className="bg-gradient-to-b from-[#FEF08A] to-[#FFFDF9] border border-[#FDE047] rounded-2xl p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-white/80 px-2 py-0.5 rounded-md shadow-2xs">
                  Zero-Setup AI Pilot
                </span>
                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
              <h4 className="text-xs font-bold text-[#1A1C1E] pt-1">
                Omni-Channel Customer Resolution
              </h4>
              <p className="text-[11px] text-stone-500 font-medium leading-relaxed">
                Connect Shopify, WhatsApp, and Web chat widgets in seconds.
              </p>
            </div>

            <div className="bg-white/80 border border-[#EBE3D3] rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-700">
                <span>AI Automated Support</span>
                <span className="text-amber-600 font-mono">80%+</span>
              </div>
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <div className="bg-[#FBBF24] h-full rounded-full w-4/5" />
              </div>
              <p className="text-[10px] text-stone-500">
                Handles orders, returns, tracking, and FAQ resolution automatically.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 relative z-10">
            <div className="w-2 h-2 rounded-full bg-[#FBBF24] animate-pulse" />
            <span>Multi-Tenant Architecture</span>
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="w-full md:w-7/12 p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1E] tracking-tight">
                Create your workspace
              </h2>
              <p className="text-xs sm:text-sm font-medium text-stone-500 mt-1">
                Start your 14-day free trial. No credit card required.
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
                  <p className="font-bold">Account Created!</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Welcome, {successData.userName}! Redirecting to {successData.workspaceName}...
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#EBE3D3] rounded-full py-2.5 pl-10 pr-3.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700">
                    Workspace Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      name="workspace_name"
                      type="text"
                      required
                      placeholder="StyleCart AI"
                      value={formData.workspace_name}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#EBE3D3] rounded-full py-2.5 pl-10 pr-3.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700">
                  Work Email
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

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-700">
                    Password
                  </label>
                  {formData.password && (
                    <span
                      className={`text-[10px] font-bold ${
                        passwordStrength <= 1
                          ? "text-rose-600"
                          : passwordStrength <= 3
                          ? "text-amber-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {getStrengthLabel()}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="At least 8 characters"
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

                {formData.password && (
                  <div className="pt-1 flex gap-1 h-1">
                    <div
                      className={`flex-1 rounded-full ${
                        passwordStrength >= 1 ? getStrengthColor() : "bg-stone-200"
                      }`}
                    />
                    <div
                      className={`flex-1 rounded-full ${
                        passwordStrength >= 2 ? getStrengthColor() : "bg-stone-200"
                      }`}
                    />
                    <div
                      className={`flex-1 rounded-full ${
                        passwordStrength >= 3 ? getStrengthColor() : "bg-stone-200"
                      }`}
                    />
                    <div
                      className={`flex-1 rounded-full ${
                        passwordStrength >= 4 ? getStrengthColor() : "bg-stone-200"
                      }`}
                    />
                  </div>
                )}
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#EBE3D3] text-[#1E2024] focus:ring-[#FBBF24] accent-[#1E2024]"
                  />
                  <span className="text-[11px] text-stone-600 leading-normal">
                    I agree to the{" "}
                    <span className="font-bold text-stone-800 underline underline-offset-2 cursor-pointer">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="font-bold text-stone-800 underline underline-offset-2 cursor-pointer">
                      Privacy Policy
                    </span>
                    .
                  </span>
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
                    <span>Creating workspace...</span>
                  </>
                ) : successData ? (
                  <>
                    <Check className="w-4 h-4 text-[#FBBF24]" />
                    <span>Workspace Ready</span>
                  </>
                ) : (
                  <>
                    <span>Create Workspace & Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-3 border-t border-[#EBE3D3] text-center text-xs font-medium text-stone-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#1A1C1E] hover:underline underline-offset-2"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
