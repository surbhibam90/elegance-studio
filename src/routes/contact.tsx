import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { whatsappUrl } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Luxora" },
      { name: "description", content: "Reach the Luxora concierge for private appointments and enquiries." },
    ],
  }),
  component: () => (
    <div className="pt-32 pb-24 container-lux">
      <div className="grid gap-14 lg:grid-cols-2 items-start">
        <div>
          <div className="eyebrow">Concierge</div>
          <h1 className="font-serif text-6xl mt-3">Speak with us</h1>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Every order at Luxora begins with a conversation. Reach us on WhatsApp for the fastest response — usually within minutes during boutique hours.
          </p>
          <div className="mt-10 space-y-5">
            {[
              [MessageCircle, "WhatsApp", "+91 98765 43210", whatsappUrl("Hello Luxora")],
              [Mail, "Email", "concierge@luxora.in"],
              [Phone, "Phone", "+91 22 4000 8888"],
              [MapPin, "Boutique", "12 Altamount Road, Mumbai — 400026"],
            ].map(([Icon, label, val, href], i) => {
              const Content = () => (
                <>
                  <div className="h-11 w-11 rounded-full bg-gold text-white flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{label as string}</div>
                    <div className="font-serif text-xl mt-0.5">{val as string}</div>
                  </div>
                </>
              );
              return href ? (
                <a key={i} href={href as string} target="_blank" rel="noreferrer" className="flex items-center gap-4 hover-lift">
                  <Content />
                </a>
              ) : (
                <div key={i} className="flex items-center gap-4">
                  <Content />
                </div>
              );
            })}
          </div>
        </div>
        <form className="glass rounded-3xl p-8 md:p-10 space-y-5">
          <input placeholder="Your name" className="input" />
          <input placeholder="Email or phone" className="input" />
          <textarea rows={5} placeholder="How can we help?" className="input resize-none rounded-2xl" />
          <button className="w-full bg-charcoal text-warm py-4 rounded-full text-xs uppercase tracking-[0.24em] hover:bg-gold transition-colors">
            Send Message
          </button>
        </form>
      </div>
      <style>{`.input{width:100%;background:transparent;border:1px solid var(--border);border-radius:9999px;padding:0.9rem 1.5rem;font-size:0.875rem;outline:none}.input:focus{border-color:var(--gold)}textarea.input{border-radius:1.5rem}`}</style>
    </div>
  ),
});
