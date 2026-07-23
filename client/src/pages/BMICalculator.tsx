/*
 * Design: Kinetic Vitality — BMI Calculator
 * - Uses AppShell for sidebar/mobile nav
 * - BMI, BMR, daily calorie calculator with results display
 */
import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calculator, Activity, Flame, Droplets, Scale, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  bmr: number;
  dailyCalories: number;
  idealWeight: string;
  waterIntake: number;
}

function calculateBMI(age: number, gender: string, height: number, weight: number, activity: string): BMIResult {
  const bmi = +(weight / ((height / 100) ** 2)).toFixed(1);
  let category = "";
  let color = "";
  if (bmi < 18.5) { category = "Underweight"; color = "text-blue-500"; }
  else if (bmi < 25) { category = "Normal weight"; color = "text-emerald-500"; }
  else if (bmi < 30) { category = "Overweight"; color = "text-amber-500"; }
  else { category = "Obese"; color = "text-red-500"; }

  const bmr = gender === "Male"
    ? +(88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)).toFixed(0)
    : +(447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age)).toFixed(0);

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
  };
  const dailyCalories = Math.round(bmr * (activityMultipliers[activity] || 1.55));
  const minIdeal = (18.5 * (height / 100) ** 2).toFixed(0);
  const maxIdeal = (24.9 * (height / 100) ** 2).toFixed(0);
  const waterIntake = +((weight * 0.033)).toFixed(1);

  return { bmi, category, color, bmr, dailyCalories, idealWeight: `${minIdeal}–${maxIdeal} kg`, waterIntake };
}

export default function BMICalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("moderate");
  const [result, setResult] = useState<BMIResult | null>(null);

  const handleCalculate = () => {
    const a = parseInt(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!a || !h || !w) {
      toast.error("Please fill in all fields");
      return;
    }
    const r = calculateBMI(a, gender, h, w, activity);
    setResult(r);
    toast.success("BMI calculated!");
  };

  return (
    <div className="p-4 lg:p-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>

      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold">BMI Calculator</h1>
        <p className="text-muted-foreground mt-2 text-sm lg:text-base">Get an instant BMI, BMR, and daily calorie estimate — the numbers your AI plan is built from</p>
      </div>

      <Card className="p-5 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <Label htmlFor="age" className="text-sm font-medium">Age</Label>
            <Input id="age" type="number" placeholder="28" value={age} onChange={(e) => setAge(e.target.value)} className="mt-1.5 h-11" />
          </div>
          <div>
            <Label className="text-sm font-medium">Gender</Label>
            <div className="flex gap-3 mt-1.5">
              {["Male", "Female"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 h-11 rounded-lg border-2 font-medium text-sm transition-all ${
                    gender === g ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="height" className="text-sm font-medium">Height (cm)</Label>
            <Input id="height" type="number" placeholder="172" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1.5 h-11" />
          </div>
          <div>
            <Label htmlFor="weight" className="text-sm font-medium">Weight (kg)</Label>
            <Input id="weight" type="number" placeholder="70" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1.5 h-11" />
          </div>
        </div>

        <div className="mt-6">
          <Label className="text-sm font-medium">Activity Level</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1.5">
            {[
              { value: "sedentary", label: "Sedentary" },
              { value: "light", label: "Light (1-3/week)" },
              { value: "moderate", label: "Moderate (3-5/week)" },
              { value: "very", label: "Very Active (6-7/week)" },
            ].map((a) => (
              <button
                key={a.value}
                onClick={() => setActivity(a.value)}
                className={`h-10 rounded-lg border-2 text-sm font-medium transition-all ${
                  activity === a.value ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full mt-6 lg:mt-8 h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-base">
          Calculate
        </Button>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8"
          >
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Your Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-5 lg:p-6 text-center border-2 border-primary/20">
                <Scale className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Your BMI</p>
                <p className={`text-2xl lg:text-3xl font-bold metric-number ${result.color}`}>{result.bmi}</p>
                <p className={`text-sm font-medium ${result.color} mt-1`}>{result.category}</p>
              </Card>
              <Card className="p-5 lg:p-6 text-center">
                <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">BMR</p>
                <p className="text-2xl lg:text-3xl font-bold metric-number">{result.bmr}</p>
                <p className="text-sm text-muted-foreground">kcal/day (at rest)</p>
              </Card>
              <Card className="p-5 lg:p-6 text-center">
                <Activity className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Daily Calories</p>
                <p className="text-2xl lg:text-3xl font-bold metric-number">{result.dailyCalories.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">kcal (with activity)</p>
              </Card>
              <Card className="p-5 lg:p-6 text-center">
                <Weight className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Ideal Weight</p>
                <p className="text-lg lg:text-xl font-bold metric-number">{result.idealWeight}</p>
              </Card>
              <Card className="p-5 lg:p-6 text-center">
                <Droplets className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Water Intake</p>
                <p className="text-xl lg:text-2xl font-bold metric-number">{result.waterIntake} L</p>
                <p className="text-sm text-muted-foreground">suggested daily</p>
              </Card>
            </div>

            <p className="text-xs text-muted-foreground mt-6 text-center max-w-2xl mx-auto">
              This application is intended for educational and fitness guidance purposes only. It is NOT medical advice. Always consult a qualified physician before beginning any exercise or diet program.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
