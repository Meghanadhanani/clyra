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
import { LOGOUT_API, ME_API } from "@/utils/ApiHelper";

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
      <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center p-4">
        <div className="bg-white rounded-[28px] p-8 shadow-xl border border-[#E8DFC8]/60 flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#FBBF24] border-t-transparent animate-spin" />
          <p className="text-stone-700 font-medium">Loading CLYRA Workspace...</p>
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
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFFDF9] via-[#FFF8E7] to-[#FDF1CC] flex flex-col lg:flex-row font-sans">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-full lg:w-[280px] bg-[#FAF7EF] border-b lg:border-b-0 lg:border-r border-[#EFE8D6] p-5 lg:p-6 flex flex-col justify-between shrink-0 lg:min-h-screen">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-full border-2 border-[#1A1C1E] flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full border border-[#1A1C1E] border-t-transparent rotate-45" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#1A1C1E]">
                {workspace?.name || "Homies Lab"}
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search here"
                className="w-full bg-white/80 border border-[#EBE3D3] rounded-full py-2 pl-9 pr-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] transition-all"
              />
            </div>

            {/* 2x2 Navigation Grid */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveNav("dashboard")}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                  activeNav === "dashboard"
                    ? "bg-[#1E2024] text-white shadow-md"
                    : "bg-white/60 hover:bg-white border border-[#EBE3D3]/70 text-stone-700"
                }`}
              >
                <LayoutGrid className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-semibold">Dashboard</span>
              </button>

              <button
                onClick={() => setActiveNav("employees")}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                  activeNav === "employees"
                    ? "bg-[#1E2024] text-white shadow-md"
                    : "bg-white/60 hover:bg-white border border-[#EBE3D3]/70 text-stone-700"
                }`}
              >
                <Users className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-semibold">Employees</span>
              </button>

              <button
                onClick={() => setActiveNav("time")}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                  activeNav === "time"
                    ? "bg-[#1E2024] text-white shadow-md"
                    : "bg-white/60 hover:bg-white border border-[#EBE3D3]/70 text-stone-700"
                }`}
              >
                <Clock className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-semibold">Time Manage</span>
              </button>

              <button
                onClick={() => setActiveNav("finance")}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                  activeNav === "finance"
                    ? "bg-[#1E2024] text-white shadow-md"
                    : "bg-white/60 hover:bg-white border border-[#EBE3D3]/70 text-stone-700"
                }`}
              >
                <Wallet className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-semibold">Finance</span>
              </button>

              <button
                onClick={() => setActiveNav("payroll")}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                  activeNav === "payroll"
                    ? "bg-[#1E2024] text-white shadow-md"
                    : "bg-white/60 hover:bg-white border border-[#EBE3D3]/70 text-stone-700"
                }`}
              >
                <FileText className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-semibold">Payroll</span>
              </button>

              <button
                onClick={() => setActiveNav("reviews")}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                  activeNav === "reviews"
                    ? "bg-[#1E2024] text-white shadow-md"
                    : "bg-white/60 hover:bg-white border border-[#EBE3D3]/70 text-stone-700"
                }`}
              >
                <Star className="w-5 h-5 mb-1.5" />
                <span className="text-[11px] font-semibold">Reviews</span>
              </button>
            </div>

            {/* Favorite Section */}
            <div className="space-y-2 pt-1">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 w-full text-left">
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Favorite</span>
              </button>
              <div className="space-y-1.5 pl-2 text-xs font-medium text-stone-600">
                <div className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-white/60 cursor-pointer">
                  <div className="w-2 h-2 rounded-[2px] bg-[#FBBF24]" />
                  <span>Opportunity Stages</span>
                </div>
                <div className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-white/60 cursor-pointer">
                  <div className="w-2 h-2 rounded-[2px] bg-[#FBBF24]" />
                  <span>Key Metrics</span>
                </div>
                <div className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-white/60 cursor-pointer">
                  <div className="w-2 h-2 rounded-[2px] bg-[#FBBF24]" />
                  <span>Product plan</span>
                </div>
              </div>
            </div>

            {/* Marketing Section */}
            <div className="space-y-2 pt-1">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 w-full text-left">
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Marketing</span>
              </button>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-[#EBE3D3] text-xs font-medium text-stone-700 hover:bg-white cursor-pointer shadow-sm">
                  <Search className="w-3.5 h-3.5 text-stone-400" />
                  <span>Product</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-[#EBE3D3] text-xs font-medium text-stone-700 hover:bg-white cursor-pointer shadow-sm">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>Emails</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-[#EBE3D3] text-xs font-medium text-stone-700 hover:bg-white cursor-pointer shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>Integration</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-[#EBE3D3] text-xs font-medium text-stone-700 hover:bg-white cursor-pointer shadow-sm">
                  <LayoutGrid className="w-3.5 h-3.5 text-stone-400" />
                  <span>Widget</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/70 border border-[#EBE3D3] text-xs font-medium text-stone-700 hover:bg-white cursor-pointer shadow-sm">
                  <FileText className="w-3.5 h-3.5 text-stone-400" />
                  <span>Task</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom User Pill */}
          <div className="pt-6 relative">
            <div className="flex items-center gap-2">
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex-1 bg-[#1E2024] text-white rounded-2xl p-2 flex items-center justify-between cursor-pointer hover:bg-stone-800 transition-colors shadow-md"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover shrink-0 border border-stone-600"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate text-white leading-tight">
                      {user?.name || "Oscar Carol"}
                    </p>
                    <p className="text-[10px] text-stone-400 truncate capitalize">
                      {user?.role === "owner" ? "Lead Manager" : user?.role || "Team Member"}
                    </p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400 shrink-0 ml-1" />
              </div>

              {/* Notification Bell */}
              <button className="w-11 h-11 rounded-2xl bg-white/80 border border-[#EBE3D3] flex items-center justify-center text-stone-700 hover:bg-white transition-all shadow-sm shrink-0 cursor-pointer">
                <Bell className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute bottom-16 left-0 right-0 bg-white rounded-2xl border border-[#EBE3D3] shadow-xl p-2 z-50 space-y-1">
                <div className="px-3 py-2 border-b border-stone-100">
                  <p className="text-xs font-bold text-stone-800">{user?.name}</p>
                  <p className="text-[10px] text-stone-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{loggingOut ? "Logging out..." : "Log out"}</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* ================= MAIN DASHBOARD CONTENT ================= */}
        <main className="flex-1 p-5 lg:p-8 overflow-y-auto space-y-6">
          
          {/* Top Bar / Greeting & Radial Meter Header */}
          <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
            
            {/* Greeting & Date */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-stone-500 mb-1">
                  Home <span className="mx-1">/</span> Dashboard
                </p>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1E] tracking-tight">
                  Good Morning, {user?.name ? user.name.split(" ")[0] : "Homies"}
                </h1>
                <p className="text-xs sm:text-sm font-medium text-stone-500 mt-1">
                  It&apos;s {currentDateFormatted}
                </p>
              </div>

              {/* KPI Counters */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/70 border border-[#EBE3D3] flex items-center justify-center text-[10px] text-stone-600">
                    👥
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-[#1A1C1E]">432</span>
                    <p className="text-[11px] font-semibold text-stone-500">Employees</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/70 border border-[#EBE3D3] flex items-center justify-center text-[10px] text-stone-600">
                    💳
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-[#1A1C1E]">24</span>
                    <p className="text-[11px] font-semibold text-stone-500">Payrolls</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/70 border border-[#EBE3D3] flex items-center justify-center text-[10px] text-stone-600">
                    📉
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-[#1A1C1E]">8%</span>
                    <p className="text-[11px] font-semibold text-stone-500">Turnover Rate</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/70 border border-[#EBE3D3] flex items-center justify-center text-[10px] text-stone-600">
                    💼
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-[#1A1C1E]">24</span>
                    <p className="text-[11px] font-semibold text-stone-500">Job Applicants</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Right Actions & Radial Gauge Meter */}
            <div className="flex flex-col sm:flex-row xl:flex-col items-start xl:items-end gap-4">
              
              {/* Header Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-xl bg-white/80 border border-[#EBE3D3] flex items-center justify-center text-stone-700 hover:bg-white transition-all shadow-sm cursor-pointer">
                  <Calendar className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-xl bg-white/80 border border-[#EBE3D3] flex items-center justify-center text-stone-700 hover:bg-white transition-all shadow-sm cursor-pointer">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Radial Arc Gauge (80% Employee Satisfactory) */}
              <div className="relative flex flex-col items-center justify-center w-48 h-28 shrink-0">
                <svg className="w-48 h-28 overflow-visible" viewBox="0 0 160 90">
                  {/* Gauge Background Track */}
                  <path
                    d="M 20 80 A 60 60 0 0 1 140 80"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Gauge Filled Arc (80%) */}
                  <path
                    d="M 20 80 A 60 60 0 0 1 128 42"
                    fill="none"
                    stroke="#FBBF24"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Indicator Dot */}
                  <circle cx="128" cy="42" r="4.5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
                  
                  {/* Scale Labels */}
                  <text x="10" y="85" fontSize="8" fill="#A8A29E" fontWeight="600">00</text>
                  <text x="16" y="45" fontSize="8" fill="#A8A29E" fontWeight="600">20</text>
                  <text x="56" y="15" fontSize="8" fill="#A8A29E" fontWeight="600">40</text>
                  <text x="102" y="15" fontSize="8" fill="#A8A29E" fontWeight="600">60</text>
                  <text x="144" y="45" fontSize="8" fill="#A8A29E" fontWeight="600">80</text>
                  <text x="140" y="85" fontSize="8" fill="#A8A29E" fontWeight="600">100</text>
                </svg>
                <div className="absolute top-10 flex flex-col items-center">
                  <span className="text-2xl font-extrabold text-[#1A1C1E] leading-none">80%</span>
                  <span className="text-[10px] font-medium text-stone-500 mt-0.5">Employee Satisfactory</span>
                </div>
              </div>

            </div>
          </div>

          {/* ================= MIDDLE GRID ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
            
            {/* Left 4 Cols: Schedule Widget */}
            <div className="xl:col-span-4 bg-white/70 border border-[#EBE3D3] rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                  <span>11 Nov 2024</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-[#1A1C1E]">Schedule</span>
                <button className="w-7 h-7 rounded-full bg-white border border-[#EBE3D3] flex items-center justify-center text-stone-500 cursor-pointer">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Schedule Tabs */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab("meetings")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "meetings"
                      ? "bg-[#1E2024] text-white shadow-sm"
                      : "bg-white/80 border border-[#EBE3D3] text-stone-600"
                  }`}
                >
                  Meetings
                </button>
                <button
                  onClick={() => setActiveTab("tasks")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "tasks"
                      ? "bg-[#1E2024] text-white shadow-sm"
                      : "bg-white/80 border border-[#EBE3D3] text-stone-600"
                  }`}
                >
                  Tasks
                </button>
                <button
                  onClick={() => setActiveTab("events")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "events"
                      ? "bg-[#1E2024] text-white shadow-sm"
                      : "bg-white/80 border border-[#EBE3D3] text-stone-600"
                  }`}
                >
                  Events
                </button>
              </div>

              {/* Glowing Featured Schedule Card */}
              <div className="bg-gradient-to-b from-[#FEF08A] to-[#FFFDF9] border border-[#FDE047] rounded-2xl p-4 shadow-sm relative space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1C1E] leading-snug">
                      Interview Candidate UI/UX Designer
                    </h4>
                    <p className="text-[10px] text-stone-500 font-medium">Project Discussion</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <Link2 className="w-3 h-3" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold bg-white/90 px-2 py-0.5 rounded-md text-stone-700 shadow-2xs">
                      Google Meet
                    </span>
                    <span className="text-[10px] font-medium text-stone-500">13.00 - 13.30</span>
                  </div>
                  <div className="flex -space-x-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      className="w-5 h-5 rounded-full border-2 border-white object-cover"
                      alt="Attendee"
                    />
                    <div className="w-5 h-5 rounded-full bg-stone-800 text-white text-[8px] flex items-center justify-center font-bold border-2 border-white">
                      +4
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Schedule Card */}
              <div className="bg-white/80 border border-[#EBE3D3] rounded-2xl p-4 shadow-sm relative space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1C1E] leading-snug">
                      Retro Day Celebration - HR Department
                    </h4>
                    <p className="text-[10px] text-stone-500 font-medium">Arrangement Plan</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#FEF08A] text-amber-900 flex items-center justify-center shrink-0">
                    <Link2 className="w-3 h-3" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded-md text-stone-700 shadow-2xs">
                      Google Meet
                    </span>
                    <span className="text-[10px] font-medium text-stone-500">15.00 - 16.00</span>
                  </div>
                  <div className="flex -space-x-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      className="w-5 h-5 rounded-full border-2 border-white object-cover"
                      alt="Attendee"
                    />
                    <div className="w-5 h-5 rounded-full bg-stone-800 text-white text-[8px] flex items-center justify-center font-bold border-2 border-white">
                      +1
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 8 Cols: Charts & Stats Container */}
            <div className="xl:col-span-8 space-y-5">
              
              {/* Top Row: KPI Trend & Employment Status */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                
                {/* 70,32% Average Team KPI Area Chart */}
                <div className="md:col-span-7 bg-white/70 border border-[#EBE3D3] rounded-3xl p-5 shadow-sm flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-stone-500 text-xs font-semibold">
                        <span className="w-3 h-3 rounded-full bg-stone-300 flex items-center justify-center text-[7px]">🎯</span>
                        <span>70,32%</span>
                      </div>
                      <h4 className="text-xs font-bold text-stone-600 mt-0.5">Average Team KPI</h4>
                    </div>
                    <button className="w-7 h-7 rounded-full bg-white border border-[#EBE3D3] flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs cursor-pointer">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Golden Bezier Trend Curve SVG */}
                  <div className="py-2">
                    <svg className="w-full h-24 overflow-visible" viewBox="0 0 300 90">
                      <defs>
                        <linearGradient id="kpiGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 65 Q 40 60 70 48 T 130 52 T 180 20 T 230 45 T 300 25 L 300 90 L 0 90 Z"
                        fill="url(#kpiGradient)"
                      />
                      <path
                        d="M 0 65 Q 40 60 70 48 T 130 52 T 180 20 T 230 45 T 300 25"
                        fill="none"
                        stroke="#FBBF24"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="flex items-center justify-between text-[10px] font-semibold text-stone-500 pt-1 px-1">
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                    </div>
                  </div>
                </div>

                {/* Employment Status Bar Chart */}
                <div className="md:col-span-5 bg-white/70 border border-[#EBE3D3] rounded-3xl p-5 shadow-sm flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1C1E]">Employment Status</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#1A1C1E]">450</span>
                        <p className="text-[9px] text-stone-400 font-semibold">Active Employee</p>
                      </div>
                      <button className="w-6 h-6 rounded-full bg-white border border-[#EBE3D3] flex items-center justify-center text-stone-500 cursor-pointer">
                        <MoreHorizontal className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* 3 Status Bars */}
                  <div className="flex items-end justify-between gap-2.5 pt-4 h-28">
                    {/* Yellow Permanent Bar */}
                    <div className="flex-1 flex flex-col items-center h-full justify-end">
                      <div className="w-full h-[95%] bg-[#FBBF24] rounded-t-xl rounded-b-lg flex items-start justify-center pt-2 text-[10px] font-bold text-white shadow-2xs">
                        49%
                      </div>
                      <span className="text-[9px] font-bold text-[#D97706] mt-1 truncate">Permanent</span>
                    </div>

                    {/* Dark Charcoal Contract Bar */}
                    <div className="flex-1 flex flex-col items-center h-full justify-end">
                      <div className="w-full h-[70%] bg-[#1E2024] rounded-t-xl rounded-b-lg flex items-start justify-center pt-2 text-[10px] font-bold text-white shadow-2xs">
                        31%
                      </div>
                      <span className="text-[9px] font-bold text-stone-800 mt-1 truncate">Contract</span>
                    </div>

                    {/* Grey Probation Bar */}
                    <div className="flex-1 flex flex-col items-center h-full justify-end">
                      <div className="w-full h-[45%] bg-[#64748B] rounded-t-xl rounded-b-lg flex items-start justify-center pt-2 text-[10px] font-bold text-white shadow-2xs">
                        19%
                      </div>
                      <span className="text-[9px] font-bold text-stone-500 mt-1 truncate">Probation</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Quick Leave / SLA Mini-Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <div className="bg-white/70 border border-[#EBE3D3] rounded-2xl p-3 shadow-2xs flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-semibold text-stone-400">Annual Leave</span>
                    <h5 className="text-sm font-bold text-[#1A1C1E]">12 Days</h5>
                  </div>
                  <button className="flex items-center justify-between text-[9px] font-semibold text-stone-500 pt-2 hover:text-stone-900 cursor-pointer">
                    <span>Request Leave</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </button>
                </div>

                <div className="bg-white/70 border border-[#EBE3D3] rounded-2xl p-3 shadow-2xs flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-semibold text-stone-400">Monthly Leave</span>
                    <h5 className="text-sm font-bold text-[#1A1C1E]">2 Days</h5>
                  </div>
                  <button className="flex items-center justify-between text-[9px] font-semibold text-stone-500 pt-2 hover:text-stone-900 cursor-pointer">
                    <span>Request Leave</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </button>
                </div>

                <div className="bg-white/70 border border-[#EBE3D3] rounded-2xl p-3 shadow-2xs flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-semibold text-stone-400">Daily Leave</span>
                    <h5 className="text-sm font-bold text-[#1A1C1E]">8 Days</h5>
                  </div>
                  <button className="flex items-center justify-between text-[9px] font-semibold text-stone-500 pt-2 hover:text-stone-900 cursor-pointer">
                    <span>Request Leave</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </button>
                </div>

                <div className="bg-white/70 border border-[#EBE3D3] rounded-2xl p-3 shadow-2xs flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-semibold text-stone-400">Hourly Leave</span>
                    <h5 className="text-sm font-bold text-[#1A1C1E]">6 Days</h5>
                  </div>
                  <button className="flex items-center justify-between text-[9px] font-semibold text-stone-500 pt-2 hover:text-stone-900 cursor-pointer">
                    <span>Request Leave</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </button>
                </div>

                <div className="bg-white/70 border border-[#EBE3D3] rounded-2xl p-3 shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-1">
                  <div>
                    <span className="text-[9px] font-semibold text-stone-400">Sick Leave Used</span>
                    <h5 className="text-sm font-bold text-[#1A1C1E]">5 Days</h5>
                  </div>
                  <button className="flex items-center justify-between text-[9px] font-semibold text-stone-500 pt-2 hover:text-stone-900 cursor-pointer">
                    <span>Request Leave</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ================= BOTTOM DATA TABLE ================= */}
          <div className="bg-white/70 border border-[#EBE3D3] rounded-3xl p-5 shadow-sm space-y-4">
            
            {/* Table Header & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-[#1A1C1E]">List Employee</h3>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="bg-white border border-[#EBE3D3] rounded-full py-1 pl-8 pr-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#FBBF24]"
                  />
                </div>
                <button className="w-7 h-7 rounded-full bg-white border border-[#EBE3D3] flex items-center justify-center text-stone-500 cursor-pointer">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Table Responsive View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EBE3D3] text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    <th className="pb-3 px-2">Name</th>
                    <th className="pb-3 px-2">Employee ID</th>
                    <th className="pb-3 px-2">Role</th>
                    <th className="pb-3 px-2">Email</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2">Date</th>
                    <th className="pb-3 px-2">Department</th>
                    <th className="pb-3 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8D6]">
                  {teamMembers
                    .filter(
                      (m) =>
                        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        m.role.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((member, idx) => (
                      <tr key={idx} className="hover:bg-white/60 transition-colors">
                        <td className="py-3 px-2 font-semibold text-[#1A1C1E]">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-7 h-7 rounded-full object-cover border border-stone-200"
                            />
                            <span>{member.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-stone-600 font-mono text-[11px]">{member.id}</td>
                        <td className="py-3 px-2 text-stone-700 font-medium">{member.role}</td>
                        <td className="py-3 px-2 text-stone-500 font-mono text-[11px]">{member.email}</td>
                        <td className="py-3 px-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {member.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-stone-500 text-[11px]">{member.date}</td>
                        <td className="py-3 px-2 text-stone-700 font-medium">{member.department}</td>
                        <td className="py-3 px-2 text-right">
                          <button className="w-6 h-6 rounded-full hover:bg-stone-200 inline-flex items-center justify-center text-stone-500 cursor-pointer">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

          </div>

        </main>
    </div>
  );
}

