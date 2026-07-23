import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Dumbbell, Salad, Trophy, Target, Scale, BarChart3, Flame, Heart,
  ChevronDown, Star, Zap, Droplets, Moon, Footprints, Check, X,
  ArrowRight, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";

const HERO_IMAGE = "/manus-storage/hero-fitness_f84e7be3.png";
const DASHBOARD_IMAGE = "/manus-storage/dashboard-preview_c925a9e7.png";
const WORKOUT_IMAGE = "/manus-storage/workout-illustration_7c23864e.png";
const FOOD_IMAGE = "/manus-storage/healthy-food_aa49854e.png";

const weeklyData = [
  { day: "Mon", calories: 420, steps: 7200 },
  { day: "Tue", calories: 380, steps: 8500 },
  { day: "Wed", calories: 510, steps: 6800 },
  { day: "Thu", calories: 350, steps: 9100 },
  { day: "Fri", calories: 480, steps: 7600 },
  { day: "Sat", calories: 620, steps: 10200 },
  { day: "Sun", calories: 290, steps: 5400 },
];

const goalData = [
  { name: "Completed", value: 65, color: "#0F766E" },
  { name: "Remaining", value: 35, color: "#E2E8F0" },
];

const features = [
  { icon: Dumbbell, title: "Exercise Planning", desc: "Workouts generated around your goal, equipment and experience level, with form and safety tips on every move.", color: "bg-teal-50 text-teal-600" },
  { icon: Salad, title: "Diet Planning", desc: "Weekly meal plans with macros dialed in for weight loss, muscle gain or general health — plus a ready-made shopping list.", color: "bg-amber-50 text-amber-600" },
  { icon: Trophy, title: "Achievements", desc: "XP, streaks and badges that keep momentum going, without turning your health into a chore.", color: "bg-purple-50 text-purple-600" },
  { icon: Target, title: "Daily Tasks", desc: "Small, doable missions — water, steps, stretching, sleep — that add up to real change over weeks.", color: "bg-blue-50 text-blue-600" },
  { icon: Scale, title: "BMI & Body Tracking", desc: "BMI, BMR and body measurements tracked over time, with clear categories and ideal-weight guidance.", color: "bg-emerald-50 text-emerald-600" },
  { icon: BarChart3, title: "Fitness Analytics", desc: "Weekly and monthly charts on calories, weight, steps and workout volume — so progress is never a guess.", color: "bg-rose-50 text-rose-600" },
];

const exercises = [
  { name: "Interval Sprint Circuit", desc: "Full-body cardio targeting legs and core with 30s work / 30s rest intervals.", difficulty: "Intermediate", duration: "22 min", calories: 310, sets: 6, icon: "🏃", goal: "Cardio" },
  { name: "Morning Mobility Flow", desc: "Gentle full-body stretch sequence to open hips, spine and shoulders.", difficulty: "Beginner", duration: "15 min", calories: 90, sets: 1, icon: "🧘", goal: "Flexibility" },
  { name: "Lower Body Power", desc: "Squats, lunges and glute bridges for strength through the legs.", difficulty: "Intermediate", duration: "34 min", calories: 260, sets: 4, icon: "🏋️", goal: "Strength" },
];

const meals = [
  { name: "Greek Yoghurt & Berry Bowl", type: "Breakfast", calories: 380, protein: "24g protein", icon: "🥣" },
  { name: "Grilled Chicken Salad", type: "Lunch", calories: 520, protein: "42g protein", icon: "🥗" },
  { name: "Salmon & Sweet Potato", type: "Dinner", calories: 650, protein: "38g protein", icon: "🍝" },
];

