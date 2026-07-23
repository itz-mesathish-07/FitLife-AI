/*
 * Design: Kinetic Vitality — Daily Tasks
 * - Uses AppShell for sidebar/mobile nav
 * - Interactive task completion with XP rewards
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Zap, Droplets, Footprints, Dumbbell, Brain, StretchHorizontal, Moon, Utensils, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFitness } from "@/contexts/FitnessContext";
import { toast } from "sonner";

const iconMap: Record<string, any> = {
  droplets: Droplets,
  footprints: Footprints,
  dumbbell: Dumbbell,
  brain: Brain,
  "stretch-horizontal": StretchHorizontal,
  moon: Moon,
  utensils: Utensils,
  scale: Scale,
};

export default function DailyTasks() {
  const { dailyTasks, toggleTask, completedTasksCount, totalXp } = useFitness();
  const progress = (completedTasksCount / dailyTasks.length) * 100;

  const handleToggle = (taskId: string, title: string, wasCompleted: boolean) => {
    toggleTask(taskId);
    if (!wasCompleted) {
      toast.success(`Nice! +10 XP earned!`);
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Daily Tasks</h1>
          <p className="text-muted-foreground mt-1 text-sm lg:text-base">Complete missions, earn XP, build streaks</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today's Progress</p>
          <p className="text-xl lg:text-2xl font-bold metric-number">{completedTasksCount}/{dailyTasks.length}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="p-5 lg:p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Daily Completion</span>
          <span className="text-sm font-bold metric-number" style={{ color: "#0F766E" }}>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3" />
        {progress === 100 && (
          <p className="text-sm text-emerald-600 font-medium mt-2">All tasks completed! Amazing work! 🎉</p>
        )}
      </Card>

      {/* XP Counter */}
      <div className="flex items-center gap-3 mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <Zap className="w-6 h-6 text-amber-500" />
        <div>
          <p className="font-bold">{totalXp} XP</p>
          <p className="text-xs text-muted-foreground">Total experience earned</p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {dailyTasks.map((task, i) => {
          const Icon = iconMap[task.icon] || Check;
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Card
                className={`p-4 lg:p-5 flex items-center gap-4 cursor-pointer transition-all hover:shadow-md ${
                  task.completed ? "bg-teal-50 border-teal-200" : "hover:border-primary/30"
                }`}
                onClick={() => handleToggle(task.id, task.title, task.completed)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  task.completed ? "bg-primary" : "bg-muted"
                }`}>
                  <Icon className={`w-5 h-5 ${task.completed ? "text-white" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm lg:text-base transition-all ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">{task.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs lg:text-sm font-medium text-amber-600">+{task.xp} XP</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    task.completed ? "bg-primary border-primary" : "border-border"
                  }`}>
                    {task.completed && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
