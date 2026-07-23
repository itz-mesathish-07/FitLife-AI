import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LOGO_URL = "/manus-storage/logo-icon_734a5e40.png";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [, navigate] = useLocation();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = (data: LoginForm) => {
    const success = login(data.email, data.password);
    if (success) {
      toast.success("Welcome back! Let's get moving.");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <img src={LOGO_URL} alt="FitLife AI" className="w-8 h-8" />
            <span className="text-xl font-bold" style={{ color: "#0F766E" }}>FitLife AI</span>
          </div>

          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to continue your fitness journey</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...form.register("email")}
                className="mt-1.5 h-11"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...form.register("password")}
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" {...form.register("remember")} className="rounded" />
                Remember me
              </label>
              <button type="button" className="text-sm text-primary hover:underline font-medium">
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Create one
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground mt-8 max-w-sm mx-auto">
            <span className="font-medium text-primary">Demo:</span> Use any email and password (min 6 chars) to sign in.
          </p>
        </div>
      </div>

      {/* Right - Hero */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F766E 0%, #134E4A 50%, #1E3A5F 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-teal-300 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white text-center">
          <div className="text-6xl font-bold mb-6 leading-tight">
            Your body.<br />Your data.<br />Your pace.
          </div>
          <p className="text-lg text-white/70 max-w-md">
            AI-powered fitness coaching that adapts to your goals, your schedule, and your body every single day.
          </p>
          <div className="mt-8 flex gap-6 text-sm text-white/50">
            <div>
              <div className="text-2xl font-bold text-white metric-number">128K+</div>
              <div>Active members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white metric-number">4.9/5</div>
              <div>Average rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white metric-number">92%</div>
              <div>Hit their goal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
