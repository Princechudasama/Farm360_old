import { Layout } from "@/components/Layout";
import { useYieldPrediction } from "@/hooks/use-prediction";
import { useState } from "react";
import { Sprout, BarChart, Loader2, MapPin, Leaf } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  crop: z.string().min(1, "Select a crop"),
  area: z.coerce.number().min(0.1, "Area must be greater than 0"),
  location: z.string().min(1, "Location is required"),
});

export default function Prediction() {
  const { mutate, data: result, isPending } = useYieldPrediction();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crop: "",
      area: 0,
      location: "Gujarat",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Layout title="Yield Prediction" description="AI-powered estimates for your harvest.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Form Card */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="crop"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Crop</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder="Select a crop" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Wheat">Wheat</SelectItem>
                        <SelectItem value="Rice">Rice</SelectItem>
                        <SelectItem value="Cotton">Cotton</SelectItem>
                        <SelectItem value="Sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="Maize">Maize</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area (Acres)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Leaf className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                          <Input className="pl-10 h-12 rounded-xl" placeholder="10" type="number" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                          <Input className="pl-10 h-12 rounded-xl" placeholder="District" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full h-12 rounded-xl font-bold text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  "Predict Yield"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Results Section */}
        <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-3xl border border-dashed border-border text-center">
          {result ? (
            <div className="animate-in fade-in zoom-in duration-500 w-full">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sprout className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Estimated Yield</h2>
              <div className="text-5xl font-bold text-primary my-4">{result.predictedYield}</div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-primary rounded-full font-medium text-sm">
                <BarChart className="w-4 h-4" />
                {Math.round(result.confidence * 100)}% Confidence Score
              </div>
              <p className="text-muted-foreground mt-8 max-w-sm mx-auto text-sm">
                *Prediction based on soil type averages and historical weather patterns for {form.getValues('location')}.
              </p>
            </div>
          ) : (
            <div className="text-muted-foreground opacity-50">
              <Sprout className="w-24 h-24 mx-auto mb-4 grayscale" />
              <p>Enter details to see prediction result</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
