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
import { signup } from "../../../service/auth.service";

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
    <div className="relative min-h-screen w-full bg-[#070709] text-white flex flex-col justify-between overflow-x-hidden font-sans select-none">
      {/* ================= FULL BACKGROUND IMAGE LAYER (manImg1.png) ================= */}
      <div
        className="absolute inset-0 bg-cover bg-[right_bottom] sm:bg-[right_center] bg-no-repeat pointer-events-none z-0 opacity-85 transition-opacity duration-700"
        style={{
          backgroundImage: "url('/assets/manImg1.png')",
        }}
      />

      {/* Left-to-Right Dark Gradient for crisp form readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/85 md:via-[#070709]/75 to-transparent pointer-events-none z-0" />

      {/* Top and Bottom edge gradients for smooth blending */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#070709] via-[#070709]/80 to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-transparent pointer-events-none z-0" />

      {/* ================= TOP HEADER BAR ================= */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 flex items-center justify-between">
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

        <Link
          href="/login"
          className="px-5 py-2.5 rounded-lg bg-[#151517] hover:bg-[#1E1E22] border border-[#2A2A30] hover:border-[#FFE600] text-xs font-semibold text-[#D1D1D6] hover:text-[#FFE600] transition-all shadow-sm"
        >
          Sign In
        </Link>
      </header>

      {/* ================= MAIN CONTENT (LEFT ALIGNED FORM) ================= */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-6 sm:py-10 flex flex-col justify-center my-auto">
        <div className="max-w-lg w-full space-y-6">
          {/* Header Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#EDEDEF] tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Create your <span className="text-[#FFE600] drop-shadow-[0_0_25px_rgba(255,230,0,0.35)]">workspace</span>
            </h1>
            <p className="text-xs sm:text-sm font-normal text-[#9E9EA8] mt-2 leading-relaxed">
              Deploy autonomous AI support for your store and digital workflows in under 2 minutes.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-lg bg-[#1F0E0E] border border-[#EF4444]/60 text-[#EF4444] text-xs flex items-start gap-2.5 shadow-lg">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{error}</span>
            </div>
          )}

          {successData && (
            <div className="p-3.5 rounded-lg bg-[#0E1F18] border border-[#10B981]/60 text-[#10B981] text-xs flex items-start gap-2.5 shadow-lg">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#FFE600]" />
              <div>
                <p className="font-bold text-[#EDEDEF]">Account Created!</p>
                <p className="text-[11px] text-[#B8B8BE] mt-0.5">
                  Welcome, {successData.userName}! Redirecting to {successData.workspaceName}...
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#D1D1D6]">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#85858D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-12 bg-[#0F0F10] border border-[#2A2A30] hover:border-[#45454D] outline-none focus:outline-none focus:ring-0 focus:border-[#FFE600] rounded-lg pl-10 pr-3.5 text-sm text-[#EDEDEF] placeholder-[#707078] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#D1D1D6]">
                  Workspace Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#85858D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    name="workspace_name"
                    type="text"
                    required
                    placeholder="StyleCart AI"
                    value={formData.workspace_name}
                    onChange={handleChange}
                    className="w-full h-12 bg-[#0F0F10] border border-[#2A2A30] hover:border-[#45454D] outline-none focus:outline-none focus:ring-0 focus:border-[#FFE600] rounded-lg pl-10 pr-3.5 text-sm text-[#EDEDEF] placeholder-[#707078] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#D1D1D6]">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#85858D] absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                {formData.password && (
                  <span
                    className={`text-[10px] font-bold ${
                      passwordStrength <= 1
                        ? "text-[#FF3B30]"
                        : passwordStrength <= 3
                        ? "text-[#FFE600]"
                        : "text-[#22C55E]"
                    }`}
                  >
                    {getStrengthLabel()}
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#85858D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="At least 8 characters"
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

              {formData.password && (
                <div className="pt-1 flex gap-1.5 h-1">
                  <div
                    className={`flex-1 rounded-full ${
                      passwordStrength >= 1 ? "bg-[#FFE600]" : "bg-[#24242A]"
                    }`}
                  />
                  <div
                    className={`flex-1 rounded-full ${
                      passwordStrength >= 2 ? "bg-[#FFE600]" : "bg-[#24242A]"
                    }`}
                  />
                  <div
                    className={`flex-1 rounded-full ${
                      passwordStrength >= 3 ? "bg-[#7B3DFF]" : "bg-[#24242A]"
                    }`}
                  />
                  <div
                    className={`flex-1 rounded-full ${
                      passwordStrength >= 4 ? "bg-[#22C55E]" : "bg-[#24242A]"
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
                  className="mt-0.5 w-4 h-4 rounded border-[#2A2A30] bg-[#0F0F10] text-[#FFE600] focus:ring-[#FFE600] accent-[#FFE600]"
                />
                <span className="text-xs text-[#85858D] leading-normal">
                  I agree to the{" "}
                  <span className="font-medium text-[#D1D1D6] underline underline-offset-2 hover:text-[#FFE600] cursor-pointer transition-colors">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-[#D1D1D6] underline underline-offset-2 hover:text-[#FFE600] cursor-pointer transition-colors">
                    Privacy Policy
                  </span>
                  .
                </span>
              </label>
            </div>

            {/* CLYRA Design System Outline / Disabled Button */}
            <button
              type="submit"
              disabled={loading || !!successData}
              className="w-full mt-2 h-12 bg-transparent hover:bg-[#FFE600]/8 active:bg-[#FFE600]/14 border border-[#FFE600]/55 hover:border-[#FFE600] text-[#FFE600] rounded-lg px-6 text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:border-[#303035] disabled:text-[#55555C] disabled:bg-transparent disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#FFE600]/40 border-t-[#FFE600] rounded-full animate-spin" />
                  <span>Creating workspace...</span>
                </>
              ) : successData ? (
                <>
                  <Check className="w-4 h-4 text-[#22C55E]" />
                  <span>Workspace Ready</span>
                </>
              ) : (
                <>
                  <span>Create Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#2A2A30] text-center text-xs font-medium text-[#85858D]">
            Already have a workspace?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#FFE600] hover:underline underline-offset-2 transition-colors"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
