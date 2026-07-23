import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

export interface Exercise {
  id: string;
  name: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  targetMuscle: string;
  duration: string;
  sets: number;
  reps: number;
  restTime: string;
  calories: number;
  goal: string;
}

export interface MealPlan {
  id: string;
  name: string;
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  description: string;
  category: string;
}

export interface DailyTask {
  id: string;
  title: string;
  icon: string;
  completed: boolean;
  xp: number;
  description: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  xp: number;
  type: "badge" | "medal" | "certificate";
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weight: number;
  bmi: number;
  bodyFat: number;
  calories: number;
  steps: number;
  waterIntake: number;
  sleep: number;
}

interface FitnessContextType {
  exercises: Exercise[];
  mealPlans: MealPlan[];
  dailyTasks: DailyTask[];
  achievements: Achievement[];
  measurements: BodyMeasurement[];
  toggleTask: (taskId: string) => void;
  addMeasurement: (m: Omit<BodyMeasurement, "id">) => void;
  totalXp: number;
  todayCalories: number;
  todaySteps: number;
  todayWater: number;
  completedTasksCount: number;
}

const STORAGE_KEY = "fitlife-data";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveToStorage(data: any) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const defaultExercises: Exercise[] = [
  { id: "ex1", name: "Interval Sprint Circuit", description: "Full-body cardio targeting legs and core with 30s work / 30s rest intervals.", difficulty: "Intermediate", targetMuscle: "Full Body", duration: "22 min", sets: 6, reps: 1, restTime: "30s", calories: 310, goal: "weight-loss" },
  { id: "ex2", name: "Morning Mobility Flow", description: "Gentle full-body stretch sequence to open hips, spine and shoulders before the day starts.", difficulty: "Beginner", targetMuscle: "Full Body", duration: "15 min", sets: 1, reps: 1, restTime: "0s", calories: 90, goal: "flexibility" },
  { id: "ex3", name: "Lower Body Power", description: "Squats, lunges and glute bridges to build strength through the legs and posterior chain.", difficulty: "Intermediate", targetMuscle: "Legs & Glutes", duration: "34 min", sets: 4, reps: 12, restTime: "60s", calories: 260, goal: "muscle-gain" },
  { id: "ex4", name: "HIIT Fat Burner", description: "High-intensity intervals combining burpees, mountain climbers, and jump squats.", difficulty: "Advanced", targetMuscle: "Full Body", duration: "25 min", sets: 5, reps: 1, restTime: "45s", calories: 380, goal: "weight-loss" },
  { id: "ex5", name: "Upper Body Sculpt", description: "Push-ups, rows, and shoulder presses for balanced upper body development.", difficulty: "Intermediate", targetMuscle: "Chest, Back, Shoulders", duration: "30 min", sets: 4, reps: 10, restTime: "60s", calories: 240, goal: "muscle-gain" },
  { id: "ex6", name: "Yoga Flow Recovery", description: "Restorative yoga sequence with deep breathing for active recovery.", difficulty: "Beginner", targetMuscle: "Full Body", duration: "20 min", sets: 1, reps: 1, restTime: "0s", calories: 100, goal: "flexibility" },
  { id: "ex7", name: "Cardio Kickboxing", description: "Dynamic kickboxing-inspired moves combining cardio with coordination.", difficulty: "Intermediate", targetMuscle: "Full Body", duration: "28 min", sets: 3, reps: 1, restTime: "30s", calories: 350, goal: "cardio" },
  { id: "ex8", name: "Core Crusher", description: "Intense abdominal workout targeting all core muscles with progressive overload.", difficulty: "Advanced", targetMuscle: "Core", duration: "18 min", sets: 4, reps: 15, restTime: "30s", calories: 180, goal: "weight-loss" },
];

const defaultMealPlans: MealPlan[] = [
  { id: "mp1", name: "Greek Yoghurt & Berry Bowl", type: "Breakfast", calories: 380, protein: 24, carbs: 45, fat: 12, fiber: 6, description: "High-protein start with oats, mixed berries, chia and a drizzle of honey.", category: "high-protein" },
  { id: "mp2", name: "Grilled Chicken Salad", type: "Lunch", calories: 520, protein: 42, carbs: 30, fat: 22, fiber: 8, description: "Lean protein with mixed greens, olive oil dressing and seasonal vegetables.", category: "weight-loss" },
  { id: "mp3", name: "Salmon & Sweet Potato", type: "Dinner", calories: 650, protein: 38, carbs: 55, fat: 28, fiber: 10, description: "Omega-3 rich salmon with roasted sweet potato and steamed broccoli.", category: "general" },
  { id: "mp4", name: "Avocado Toast with Eggs", type: "Breakfast", calories: 420, protein: 18, carbs: 32, fat: 24, fiber: 8, description: "Sourdough toast with smashed avocado, poached eggs, and everything seasoning.", category: "vegan" },
  { id: "mp5", name: "Quinoa Buddha Bowl", type: "Lunch", calories: 580, protein: 22, carbs: 65, fat: 20, fiber: 12, description: "Quinoa base with roasted chickpeas, kale, sweet potato and tahini dressing.", category: "vegetarian" },
  { id: "mp6", name: "Protein Smoothie Bowl", type: "Breakfast", calories: 350, protein: 30, carbs: 35, fat: 8, fiber: 5, description: "Blended protein powder with banana, spinach, almond butter and granola.", category: "high-protein" },
  { id: "mp7", name: "Keto Chicken Thighs", type: "Dinner", calories: 580, protein: 45, carbs: 5, fat: 42, fiber: 4, description: "Herb-crusted chicken thighs with cauliflower mash and buttered asparagus.", category: "keto" },
  { id: "mp8", name: "Almond Butter Bites", type: "Snack", calories: 180, protein: 8, carbs: 12, fat: 12, fiber: 3, description: "No-bake energy balls with almond butter, oats, and dark chocolate chips.", category: "general" },
];

