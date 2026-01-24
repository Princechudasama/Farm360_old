import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useWeather(location?: string) {
  return useQuery({
    queryKey: [api.weather.get.path, location],
    queryFn: async () => {
      // Default to "Delhi, India" if no location provided for now
      const queryLocation = location || "Delhi";
      const res = await fetch(`${api.weather.get.path}?location=${encodeURIComponent(queryLocation)}`, { 
        credentials: "include" 
      });
      if (!res.ok) throw new Error("Failed to fetch weather");
      return api.weather.get.responses[200].parse(await res.json());
    },
  });
}
