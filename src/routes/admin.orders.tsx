import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Printer, Download } from "lucide-react";
import { DEMO_ORDERS } from "@/data/seed";
import { formatINR, whatsappUrl } from "@/lib/utils";

export const Route = createFileRoute("/admin/orders")({ component: OrdersAdmin });

const STATUSES = ["Pending", "Confirmed", "Packed", "Delivered", "Cancelled"] as const;

function OrdersAdmin() {
  return (
    <div className="p-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="eyebrow">Fulfilment</div>
          <h1 className="font-serif text-4xl mt-2">Orders</h1>
        </div>
        <button className="glass rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.22em] flex items-center gap-2 border border-border">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <tr>
              {["Order", "Customer", "Items", "Total", "Channel", "Status", "Date", "Actions"].map(h => (
                <th key={h} className="text-left px-6 py-3 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO_ORDERS.map(o => (
              <tr key={o.id} className="border-t border-border">
                <td className="px-6 py-4 font-mono text-xs">{o.id}</td>
                <td className="px-6 py-4">{o.customer}</td>
                <td className="px-6 py-4">{o.items}</td>
                <td className="px-6 py-4 font-medium">{formatINR(o.total)}</td>
                <td className="px-6 py-4"><span className="text-xs px-2.5 py-1 rounded-full bg-secondary">{o.channel}</span></td>
                <td className="px-6 py-4">
                  <select defaultValue={o.status} className="text-xs bg-transparent border border-border rounded-full px-3 py-1">
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{o.date}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 text-muted-foreground">
                    <a href={whatsappUrl(`Update on order ${o.id}: `)} target="_blank" rel="noreferrer" className="hover:text-gold"><MessageCircle className="h-4 w-4" /></a>
                    <button className="hover:text-gold"><Printer className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
