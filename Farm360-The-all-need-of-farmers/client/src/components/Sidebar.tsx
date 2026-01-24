import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Tractor, 
  Users, 
  CloudSun, 
  Sprout, 
  LineChart, 
  LayoutDashboard, 
  LogOut,
  Menu
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Machinery Rental", icon: Tractor, href: "/machinery" },
  { label: "Manpower Booking", icon: Users, href: "/manpower" },
  { label: "Weather & Advisory", icon: CloudSun, href: "/weather" },
  { label: "Yield Prediction", icon: Sprout, href: "/prediction" },
  { label: "Market Prices", icon: LineChart, href: "/prices" },
];

export function Sidebar() {
  const [location] = useLocation();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
            <Sprout className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-primary">Farm360</h1>
            <p className="text-xs text-muted-foreground font-medium">Smart Agriculture</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-secondary/20 hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/50">
        <div className="bg-muted/50 rounded-xl p-4 mb-3">
          <p className="text-xs font-semibold text-foreground">{user?.username || 'Farmer'}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{user?.govId || 'ID Verified'}</p>
        </div>
        <button
          onClick={() => logout()}
          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b z-50 flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <Sprout className="text-primary w-6 h-6" />
          <span className="font-display font-bold text-lg text-primary">Farm360</span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 bottom-0 w-72 bg-card border-r border-border shadow-sm z-40">
        <NavContent />
      </aside>
    </>
  );
}
