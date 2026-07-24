import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Lock, Star } from "lucide-react";
import { PRODUCTS, byCategory } from "@/data/products";
import { CATEGORIES, DEMO_REVIEWS } from "@/data/seed";
import { ProductCard } from "@/components/product/ProductCard";
import { formatINR } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxora — Luxury That Speaks Your Style" },
      { name: "description", content: "Discover our curated collection of luxury watches, handbags, clothing and reserved pieces." },
    ],
  }),
  component: Home,
});

// Twenty hero products — 4 per category picked deterministically
const HERO_PICKS = [
  ...byCategory("watches").slice(0, 5),
  ...byCategory("handbags").slice(0, 5),
  ...byCategory("clothing").slice(0, 5),
  ...byCategory("private").slice(0, 5),
];

// Positions around the hero (percent of container)
const HERO_POSITIONS = [
  { x: 4, y: 8, s: 0.9, r: -6 }, { x: 20, y: 4, s: 0.75, r: 4 },
  { x: 78, y: 6, s: 0.85, r: 5 }, { x: 92, y: 12, s: 0.7, r: -4 },
  { x: 2, y: 32, s: 0.7, r: 3 }, { x: 14, y: 50, s: 0.95, r: -3 },
  { x: 82, y: 34, s: 0.75, r: -5 }, { x: 90, y: 52, s: 0.9, r: 6 },
  { x: 6, y: 72, s: 0.8, r: 4 }, { x: 24, y: 82, s: 0.9, r: -3 },
  { x: 74, y: 78, s: 0.85, r: 5 }, { x: 90, y: 74, s: 0.75, r: -6 },
  { x: 34, y: 88, s: 0.7, r: 2 }, { x: 62, y: 90, s: 0.7, r: -2 },
  { x: 46, y: 4, s: 0.65, r: 0 }, { x: 54, y: 92, s: 0.65, r: 0 },
  { x: 30, y: 20, s: 0.6, r: -8 }, { x: 68, y: 22, s: 0.6, r: 8 },
  { x: 30, y: 68, s: 0.6, r: 4 }, { x: 70, y: 66, s: 0.6, r: -4 },
];

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const catRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      // Signature "products fly into category cards" animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const targetIdx = Math.floor(i / 5); // 4 categories * 5 picks
        const target = catRefs.current[targetIdx];
        if (!target) return;

        gsap.to(card, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "bottom 80%",
            end: "bottom 20%",
            scrub: 1.2,
          },
          x: () => {
            const cardBox = card.getBoundingClientRect();
            const tgt = target.getBoundingClientRect();
            return tgt.left + tgt.width / 2 - (cardBox.left + cardBox.width / 2);
          },
          y: () => {
            const cardBox = card.getBoundingClientRect();
            const tgt = target.getBoundingClientRect();
            return tgt.top + tgt.height / 2 - (cardBox.top + cardBox.height / 2);
          },
          scale: 0.35,
          rotate: 0,
          opacity: 0.85,
          ease: "power2.inOut",
        });
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // mouse parallax
  // useEffect(() => {
  //   const el = heroRef.current;
  //   if (!el) return;
  //   const onMove = (e: MouseEvent) => {
  //     const rect = el.getBoundingClientRect();
  //     const mx = (e.clientX - rect.left) / rect.width - 0.5;
  //     const my = (e.clientY - rect.top) / rect.height - 0.5;
  //     cardsRef.current.forEach((card, i) => {
  //       if (!card) return;
  //       const depth = (i % 4) + 1;
  //       gsap.to(card, { xPercent: mx * depth * 2, yPercent: my * depth * 2, duration: 1.2, ease: "power3.out", overwrite: "auto" });
  //     });
  //   };
  //   el.addEventListener("mousemove", onMove);
  //   return () => el.removeEventListener("mousemove", onMove);
  // }, []);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden pt-24 flex items-center"
        style={{ background: "radial-gradient(1200px 700px at 50% 20%, #F7EEDD 0%, var(--warm) 60%)" }}
      >
        {HERO_PICKS.slice(0, 20).map((p, i) => {
          const pos = HERO_POSITIONS[i];
          return (
            <div
              key={p.id + i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="absolute pointer-events-none"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: ` scale(${pos.s}) rotate(${pos.r}deg)`,
                width: 180,
                height: 225,
                zIndex: 1,
              }}
            >
              <div
                className="glass rounded-xl overflow-hidden soft-shadow float-soft"
                style={{ ["--r" as never]: `${pos.r}deg`, animationDelay: `${(i % 5) * 0.4}s`, width: "100%", height: "100%" }}
              >
                <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          );
        })}

        <div className="container-lux relative z-10 text-center py-8 sm:py-20 glass w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="eyebrow"
          >
            Premium quality · Exclusive style
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-serif text-[clamp(2.75rem,7vw,6rem)] leading-[1.02] tracking-tight"
          >
            Luxury That<br />
            <em className="not-italic text-gold">Speaks Your Style</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="mt-6 max-w-lg mx-auto text-[15px] text-muted-foreground leading-relaxed"
          >
            A curated maison of watches, handbags and tailoring — crafted for those who appreciate quiet, considered luxury.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-3 justify-center"
          >
            <Link to="/collections" className="group bg-charcoal text-warm px-8 py-4 rounded-full text-xs uppercase tracking-[0.24em] hover:bg-gold transition-colors flex items-center gap-2">
              Explore Collection <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/private" className="glass px-8 py-4 rounded-full text-xs uppercase tracking-[0.24em] hover:bg-white transition-colors flex items-center gap-2">
              <Lock className="h-3.5 w-3.5" /> Exclusive
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
          >
            Scroll to explore
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24">
        <div className="container-lux text-center mb-16">
          <div className="eyebrow">Explore our collections</div>
          <h2 className="font-serif text-5xl md:text-6xl mt-4">Find What Defines Your Style</h2>
        </div>
        <div className="container-lux grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, idx) => {
            const products = c.slug === "private" ? byCategory("private").slice(0, 4) : byCategory(c.slug as never).slice(0, 4);
            return (
              <motion.div
                key={c.slug}
                ref={(el) => { catRefs.current[idx] = el; }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="glass rounded-2xl p-6 hover-lift group relative"
              >
                {c.slug === "private" && (
                  <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gold text-white flex items-center justify-center">
                    <Lock className="h-3.5 w-3.5" />
                  </div>
                )}
                <div className="text-xs uppercase tracking-[0.22em] text-gold">{c.tagline}</div>
                <h3 className="font-serif text-2xl mt-2">{c.name}</h3>
                <div className="grid grid-cols-2 gap-2 mt-6">
                  {products.map((p) => (
                    <div key={p.id} className="aspect-square rounded-lg overflow-hidden bg-secondary">
                      <img src={p.images[0]} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <Link
                  to={c.slug === "private" ? "/private" : "/collections/$slug"}
                  params={c.slug === "private" ? undefined : { slug: c.slug }}
                  className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-charcoal group-hover:text-gold transition-colors"
                >
                  {c.slug === "private" ? "Unlock Access" : "Explore Collection"} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FEATURED */}
      <Section eyebrow="Handpicked for you" title="Premium Selections">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.filter((p) => p.featured).slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </Section>

      {/* NEW ARRIVALS */}
      <Section eyebrow="Just landed" title="New Arrivals">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.filter((p) => p.newArrival).slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </Section>

      {/* BEST SELLERS */}
      <Section eyebrow="Enduring favourites" title="Best Sellers">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.filter((p) => p.bestSeller).slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </Section>

      {/* PRIVATE COLLECTION PREVIEW */}
      <section className="py-24">
        <div className="container-lux">
          <div className="relative rounded-3xl overflow-hidden bg-charcoal text-warm p-12 md:p-20">
            <div className="absolute inset-0 opacity-20">
              <img src={byCategory("private")[0].images[0]} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative max-w-xl">
              <div className="eyebrow">By invitation</div>
              <h2 className="font-serif text-5xl mt-4">The Private Collection</h2>
              <p className="mt-4 text-warm/70 leading-relaxed">
                A reserved catalogue of one-off pieces, editors' watches and bespoke commissions. Available only to approved members with a private access key.
              </p>
              <Link to="/private" className="mt-8 inline-flex items-center gap-2 bg-gold text-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-[0.24em] hover:bg-warm transition-colors">
                <Lock className="h-3.5 w-3.5" /> Enter Private Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <Section eyebrow="Words from our clients" title="Cherished by Discerning Eyes">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {DEMO_REVIEWS.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <p className="mt-5 font-serif text-lg leading-snug">"{r.text}"</p>
              <div className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {r.name} · {r.city}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* NEWSLETTER strip */}
      <section className="py-24">
        <div className="container-lux glass rounded-3xl p-12 md:p-16 text-center">
          <div className="eyebrow">Newsletter</div>
          <h2 className="font-serif text-4xl md:text-5xl mt-3">Whispers from the Maison</h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Private previews, seasonal edits and quiet arrivals — once a month, never more.
          </p>
          <form className="mt-8 flex max-w-md mx-auto bg-background border border-border rounded-full overflow-hidden pl-6 pr-1 py-1 items-center">
            <input placeholder="your@email.com" className="bg-transparent flex-1 outline-none py-3 text-sm" />
            <button className="bg-charcoal text-warm px-6 py-3 rounded-full text-xs uppercase tracking-[0.22em] hover:bg-gold transition-colors">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="py-24">
      <div className="container-lux">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="font-serif text-4xl md:text-5xl mt-3">{title}</h2>
          </div>
          <Link to="/collections" className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-gold">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}
// keep referenced to silence unused warnings
void formatINR;
