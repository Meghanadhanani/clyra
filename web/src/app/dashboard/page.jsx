"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Clock,
  ExternalLink,
  FileText,
  HelpCircle,
  Layers,
  LayoutGrid,
  Link2,
  Lock,
  LogOut,
  Mail,
  MoreHorizontal,
  Package,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Share2,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  Wallet,
  Zap,
} from "lucide-react";
import { LOGOUT_API, ME_API } from "../../utils/ApiHelper";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("meetings");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(ME_API, {
          withCredentials: true,
        });
        if (response.data?.data?.user) {
          setUser(response.data.data.user);
          setWorkspace(response.data.data.workspace);
        }
      } catch (err) {
        // If not logged in, redirect to login
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axios.post(
        LOGOUT_API,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.push("/login");
    }
  };

  const currentDateFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 font-sans select-none overflow-hidden text-white bg-black/40 backdrop-blur-md">
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
              Brewing digital espresso & warming up the AI... ☕
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

  const teamMembers = [
    {
      name: "Marvin McKinney",
      id: "3564756746",
      role: "UI Mentor & AI Lead",
      email: "marvin.mckinney@example.com",
      status: "Active",
      date: "11 Nov 2024",
      department: "Team Project",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    {
      name: "Ralph Edwards",
      id: "365467354",
      role: "UX Researcher",
      email: "ralph.edwards@example.com",
      status: "Active",
      date: "10 Nov 2024",
      department: "Public Project",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    {
      name: user?.name || "Jane Doe",
      id: user?.id ? user.id.slice(0, 10) : "8920194821",
      role: user?.role === "owner" ? "Workspace Owner" : "Support Specialist",
      email: user?.email || "user@clyra.ai",
      status: "Active",
      date: "09 Nov 2024",
      department: workspace?.name || "StyleCart AI",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0F0F10] flex flex-col lg:flex-row font-sans text-white">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-full lg:w-[280px] bg-[#151517] border-b lg:border-b-0 lg:border-r border-[#2A2A30] p-5 lg:p-6 flex flex-col justify-between shrink-0 lg:min-h-screen">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-1">
            <img
              src="/assets/logo.png"
              alt="CLYRA"
              className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(255,230,0,0.35)]"
            />
            <span className="font-bold text-xl tracking-tight text-white">
              {workspace?.name || "CLYRA"}
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#85858D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search workspace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-[#0F0F10] border border-[#2A2A30] hover:border-[#45454D] focus:border-[#FFE600] focus:ring-1 focus:ring-[#FFE600] focus:shadow-[0_0_15px_rgba(255,230,0,0.10)] rounded-lg pl-9 pr-3 text-xs text-white placeholder-[#707078] transition-all"
            />
          </div>

          {/* 2x2 Navigation Grid */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveNav("dashboard")}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
                activeNav === "dashboard"
                  ? "bg-[#1E1E22] border border-[#FFE600]/55 text-white shadow-[0_0_15px_rgba(255,230,0,0.15)]"
                  : "bg-[#0F0F10] hover:bg-[#1E1E22] border border-[#2A2A30] text-[#85858D] hover:text-white"
              }`}
            >
              <LayoutGrid className={`w-5 h-5 mb-1.5 ${activeNav === "dashboard" ? "text-[#FFE600]" : "text-[#85858D]"}`} />
              <span className="text-[11px] font-semibold">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveNav("employees")}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
                activeNav === "employees"
                  ? "bg-[#1E1E22] border border-[#FFE600]/55 text-white shadow-[0_0_15px_rgba(255,230,0,0.15)]"
                  : "bg-[#0F0F10] hover:bg-[#1E1E22] border border-[#2A2A30] text-[#85858D] hover:text-white"
              }`}
            >
              <Users className={`w-5 h-5 mb-1.5 ${activeNav === "employees" ? "text-[#FFE600]" : "text-[#85858D]"}`} />
              <span className="text-[11px] font-semibold">Employees</span>
            </button>

            <button
              onClick={() => setActiveNav("time")}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
                activeNav === "time"
                  ? "bg-[#1E1E22] border border-[#FFE600]/55 text-white shadow-[0_0_15px_rgba(255,230,0,0.15)]"
                  : "bg-[#0F0F10] hover:bg-[#1E1E22] border border-[#2A2A30] text-[#85858D] hover:text-white"
              }`}
            >
              <Clock className={`w-5 h-5 mb-1.5 ${activeNav === "time" ? "text-[#FFE600]" : "text-[#85858D]"}`} />
              <span className="text-[11px] font-semibold">Time Manage</span>
            </button>

            <button
              onClick={() => setActiveNav("finance")}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
                activeNav === "finance"
                  ? "bg-[#1E1E22] border border-[#FFE600]/55 text-white shadow-[0_0_15px_rgba(255,230,0,0.15)]"
                  : "bg-[#0F0F10] hover:bg-[#1E1E22] border border-[#2A2A30] text-[#85858D] hover:text-white"
              }`}
            >
              <Wallet className={`w-5 h-5 mb-1.5 ${activeNav === "finance" ? "text-[#FFE600]" : "text-[#85858D]"}`} />
              <span className="text-[11px] font-semibold">Finance</span>
            </button>

            <button
              onClick={() => setActiveNav("payroll")}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
                activeNav === "payroll"
                  ? "bg-[#1E1E22] border border-[#FFE600]/55 text-white shadow-[0_0_15px_rgba(255,230,0,0.15)]"
                  : "bg-[#0F0F10] hover:bg-[#1E1E22] border border-[#2A2A30] text-[#85858D] hover:text-white"
              }`}
            >
              <FileText className={`w-5 h-5 mb-1.5 ${activeNav === "payroll" ? "text-[#FFE600]" : "text-[#85858D]"}`} />
              <span className="text-[11px] font-semibold">Payroll</span>
            </button>

            <button
              onClick={() => setActiveNav("reviews")}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl transition-all duration-200 cursor-pointer ${
                activeNav === "reviews"
                  ? "bg-[#1E1E22] border border-[#FFE600]/55 text-white shadow-[0_0_15px_rgba(255,230,0,0.15)]"
                  : "bg-[#0F0F10] hover:bg-[#1E1E22] border border-[#2A2A30] text-[#85858D] hover:text-white"
              }`}
            >
              <Star className={`w-5 h-5 mb-1.5 ${activeNav === "reviews" ? "text-[#FFE600]" : "text-[#85858D]"}`} />
              <span className="text-[11px] font-semibold">Reviews</span>
            </button>
          </div>

          {/* Favorite Section */}
          <div className="space-y-2 pt-1">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white w-full text-left transition-colors">
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Favorites</span>
            </button>
            <div className="space-y-1 pl-2 text-xs font-medium text-zinc-400">
              <div className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E8FD07] shadow-[0_0_6px_#E8FD07]" />
                <span>Opportunity Stages</span>
              </div>
              <div className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E8FD07] shadow-[0_0_6px_#E8FD07]" />
                <span>Key Metrics</span>
              </div>
              <div className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-white/5 hover:text-white cursor-pointer transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E8FD07] shadow-[0_0_6px_#E8FD07]" />
                <span>Product Plan</span>
              </div>
            </div>
          </div>

          {/* Marketing Section */}
          <div className="space-y-2 pt-1">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white w-full text-left transition-colors">
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Marketing Channels</span>
            </button>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#14151B] border border-white/5 text-xs font-medium text-zinc-300 hover:bg-[#1C1D24] hover:border-white/15 hover:text-white cursor-pointer transition-all shadow-xs">
                <Search className="w-3.5 h-3.5 text-[#E8FD07]" />
                <span>Product Inquiries</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#14151B] border border-white/5 text-xs font-medium text-zinc-300 hover:bg-[#1C1D24] hover:border-white/15 hover:text-white cursor-pointer transition-all shadow-xs">
                <Mail className="w-3.5 h-3.5 text-[#E8FD07]" />
                <span>Email Automations</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#14151B] border border-white/5 text-xs font-medium text-zinc-300 hover:bg-[#1C1D24] hover:border-white/15 hover:text-white cursor-pointer transition-all shadow-xs">
                <Calendar className="w-3.5 h-3.5 text-[#E8FD07]" />
                <span>Integrations</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#14151B] border border-white/5 text-xs font-medium text-zinc-300 hover:bg-[#1C1D24] hover:border-white/15 hover:text-white cursor-pointer transition-all shadow-xs">
                <LayoutGrid className="w-3.5 h-3.5 text-[#E8FD07]" />
                <span>Chat Widget</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#14151B] border border-white/5 text-xs font-medium text-zinc-300 hover:bg-[#1C1D24] hover:border-white/15 hover:text-white cursor-pointer transition-all shadow-xs">
                <FileText className="w-3.5 h-3.5 text-[#E8FD07]" />
                <span>Knowledge Base</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom User Pill */}
        <div className="pt-6 relative">
          <div className="flex items-center gap-2">
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex-1 bg-[#16171E] border border-white/10 hover:border-[#E8FD07]/30 text-white rounded-2xl p-2.5 flex items-center justify-between cursor-pointer transition-all shadow-md"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-white/20"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate text-white leading-tight">
                    {user?.name || "Workspace Member"}
                  </p>
                  <p className="text-[10px] text-zinc-400 truncate capitalize">
                    {user?.role === "owner" ? "Workspace Owner" : user?.role || "Team Member"}
                  </p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0 ml-1" />
            </div>

            {/* Notification Bell */}
            <button className="w-11 h-11 rounded-2xl bg-[#16171E] border border-white/10 hover:border-[#E8FD07]/40 flex items-center justify-center text-zinc-300 hover:text-[#E8FD07] transition-all shadow-md shrink-0 cursor-pointer">
              <Bell className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute bottom-16 left-0 right-0 bg-[#14151B] rounded-2xl border border-white/15 shadow-2xl p-2 z-50 space-y-1 backdrop-blur-xl">
              <div className="px-3 py-2 border-b border-white/5">
                <p className="text-xs font-bold text-white">{user?.name}</p>
                <p className="text-[10px] text-zinc-400 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{loggingOut ? "Logging out..." : "Log out"}</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#2A2A30]">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Welcome back, {user?.name?.split(" ")[0] || "Leader"}
            </h1>
            <p className="text-xs text-[#85858D] mt-0.5">{currentDateFormatted}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151517] border border-[#FFE600]/40 text-xs font-medium text-[#FFE600] shadow-xs">
              <div className="w-2 h-2 rounded-full bg-[#FFE600] shadow-[0_0_8px_#FFE600] animate-pulse" />
              <span>AI Agent Active</span>
            </div>

            {/* Primary Button */}
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFE600] hover:bg-[#FFF033] active:bg-[#C9B800] text-[#0F0F10] text-xs font-semibold transition-all shadow-[0_0_18px_rgba(255,230,0,0.15)] hover:shadow-[0_0_24px_rgba(255,230,0,0.30)] cursor-pointer">
              <Plus className="w-3.5 h-3.5" />
              <span>New Ticket</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-[#151517] border border-[#2A2A30] hover:bg-[#1E1E22] hover:border-[#FFE600]/25 rounded-xl p-4.5 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.25)] group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#85858D]">Resolution Rate</span>
              <div className="w-8 h-8 rounded-lg bg-[#1E1E22] border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600]">
                <Zap className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mt-2">84.2%</p>
            <div className="flex items-center gap-1 text-[11px] text-[#FFE600] font-semibold mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+12.4% vs last week</span>
            </div>
          </div>

          <div className="bg-[#151517] border border-[#2A2A30] hover:bg-[#1E1E22] hover:border-[#FFE600]/25 rounded-xl p-4.5 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.25)] group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#85858D]">Total Inquiries</span>
              <div className="w-8 h-8 rounded-lg bg-[#1E1E22] border border-[#4D7BFF]/30 flex items-center justify-center text-[#4D7BFF]">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mt-2">1,248</p>
            <div className="flex items-center gap-1 text-[11px] text-[#85858D] font-medium mt-1">
              <span>998 resolved autonomously</span>
            </div>
          </div>

          <div className="bg-[#151517] border border-[#2A2A30] hover:bg-[#1E1E22] hover:border-[#FFE600]/25 rounded-xl p-4.5 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.25)] group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#85858D]">Avg Response Time</span>
              <div className="w-8 h-8 rounded-lg bg-[#1E1E22] border border-[#7B3DFF]/30 flex items-center justify-center text-[#7B3DFF]">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mt-2">1.8s</p>
            <div className="flex items-center gap-1 text-[11px] text-[#7B3DFF] font-semibold mt-1">
              <Sparkles className="w-3 h-3" />
              <span>Instant AI processing</span>
            </div>
          </div>

          <div className="bg-[#151517] border border-[#2A2A30] hover:bg-[#1E1E22] hover:border-[#FFE600]/25 rounded-xl p-4.5 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.25)] group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#85858D]">Customer Satisfaction</span>
              <div className="w-8 h-8 rounded-lg bg-[#1E1E22] border border-[#FFE600]/30 flex items-center justify-center text-[#FFE600]">
                <Star className="w-4 h-4 fill-[#FFE600]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mt-2">4.9 / 5.0</p>
            <div className="flex items-center gap-1 text-[11px] text-[#85858D] font-medium mt-1">
              <span>Based on 450+ reviews</span>
            </div>
          </div>
        </div>

        {/* Team & Live Workspace Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Team Members List */}
          <div className="xl:col-span-2 bg-[#151517] border border-[#2A2A30] rounded-xl p-5 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Team Members & Leads</h3>
                <p className="text-xs text-[#85858D]">Assigned support managers in {workspace?.name || "StyleCart AI"}</p>
              </div>
              <button className="text-xs font-semibold text-[#FFE600] hover:underline cursor-pointer flex items-center gap-1">
                <span>View all</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#0F0F10] border border-[#2A2A30] hover:border-white/15 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-9 h-9 rounded-full object-cover border border-[#2A2A30]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-white">{member.name}</p>
                      <p className="text-[11px] text-[#85858D]">{member.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider text-[#22C55E] bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.55)] px-2.5 py-0.5 rounded-full">
                      {member.status}
                    </span>
                    <span className="text-xs text-[#85858D]">{member.department}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions / Channel Integration */}
          <div className="bg-[#151517] border border-[#2A2A30] rounded-xl p-5 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)] flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Channel Status</h3>
                <p className="text-xs text-[#85858D]">Active automated integrations</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F0F10] border border-[#FFE600]/40">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-[#FFE600] shadow-[0_0_6px_#FFE600]" />
                    <span className="text-xs font-medium text-white">Shopify Storefront</span>
                  </div>
                  <span className="text-[11px] text-[#FFE600] font-semibold">Connected</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F0F10] border border-[#2A2A30]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-[#22C55E] shadow-[0_0_6px_#22C55E]" />
                    <span className="text-xs font-medium text-white">Live Web Chat</span>
                  </div>
                  <span className="text-[11px] text-[#22C55E] font-medium">Ready</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F0F10] border border-[#2A2A30]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-[#55555C]" />
                    <span className="text-xs font-medium text-[#85858D]">WhatsApp Business</span>
                  </div>
                  <span className="text-[11px] text-[#707078] font-medium">Setup</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#1E1E22] border border-[#FFE600]/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Shield className="w-4 h-4 text-[#FFE600]" />
                <span>AI Guardrails Active</span>
              </div>
              <span className="text-[10px] text-[#85858D] font-mono">v2.4.0</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
