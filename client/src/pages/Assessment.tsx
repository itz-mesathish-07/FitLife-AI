/*
 * Design: Kinetic Vitality — Body Assessment
 * - Uses AppShell for sidebar/mobile nav
 * - Multi-step form for body condition assessment
 */
import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const medicalConditions = [
  "High Blood Pressure", "Diabetes", "Heart Disease", "Asthma",
  "Back Pain", "Joint Pain", "Pregnancy", "Previous Injuries",
];

const lifestyleOptions = ["Office Worker", "Student", "Athlete", "Active Parent"];

export default function Assessment() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    age: "", gender: "Male", weight: "", height: "",
    medicalConditions: [] as string[],
    lifestyle: "Office Worker",
    sleepHours: "7", waterIntake: "2",
    smoking: false, alcohol: false, stressLevel: "moderate",
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    toast.success("Assessment complete! Your AI plan is being generated.");
    setStep(4);
  };

  const bmi = data.height && data.weight
    ? (parseFloat(data.weight) / ((parseFloat(data.height) / 100) ** 2)).toFixed(1)
    : null;

  const progressSteps = [
    { id: 1, label: "Basic Info" },
    { id: 2, label: "Health & Lifestyle" },
    { id: 3, label: "Review & Generate" },
  ];

  return (
    <div className="p-4 lg:p-6">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>

      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <ClipboardCheck className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold">Body Condition Assessment</h1>
        <p className="text-muted-foreground mt-2 text-sm lg:text-base">Help us understand your body so we can build the perfect plan</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {progressSteps.map((s) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= s.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            }`}>
              {s.id}
            </div>
            <span className={`text-sm font-medium hidden sm:inline ${step >= s.id ? "text-primary" : "text-muted-foreground"}`}>{s.label}</span>
            {s.id < 3 && <div className={`w-8 h-px ${step > s.id ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="p-5 lg:p-8">
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <h2 className="text-lg lg:text-xl font-bold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
              <div>
                <Label className="text-sm">Age</Label>
                <Input type="number" placeholder="28" value={data.age} onChange={(e) => setData({ ...data, age: e.target.value })} className="mt-1.5 h-11" />
              </div>
              <div>
                <Label className="text-sm">Gender</Label>
                <div className="flex gap-3 mt-1.5">
                  {["Male", "Female"].map((g) => (
                    <button key={g} onClick={() => setData({ ...data, gender: g })} className={`flex-1 h-11 rounded-lg border-2 font-medium text-sm ${data.gender === g ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>{g}</button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm">Height (cm)</Label>
                <Input type="number" placeholder="172" value={data.height} onChange={(e) => setData({ ...data, height: e.target.value })} className="mt-1.5 h-11" />
              </div>
              <div>
                <Label className="text-sm">Weight (kg)</Label>
                <Input type="number" placeholder="70" value={data.weight} onChange={(e) => setData({ ...data, weight: e.target.value })} className="mt-1.5 h-11" />
              </div>
            </div>
            {bmi && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm">Your BMI: <span className="font-bold metric-number">{bmi}</span></p>
              </div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-lg lg:text-xl font-bold mb-4">Health & Lifestyle</h2>

            <div>
              <Label className="text-sm font-medium mb-2 block">Medical Conditions</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {medicalConditions.map((condition) => (
                  <label key={condition} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer">
                    <Checkbox
                      checked={data.medicalConditions.includes(condition)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setData({ ...data, medicalConditions: [...data.medicalConditions, condition] });
                        } else {
                          setData({ ...data, medicalConditions: data.medicalConditions.filter((c) => c !== condition) });
                        }
                      }}
                    />
                    <span className="text-sm">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Lifestyle</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {lifestyleOptions.map((l) => (
                  <button key={l} onClick={() => setData({ ...data, lifestyle: l })} className={`h-11 rounded-lg border-2 text-sm font-medium ${data.lifestyle === l ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>{l}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
              <div>
                <Label className="text-sm">Sleep Hours</Label>
                <Input type="number" placeholder="7" value={data.sleepHours} onChange={(e) => setData({ ...data, sleepHours: e.target.value })} className="mt-1.5 h-11" />
              </div>
              <div>
                <Label className="text-sm">Water Intake (L)</Label>
                <Input type="number" placeholder="2" value={data.waterIntake} onChange={(e) => setData({ ...data, waterIntake: e.target.value })} className="mt-1.5 h-11" />
              </div>
              <div>
                <Label className="text-sm">Stress Level</Label>
                <div className="flex gap-2 mt-1.5">
                  {["low", "moderate", "high"].map((s) => (
                    <button key={s} onClick={() => setData({ ...data, stressLevel: s })} className={`flex-1 h-11 rounded-lg border-2 text-sm capitalize ${data.stressLevel === s ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <Checkbox checked={data.smoking} onCheckedChange={(c) => setData({ ...data, smoking: !!c })} />
                <span className="text-sm">I smoke</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox checked={data.alcohol} onCheckedChange={(c) => setData({ ...data, alcohol: !!c })} />
                <span className="text-sm">I consume alcohol</span>
              </label>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-lg lg:text-xl font-bold mb-4">Review Your Profile</h2>
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="p-4 bg-slate-50 rounded-lg"><p className="text-xs text-muted-foreground">Age</p><p className="font-bold">{data.age || "—"}</p></div>
              <div className="p-4 bg-slate-50 rounded-lg"><p className="text-xs text-muted-foreground">Gender</p><p className="font-bold">{data.gender}</p></div>
              <div className="p-4 bg-slate-50 rounded-lg"><p className="text-xs text-muted-foreground">Height</p><p className="font-bold">{data.height ? `${data.height} cm` : "—"}</p></div>
              <div className="p-4 bg-slate-50 rounded-lg"><p className="text-xs text-muted-foreground">Weight</p><p className="font-bold">{data.weight ? `${data.weight} kg` : "—"}</p></div>
              <div className="p-4 bg-slate-50 rounded-lg"><p className="text-xs text-muted-foreground">BMI</p><p className="font-bold">{bmi || "—"}</p></div>
              <div className="p-4 bg-slate-50 rounded-lg"><p className="text-xs text-muted-foreground">Lifestyle</p><p className="font-bold">{data.lifestyle}</p></div>
              <div className="p-4 bg-slate-50 rounded-lg col-span-2"><p className="text-xs text-muted-foreground">Medical Conditions</p><p className="font-bold">{data.medicalConditions.length > 0 ? data.medicalConditions.join(", ") : "None reported"}</p></div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-5xl lg:text-6xl mb-4">🎉</div>
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Assessment Complete!</h2>
            <p className="text-muted-foreground mb-6 text-sm lg:text-base">Your personalized AI fitness plan is ready. Head to your dashboard to start.</p>
            <Link href="/dashboard">
              <Button className="bg-primary hover:bg-primary/90 text-white h-11 px-8">Go to Dashboard</Button>
            </Link>
          </motion.div>
        )}

        {step < 4 && (
          <div className="flex justify-between mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-border">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>Back</Button>
            )}
            {step < 3 ? (
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-white ml-auto">Continue</Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-white ml-auto">Generate Plan</Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
