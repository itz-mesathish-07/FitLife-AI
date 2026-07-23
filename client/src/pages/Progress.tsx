/*
 * Design: Kinetic Vitality — Progress Tracker
 * - Uses AppShell for sidebar/mobile nav
 * - Charts, measurement logging, history
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, TrendingDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";
import { useFitness } from "@/contexts/FitnessContext";
import { toast } from "sonner";

export default function Progress() {
  const { measurements, addMeasurement } = useFitness();
  const [showForm, setShowForm] = useState(false);
  const [newData, setNewData] = useState({ weight: "", bodyFat: "", calories: "", steps: "", waterIntake: "", sleep: "" });

  const weightData = measurements.map((m) => ({ date: m.date.slice(5), weight: m.weight, bmi: m.bmi }));
  const activityData = measurements.map((m) => ({ date: m.date.slice(5), steps: m.steps, waterIntake: m.waterIntake }));

  const handleAddMeasurement = () => {
    const w = parseFloat(newData.weight);
    const h = 172;
    const bmi = +(w / ((h / 100) ** 2)).toFixed(1);
    addMeasurement({
      date: new Date().toISOString().split("T")[0],
      weight: w,
      bmi,
      bodyFat: parseFloat(newData.bodyFat) || 20,
      calories: parseInt(newData.calories) || 2000,
      steps: parseInt(newData.steps) || 0,
      waterIntake: parseFloat(newData.waterIntake) || 0,
      sleep: parseFloat(newData.sleep) || 7,
    });
    toast.success("Measurement logged!");
    setShowForm(false);
    setNewData({ weight: "", bodyFat: "", calories: "", steps: "", waterIntake: "", sleep: "" });
  };

  const latest = measurements[measurements.length - 1];
  const first = measurements[0];
  const weightChange = (latest.weight - first.weight).toFixed(1);

  return (
    <div className="p-4 lg:p-6">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Progress Tracker</h1>
          <p className="text-muted-foreground mt-1 text-sm lg:text-base">Your fitness journey at a glance</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-1" /> Log Measurement
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-8">
        <Card className="p-4 lg:p-5">
          <p className="text-xs lg:text-sm text-muted-foreground">Current Weight</p>
          <p className="text-xl lg:text-2xl font-bold metric-number">{latest?.weight} kg</p>
          <p className="text-xs flex items-center gap-1 mt-1">
            <TrendingDown className={`w-3 h-3 ${parseFloat(weightChange) < 0 ? "text-emerald-500" : "text-red-500"}`} />
            <span className={parseFloat(weightChange) < 0 ? "text-emerald-600" : "text-red-600"}>{weightChange} kg</span>
          </p>
        </Card>
        <Card className="p-4 lg:p-5">
          <p className="text-xs lg:text-sm text-muted-foreground">BMI</p>
          <p className="text-xl lg:text-2xl font-bold metric-number">{latest?.bmi}</p>
          <p className="text-xs text-muted-foreground mt-1">Normal weight</p>
        </Card>
        <Card className="p-4 lg:p-5">
          <p className="text-xs lg:text-sm text-muted-foreground">Body Fat</p>
          <p className="text-xl lg:text-2xl font-bold metric-number">{latest?.bodyFat}%</p>
          <p className="text-xs text-muted-foreground mt-1">Healthy range</p>
        </Card>
        <Card className="p-4 lg:p-5">
          <p className="text-xs lg:text-sm text-muted-foreground">Avg Steps</p>
          <p className="text-xl lg:text-2xl font-bold metric-number">{Math.round(measurements.reduce((s, m) => s + m.steps, 0) / measurements.length).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">This period</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
        <Card className="p-4 lg:p-6">
          <h3 className="font-semibold text-sm lg:text-base mb-4">Weight & BMI Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0" }} />
              <Line type="monotone" dataKey="weight" stroke="#0F766E" strokeWidth={2.5} dot={{ r: 4, fill: "#0F766E" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4 lg:p-6">
          <h3 className="font-semibold text-sm lg:text-base mb-4">Daily Steps</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <Tooltip contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0" }} />
              <Bar dataKey="steps" fill="#0F766E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Water & Sleep */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <Card className="p-4 lg:p-6">
          <h3 className="font-semibold text-sm lg:text-base mb-4">Water Intake (L)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94A3B8" />
              <Tooltip contentStyle={{ borderRadius: "0.5rem", border: "1px solid #E2E8F0" }} />
              <Bar dataKey="waterIntake" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4 lg:p-6">
          <h3 className="font-semibold text-sm lg:text-base mb-4">Measurement History</h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {measurements.slice().reverse().map((m) => (
              <div key={m.id} className="flex items-center justify-between text-sm py-2 border-b border-border/50 last:border-0">
                <span className="text-muted-foreground text-xs lg:text-sm">{m.date}</span>
                <div className="flex gap-3 lg:gap-4">
                  <span className="metric-number text-xs lg:text-sm">{m.weight} kg</span>
                  <span className="metric-number text-xs lg:text-sm">{m.steps.toLocaleString()} steps</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Add Measurement Form */}
      {showForm && (
        <Card className="mt-6 p-5 lg:p-6 border-2 border-primary/20">
          <h3 className="font-semibold text-sm lg:text-base mb-4">Log New Measurement</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
            <div>
              <Label className="text-xs lg:text-sm">Weight (kg)</Label>
              <Input value={newData.weight} onChange={(e) => setNewData({ ...newData, weight: e.target.value })} className="mt-1 h-10" placeholder="72.5" />
            </div>
            <div>
              <Label className="text-xs lg:text-sm">Body Fat %</Label>
              <Input value={newData.bodyFat} onChange={(e) => setNewData({ ...newData, bodyFat: e.target.value })} className="mt-1 h-10" placeholder="20.5" />
            </div>
            <div>
              <Label className="text-xs lg:text-sm">Calories</Label>
              <Input value={newData.calories} onChange={(e) => setNewData({ ...newData, calories: e.target.value })} className="mt-1 h-10" placeholder="2400" />
            </div>
            <div>
              <Label className="text-xs lg:text-sm">Steps</Label>
              <Input value={newData.steps} onChange={(e) => setNewData({ ...newData, steps: e.target.value })} className="mt-1 h-10" placeholder="8000" />
            </div>
            <div>
              <Label className="text-xs lg:text-sm">Water (L)</Label>
              <Input value={newData.waterIntake} onChange={(e) => setNewData({ ...newData, waterIntake: e.target.value })} className="mt-1 h-10" placeholder="2.4" />
            </div>
            <div>
              <Label className="text-xs lg:text-sm">Sleep (hrs)</Label>
              <Input value={newData.sleep} onChange={(e) => setNewData({ ...newData, sleep: e.target.value })} className="mt-1 h-10" placeholder="7.5" />
            </div>
          </div>
          <Button onClick={handleAddMeasurement} className="mt-4 bg-primary hover:bg-primary/90 text-white">
            Save Measurement
          </Button>
        </Card>
      )}
    </div>
  );
}
