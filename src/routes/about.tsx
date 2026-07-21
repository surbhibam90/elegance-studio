import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Luxora Maison" },
      { name: "description", content: "The story of Luxora — a maison of curated luxury." },
    ],
  }),
  component: () => (
    <div className="pt-32 pb-24 container-lux max-w-4xl">
      <div className="eyebrow">Our story</div>
      <h1 className="font-serif text-6xl mt-3">The Maison</h1>
      <p className="mt-8 text-lg text-muted-foreground leading-[1.9]">
        Luxora began with a simple conviction: that true luxury is not louder, but quieter — closer to conversation than to spectacle. Every piece in our catalogue is chosen by hand, from ateliers we know by first name, for clients we've learned to anticipate.
      </p>
      <p className="mt-6 text-lg text-muted-foreground leading-[1.9]">
        We do not stock. We curate. We do not upsell. We introduce. And every order, from a modest gift to a museum-grade timepiece, is finished by a person — reachable, always, on WhatsApp.
      </p>
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        {[["48+", "Curated pieces"], ["12", "Ateliers worldwide"], ["3,400", "Cherished clients"]].map(([n, l]) => (
          <div key={l} className="glass rounded-2xl p-8 text-center">
            <div className="font-serif text-5xl text-gold">{n}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </div>
  ),
});
