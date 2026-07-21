import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, ShoppingBag, Users, Package, IndianRupee } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { DEMO_ORDERS, DEMO_CUSTOMERS, REVENUE_SERIES } from "@/data/seed";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const revenue = DEMO_ORDERS.reduce((a, o) => a + o.total, 0);
  const pending = DEMO_ORDERS.filter((o) => o.status === "Pending").length;
  const stats = [
    { label: "Revenue (30d)", value: formatINR(revenue), change: "+18.2%", icon: IndianRupee },
    { label: "Orders", value: DEMO_ORDERS.length, change: "+12.4%", icon: ShoppingBag },
    { label: "Customers", value: DEMO_CUSTOMERS.length, change: "+6.1%", icon: Users },
    { label: "Products", value: PRODUCTS.length, change: "48 active", icon: Package },
  ];

  const max = Math.max(...REVENUE_SERIES.map((r) => r.v));

  return (
    <div className="p-10">
      <div className="flex items-end justify-between">
        <div>
          <div className="eyebrow">Overview</div>
          <h1 className="font-serif text-4xl mt-2">Dashboard</h1>
        </div>
        <div className="text-sm text-muted-foreground">Last 30 days · Live demo data</div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mt-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-gold">
                <s.icon className="h-4 w-4" />
              </div>
              <span className="text-xs text-gold flex items-center gap-1"><TrendingUp className="h-3 w-3" />{s.change}</span>
            </div>
            <div className="mt-6 font-serif text-3xl">{s.value}</div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr] mt-8">
        <div className="bg-white rounded-2xl p-6 border border-border">
          <div className="flex justify-between items-center">
            <div className="font-serif text-2xl">Revenue trend</div>
            <div className="text-xs text-gold">+22% MoM</div>
          </div>
          <div className="mt-6 flex items-end gap-4 h-56">
            {REVENUE_SERIES.map((r) => (
              <div key={r.m} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-gold to-[oklch(0.85_0.06_78)]" style={{ height: `${(r.v / max) * 100}%` }} />
                <span className="text-xs text-muted-foreground">{r.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border">
          <div className="font-serif text-2xl">Order status</div>
          <div className="mt-6 space-y-4 text-sm">
            {[
              ["Pending", pending, "bg-amber-500"],
              ["Confirmed", DEMO_ORDERS.filter((o) => o.status === "Confirmed").length, "bg-blue-500"],
              ["Packed", DEMO_ORDERS.filter((o) => o.status === "Packed").length, "bg-indigo-500"],
              ["Delivered", DEMO_ORDERS.filter((o) => o.status === "Delivered").length, "bg-green-500"],
            ].map(([label, n, cls]) => (
              <div key={label as string}>
                <div className="flex justify-between text-xs mb-1"><span>{label}</span><span>{n as number}</span></div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full ${cls as string}`} style={{ width: `${((n as number) / DEMO_ORDERS.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border font-serif text-2xl">Recent orders</div>
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <tr>
              {["Order", "Customer", "Items", "Total", "Channel", "Status", "Date"].map((h) => (
                <th key={h} className="text-left px-6 py-3 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO_ORDERS.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="px-6 py-4 font-mono text-xs">{o.id}</td>
                <td className="px-6 py-4">{o.customer}</td>
                <td className="px-6 py-4">{o.items}</td>
                <td className="px-6 py-4">{formatINR(o.total)}</td>
                <td className="px-6 py-4"><span className="text-xs px-2.5 py-1 rounded-full bg-secondary">{o.channel}</span></td>
                <td className="px-6 py-4"><span className="text-xs">{o.status}</span></td>
                <td className="px-6 py-4 text-muted-foreground">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
