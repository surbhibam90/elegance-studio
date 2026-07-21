import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({ component: SettingsAdmin });

function SettingsAdmin() {
  return (
    <div className="p-10 max-w-3xl">
      <div className="eyebrow">Boutique</div>
      <h1 className="font-serif text-4xl mt-2 mb-10">Website Settings</h1>

      <div className="space-y-6">
        {[
          { title: "Identity", fields: [["Boutique name", "Luxora"], ["Tagline", "Style That Defines You"]] },
          { title: "Contact", fields: [["WhatsApp number", "+91 98765 43210"], ["Email", "concierge@luxora.in"], ["Address", "12 Altamount Road, Mumbai"]] },
          { title: "Social", fields: [["Instagram", "@luxora.maison"], ["Facebook", "luxoramaison"]] },
          { title: "SEO", fields: [["Meta title", "Luxora — Luxury That Speaks Your Style"], ["Meta description", "Curated luxury watches, handbags, tailoring."]] },
        ].map(sec => (
          <div key={sec.title} className="bg-white rounded-2xl border border-border p-6">
            <div className="font-serif text-2xl mb-5">{sec.title}</div>
            <div className="grid gap-4">
              {sec.fields.map(([l, v]) => (
                <label key={l} className="grid grid-cols-[180px_1fr] gap-4 items-center">
                  <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{l}</span>
                  <input defaultValue={v} className="border border-border rounded-full px-4 py-2.5 text-sm" />
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button className="bg-charcoal text-warm px-8 py-3 rounded-full text-xs uppercase tracking-[0.22em]">Save changes</button>
        </div>
      </div>
    </div>
  );
}