const testimonials = [
  { name: "Jessica Martinez", text: "I lost 12 kg in 3 months without feeling like I was on a diet. The personalized meal plans made it so easy.", metric: "Lost 12 kg in 90 days", rating: 5 },
  { name: "Alex Rodriguez", text: "The daily missions keep me motivated. I went from 0 workouts a week to 5, and I actually enjoy it now.", metric: "Built consistent habit", rating: 5 },
  { name: "Sarah Park", text: "As someone with a knee injury, I was scared to exercise. FitLife AI gave me safe, effective workouts tailored to my condition.", metric: "Exercising safely again", rating: 5 },
];

const pricingPlans = [
  { name: "Free", price: "$0", period: "/month", features: ["BMI calculator", "Basic daily tasks", "3 sample workouts"], missing: ["AI fitness plans", "Personalized diet plans", "Progress analytics"], popular: false },
  { name: "Pro", price: "$9.99", period: "/month", features: ["Everything in Free", "AI fitness plans", "Personalized diet plans", "Progress analytics", "Achievements"], missing: [], popular: true },
  { name: "Elite", price: "$19.99", period: "/month", features: ["Everything in Pro", "1-on-1 AI coaching", "Advanced analytics", "Video library", "Priority support"], missing: [], popular: false },
];

const faqs = [
  { q: "How does FitLife AI personalize workouts?", a: "FitLife AI analyzes your fitness level, goals, available equipment, and medical conditions. It generates customized plans with specific sets, reps, rest times, and safety tips — adjusting daily based on your progress." },
  { q: "Can I use FitLife AI with injuries or medical conditions?", a: "Yes! Specify your conditions during the body assessment. The AI adjusts workouts to avoid aggravating your condition. We always recommend consulting your physician first." },
  { q: "What dietary preferences are supported?", a: "Vegetarian, vegan, keto, high-protein, diabetic-friendly, and low-sodium meal plans with complete macro breakdowns and shopping lists." },
  { q: "How accurate are the calorie calculations?", a: "We use the Mifflin-St Jeor equation for BMR and adjust for activity level — the same formulas used in clinical fitness settings." },
  { q: "Is there a free trial?", a: "Yes! The free tier includes the BMI calculator, basic daily tasks, and sample workouts. Upgrade anytime for full AI-powered features." },
];

