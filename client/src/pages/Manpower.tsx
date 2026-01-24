import { Layout } from "@/components/Layout";
import { useManpower } from "@/hooks/use-manpower";
import { Users, IndianRupee, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Manpower() {
  const { data: manpower, isLoading } = useManpower();

  if (isLoading) return <Layout title="Manpower Booking"><div className="animate-pulse">Loading...</div></Layout>;

  return (
    <Layout title="Manpower Booking" description="Skilled agricultural labor ready for hire.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {manpower?.map((person, idx) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16 border-2 border-background shadow-md">
                <AvatarImage src={`https://api.dicebear.com/7.x/micah/svg?seed=${person.name}`} />
                <AvatarFallback>{person.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg text-foreground leading-tight">{person.name}</h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mt-1">
                  <Users className="w-3 h-3" />
                  {person.role}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="w-4 h-4 mr-3 text-secondary fill-secondary" />
                {person.experience} Experience
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-3 text-muted-foreground" />
                {person.location || "Local Area"}
              </div>
              <div className="flex items-center text-sm font-medium text-foreground">
                <IndianRupee className="w-4 h-4 mr-3 text-foreground" />
                ₹{person.dailyRate} / Day
              </div>
            </div>

            <button className="w-full mt-6 py-2.5 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-200">
              Contact
            </button>
          </motion.div>
        ))}
      </div>
    </Layout>
  );
}
