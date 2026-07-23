import { useState, ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Dumbbell, UtensilsCrossed, BarChart3, Trophy, User, Target,
  LogOut, Menu, X, Calculator, ClipboardList
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LOGO_URL = "/manus-storage/logo-icon_734a5e40.png";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/workouts", icon: Dumbbell, label: "Workouts" },
  { href: "/diet", icon: UtensilsCrossed, label: "Diet Plan" },
  { href: "/progress", icon: BarChart3, label: "Progress" },
  { href: "/achievements", icon: Trophy, label: "Achievements" },
  { href: "/tasks", icon: Target, label: "Daily Tasks" },
  { href: "/bmi-calculator", icon: Calculator, label: "BMI Calculator" },
  { href: "/assessment", icon: ClipboardList, label: "Assessment" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const currentPath = location;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-border/50 px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src={LOGO_URL} alt="FitLife AI" className="w-7 h-7" />
          <span className="text-base font-bold" style={{ color: "#0F766E" }}>FitLife AI</span>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0) || "A"}
                </div>
                <div>
                  <p className="font-semibold text-sm">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>
            <nav className="p-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      currentPath === item.href ? "bg-primary/5 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-border/50">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/5 transition-all">
                <LogOut className="w-5 h-5" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-border/50 flex-col fixed h-full z-30">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="FitLife AI" className="w-8 h-8" />
            <span className="text-lg font-bold" style={{ color: "#0F766E" }}>FitLife AI</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <button className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentPath === item.href ? "bg-primary/5 text-primary" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}>
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
