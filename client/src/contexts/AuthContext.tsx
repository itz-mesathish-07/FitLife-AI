import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  streak: number;
  xp: number;
  level: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for local-only experience
const DEMO_USER: User = {
  id: "demo-1",
  name: "Aria Thompson",
  email: "aria@fitlife.ai",
  role: "user",
  streak: 12,
  xp: 2840,
  level: 14,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("fitlife-user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const login = (email: string, _password: string) => {
    const u = { ...DEMO_USER, email };
    setUser(u);
    localStorage.setItem("fitlife-user", JSON.stringify(u));
    return true;
  };

  const register = (name: string, email: string, _password: string) => {
    const u: User = {
      ...DEMO_USER,
      name,
      email,
      xp: 0,
      level: 1,
      streak: 0,
    };
    setUser(u);
    localStorage.setItem("fitlife-user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fitlife-user");
  };

  const updateProfile = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem("fitlife-user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
