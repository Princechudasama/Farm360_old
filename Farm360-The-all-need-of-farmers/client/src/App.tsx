import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";
import Machinery from "@/pages/Machinery";
import Manpower from "@/pages/Manpower";
import Weather from "@/pages/Weather";
import Prediction from "@/pages/Prediction";
import Prices from "@/pages/Prices";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return <Component {...rest} />;
}

function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/auth">
        {user ? <Redirect to="/" /> : <AuthPage />}
      </Route>
      
      <Route path="/">
        {user ? <Dashboard /> : <Redirect to="/auth" />}
      </Route>

      <Route path="/machinery">
        {() => user ? <Machinery /> : <Redirect to="/auth" />}
      </Route>

      <Route path="/manpower">
        {() => user ? <Manpower /> : <Redirect to="/auth" />}
      </Route>

      <Route path="/weather">
        {() => user ? <Weather /> : <Redirect to="/auth" />}
      </Route>

      <Route path="/prediction">
        {() => user ? <Prediction /> : <Redirect to="/auth" />}
      </Route>

      <Route path="/prices">
        {() => user ? <Prices /> : <Redirect to="/auth" />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
