/*
 * Design: Kinetic Vitality — Diet Planner
 * - Uses AppShell for sidebar/mobile nav
 * - Macro summary + category filtering + meal cards
 */
import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Flame, Beef, Wheat, Salad, Apple } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFitness } from "@/contexts/FitnessContext";

const typeIcons: Record<string, any> = {
  Breakfast: Wheat,
  Lunch: Salad,
  Dinner: Beef,
  Snack: Apple,
};

const typeColors: Record<string, string> = {
  Breakfast: "bg-amber-50 border-amber-200",
  Lunch: "bg-emerald-50 border-emerald-200",
  Dinner: "bg-blue-50 border-blue-200",
  Snack: "bg-purple-50 border-purple-200",
};

const categories = ["all", "high-protein", "weight-loss", "vegetarian", "vegan", "keto", "general"];

export default function DietPlanner() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { mealPlans } = useFitness();

  const filtered = selectedCategory === "all"
    ? mealPlans
    : mealPlans.filter((m) => m.category === selectedCategory);

  const totalCalories = filtered.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = filtered.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = filtered.reduce((sum, m) => sum + m.carbs, 0);
  const totalFat = filtered.reduce((sum, m) => sum + m.fat, 0);

  return (
    <div className="p-4 lg:p-6">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>

      <h1 className="text-2xl lg:text-3xl font-bold mb-1">Diet Planner</h1>
      <p className="text-muted-foreground mb-8 text-sm lg:text-base">Meals that fit your macros — personalized nutrition plans</p>

      {/* Macros Summary */}
      <Card className="p-5 lg:p-6 mb-8 bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs lg:text-sm text-muted-foreground">Calories</span>
            </div>
            <p className="text-xl lg:text-2xl font-bold metric-number">{totalCalories}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Beef className="w-4 h-4 text-red-500" />
              <span className="text-xs lg:text-sm text-muted-foreground">Protein</span>
            </div>
            <p className="text-xl lg:text-2xl font-bold metric-number">{totalProtein}g</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Wheat className="w-4 h-4 text-amber-600" />
              <span className="text-xs lg:text-sm text-muted-foreground">Carbs</span>
            </div>
            <p className="text-xl lg:text-2xl font-bold metric-number">{totalCarbs}g</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Salad className="w-4 h-4 text-emerald-600" />
              <span className="text-xs lg:text-sm text-muted-foreground">Fat</span>
            </div>
            <p className="text-xl lg:text-2xl font-bold metric-number">{totalFat}g</p>
          </div>
        </div>
      </Card>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
        <TabsList className="bg-white border border-border/50 p-1 flex-wrap h-auto">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">All</TabsTrigger>
          <TabsTrigger value="high-protein" className="data-[state=active]:bg-primary data-[state=active]:text-white">High Protein</TabsTrigger>
          <TabsTrigger value="weight-loss" className="data-[state=active]:bg-primary data-[state=active]:text-white">Weight Loss</TabsTrigger>
          <TabsTrigger value="vegetarian" className="data-[state=active]:bg-primary data-[state=active]:text-white">Vegetarian</TabsTrigger>
          <TabsTrigger value="vegan" className="data-[state=active]:bg-primary data-[state=active]:text-white">Vegan</TabsTrigger>
          <TabsTrigger value="keto" className="data-[state=active]:bg-primary data-[state=active]:text-white">Keto</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Meal Cards */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((meal, i) => {
          const Icon = typeIcons[meal.type] || Apple;
          return (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <Card className={`p-5 border-2 ${typeColors[meal.type]} hover:shadow-lg transition-all hover:-translate-y-0.5`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{meal.type}</span>
                    </div>
                    <h3 className="text-lg font-bold">{meal.name}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{meal.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="font-medium metric-number">{meal.calories} kcal</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Beef className="w-4 h-4 text-red-500" />
                    <span className="font-medium metric-number">{meal.protein}g</span>
                  </span>
                  <span className="text-xs text-muted-foreground">C: {meal.carbs}g · F: {meal.fat}g · Fi: {meal.fiber}g</span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No meals found for this category. Try another one!</p>
        </Card>
      )}
    </div>
  );
}
