import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { CATEGORIES } from "@/data/seed";
import { byCategory } from "@/data/products";

export const Route = createFileRoute("/admin/categories")({ component: CategoriesAdmin });

function CategoriesAdmin() {
  return (
    <div className="p-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="eyebrow">Merchandising</div>
          <h1 className="font-serif text-4xl mt-2">Categories</h1>
        </div>
        <button className="bg-charcoal text-warm px-6 py-3 rounded-full text-xs uppercase tracking-[0.22em] flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {CATEGORIES.map((c, i) => {
          const products = byCategory(c.slug as never);
          return (
            <div key={c.slug} className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="aspect-video bg-secondary">
                <img src={products[0]?.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground">#{i + 1}</div>
                <div className="font-serif text-xl mt-1">{c.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.tagline}</div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs">{products.length} products</span>
                  <div className="flex gap-2 text-muted-foreground">
                    <button><Edit3 className="h-4 w-4" /></button>
                    <button className="hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
