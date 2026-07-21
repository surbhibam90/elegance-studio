import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/products";
import { REVENUE_SERIES, DEMO_ORDERS } from "@/data/seed";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/admin/analytics")({ component: AnalyticsAdmin });

function AnalyticsAdmin() {
  const max = Math.max(...REVENUE_SERIES.map(r => r.v));
  const topProducts = PRODUCTS.filter(p => p.bestSeller).slice(0, 6);
  return (
    <div className="p-10">
      <div className="eyebrow">Insights</div>
      <h1 className="font-serif text-4xl mt-2 mb-10">Analytics</h1>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="font-serif text-2xl">Monthly revenue</div>
          <div className="mt-6 flex items-end gap-3 h-60">
            {REVENUE_SERIES.map(r => (
              <div key={r.m} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-xs text-muted-foreground">{r.v}k</div>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-gold to-[oklch(0.85_0.06_78)]" style={{ height: `${(r.v / max) * 100}%` }} />
                <span className="text-xs text-muted-foreground">{r.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="font-serif text-2xl">Top selling pieces</div>
          <ul className="mt-5 space-y-3">
            {topProducts.map(p => (
              <li key={p.id} className="flex items-center gap-3">
                <img src={p.images[0]} className="h-12 w-12 rounded-lg object-cover" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.brand}</div>
                </div>
                <div className="text-sm">{formatINR(p.price)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[
          ["Avg. Order Value", formatINR(DEMO_ORDERS.reduce((a, o) => a + o.total, 0) / DEMO_ORDERS.length)],
          ["Conversion Rate", "3.2%"],
          ["Cart Recovery", "42%"],
        ].map(([l, v]) => (
          <div key={l} className="bg-white rounded-2xl border border-border p-6">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{l}</div>
            <div className="font-serif text-3xl mt-2">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
