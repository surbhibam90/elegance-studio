import { createFileRoute, Link, useParams, notFound } from "@tanstack/react-router";
import { byCategory, type Category } from "@/data/products";
import { CATEGORIES } from "@/data/seed";
import { ProductCard } from "@/components/product/ProductCard";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return cat;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Collection"} — Luxora` },
      { name: "description", content: loaderData?.tagline ?? "Luxora collection" },
    ],
  }),
  notFoundComponent: () => (
    <div className="pt-40 text-center">
      <h1 className="font-serif text-4xl">Collection not found</h1>
      <Link to="/collections" className="mt-4 inline-block text-gold">Return to collections</Link>
    </div>
  ),
  component: CollectionSlug,
});

function CollectionSlug() {
  const { slug } = useParams({ from: "/collections/$slug" });
  const cat = CATEGORIES.find((c) => c.slug === slug)!;
  const products = byCategory(slug as Category);
  return (
    <div className="pt-32 pb-24">
      <div className="container-lux">
        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          <Link to="/">Home</Link> / <Link to="/collections">Collections</Link> / {cat.name}
        </div>
        <div className="mt-6 mb-14 max-w-2xl">
          <div className="eyebrow">{cat.tagline}</div>
          <h1 className="font-serif text-5xl md:text-7xl mt-3">{cat.name}</h1>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
