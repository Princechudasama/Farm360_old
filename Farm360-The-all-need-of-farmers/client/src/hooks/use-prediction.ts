import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

type PredictInput = z.infer<typeof api.prediction.predict.input>;

export function useYieldPrediction() {
  return useMutation({
    mutationFn: async (data: PredictInput) => {
      const res = await fetch(api.prediction.predict.path, {
        method: api.prediction.predict.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Prediction failed");
      return api.prediction.predict.responses[200].parse(await res.json());
    },
  });
}
