import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@shared/routes";
import { Sprout, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const { login, register, isLoggingIn, isRegistering } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("login");

  // Login Form
  const loginForm = useForm({
    defaultValues: { username: "", password: "" },
  });

  const onLogin = async (data: any) => {
    try {
      await login(data, {
        onSuccess: () => setLocation("/"),
        onError: (err) => toast({ title: "Login Failed", description: err.message, variant: "destructive" }),
      });
    } catch (e) {
      // Handled in onError
    }
  };

  // Register Form
  const registerForm = useForm({
    resolver: zodResolver(api.auth.register.input),
    defaultValues: { username: "", password: "", govId: "" },
  });

  const onRegister = async (data: any) => {
    try {
      await register(data, {
        onSuccess: () => setLocation("/"),
        onError: (err) => toast({ title: "Registration Failed", description: err.message, variant: "destructive" }),
      });
    } catch (e) {
      // Handled in onError
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Abstract pattern background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 text-center space-y-6 max-w-lg">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto shadow-xl">
            <Sprout className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-display font-bold">Farm360</h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            Empowering Indian Farmers with Smart Technology. Weather, Markets, Machinery, and Manpower - All in one place.
          </p>
        </div>
        
        <div className="absolute bottom-8 text-sm text-primary-foreground/60">
          © 2025 Farm360 | Jai Kisan
        </div>
      </div>

      {/* Right Side - Forms */}
      <div className="flex items-center justify-center p-6 bg-leaf-pattern">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Sprout className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-display font-bold text-primary">Farm360</h1>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoggingIn} className="w-full mt-4 bg-primary hover:bg-primary/90">
                    {isLoggingIn ? <Loader2 className="animate-spin" /> : "Sign In"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="register">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="govId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gov ID (Aadhaar/Kisan Card)</FormLabel>
                        <FormControl><Input {...field} placeholder="XXXX-XXXX-XXXX" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isRegistering} className="w-full mt-4 bg-primary hover:bg-primary/90">
                    {isRegistering ? <Loader2 className="animate-spin" /> : "Create Account"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
