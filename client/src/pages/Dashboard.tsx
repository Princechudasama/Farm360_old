import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { useAuth } from "@/hooks/use-auth";
import { useWeather } from "@/hooks/use-weather";
import { useMarketPrices } from "@/hooks/use-prices";
import { Tractor, Users, CloudSun, TrendingUp, IndianRupee } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: weather } = useWeather("Gujarat, India");
  const { data: prices } = useMarketPrices();

  // Find wheat price as example
  const wheatPrice = prices?.find(p => p.crop.toLowerCase().includes("wheat"))?.price || 2400;

  return (
    <Layout 
      title={`Namaste, ${user?.username || 'Farmer'}!`} 
      description="Here is what's happening on your farm today."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link href="/weather" className="block">
          <StatCard 
            title="Weather Today" 
            value={`${weather?.temp ?? '--'}°C`}
            subtitle={weather?.condition || "Loading..."}
            icon={CloudSun}
            colorClass="text-secondary"
            delay={1}
          />
        </Link>
        <Link href="/prices" className="block">
          <StatCard 
            title="Market Trend" 
            value={`₹${wheatPrice}/qt`}
            subtitle="Wheat (Avg)"
            icon={IndianRupee}
            colorClass="text-green-600"
            delay={2}
          />
        </Link>
        <Link href="/machinery" className="block">
          <StatCard 
            title="Active Rentals" 
            value="0"
            subtitle="No active bookings"
            icon={Tractor}
            colorClass="text-blue-500"
            delay={3}
          />
        </Link>
        <Link href="/prediction" className="block">
          <StatCard 
            title="Yield Forecast" 
            value="Good"
            subtitle="Based on recent rain"
            icon={TrendingUp}
            colorClass="text-purple-500"
            delay={4}
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions Card */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
          <h3 className="font-display font-bold text-xl mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/machinery">
              <div className="p-4 rounded-xl bg-green-50 hover:bg-green-100 border border-green-100 cursor-pointer transition-colors group">
                <Tractor className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-semibold text-foreground">Rent Machinery</div>
                <div className="text-xs text-muted-foreground mt-1">Book tractors & tools</div>
              </div>
            </Link>
            <Link href="/manpower">
              <div className="p-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-100 cursor-pointer transition-colors group">
                <Users className="w-8 h-8 text-amber-600 mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-semibold text-foreground">Hire Manpower</div>
                <div className="text-xs text-muted-foreground mt-1">Find skilled labor</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Advisory Card */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white shadow-lg shadow-primary/20">
          <h3 className="font-display font-bold text-xl mb-2 flex items-center gap-2">
            <CloudSun className="w-5 h-5" />
            Daily Advisory
          </h3>
          <p className="text-primary-foreground/90 text-sm leading-relaxed mt-4">
            {weather?.advisory || "Weather data loading... Stay hydrated and monitor crop moisture levels."}
          </p>
          <div className="mt-6 flex gap-4">
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm flex-1">
              <div className="text-xs text-white/70">Humidity</div>
              <div className="font-bold text-lg">{weather?.humidity ?? '--'}%</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm flex-1">
              <div className="text-xs text-white/70">Wind Speed</div>
              <div className="font-bold text-lg">{weather?.windSpeed ?? '--'} km/h</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
