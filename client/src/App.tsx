import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { FitnessProvider } from "./contexts/FitnessContext";
import AppShell from "./components/AppShell";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import WorkoutPlans from "./pages/WorkoutPlans";
import DietPlanner from "./pages/DietPlanner";
import BMICalculator from "./pages/BMICalculator";
import Achievements from "./pages/Achievements";
import Progress from "./pages/Progress";
import DailyTasks from "./pages/DailyTasks";
import Assessment from "./pages/Assessment";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";

// Protected wrapper that uses the AppShell layout
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/faq" component={FAQ} />
      <Route path="/bmi-calculator" component={BMICalculator} />
      <Route path="/dashboard">
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      </Route>
      <Route path="/profile">
        <ProtectedRoute><Profile /></ProtectedRoute>
      </Route>
      <Route path="/workouts">
        <ProtectedRoute><WorkoutPlans /></ProtectedRoute>
      </Route>
      <Route path="/diet">
        <ProtectedRoute><DietPlanner /></ProtectedRoute>
      </Route>
      <Route path="/achievements">
        <ProtectedRoute><Achievements /></ProtectedRoute>
      </Route>
      <Route path="/progress">
        <ProtectedRoute><Progress /></ProtectedRoute>
      </Route>
      <Route path="/tasks">
        <ProtectedRoute><DailyTasks /></ProtectedRoute>
      </Route>
      <Route path="/assessment">
        <ProtectedRoute><Assessment /></ProtectedRoute>
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <FitnessProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </FitnessProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
