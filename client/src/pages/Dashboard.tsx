/*
 * Design: Kinetic Vitality — Dashboard Overview
 * - Uses AppShell for sidebar/mobile nav
 * - Shows top bar greeting + stats + charts + tasks
 */
import { motion } from "framer-motion";
import {
  Flame, Footprints, Droplets, Moon, ChevronRight, Scale,
} from "lucide-react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { useFitness } from "@/contexts/FitnessContext";

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

const quotes = [
  '"Discipline is choosing between what you want now and what you want most."',
  '"The body achieves what the mind believes."',
  '"Every workout is progress. Every step is a victory."',
  '"Your health is an investment, not an expense."',
];

export default function Dashboard() {
  const { user } = useAuth();
  const { dailyTasks, todayCalories, todaySteps, todayWater, completedTasksCount } = useFitness();

  const todayQuote = quotes[new Date().getDay() % quotes.length];

  const statCards = [
    { label: "Calories Burned", value: todayCalories.toString(), unit: "kcal", icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Steps", value: todaySteps.toLocaleString(), unit: "steps", icon: Footprints, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Water Intake", value: `${todayWater} / 2.5`, unit: "L", icon: Droplets, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Sleep", value: "7h 20m", unit: "hours", icon: Moon, color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  return (
    <>
      {/* Top Bar */}
      <header className="bg-white border-b border-border/50 px-4 lg:px-6 py-4 flex items-center justify-between sticky top-0 lg:top-0 z-20">
        <div>
          <h1 className="text-xl font-bold">Good morning, {user?.name?.split(" ")[0] || "Athlete"} 👋</h1>
          <p className="text-sm text-muted-foreground mt-0.5 hidden sm:block">{todayQuote}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/assessment">
            <Button variant="outline" size="sm" className="hidden sm:flex">Body Assessment</Button>
          </Link>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <Card className="p-4 lg:p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xl lg:text-2xl font-bold metric-number mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.unit}</p>
                  </div>
                  <div className={`p-2 lg:p-2.5 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Weekly Calories Chart */}
          <Card className="lg:col-span-2 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <div>
                <h3 className="font-semibold text-base lg:text-lg">Weekly Calories Burned</h3>
                <p className="text-xs lg:text-sm text-muted-foreground">Your energy output this week</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="calorieGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
                <Tooltip contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0" }} />
                <Area type="monotone" dataKey="calories" stroke="#0F766E" fill="url(#calorieGradient)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Goal Progress */}
          <Card className="p-4 lg:p-6">
            <h3 className="font-semibold text-base lg:text-lg mb-2">Weekly Goal</h3>
            <p className="text-xs lg:text-sm text-muted-foreground mb-4 lg:mb-6">Task completion rate</p>
            <div className="flex justify-center mb-4">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie
                    data={goalData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {goalData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center">
              <p className="text-2xl lg:text-3xl font-bold metric-number" style={{ color: "#0F766E" }}>65%</p>
              <p className="text-sm text-muted-foreground">completed</p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-[#0F766E]" />
              <span className="text-muted-foreground text-xs">Done</span>
              <div className="w-3 h-3 rounded-full bg-slate-200 ml-2" />
              <span className="text-muted-foreground text-xs">Remaining</span>
            </div>
          </Card>
        </div>

        {/* Today's Tasks Preview */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-base lg:text-lg">Today's Tasks</h3>
              <p className="text-xs lg:text-sm text-muted-foreground">{completedTasksCount} of {dailyTasks.length} completed</p>
            </div>
            <Link href="/tasks">
              <Button variant="ghost" size="sm" className="text-primary text-xs lg:text-sm">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {dailyTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className={`p-3 lg:p-4 rounded-lg border transition-all ${
                  task.completed
                    ? "bg-teal-50 border-teal-200"
                    : "bg-white border-border hover:border-primary/30 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    task.completed ? "bg-primary border-primary" : "border-border"
                  }`}>
                    {task.completed && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className={`text-sm font-medium ${task.completed ? "text-primary line-through" : ""}`}>
                    {task.title}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">+{task.xp} XP</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
          <Link href="/workouts">
            <Card className="p-4 lg:p-5 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer border-2 border-dashed border-primary/20 hover:border-primary/40">
              <div className="flex items-center gap-3">
                <div className="p-2 lg:p-2.5 rounded-lg bg-primary/10">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Start Workout</p>
                  <p className="text-xs text-muted-foreground">AI-generated plan</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/diet">
            <Card className="p-4 lg:p-5 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer border-2 border-dashed border-amber-300/30 hover:border-amber-400/50">
              <div className="flex items-center gap-3">
                <div className="p-2 lg:p-2.5 rounded-lg bg-amber-50">
                  <Droplets className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Meal Plan</p>
                  <p className="text-xs text-muted-foreground">Personalized nutrition</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/progress">
            <Card className="p-4 lg:p-5 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer border-2 border-dashed border-emerald-300/30 hover:border-emerald-400/50">
              <div className="flex items-center gap-3">
                <div className="p-2 lg:p-2.5 rounded-lg bg-emerald-50">
                  <Footprints className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Track Progress</p>
                  <p className="text-xs text-muted-foreground">View your stats</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}
