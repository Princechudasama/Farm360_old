import { Layout } from "@/components/Layout";
import { useMachinery } from "@/hooks/use-machinery";
import { Tractor, IndianRupee, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Machinery() {
  const { data: machines, isLoading } = useMachinery();

  if (isLoading) return <Layout title="Machinery Rental"><div className="animate-pulse">Loading...</div></Layout>;

  return (
    <Layout title="Machinery Rental" description="Modern equipment available for rent near you.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines?.map((machine, idx) => (
          <motion.div
            key={machine.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-48 overflow-hidden relative">
              {/* Unsplash tractor/machinery image placeholder */}
              <img 
                src={machine.imageUrl || "https://images.unsplash.com/photo-1592860682121-655b376d3381?w=800&q=80"} 
                alt={machine.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-3 h-3" /> Available
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{machine.name}</h3>
                  <p className="text-muted-foreground text-sm">{machine.type}</p>
                </div>
                <div className="bg-secondary/20 p-2 rounded-lg text-secondary-foreground">
                  <Tractor className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Daily Rent</span>
                  <div className="flex items-center text-primary font-bold text-lg">
                    <IndianRupee className="w-4 h-4 mr-0.5" />
                    {machine.dailyRent}
                  </div>
                </div>
                <button 
                  onClick={() => alert("Booking feature coming soon!")}
                  className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
}
