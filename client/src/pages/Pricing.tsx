import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Get started with the basics",
    features: [
      { text: "BMI Calculator", included: true },
      { text: "Basic Daily Tasks", included: true },
      { text: "3 Sample Workouts", included: true },
      { text: "AI Fitness Plans", included: false },
      { text: "Personalized Diet Plans", included: false },
      { text: "Progress Analytics", included: false },
      { text: "Achievements & Gamification", included: false },
      { text: "Body Assessment", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Everything you need to transform",
    features: [
      { text: "Everything in Free", included: true },
      { text: "AI Fitness Plans", included: true },
      { text: "Personalized Diet Plans", included: true },
      { text: "Progress Analytics", included: true },
      { text: "Achievements & Gamification", included: true },
      { text: "Body Assessment", included: true },
      { text: "Weekly Meal Planner", included: true },
      { text: "Shopping Lists", included: true },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Elite",
    price: "$19.99",
    period: "/month",
    description: "For serious athletes and coaches",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "1-on-1 AI Coaching", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Video Exercise Library", included: true },
      { text: "Voice Guidance", included: true },
      { text: "PDF Progress Reports", included: true },
      { text: "CSV Export", included: true },
      { text: "Priority Support", included: true },
    ],
    cta: "Start Free Trial",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-20 pb-12 container max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Simple Pricing</h1>
          <p className="text-muted-foreground text-lg">Start free, upgrade anytime. 30-day money-back guarantee.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Card className={`p-8 h-full flex flex-col relative ${plan.popular ? "border-2 border-primary shadow-lg" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold metric-number">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>

                <div className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <div key={f.text} className="flex items-center gap-3">
                      {f.included ? (
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${f.included ? "" : "text-muted-foreground line-through"}`}>{f.text}</span>
                    </div>
                  ))}
                </div>

                <Link href="/register">
                  <Button className={`w-full h-11 ${plan.popular ? "bg-primary hover:bg-primary/90 text-white" : "bg-white border-2 border-primary text-primary hover:bg-primary/5"}`}>
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto">
          This application is intended for educational and fitness guidance purposes only. It is NOT medical advice. Always consult a qualified physician before beginning any exercise or diet program.
        </p>
      </div>
    </div>
  );
}
