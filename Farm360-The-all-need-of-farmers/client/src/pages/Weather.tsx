import { Layout } from "@/components/Layout";
import { useWeather } from "@/hooks/use-weather";
import { CloudSun, Wind, Droplets, MapPin, CalendarDays } from "lucide-react";
import { format } from "date-fns";

export default function Weather() {
  const { data: weather, isLoading } = useWeather("Gujarat, India");

  if (isLoading) return <Layout title="Weather"><div className="animate-pulse">Loading weather data...</div></Layout>;

  return (
    <Layout title="Weather & Advisory" description="Hyper-local forecasts for better planning.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Weather Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-2 text-blue-100 mb-2">
                  <MapPin className="w-4 h-4" />
                  {weather?.location}
                </div>
                <h2 className="text-6xl md:text-7xl font-bold font-display tracking-tight">
                  {weather?.temp}°
                </h2>
                <p className="text-xl text-blue-100 mt-2 font-medium">{weather?.condition}</p>
                <p className="text-sm text-blue-200 mt-1">{format(new Date(), 'EEEE, d MMMM')}</p>
              </div>
              
              <CloudSun className="w-32 h-32 text-yellow-300 drop-shadow-2xl" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2.5 rounded-lg">
                  <Wind className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-blue-200">Wind</p>
                  <p className="font-bold text-lg">{weather?.windSpeed} km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2.5 rounded-lg">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-blue-200">Humidity</p>
                  <p className="font-bold text-lg">{weather?.humidity}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <div>
            <h3 className="font-display font-bold text-xl mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {weather?.forecast.map((day, idx) => (
                <div key={idx} className="bg-card p-4 rounded-2xl border border-border text-center hover:shadow-md transition-shadow">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{day.day}</p>
                  <CloudSun className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="font-bold text-lg">{day.temp}°</p>
                  <p className="text-xs text-muted-foreground">{day.condition}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advisory Sidebar */}
        <div className="bg-green-50 rounded-3xl p-8 border border-green-100 h-fit">
          <h3 className="text-primary font-bold font-display text-xl mb-6 flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Crop Advisory
          </h3>
          <div className="prose prose-sm prose-green">
            <p className="text-foreground/80 leading-relaxed font-medium">
              {weather?.advisory}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-primary flex-shrink-0"></span>
                Check irrigation channels for blockage.
              </li>
              <li className="flex items-start gap-2">
                <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-primary flex-shrink-0"></span>
                Apply urea in split doses if rain is expected.
              </li>
              <li className="flex items-start gap-2">
                <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-primary flex-shrink-0"></span>
                Monitor for pest attacks due to high humidity.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
