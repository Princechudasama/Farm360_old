import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useManpower() {
  return useQuery({
    queryKey: [api.manpower.list.path],
    queryFn: async () => {
      const res = await fetch(api.manpower.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch manpower");
      return api.manpower.list.responses[200].parse(await res.json());
    },
  });
}
