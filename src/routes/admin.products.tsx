import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Plus, Search, Edit3, Trash2, Eye } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/admin/products")({ component: ProductsAdmin });

function ProductsAdmin() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const list = useMemo(() => PRODUCTS.filter(p =>
    (cat === "all" || p.category === cat) &&
    (!q || (p.name + p.brand + p.code).toLowerCase().includes(q.toLowerCase()))
  ), [q, cat]);

  return (
    <div className="p-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="eyebrow">Catalogue</div>
          <h1 className="font-serif text-4xl mt-2">Products</h1>
        </div>
        <button className="bg-charcoal text-warm px-6 py-3 rounded-full text-xs uppercase tracking-[0.22em] flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border p-5 flex flex-wrap gap-3 items-center">
        <div className="flex items-center bg-secondary rounded-full pl-4 pr-2 flex-1 min-w-64">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products…" className="bg-transparent flex-1 outline-none py-2.5 px-3 text-sm" />
        </div>
        <select value={cat} onChange={e => setCat(e.target.value)} className="bg-secondary rounded-full px-4 py-2.5 text-sm outline-none">
          <option value="all">All categories</option>
          <option value="watches">Watches</option>
          <option value="handbags">Handbags</option>
          <option value="clothing">Clothing</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div className="mt-6 bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <tr>
              {["Product", "Code", "Brand", "Category", "Price", "Stock", "Flags", ""].map(h => (
                <th key={h} className="text-left px-6 py-3 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map(p => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={p.images[0]} className="h-12 w-12 rounded-lg object-cover" alt="" />
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.subcategory}</div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs">{p.code}</td>
                <td className="px-6 py-4">{p.brand}</td>
                <td className="px-6 py-4 capitalize">{p.category}</td>
                <td className="px-6 py-4">{formatINR(p.price)}</td>
                <td className="px-6 py-4">{p.stock}</td>
                <td className="px-6 py-4 flex gap-1 flex-wrap">
                  {p.featured && <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full">FEAT</span>}
                  {p.newArrival && <span className="text-[10px] bg-gold text-white px-2 py-0.5 rounded-full">NEW</span>}
                  {p.bestSeller && <span className="text-[10px] bg-charcoal text-warm px-2 py-0.5 rounded-full">BEST</span>}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 text-muted-foreground">
                    <button><Eye className="h-4 w-4" /></button>
                    <button><Edit3 className="h-4 w-4" /></button>
                    <button className="hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
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
