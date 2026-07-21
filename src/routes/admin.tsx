import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, FolderTree, ShoppingBag, Users, Key, Settings, LineChart, Lock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV: Array<{ to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }> = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: FolderTree },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/passwords", label: "Passwords", icon: Key },
  { to: "/admin/analytics", label: "Analytics", icon: LineChart },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Luxora" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-[oklch(0.97_0.005_80)] flex">
      <aside className="w-64 bg-charcoal text-warm flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-serif">Luxora</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold mt-1">Admin</span>
        </div>
        <nav className="mt-10 flex-1 space-y-1">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: !!n.exact }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors",
                  active ? "bg-gold text-charcoal" : "text-warm/70 hover:bg-white/5 hover:text-warm"
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <Link to="/" className="mt-6 flex items-center gap-2 text-xs text-warm/60 hover:text-warm">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to boutique
        </Link>
        <div className="mt-6 glass-dark rounded-xl p-4 text-xs text-warm/60 flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 text-gold" /> Demo admin — no auth
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
