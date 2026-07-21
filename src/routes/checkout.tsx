import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Check, MessageCircle } from "lucide-react";
import { useCart } from "@/store";
import { formatINR, whatsappUrl } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Luxora" }] }),
  component: CheckoutPage,
});

interface Form {
  name: string; email: string; phone: string;
  address: string; city: string; pincode: string;
  shipping: string;
}

const STEPS = ["Information", "Delivery", "Review"] as const;

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [step, setStep] = useState(0);
  const { register, watch, handleSubmit, formState: { errors } } = useForm<Form>({
    defaultValues: { shipping: "standard" },
  });

  const values = watch();

  if (items.length === 0) {
    return (
      <div className="pt-40 text-center container-lux">
        <p className="font-serif text-3xl">Your cart is empty.</p>
        <Link to="/collections" className="mt-6 inline-block bg-charcoal text-warm px-8 py-4 rounded-full text-xs uppercase tracking-[0.22em]">Explore collections</Link>
      </div>
    );
  }

  const onFinal = (data: Form) => {
    const lines = items.map((i) => `• ${i.name} × ${i.qty} — ${formatINR(i.price * i.qty)}`).join("%0A");
    const msg =
`New order from Luxora website

Customer: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

Delivery
${data.address}, ${data.city} — ${data.pincode}
Method: ${data.shipping === "express" ? "Express (1–2 days)" : "Standard (3–5 days)"}

Items:
${items.map((i) => `- ${i.name} × ${i.qty} — ${formatINR(i.price * i.qty)}`).join("\n")}

Total: ${formatINR(total())}`;
    window.open(whatsappUrl(msg), "_blank");
    clear();
  };

  return (
    <div className="pt-32 pb-24 container-lux">
      <div className="eyebrow">Complete your order</div>
      <h1 className="font-serif text-5xl mt-3 mb-10">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <ol className="flex items-center gap-4 mb-10">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs ${i <= step ? "bg-charcoal text-warm" : "bg-secondary text-muted-foreground"}`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-xs uppercase tracking-[0.22em] ${i === step ? "text-charcoal" : "text-muted-foreground"}`}>{s}</span>
                {i < STEPS.length - 1 && <div className="w-8 h-px bg-border" />}
              </li>
            ))}
          </ol>

          <form onSubmit={handleSubmit(onFinal)} className="glass rounded-2xl p-8 space-y-5">
            {step === 0 && (
              <>
                <Field label="Full name" error={errors.name?.message}>
                  <input {...register("name", { required: "Required" })} className="input" />
                </Field>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Email" error={errors.email?.message}>
                    <input type="email" {...register("email", { required: "Required" })} className="input" />
                  </Field>
                  <Field label="Phone" error={errors.phone?.message}>
                    <input {...register("phone", { required: "Required" })} className="input" />
                  </Field>
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <Field label="Address" error={errors.address?.message}>
                  <input {...register("address", { required: "Required" })} className="input" />
                </Field>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="City" error={errors.city?.message}>
                    <input {...register("city", { required: "Required" })} className="input" />
                  </Field>
                  <Field label="Pincode" error={errors.pincode?.message}>
                    <input {...register("pincode", { required: "Required" })} className="input" />
                  </Field>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-gold mb-3">Shipping method</div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { v: "standard", label: "Complimentary Standard", sub: "3–5 business days" },
                      { v: "express", label: "Express Concierge", sub: "1–2 business days · ₹1,500" },
                    ].map((o) => (
                      <label key={o.v} className={`glass rounded-xl p-4 cursor-pointer border-2 ${values.shipping === o.v ? "border-gold" : "border-transparent"}`}>
                        <input type="radio" value={o.v} {...register("shipping")} className="sr-only" />
                        <div className="text-sm font-medium">{o.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">{o.sub}</div>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <div className="text-sm space-y-3">
                <p className="text-muted-foreground">Confirm your order. On the next step, we'll open WhatsApp with a pre-filled message — reply to lock in the order.</p>
                <div className="glass rounded-xl p-4 text-xs">
                  <div><b>{values.name}</b> · {values.phone} · {values.email}</div>
                  <div className="mt-1 text-muted-foreground">{values.address}, {values.city} — {values.pincode}</div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 0 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="text-xs uppercase tracking-[0.22em]">← Back</button>
              ) : <span />}
              {step < 2 ? (
                <button type="button" onClick={() => setStep(step + 1)} className="bg-charcoal text-warm px-8 py-3 rounded-full text-xs uppercase tracking-[0.22em]">Continue</button>
              ) : (
                <button type="submit" className="bg-gold text-white px-8 py-3 rounded-full text-xs uppercase tracking-[0.22em] flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> Complete via WhatsApp
                </button>
              )}
            </div>
          </form>
        </div>

        <aside className="glass rounded-2xl p-8 h-fit">
          <div className="text-xs uppercase tracking-[0.22em] text-gold mb-4">Order summary</div>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {items.map((i) => (
              <div key={i.productId} className="flex gap-3">
                <img src={i.image} alt="" className="w-14 h-16 rounded-md object-cover" />
                <div className="flex-1 text-sm">
                  <div className="font-medium leading-tight">{i.name}</div>
                  <div className="text-xs text-muted-foreground">× {i.qty}</div>
                </div>
                <div className="text-sm">{formatINR(i.price * i.qty)}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-border my-5" />
          <div className="flex items-baseline justify-between">
            <span className="text-sm">Total</span>
            <span className="font-serif text-3xl">{formatINR(total())}</span>
          </div>
        </aside>
      </div>

      <style>{`.input{width:100%;background:transparent;border:1px solid var(--border);border-radius:9999px;padding:0.85rem 1.25rem;font-size:0.875rem;outline:none;transition:border-color .2s}.input:focus{border-color:var(--gold)}`}</style>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">{label}</div>
      {children}
      {error && <div className="text-xs text-destructive mt-1">{error}</div>}
    </div>
  );
}
