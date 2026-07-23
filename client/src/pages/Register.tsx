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

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const [, navigate] = useLocation();

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: RegisterForm) => {
    const success = register(data.name, data.email, data.password);
    if (success) {
      toast.success("Account created! Welcome to FitLife AI.");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <img src={LOGO_URL} alt="FitLife AI" className="w-8 h-8" />
            <span className="text-xl font-bold" style={{ color: "#0F766E" }}>FitLife AI</span>
          </div>

          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Start your AI-powered fitness journey</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input id="name" placeholder="Aria Thompson" {...form.register("name")} className="mt-1.5 h-11" />
              {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...form.register("email")} className="mt-1.5 h-11" />
              {form.formState.errors.email && <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative mt-1.5">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" {...form.register("password")} className="h-11 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.formState.errors.password && <p className="text-sm text-destructive mt-1">{form.formState.errors.password.message}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Re-enter password" {...form.register("confirmPassword")} className="mt-1.5 h-11" />
              {form.formState.errors.confirmPassword && <p className="text-sm text-destructive mt-1">{form.formState.errors.confirmPassword.message}</p>}
            </div>

            <p className="text-xs text-muted-foreground">
              By creating an account, you agree to our Terms of Service and Privacy Policy. This application is for educational purposes only — always consult a physician before beginning any exercise program.
            </p>

            <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0F766E 0%, #134E4A 50%, #1E3A5F 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-teal-300 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white text-center">
          <div className="text-5xl font-bold mb-6 leading-tight">
            Start today.<br />Transform tomorrow.
          </div>
          <p className="text-lg text-white/70 max-w-md">
            Join 128,000+ members who are building healthier habits with AI-powered coaching.
          </p>
          <div className="mt-8 flex gap-8">
            {["💪", "🥗", "📊", "🏆"].map((emoji, i) => (
              <div key={i} className="text-4xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{emoji}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
