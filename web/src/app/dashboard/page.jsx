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
  ChevronRight,
  Clock,
  Command,
  ExternalLink,
  FileText,
  HelpCircle,
  Hexagon,
  Home,
  Layers,
  LayoutGrid,
  Link2,
  Lock,
  LogOut,
  Mail,
  Megaphone,
  Moon,
  MoreHorizontal,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Share2,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  User,
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  /* Sidebar nav items matching the reference */
  const sidebarNavItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "leads", label: "Leads", icon: Megaphone },
    { id: "contacts", label: "Contacts", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "integrations", label: "Integrations", icon: Settings },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0F0F10] flex flex-col lg:flex-row font-sans text-white">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`${
          sidebarCollapsed ? "lg:w-[78px]" : "lg:w-[272px]"
        } w-full bg-[#131316] border-b lg:border-b-0 lg:border-r border-[#1F1F24] flex flex-col justify-between shrink-0 lg:min-h-screen transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col gap-1">
          {/* ---- Logo Row ---- */}
          <div className={`flex items-center justify-between px-5 pt-6 pb-2 ${sidebarCollapsed ? "px-4" : ""}`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src="/assets/bg-removed-logo.png"
                alt="CLYRA"
                className="w-7 h-7 object-contain shrink-0 drop-shadow-[0_0_10px_rgba(232,253,7,0.5)]"
              />
              {!sidebarCollapsed && (
                <span className="text-[15px] font-bold tracking-tight text-white whitespace-nowrap">
                  CLYRA
                </span>
              )}
            </div>

            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-8 h-8 rounded-lg border border-[#2A2A30] hover:border-[#FFE600]/30 bg-[#1A1A1E] hover:bg-[#222228] flex items-center justify-center text-[#707078] hover:text-white transition-all"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* ---- Workspace Selector ---- */}
          <div className={`pt-4 pb-1 ${sidebarCollapsed ? "px-3" : "px-4"}`}>
            <button
              className={`w-full flex items-center gap-3 rounded-xl bg-[#1C1C21] transition-all ${
                sidebarCollapsed ? "p-2.5 justify-center" : "px-3.5 py-3"
              }`}
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Avatar initial — neutral raised style matching reference */}
              <div className="w-7 h-7 rounded-lg bg-[#28282F] flex items-center justify-center shrink-0"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.3)" }}
              >
                <span className="text-xs font-semibold text-[#B8B8BE]">
                  {(workspace?.name || "C")[0].toUpperCase()}
                </span>
              </div>

              {!sidebarCollapsed && (
                <>
                  <span className="text-[13px] font-semibold text-white truncate flex-1 text-left">
                    {workspace?.name || "CLYRA"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#707078] shrink-0" />
                </>
              )}
            </button>
          </div>

          {/* ---- Navigation List ---- */}
          <nav className={`flex flex-col gap-1 pt-4 ${sidebarCollapsed ? "px-3" : "px-4"}`}>
            {sidebarNavItems.map((item) => {
              const isActive = activeNav === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`group relative flex items-center gap-3 rounded-xl transition-all duration-200 ${
                    sidebarCollapsed
                      ? "w-full p-3 justify-center"
                      : "w-full px-4 py-3"
                  } ${
                    isActive
                      ? "bg-[#1C1C21] text-white"
                      : "text-[#85858D] hover:text-white hover:bg-[#1A1A1E]"
                  }`}
                  style={
                    isActive
                      ? {
                          boxShadow:
                            "0 2px 8px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
                        }
                      : undefined
                  }
                >
                  {/* Active accent bar (right edge gradient glow) */}
                  {isActive && (
                    <span
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] rounded-l-full"
                      style={{
                        height: "60%",
                        background:
                          "linear-gradient(180deg, #FFE600 0%, #7B3DFF 60%, #FF2DAD 100%)",
                        boxShadow:
                          "0 0 12px rgba(255,230,0,0.4), 0 0 24px rgba(123,61,255,0.3)",
                      }}
                    />
                  )}

                  {/* Active background glow overlay */}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 40%, rgba(123,61,255,0.06) 70%, rgba(255,45,173,0.08) 100%)",
                      }}
                    />
                  )}

                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 relative z-10 transition-colors duration-200 ${
                      isActive ? "text-[#FFE600]" : "text-[#707078] group-hover:text-white"
                    }`}
                  />

                  {!sidebarCollapsed && (
                    <span className="text-[13px] font-medium relative z-10">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ---- Bottom: User Profile ---- */}
        <div className={`pb-5 relative ${sidebarCollapsed ? "px-3" : "px-4"}`}>
          {/* Profile Dropdown Menu (Exact Reference Design) */}
          {showProfileMenu && (
            <div
              className="absolute bottom-[calc(100%+8px)] left-3 right-3 bg-[#18181D] border border-white/[0.08] rounded-2xl p-1.5 z-50 space-y-0.5 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-150"
              style={{
                boxShadow:
                  "0 12px 36px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Profile (Active/Selected look) */}
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full relative flex items-center gap-3 px-3 py-2 rounded-xl bg-[#24242A] text-white text-[13px] font-medium transition-colors text-left"
              >
                <span className="w-0.5 h-3.5 bg-white rounded-full shrink-0 -ml-0.5 mr-0.5" />
                <User className="w-4 h-4 text-white shrink-0" />
                <span>Profile</span>
              </button>

              {/* Settings */}
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#B8B8C2] hover:text-white hover:bg-[#202026] text-[13px] font-medium transition-colors text-left"
              >
                <Hexagon className="w-4 h-4 text-[#8A8A96] shrink-0" />
                <span>Settings</span>
              </button>

              {/* Theme */}
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#B8B8C2] hover:text-white hover:bg-[#202026] text-[13px] font-medium transition-colors text-left"
              >
                <Moon className="w-4 h-4 text-[#8A8A96] shrink-0" />
                <span className="flex-1">Theme</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#65656E] shrink-0" />
              </button>

              {/* Upgrade */}
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#B8B8C2] hover:text-white hover:bg-[#202026] text-[13px] font-medium transition-colors text-left"
              >
                <Sparkles className="w-4 h-4 text-[#8A8A96] shrink-0" />
                <span>Upgrade</span>
              </button>

              {/* Divider */}
              <div className="my-1 border-t border-white/[0.08]" />

              {/* Keyboard shortcuts */}
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#B8B8C2] hover:text-white hover:bg-[#202026] text-[13px] font-medium transition-colors text-left"
              >
                <Command className="w-4 h-4 text-[#8A8A96] shrink-0" />
                <span>Keyboard shortcuts</span>
              </button>

              {/* Help center */}
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#B8B8C2] hover:text-white hover:bg-[#202026] text-[13px] font-medium transition-colors text-left"
              >
                <HelpCircle className="w-4 h-4 text-[#8A8A96] shrink-0" />
                <span>Help center</span>
              </button>

              {/* Log out */}
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#B8B8C2] hover:text-rose-400 hover:bg-rose-950/30 text-[13px] font-medium transition-colors text-left group cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-[#8A8A96] group-hover:text-rose-400 shrink-0" />
                <span>{loggingOut ? "Logging out..." : "Log out"}</span>
              </button>
            </div>
          )}

          {/* Simple Closed Pill (Matching Nimbus Top Card) */}
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`w-full flex items-center gap-3 rounded-xl bg-[#1C1C21] transition-all hover:bg-[#222228] ${
              sidebarCollapsed ? "p-2.5 justify-center" : "px-3.5 py-3"
            }`}
            style={{
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Avatar Image */}
            <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 bg-[#28282F] flex items-center justify-center border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {!sidebarCollapsed && (
              <>
                <span className="text-[13px] font-semibold text-white truncate flex-1 text-left">
                  {user?.name || "Jane Doe"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#707078] shrink-0 transition-transform duration-200 ${
                    showProfileMenu ? "rotate-180 text-white" : ""
                  }`}
                />
              </>
            )}
          </button>
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
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#151517] border border-[#FFE600]/40 text-xs font-medium text-[#FFE600] shadow-xs">
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
                    <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider text-[#22C55E] bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.55)] px-2.5 py-0.5 rounded-lg">
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
                    <span className="text-xs font-medium text-white">Shopify Storefront</span>
                  </div>
                  <span className="text-[11px] text-[#FFE600] font-semibold">Connected</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F0F10] border border-[#2A2A30]">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-medium text-white">Live Web Chat</span>
                  </div>
                  <span className="text-[11px] text-[#22C55E] font-medium">Ready</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F0F10] border border-[#2A2A30]">
                  <div className="flex items-center gap-2.5">
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
