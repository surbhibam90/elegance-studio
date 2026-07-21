import { createFileRoute, Link, useParams, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShoppingBag, Share2, MessageCircle, Star, Truck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { getProduct, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { useCart, useWishlist } from "@/store";
import { formatINR, whatsappUrl, cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} — Luxora` },
      { name: "description", content: loaderData?.description.slice(0, 155) ?? "" },
      { property: "og:image", content: loaderData?.images[0] ?? "" },
    ],
  }),
  notFoundComponent: () => <div className="pt-40 text-center font-serif text-4xl">Piece not found</div>,
  component: PDP,
});

function PDP() {
  const { id } = useParams({ from: "/product/$id" });
  const product = getProduct(id)!;
  const [img, setImg] = useState(0);
  const [tab, setTab] = useState<"desc" | "specs" | "ship">("desc");
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes?.[2]);
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => s.ids.includes(product.id));

  const waMsg = `Hello Luxora, I'm interested in the ${product.name} (${product.code}). Could you share availability?`;

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-28 pb-24">
      <div className="container-lux">
        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground mb-8">
          <Link to="/">Home</Link> / <Link to="/collections">Collections</Link> / {product.name}
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <motion.div layout className="aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
              <img src={product.images[img]} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((src, i) => (
                  <button key={i} onClick={() => setImg(i)} className={cn("aspect-square w-20 rounded-lg overflow-hidden border-2 transition", i === img ? "border-gold" : "border-transparent")}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="eyebrow">{product.brand}</div>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl">{product.name}</h1>
            <div className="mt-2 text-xs text-muted-foreground">Ref. {product.code}</div>
            <div className="mt-2 flex items-center gap-1 text-gold text-sm">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={cn("h-3.5 w-3.5", i < Math.floor(product.rating) && "fill-current")} />)}
              <span className="text-muted-foreground text-xs ml-2">{product.rating.toFixed(1)} · {product.reviews} reviews</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <div className="font-serif text-4xl">{formatINR(product.price)}</div>
              {product.compareAt && <div className="text-muted-foreground line-through">{formatINR(product.compareAt)}</div>}
            </div>

            <p className="mt-6 text-[15px] text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-8 space-y-5">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-3">Colour</div>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button key={c} onClick={() => setColor(c)} className={cn("h-9 w-9 rounded-full border-2 transition", color === c ? "border-gold scale-110" : "border-border")} style={{ background: c }} />
                  ))}
                </div>
              </div>
              {product.sizes && (
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-3">Size</div>
                  <div className="flex gap-2">
                    {product.sizes.map((s) => (
                      <button key={s} onClick={() => setSize(s)} className={cn("h-11 min-w-11 px-4 rounded-full border text-sm transition", size === s ? "border-gold bg-gold text-white" : "border-border hover:border-gold")}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <button onClick={() => add(product, { color, size })} className="flex-1 min-w-[200px] bg-charcoal text-warm py-4 rounded-full text-xs uppercase tracking-[0.24em] hover:bg-gold transition-colors flex items-center justify-center gap-2">
                <ShoppingBag className="h-4 w-4" /> Add to Bag
              </button>
              <a href={whatsappUrl(waMsg)} target="_blank" rel="noreferrer" className="flex-1 min-w-[200px] glass py-4 rounded-full text-xs uppercase tracking-[0.24em] flex items-center justify-center gap-2 hover:bg-white transition-colors">
                <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
              </a>
              <button onClick={() => toggle(product.id)} className={cn("h-14 w-14 glass rounded-full flex items-center justify-center", wished && "text-destructive")}>
                <Heart className={cn("h-4 w-4", wished && "fill-current")} />
              </button>
              <button className="h-14 w-14 glass rounded-full flex items-center justify-center">
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-gold" /> Complimentary delivery in 3–5 days</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Authenticity guaranteed</div>
            </div>

            <div className="mt-12 border-t border-border">
              <div className="flex gap-8 pt-6 text-xs uppercase tracking-[0.22em]">
                {(["desc", "specs", "ship"] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)} className={cn("pb-3 border-b-2 transition-colors", tab === t ? "border-gold text-gold" : "border-transparent text-muted-foreground")}>
                    {t === "desc" ? "Description" : t === "specs" ? "Specifications" : "Shipping"}
                  </button>
                ))}
              </div>
              <div className="py-6 text-sm text-muted-foreground leading-relaxed">
                {tab === "desc" && <p>{product.description}</p>}
                {tab === "specs" && (
                  <ul className="space-y-2">
                    <li><span className="text-foreground">Material:</span> {product.material}</li>
                    <li><span className="text-foreground">Brand:</span> {product.brand}</li>
                    <li><span className="text-foreground">Reference:</span> {product.code}</li>
                    <li><span className="text-foreground">Stock:</span> {product.stock} in atelier</li>
                  </ul>
                )}
                {tab === "ship" && <p>Complimentary insured delivery across India. International shipping quoted on request via WhatsApp concierge.</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div className="eyebrow">You may also like</div>
          <h2 className="font-serif text-4xl mt-2 mb-8">Related pieces</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