const defaultTasks: DailyTask[] = [
  { id: "t1", title: "Drink 2.5L Water", icon: "droplets", completed: false, xp: 10, description: "Stay hydrated throughout the day" },
  { id: "t2", title: "Complete 8,000 Steps", icon: "footprints", completed: false, xp: 15, description: "Walk and stay active" },
  { id: "t3", title: "30-Min Workout", icon: "dumbbell", completed: false, xp: 25, description: "Complete today's exercise plan" },
  { id: "t4", title: "10-Min Meditation", icon: "brain", completed: false, xp: 15, description: "Mental wellness matters" },
  { id: "t5", title: "Stretching Session", icon: "stretch-horizontal", completed: false, xp: 10, description: "5-10 minutes of stretching" },
  { id: "t6", title: "Sleep 7+ Hours", icon: "moon", completed: false, xp: 20, description: "Quality rest for recovery" },
  { id: "t7", title: "Eat 3 Balanced Meals", icon: "utensils", completed: false, xp: 15, description: "Follow your meal plan" },
  { id: "t8", title: "Log Body Metrics", icon: "scale", completed: false, xp: 10, description: "Track your weight and measurements" },
];

const defaultAchievements: Achievement[] = [
  { id: "a1", name: "First Step", description: "Complete your first workout", icon: "🏆", unlocked: true, xp: 50, type: "badge" },
  { id: "a2", name: "7-Day Streak", description: "Maintain a 7-day daily task streak", icon: "🔥", unlocked: true, xp: 100, type: "badge" },
  { id: "a3", name: "Century", description: "Complete 100 workouts total", icon: "💯", unlocked: false, xp: 200, type: "medal" },
  { id: "a4", name: "Iron Will", description: "Work out 30 days in a row", icon: "⚡", unlocked: false, xp: 500, type: "medal" },
  { id: "a5", name: "Hydration Hero", description: "Log water intake for 14 consecutive days", icon: "💧", unlocked: true, xp: 75, type: "badge" },
  { id: "a6", name: "Early Bird", description: "Complete a workout before 7 AM", icon: "🌅", unlocked: false, xp: 30, type: "badge" },
  { id: "a7", name: "Zen Master", description: "Complete 50 meditation sessions", icon: "🧘", unlocked: false, xp: 150, type: "certificate" },
  { id: "a8", name: "Transformation", description: "Lose or gain 5kg in a healthy way", icon: "✨", unlocked: false, xp: 300, type: "certificate" },
];

const defaultMeasurements: BodyMeasurement[] = [
  { id: "m1", date: "2026-07-07", weight: 74.2, bmi: 25.1, bodyFat: 22.3, calories: 2100, steps: 6200, waterIntake: 1.8, sleep: 6.5 },
  { id: "m2", date: "2026-07-10", weight: 73.8, bmi: 24.9, bodyFat: 21.8, calories: 2250, steps: 7500, waterIntake: 2.1, sleep: 7.0 },
  { id: "m3", date: "2026-07-13", weight: 73.5, bmi: 24.7, bodyFat: 21.4, calories: 2300, steps: 8100, waterIntake: 2.3, sleep: 7.2 },
  { id: "m4", date: "2026-07-16", weight: 73.1, bmi: 24.5, bodyFat: 20.9, calories: 2400, steps: 8800, waterIntake: 2.2, sleep: 7.5 },
  { id: "m5", date: "2026-07-19", weight: 72.8, bmi: 24.3, bodyFat: 20.5, calories: 2350, steps: 9200, waterIntake: 2.4, sleep: 7.8 },
  { id: "m6", date: "2026-07-21", weight: 72.5, bmi: 24.1, bodyFat: 20.1, calories: 2450, steps: 8420, waterIntake: 1.8, sleep: 7.3 },
];

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export function FitnessProvider({ children }: { children: ReactNode }) {
  const [exercises] = useState<Exercise[]>(defaultExercises);
  const [mealPlans] = useState<MealPlan[]>(defaultMealPlans);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(() => {
    const stored = loadFromStorage();
    return stored?.tasks || defaultTasks;
  });
  const [achievements] = useState<Achievement[]>(defaultAchievements);
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>(() => {
    const stored = loadFromStorage();
    return stored?.measurements || defaultMeasurements;
  });

  useEffect(() => {
    saveToStorage({ tasks: dailyTasks, measurements });
  }, [dailyTasks, measurements]);

  const toggleTask = useCallback((taskId: string) => {
    setDailyTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const addMeasurement = useCallback((m: Omit<BodyMeasurement, "id">) => {
    setMeasurements((prev) => [...prev, { ...m, id: `m${Date.now()}` }]);
  }, []);

  const totalXp = dailyTasks.filter((t) => t.completed).reduce((sum, t) => sum + t.xp, 0) + 2840;
  const todayCalories = 612;
  const todaySteps = 8420;
  const todayWater = 1.8;
  const completedTasksCount = dailyTasks.filter((t) => t.completed).length;

  return (
    <FitnessContext.Provider value={{ exercises, mealPlans, dailyTasks, achievements, measurements, toggleTask, addMeasurement, totalXp, todayCalories, todaySteps, todayWater, completedTasksCount }}>
      {children}
    </FitnessContext.Provider>
  );
}

export function useFitness() {
  const ctx = useContext(FitnessContext);
  if (!ctx) throw new Error("useFitness must be used within FitnessProvider");
  return ctx;
}
