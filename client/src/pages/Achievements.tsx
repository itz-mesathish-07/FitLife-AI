/*
 * Design: Kinetic Vitality — Achievements
 * - Uses AppShell for sidebar/mobile nav
 * - Badge grid + streak tracking
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useFitness } from "@/contexts/FitnessContext";

export default function Achievements() {
  const { achievements } = useFitness();
  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="p-4 lg:p-6">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground mt-1 text-sm lg:text-base">Unlock badges, earn XP, build your streak</p>
        </div>
        <div className="text-right">
          <p className="text-xl lg:text-2xl font-bold metric-number" style={{ color: "#0F766E" }}>{unlocked}/{achievements.length}</p>
          <p className="text-sm text-muted-foreground">Unlocked</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement, i) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
          >
            <Card className={`p-5 lg:p-6 text-center transition-all ${
              achievement.unlocked
                ? "hover:shadow-lg hover:-translate-y-1 border-amber-200 bg-gradient-to-b from-amber-50 to-white"
                : "opacity-60 border-border"
            }`}>
              <div className="text-3xl lg:text-4xl mb-3">{achievement.icon}</div>
              <h3 className="font-bold mb-1 text-sm lg:text-base">{achievement.name}</h3>
              <p className="text-xs lg:text-sm text-muted-foreground mb-3">{achievement.description}</p>
              <div className="flex items-center justify-center gap-2">
                {achievement.unlocked ? (
                  <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                    +{achievement.xp} XP
                  </span>
                ) : (
                  <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Streak Info */}
      <Card className="mt-8 p-5 lg:p-6 bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200/50">
        <h3 className="font-bold text-base lg:text-lg mb-4">Your Streaks</h3>
        <div className="grid grid-cols-3 gap-4 lg:gap-6">
          <div className="text-center">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-2">
              <span className="text-xl lg:text-2xl">🔥</span>
            </div>
            <p className="font-bold text-base lg:text-lg metric-number">12</p>
            <p className="text-xs lg:text-sm text-muted-foreground">Daily Streak</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
              <span className="text-xl lg:text-2xl">📅</span>
            </div>
            <p className="font-bold text-base lg:text-lg metric-number">2</p>
            <p className="text-xs lg:text-sm text-muted-foreground">Weekly Streak</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
              <span className="text-xl lg:text-2xl">🏆</span>
            </div>
            <p className="font-bold text-base lg:text-lg metric-number">1</p>
            <p className="text-xs lg:text-sm text-muted-foreground">Monthly Streak</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
