/*
 * Design: Kinetic Vitality — Profile
 * - Uses AppShell for sidebar/mobile nav
 * - Personal information form with avatar
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: "28",
    gender: "Female",
    height: "172",
    weight: "70",
    bodyFat: "22",
    medicalConditions: "",
    fitnessGoal: "Weight Loss",
    activityLevel: "Moderate",
    workoutPreference: "Mixed",
    experienceLevel: "Intermediate",
    targetWeight: "65",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateProfile({ name: formData.name });
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="p-4 lg:p-6">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>

      <div className="flex items-center gap-4 lg:gap-6 mb-8">
        <div className="relative">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-2xl lg:text-3xl font-bold">
            {user?.name?.charAt(0) || "A"}
          </div>
          <button className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
            <Camera className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <div>
          <h1 className="text-xl lg:text-2xl font-bold">{user?.name}</h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          <div className="flex gap-3 mt-2">
            <span className="text-xs lg:text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">Level {user?.level}</span>
            <span className="text-xs lg:text-sm bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-medium">🔥 {user?.streak} day streak</span>
          </div>
        </div>
      </div>

      <Card className="p-5 lg:p-8">
        <h2 className="text-lg lg:text-xl font-bold mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <Label htmlFor="name" className="text-sm">Full Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="mt-1.5 h-11" />
          </div>
          <div>
            <Label htmlFor="age" className="text-sm">Age</Label>
            <Input id="age" type="number" value={formData.age} onChange={(e) => handleChange("age", e.target.value)} className="mt-1.5 h-11" />
          </div>
          <div>
            <Label htmlFor="gender" className="text-sm">Gender</Label>
            <select id="gender" value={formData.gender} onChange={(e) => handleChange("gender", e.target.value)} className="w-full h-11 rounded-lg border border-input px-3 mt-1.5 bg-background">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="height" className="text-sm">Height (cm)</Label>
            <Input id="height" type="number" value={formData.height} onChange={(e) => handleChange("height", e.target.value)} className="mt-1.5 h-11" />
          </div>
          <div>
            <Label htmlFor="weight" className="text-sm">Weight (kg)</Label>
            <Input id="weight" type="number" value={formData.weight} onChange={(e) => handleChange("weight", e.target.value)} className="mt-1.5 h-11" />
          </div>
          <div>
            <Label htmlFor="bodyFat" className="text-sm">Body Fat %</Label>
            <Input id="bodyFat" type="number" value={formData.bodyFat} onChange={(e) => handleChange("bodyFat", e.target.value)} className="mt-1.5 h-11" />
          </div>
          <div>
            <Label htmlFor="targetWeight" className="text-sm">Target Weight (kg)</Label>
            <Input id="targetWeight" type="number" value={formData.targetWeight} onChange={(e) => handleChange("targetWeight", e.target.value)} className="mt-1.5 h-11" />
          </div>
          <div>
            <Label htmlFor="fitnessGoal" className="text-sm">Fitness Goal</Label>
            <select id="fitnessGoal" value={formData.fitnessGoal} onChange={(e) => handleChange("fitnessGoal", e.target.value)} className="w-full h-11 rounded-lg border border-input px-3 mt-1.5 bg-background">
              <option>Weight Loss</option>
              <option>Muscle Gain</option>
              <option>Fat Loss</option>
              <option>Cardio</option>
              <option>Flexibility</option>
              <option>General Health</option>
            </select>
          </div>
          <div>
            <Label htmlFor="activityLevel" className="text-sm">Activity Level</Label>
            <select id="activityLevel" value={formData.activityLevel} onChange={(e) => handleChange("activityLevel", e.target.value)} className="w-full h-11 rounded-lg border border-input px-3 mt-1.5 bg-background">
              <option>Sedentary</option>
              <option>Light</option>
              <option>Moderate</option>
              <option>Very Active</option>
            </select>
          </div>
          <div>
            <Label htmlFor="experienceLevel" className="text-sm">Experience Level</Label>
            <select id="experienceLevel" value={formData.experienceLevel} onChange={(e) => handleChange("experienceLevel", e.target.value)} className="w-full h-11 rounded-lg border border-input px-3 mt-1.5 bg-background">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <Label htmlFor="medicalConditions" className="text-sm">Medical Conditions</Label>
          <Input id="medicalConditions" placeholder="e.g., Asthma, Back pain, Previous injuries" value={formData.medicalConditions} onChange={(e) => handleChange("medicalConditions", e.target.value)} className="mt-1.5 h-11" />
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white h-11 px-8">
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
