/*
 * Design: Kinetic Vitality — Workout Plans
 * - Uses AppShell for sidebar/mobile nav
 * - Goal-based exercise filtering with animated transitions
 */
import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Flame, Repeat, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFitness } from "@/contexts/FitnessContext";
import { toast } from "sonner";

const goalMap: Record<string, string> = {
  "weight-loss": "Weight Loss",
  "muscle-gain": "Muscle Gain",
  "cardio": "Cardio",
  "flexibility": "Flexibility",
};

const difficultyColors: Record<string, string> = {
  Beginner: "bg-emerald-100 text-emerald-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-red-100 text-red-700",
};

export default function WorkoutPlans() {
  const [selectedGoal, setSelectedGoal] = useState("weight-loss");
  const { exercises } = useFitness();

  const filteredExercises = exercises.filter((e) => e.goal === selectedGoal);

  const handleStartWorkout = (name: string) => {
    toast.success(`Starting "${name}" — let's crush it!`);
  };

  return (
    <div className="p-4 lg:p-6">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">AI Fitness Plans</h1>
          <p className="text-muted-foreground mt-1 text-sm lg:text-base">Workouts built around your goal</p>
        </div>
      </div>

      {/* Goal Tabs */}
      <Tabs value={selectedGoal} onValueChange={setSelectedGoal} className="mb-8">
        <TabsList className="bg-white border border-border/50 p-1">
          <TabsTrigger value="weight-loss" className="data-[state=active]:bg-primary data-[state=active]:text-white">Weight Loss</TabsTrigger>
          <TabsTrigger value="muscle-gain" className="data-[state=active]:bg-primary data-[state=active]:text-white">Muscle Gain</TabsTrigger>
          <TabsTrigger value="cardio" className="data-[state=active]:bg-primary data-[state=active]:text-white">Cardio</TabsTrigger>
          <TabsTrigger value="flexibility" className="data-[state=active]:bg-primary data-[state=active]:text-white">Flexibility</TabsTrigger>
        </TabsList>
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedGoal}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          {filteredExercises.length > 0 ? filteredExercises.map((exercise, i) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <Card className="p-5 lg:p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={difficultyColors[exercise.difficulty]}>{exercise.difficulty}</Badge>
                      <span className="text-sm text-muted-foreground">{exercise.targetMuscle}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{exercise.name}</h3>
                    <p className="text-sm text-muted-foreground">{exercise.description}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium metric-number">{exercise.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="font-medium metric-number">{exercise.calories} kcal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Repeat className="w-4 h-4" />
                      <span className="font-medium metric-number">{exercise.sets} sets</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleStartWorkout(exercise.name)}
                      className="bg-primary hover:bg-primary/90 text-white"
                      size="sm"
                    >
                      <Zap className="w-4 h-4 mr-1" /> Start
                    </Button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Sets</p>
                    <p className="font-bold metric-number">{exercise.sets}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Reps</p>
                    <p className="font-bold metric-number">{exercise.reps}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Rest</p>
                    <p className="font-bold metric-number">{exercise.restTime}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Calories</p>
                    <p className="font-bold metric-number">{exercise.calories}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No exercises for this goal yet. Try another category!</p>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
