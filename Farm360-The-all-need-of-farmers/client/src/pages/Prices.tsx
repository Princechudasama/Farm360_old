import { Layout } from "@/components/Layout";
import { useMarketPrices } from "@/hooks/use-prices";
import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Prices() {
  const { data: prices, isLoading } = useMarketPrices();

  if (isLoading) return <Layout title="Market Prices"><div className="animate-pulse">Loading prices...</div></Layout>;

  return (
    <Layout title="Market Prices" description="Real-time mandi prices across India.">
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-muted-foreground text-sm">Crop</th>
                <th className="text-left py-4 px-6 font-semibold text-muted-foreground text-sm">Market</th>
                <th className="text-right py-4 px-6 font-semibold text-muted-foreground text-sm">Price (₹/Qt)</th>
                <th className="text-center py-4 px-6 font-semibold text-muted-foreground text-sm">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {prices?.map((item, idx) => (
                <tr key={idx} className="hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-6 font-medium text-foreground">{item.crop}</td>
                  <td className="py-4 px-6 text-muted-foreground">{item.market}</td>
                  <td className="py-4 px-6 text-right font-bold font-mono text-lg">₹{item.price}</td>
                  <td className="py-4 px-6">
                    <div className={cn(
                      "flex items-center justify-center gap-1 text-sm font-medium w-fit mx-auto px-2.5 py-1 rounded-full",
                      item.trend === 'up' && "bg-green-100 text-green-700",
                      item.trend === 'down' && "bg-red-100 text-red-700",
                      item.trend === 'stable' && "bg-gray-100 text-gray-700"
                    )}>
                      {item.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
                      {item.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
                      {item.trend === 'stable' && <Minus className="w-3.5 h-3.5" />}
                      <span className="capitalize">{item.trend}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline font-medium">
          View full market report <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </Layout>
  );
}
