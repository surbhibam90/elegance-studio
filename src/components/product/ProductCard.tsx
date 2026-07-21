import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { formatINR, cn } from "@/lib/utils";
import { useCart, useWishlist } from "@/store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => s.ids.includes(product.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          )}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.newArrival && (
              <span className="text-[10px] uppercase tracking-[0.2em] bg-charcoal text-warm px-2.5 py-1 rounded-full">
                New
              </span>
            )}
            {product.bestSeller && (
              <span className="text-[10px] uppercase tracking-[0.2em] bg-gold text-white px-2.5 py-1 rounded-full">
                Best Seller
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); toggle(product.id); }}
            className={cn(
              "absolute top-3 right-3 h-9 w-9 rounded-full glass flex items-center justify-center transition",
              wished && "text-destructive"
            )}
            aria-label="Wishlist"
          >
            <Heart className={cn("h-4 w-4", wished && "fill-current")} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); add(product); }}
            className="absolute bottom-3 inset-x-3 glass rounded-full py-2.5 text-xs uppercase tracking-[0.2em] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add to Bag
          </button>
        </div>
        <div className="mt-4 space-y-1">
          <div className="text-[10px] uppercase tracking-[0.24em] text-gold">{product.brand}</div>
          <div className="text-[15px] font-serif leading-snug">{product.name}</div>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm font-medium">{formatINR(product.price)}</span>
            {product.compareAt && (
              <span className="text-xs text-muted-foreground line-through">{formatINR(product.compareAt)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
