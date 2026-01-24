import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorClass?: string;
  delay?: number;
}

export function StatCard({ title, value, subtitle, icon: Icon, colorClass = "text-primary", delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-display font-bold text-foreground">{value}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>}
        </div>
        <div className={cn("p-3 rounded-xl bg-muted/50 group-hover:bg-primary/10 transition-colors", colorClass)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
