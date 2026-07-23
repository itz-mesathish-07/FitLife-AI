import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const LOGO_URL = "/manus-storage/logo-icon_734a5e40.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const links = [
    { href: "/#features", label: "Features" },
    { href: "/bmi-calculator", label: "BMI Calculator" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src={LOGO_URL} alt="FitLife AI" className="w-8 h-8 lg:w-9 lg:h-9" />
          <span className="text-lg font-bold tracking-tight" style={{ color: "#0F766E" }}>
            FitLife AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-foreground" : "text-foreground/80"
              }`}
            >
              {link.label}
            </a>
          ))}
          {isAuthenticated && (
            <Link href="/dashboard">
              <span className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Dashboard
              </span>
            </Link>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground">Hi, {user?.name?.split(" ")[0]}</span>
              <Link href="/dashboard">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                  Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                  Start free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-border/50 shadow-lg">
          <nav className="container py-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium py-2 text-foreground/80 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            {isAuthenticated && (
              <Link href="/dashboard">
                <span className="text-base font-medium py-2 text-primary">Dashboard</span>
              </Link>
            )}
            <div className="flex gap-3 pt-3 border-t border-border">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button size="sm" className="bg-primary text-white">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm">Log in</Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="bg-primary text-white">Start free</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
