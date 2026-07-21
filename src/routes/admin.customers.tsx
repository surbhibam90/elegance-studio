import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { DEMO_CUSTOMERS } from "@/data/seed";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/admin/customers")({ component: CustomersAdmin });

function CustomersAdmin() {
  return (
    <div className="p-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="eyebrow">Clientele</div>
          <h1 className="font-serif text-4xl mt-2">Customers</h1>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {DEMO_CUSTOMERS.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gold text-white flex items-center justify-center font-serif text-lg">
                {c.name.charAt(0)}
              </div>
              <div>
                <div className="font-serif text-xl">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.id}</div>
              </div>
            </div>
            <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{c.email}</div>
              <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{c.city}</div>
            </div>
            <div className="mt-5 pt-5 border-t border-border grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Orders</div>
                <div className="font-serif text-2xl mt-1">{c.orders}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Spent</div>
                <div className="font-serif text-2xl mt-1 text-gold">{formatINR(c.spent)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
