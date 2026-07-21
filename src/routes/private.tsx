import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { usePrivateAuth } from "@/store";
import { byCategory } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export const Route = createFileRoute("/private")({
  head: () => ({
    meta: [
      { title: "Private Collection — Luxora" },
      { name: "description", content: "Reserved for approved members." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrivatePage,
});

function PrivatePage() {
  const { unlocked, unlock, lock } = usePrivateAuth();
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) {
    const products = byCategory("private");
    return (
      <div className="pt-32 pb-24">
        <div className="container-lux">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="eyebrow">Members' catalogue</div>
              <h1 className="font-serif text-5xl md:text-6xl mt-3">Private Collection</h1>
              <p className="text-muted-foreground mt-3 max-w-md">Numbered pieces, editors' watches and bespoke commissions.</p>
            </div>
            <button onClick={lock} className="text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">Lock again</button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 px-4" style={{ background: "radial-gradient(800px 500px at 50% 30%, #EFE5D0 0%, var(--warm) 60%)" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass rounded-3xl p-12 md:p-16 max-w-md w-full text-center soft-shadow"
      >
        <div className="mx-auto h-14 w-14 rounded-full bg-gold text-white flex items-center justify-center">
          <Lock className="h-6 w-6" />
        </div>
        <div className="eyebrow mt-6">By invitation only</div>
        <h1 className="font-serif text-4xl mt-3">Private Collection</h1>
        <p className="text-sm text-muted-foreground mt-3">Reserved for approved customers of the Maison.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const ok = unlock(pw);
            if (!ok) { setError(true); setTimeout(() => setError(false), 800); }
          }}
          className="mt-8"
        >
          <motion.input
            animate={error ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            placeholder="Access key"
            className={`w-full bg-white/60 border rounded-full px-6 py-4 text-center tracking-[0.4em] outline-none transition ${error ? "border-destructive" : "border-border focus:border-gold"}`}
          />
          {error && <div className="mt-3 text-xs text-destructive">Incorrect access key</div>}
          <button className="mt-4 w-full bg-charcoal text-warm py-4 rounded-full text-xs uppercase tracking-[0.24em] hover:bg-gold transition-colors">
            Unlock
          </button>
        </form>
        <div className="mt-6 text-[11px] text-muted-foreground">
          Try <code className="text-gold">LUXORA2026</code>
        </div>
      </motion.div>
    </div>
  );
}
