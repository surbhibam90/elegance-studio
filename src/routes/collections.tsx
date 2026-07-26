import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { z } from "zod";
import { PRODUCTS, type Category } from "@/data/products";
import { CATEGORIES } from "@/data/seed";
import { ProductCard } from "@/components/product/ProductCard";

const searchSchema = z.object({
  q: z.string().optional(),
  cat: z.string().optional(),
  brand: z.string().optional(),
  sort: z.enum(["featured", "newest", "price-asc", "price-desc", "rating"]).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
});

export const Route = createFileRoute("/collections")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Collections — Luxora" },
      { name: "description", content: "Browse the full Luxora catalogue of luxury watches, handbags and clothing." },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const search = useSearch({ from: "/collections" });
  const [q, setQ] = useState(search.q ?? "");
  const [cat, setCat] = useState<string>(search.cat ?? "all");
  const [brand, setBrand] = useState<string>(search.brand ?? "all");
  const [sort, setSort] = useState(search.sort ?? "featured");
  const [range, setRange] = useState<[number, number]>([search.min ?? 0, search.max ?? 1500000]);
  const [showFilters, setShowFilters] = useState(false);

  const brands = useMemo(() => Array.from(new Set(PRODUCTS.filter((p) => p.category !== "private").map((p) => p.brand))), []);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.category !== "private");
    if (q) list = list.filter((p) => (p.name + p.brand).toLowerCase().includes(q.toLowerCase()));
    if (cat !== "all") list = list.filter((p) => p.category === (cat as Category));
    if (brand !== "all") list = list.filter((p) => p.brand === brand);
    list = list.filter((p) => p.price >= range[0] && p.price <= range[1]);
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "newest": list = [...list].sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival)); break;
      default: list = [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return list;
  }, [q, cat, brand, sort, range]);

  return (
    <div className="pt-32 pb-24">
      <div className="container-lux">
        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <Link to="/">Home</Link> / Collections {cat !== "all" && `/ ${CATEGORIES.find((c) => c.slug === cat)?.name}`}
        </div>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">The catalogue</div>
            <h1 className="font-serif text-5xl md:text-6xl mt-2">Collections</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="glass rounded-full flex items-center pl-5 pr-2 py-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search maison…" className="bg-transparent outline-none text-sm px-3 py-2 w-48" />
            </div>
            <button onClick={() => setShowFilters((v) => !v)} className="glass rounded-full px-5 py-3 text-xs uppercase tracking-[0.22em] flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value as never)} className="glass rounded-full px-5 py-3 text-xs uppercase tracking-[0.22em] outline-none">
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-8">
          <Chip active={cat === "all"} onClick={() => setCat("all")}>All</Chip>
          {CATEGORIES.filter((c) => c.slug !== "private").map((c) => (
            <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)}>{c.name}</Chip>
          ))}
        </div>

        {showFilters && (
          <div className="mt-6 glass rounded-2xl p-6 grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-gold mb-3">Brand</div>
              <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full bg-transparent border border-border rounded-full px-4 py-2.5 text-sm">
                <option value="all">All Maisons</option>
                {brands.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-gold mb-3">Price range</div>
              <input type="range" min={0} max={1500000} step={10000} value={range[1]} onChange={(e) => setRange([range[0], Number(e.target.value)])} className="w-full accent-[var(--gold)]" />
              <div className="text-xs text-muted-foreground mt-2">Up to ₹{(range[1] / 1000).toFixed(0)}k</div>
            </div>
            <div className="flex items-end">
              <button onClick={() => { setBrand("all"); setRange([0, 1500000]); setQ(""); }} className="text-xs uppercase tracking-[0.22em] text-muted-foreground flex items-center gap-2">
                <X className="h-3.5 w-3.5" /> Clear filters
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 text-xs text-muted-foreground">{filtered.length} pieces</div>

        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-serif text-3xl">Nothing matches — yet.</p>
            <p className="text-muted-foreground mt-3">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.22em] border transition-all ${
        active ? "bg-charcoal text-warm border-charcoal" : "border-border hover:border-gold hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}