export default function Home() {
  const [bmiAge, setBmiAge] = useState("28");
  const [bmiGender, setBmiGender] = useState("Male");
  const [bmiHeight, setBmiHeight] = useState("172");
  const [bmiWeight, setBmiWeight] = useState("70");
  const [bmiActivity, setBmiActivity] = useState("moderate");
  const [bmiResult, setBmiResult] = useState<any>(null);

  const calculateBMI = () => {
    const a = parseInt(bmiAge);
    const h = parseFloat(bmiHeight);
    const w = parseFloat(bmiWeight);
    if (!a || !h || !w) return;
    const bmi = +(w / ((h / 100) ** 2)).toFixed(1);
    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    const bmr = bmiGender === "Male"
      ? +(88.362 + 13.397 * w + 4.799 * h - 5.677 * a).toFixed(0)
      : +(447.593 + 9.247 * w + 3.098 * h - 4.33 * a).toFixed(0);

    const multipliers: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, very: 1.725 };
    const dailyCalories = Math.round(bmr * (multipliers[bmiActivity] || 1.55));
    const minW = (18.5 * (h / 100) ** 2).toFixed(0);
    const maxW = (24.9 * (h / 100) ** 2).toFixed(0);

    setBmiResult({ bmi, category, bmr, dailyCalories, idealWeight: `${minW}–${maxW} kg`, waterIntake: +(w * 0.033).toFixed(1) });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-amber-50/30" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-6 px-3 py-1 text-sm">
                <Zap className="w-3 h-3 mr-1" /> AI coaching, live and adapting to you
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Train smarter.<br />Eat better.<br />
                <span className="gradient-text">Feel unstoppable.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                FitLife AI builds your workouts, meals and daily habits around your body, your goals, and your schedule — then adjusts every single day as you progress.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/bmi-calculator">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-12 px-6 text-base font-semibold">
                    Check your BMI free
                  </Button>
                </Link>
                <a href="#dashboard-preview">
                  <Button variant="outline" size="lg" className="h-12 px-6 text-base border-2">
                    See the dashboard <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </a>
              </div>

              <div className="flex gap-8 mt-10">
                <div>
                  <p className="text-2xl font-bold metric-number">128K+</p>
                  <p className="text-sm text-muted-foreground">Active members</p>
                </div>
                <div>
                  <p className="text-2xl font-bold metric-number">4.9/5</p>
                  <p className="text-sm text-muted-foreground">Average rating</p>
                </div>
                <div>
                  <p className="text-2xl font-bold metric-number">92%</p>
                  <p className="text-sm text-muted-foreground">Hit their goal</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-teal-200/30 to-amber-200/30 rounded-3xl blur-2xl" />
                <Card className="relative p-6 bg-white/80 backdrop-blur-xl border-white/60 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-sm font-medium">Live session</span>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                      <Flame className="w-3 h-3 mr-1" /> 612 kcal today
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-4">Heart Rate Zone</h3>
                  <div className="h-20 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { t: 0, v: 72 }, { t: 1, v: 85 }, { t: 2, v: 102 }, { t: 3, v: 128 },
                        { t: 4, v: 142 }, { t: 5, v: 138 }, { t: 6, v: 145 }, { t: 7, v: 132 },
                        { t: 8, v: 128 }, { t: 9, v: 115 }, { t: 10, v: 98 },
                      ]}>
                        <defs>
                          <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="v" stroke="#0F766E" fill="url(#hrGrad)" strokeWidth={2} dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-2xl font-bold metric-number">142</p>
                      <p className="text-xs text-muted-foreground">bpm avg</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold metric-number">38:12</p>
                      <p className="text-xs text-muted-foreground">duration</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold metric-number">+3.2%</p>
                      <p className="text-xs text-muted-foreground">vs last week</p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <Badge className="bg-teal-50 text-teal-700 border-teal-200 mb-4">Everything in one place</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">One coach for your whole routine</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Exercise, food, sleep and motivation — designed to work together instead of living in five different apps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1 border-border/50">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BMI Calculator */}
      <section id="calculator" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <Badge className="bg-blue-50 text-blue-700 border-blue-200 mb-4">Free tool</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What's your number?</h2>
            <p className="text-muted-foreground">Enter your details for an instant BMI, BMR and daily calorie estimate</p>
          </div>

          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label className="text-sm font-medium">Age</Label>
                <Input type="number" placeholder="28" value={bmiAge} onChange={(e) => setBmiAge(e.target.value)} className="mt-1.5 h-11" />
              </div>
              <div>
                <Label className="text-sm font-medium">Gender</Label>
                <div className="flex gap-3 mt-1.5">
                  {["Male", "Female"].map((g) => (
                    <button key={g} onClick={() => setBmiGender(g)} className={`flex-1 h-11 rounded-lg border-2 font-medium text-sm ${bmiGender === g ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>{g}</button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Height (cm)</Label>
                <Input type="number" placeholder="172" value={bmiHeight} onChange={(e) => setBmiHeight(e.target.value)} className="mt-1.5 h-11" />
              </div>
              <div>
                <Label className="text-sm font-medium">Weight (kg)</Label>
                <Input type="number" placeholder="70" value={bmiWeight} onChange={(e) => setBmiWeight(e.target.value)} className="mt-1.5 h-11" />
              </div>
            </div>

            <div className="mt-5">
              <Label className="text-sm font-medium mb-2 block">Activity level</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { v: "sedentary", l: "Sedentary" },
                  { v: "light", l: "Light (1-3/wk)" },
                  { v: "moderate", l: "Moderate (3-5/wk)" },
                  { v: "very", l: "Very Active (6-7/wk)" },
                ].map((a) => (
                  <button key={a.v} onClick={() => setBmiActivity(a.v)} className={`h-10 rounded-lg border-2 text-sm font-medium ${bmiActivity === a.v ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>{a.l}</button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <Label className="text-sm font-medium mb-2 block">Your goal</Label>
              <div className="flex flex-wrap gap-2">
                {["Weight loss", "Muscle gain", "Cardio", "Flexibility"].map((g) => (
                  <button key={g} className="px-4 h-10 rounded-lg border-2 border-border text-sm font-medium hover:border-primary/30 transition-colors">{g}</button>
                ))}
              </div>
            </div>

            <Button onClick={calculateBMI} className="w-full mt-6 h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-base">
              Get started
            </Button>

            {bmiResult && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-xs text-muted-foreground">BMI</p>
                  <p className="text-xl font-bold metric-number">{bmiResult.bmi}</p>
                  <p className="text-xs text-emerald-600">{bmiResult.category}</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-xs text-muted-foreground">BMR</p>
                  <p className="text-xl font-bold metric-number">{bmiResult.bmr}</p>
                  <p className="text-xs text-muted-foreground">kcal/day</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Daily Calories</p>
                  <p className="text-xl font-bold metric-number">{bmiResult.dailyCalories}</p>
                  <p className="text-xs text-muted-foreground">kcal</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Ideal Weight</p>
                  <p className="text-lg font-bold metric-number">{bmiResult.idealWeight}</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Water</p>
                  <p className="text-xl font-bold metric-number">{bmiResult.waterIntake} L</p>
                </div>
              </motion.div>
            )}
          </Card>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section id="dashboard-preview" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <Badge className="bg-purple-50 text-purple-700 border-purple-200 mb-4">Inside the app</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">A dashboard that tells the truth</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Every workout, meal and habit rolled up into one clear view — so you always know exactly where you stand.</p>
          </div>

          <Card className="overflow-hidden shadow-2xl border-border/50 max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-400 ml-2">fitlife-ai.app/dashboard</span>
            </div>
            <div className="p-4 md:p-6 bg-slate-50">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Welcome back,</span>
                <span className="font-bold">Aria</span>
                <span className="text-lg">👋</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Calories", value: "612", color: "text-orange-500", icon: Flame },
                  { label: "Steps", value: "8,420", color: "text-teal-600", icon: Footprints },
                  { label: "Water", value: "1.8/2.4L", color: "text-blue-500", icon: Droplets },
                  { label: "Sleep", value: "7h 20m", color: "text-indigo-500", icon: Moon },
                ].map((s) => (
                  <div key={s.label} className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                    </div>
                    <p className={`text-lg font-bold metric-number ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm font-medium mb-3">Weekly calories burned</p>
                  <ResponsiveContainer width="100%" height={150}>
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0F766E" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#CBD5E1" />
                      <YAxis tick={{ fontSize: 10 }} stroke="#CBD5E1" />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
                      <Area type="monotone" dataKey="calories" stroke="#0F766E" fill="url(#dashGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-sm font-medium mb-3">Goal split</p>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width={140} height={140}>
                      <PieChart>
                        <Pie data={goalData} cx="50%" cy="50%" innerRadius={45} outerRadius={60} paddingAngle={4} dataKey="value" strokeWidth={0}>
                          {goalData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xs">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" /> 65% done</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-200" /> 35% left</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="text-center mt-8">
            <Link href="/register">
              <Button className="bg-primary hover:bg-primary/90 text-white h-12 px-8 text-base font-semibold">
                Start free trial <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Workout Plans */}
      <section className="py-20 bg-slate-50">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-rose-50 text-rose-700 border-rose-200 mb-4">AI fitness plan</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Workouts built around your goal</h2>
              <p className="text-muted-foreground mb-8">Tell us your goal and we generate the exercises, sets, reps and rest times — with safety notes for every move.</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Weight loss", "Muscle gain", "Cardio", "Flexibility"].map((g) => (
                  <span key={g} className="px-4 py-2 rounded-full bg-white border border-border text-sm font-medium hover:border-primary/30 cursor-pointer transition-colors">{g}</span>
                ))}
              </div>

              <div className="space-y-4">
                {exercises.map((ex) => (
                  <Card key={ex.name} className="p-5 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{ex.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">{ex.difficulty}</Badge>
                          <span className="text-xs text-muted-foreground">{ex.goal}</span>
                        </div>
                        <h3 className="font-bold">{ex.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{ex.desc}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>⏱ {ex.duration}</span>
                          <span>🔥 {ex.calories} kcal</span>
                          <span>🔁 {ex.sets} sets</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <img src={WORKOUT_IMAGE} alt="Workout illustration" className="rounded-2xl shadow-2xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Diet Planner */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img src={FOOD_IMAGE} alt="Healthy food" className="rounded-2xl shadow-2xl w-full" />
            </div>
            <div className="order-1 lg:order-2">
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-4">Diet planner</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Meals that fit your macros</h2>
              <p className="text-muted-foreground mb-8">Vegetarian, vegan, keto, high-protein or diabetic-friendly — plans adapt to how you eat, not the other way around.</p>

              <div className="space-y-4">
                {meals.map((meal) => (
                  <Card key={meal.name} className="p-5 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{meal.icon}</span>
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">{meal.type}</span>
                        <h3 className="font-bold">{meal.name}</h3>
                        <div className="flex items-center gap-3 mt-2 text-sm">
                          <span className="text-orange-500">🔥 {meal.calories} kcal</span>
                          <span className="text-red-500">🥩 {meal.protein}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-4">Real results</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Loved by 128K+ members</h2>
            <p className="text-muted-foreground">See how FitLife AI is transforming fitness journeys around the world.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex gap-1 mb-3">
                    {Array(t.rating).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-bold">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.metric}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">Simple pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Choose your plan</h2>
            <p className="text-muted-foreground">Start free, upgrade anytime. All plans include 30-day money-back guarantee.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`p-7 h-full flex flex-col relative ${plan.popular ? "border-2 border-primary shadow-lg" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold metric-number">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <div className="flex-1 mt-6 mb-8 space-y-2.5">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {f}
                      </div>
                    ))}
                    {plan.missing.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground line-through">
                        <X className="w-4 h-4 text-slate-300 flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                  <Link href="/register">
                    <Button className={`w-full h-11 ${plan.popular ? "bg-primary text-white" : "bg-white border-2 border-primary text-primary hover:bg-primary/5"}`}>
                      {plan.popular ? "Start Free Trial" : "Get Started"}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
          </div>
          <Card className="p-2">
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left px-4 font-medium">{faq.q}</AccordionTrigger>
                  <AccordionContent className="px-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your fitness?</h2>
          <p className="text-teal-100 max-w-lg mx-auto mb-8">Join 128,000+ members who are building healthier habits with AI-powered coaching. Start free today.</p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-teal-800 hover:bg-teal-50 h-12 px-8 text-base font-semibold">
              Start your free trial <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-white font-bold text-lg">FitLife AI</span>
              </div>
              <p className="text-sm">Your AI-powered personal fitness coach. Train smarter, eat better, feel unstoppable.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
              <div className="space-y-2 text-sm">
                <Link href="/#features" className="block hover:text-white transition-colors">Features</Link>
                <Link href="/pricing" className="block hover:text-white transition-colors">Pricing</Link>
                <Link href="/faq" className="block hover:text-white transition-colors">FAQ</Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="hover:text-white transition-colors">Blog</a>
                <a href="#" className="hover:text-white transition-colors">About</a>
                <a href="#" className="hover:text-white transition-colors">Careers</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
                <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs">© 2026 FitLife AI. All rights reserved.</p>
            <p className="text-xs max-w-md text-center md:text-right">
              This application is intended for educational purposes only. It is NOT medical advice. Always consult a qualified physician before beginning any exercise or diet program.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
