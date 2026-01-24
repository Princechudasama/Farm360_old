import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useMarketPrices() {
  return useQuery({
    queryKey: [api.prices.list.path],
    queryFn: async () => {
      const res = await fetch(api.prices.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch prices");
      return api.prices.list.responses[200].parse(await res.json());
    },
  });
}
