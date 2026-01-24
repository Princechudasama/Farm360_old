import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useMachinery() {
  return useQuery({
    queryKey: [api.machinery.list.path],
    queryFn: async () => {
      const res = await fetch(api.machinery.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch machinery");
      return api.machinery.list.responses[200].parse(await res.json());
    },
  });
}

export function useMachine(id: number) {
  return useQuery({
    queryKey: [api.machinery.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.machinery.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch machine details");
      return api.machinery.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
