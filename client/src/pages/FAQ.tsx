import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const faqs = [
  {
    question: "How does FitLife AI personalize workouts?",
    answer: "FitLife AI analyzes your fitness level, goals, available equipment, and medical conditions during your body assessment. It then generates customized exercise plans with specific sets, reps, rest times, and safety tips tailored to your unique profile. The AI adjusts your plan daily based on your progress and feedback.",
  },
  {
    question: "Can I use FitLife AI if I have injuries or medical conditions?",
    answer: "Yes! During your body assessment, you can specify any injuries, medical conditions, or physical limitations. The AI will automatically adjust your workout plans to avoid exercises that could aggravate your condition. However, we always recommend consulting your physician before starting any new fitness program.",
  },
  {
    question: "What dietary preferences does the meal planner support?",
    answer: "We support vegetarian, vegan, keto, high-protein, diabetic-friendly, and low-sodium meal plans. You can select your preferred diet type during setup, and the AI will generate weekly meal plans with complete macro breakdowns and shopping lists.",
  },
  {
    question: "How accurate are the calorie and macro calculations?",
    answer: "Our calculations use scientifically-backed formulas (Mifflin-St Jeor for BMR, Harris-Benedict for daily calories) adjusted for your activity level. While these are estimates, they are widely used in clinical and fitness settings. For the most accurate results, track your weight over 2-4 weeks and adjust accordingly.",
  },
  {
    question: "Can I sync FitLife AI with my fitness tracker?",
    answer: "We're working on integrations with popular fitness trackers. Currently, you can manually log your steps, workouts, and body measurements. This data feeds directly into your progress charts and AI recommendations.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! Start with our free tier which includes the BMI calculator, basic daily tasks, and limited sample workouts. You can upgrade to Pro anytime for full access to AI fitness plans, personalized diet plans, and progress analytics.",
  },
  {
    question: "How does the gamification system work?",
    answer: "You earn XP for completing daily tasks, workouts, and logging meals. Accumulate XP to level up, unlock badges, and maintain streaks. The more consistent you are, the more achievements you unlock. Our leaderboard lets you compare progress with other members.",
  },
  {
    question: "Is my data private and secure?",
    answer: "Absolutely. Your health data is encrypted and stored securely. We never share your personal information with third parties. You can export or delete your data at any time from your profile settings.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-20 pb-12 container max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mt-2">Everything you need to know about FitLife AI</p>
        </div>

        <Card className="p-2">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left px-4 font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground mb-4">Still have questions?</p>
          <Link href="/register">
            <span className="text-primary font-medium hover:underline">Start your free trial and explore →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
