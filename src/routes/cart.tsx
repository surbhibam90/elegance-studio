import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/store";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Luxora" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, update, remove, total } = useCart();
  return (
    <div className="pt-32 pb-24 container-lux">
      <div className="eyebrow">Your selection</div>
      <h1 className="font-serif text-5xl md:text-6xl mt-3 mb-14">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-serif text-3xl">Your cart awaits.</p>
          <Link to="/collections" className="mt-6 inline-block bg-charcoal text-warm px-8 py-4 rounded-full text-xs uppercase tracking-[0.22em]">Explore collections</Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="divide-y divide-border">
            {items.map((i) => (
              <div key={i.productId} className="py-6 flex gap-6">
                <div className="w-28 h-32 rounded-lg overflow-hidden bg-secondary shrink-0">
                  <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="font-serif text-xl">{i.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{i.color ? "Colour · " : ""}{i.size ?? ""}</div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1 border border-border rounded-full px-1">
                      <button className="p-2" onClick={() => update(i.productId, i.qty - 1)}><Minus className="h-3.5 w-3.5" /></button>
                      <span className="min-w-6 text-center text-sm">{i.qty}</span>
                      <button className="p-2" onClick={() => update(i.productId, i.qty + 1)}><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <div className="font-medium">{formatINR(i.price * i.qty)}</div>
                    <button onClick={() => remove(i.productId)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="glass rounded-2xl p-8 h-fit sticky top-28">
            <div className="text-xs uppercase tracking-[0.22em] text-gold mb-4">Order summary</div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(total())}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Complimentary</span></div>
              <div className="flex justify-between text-xs text-muted-foreground"><span>Coupon</span><span>Apply at checkout</span></div>
            </div>
            <div className="border-t border-border my-5" />
            <div className="flex items-baseline justify-between">
              <span className="text-sm">Total</span>
              <span className="font-serif text-3xl">{formatINR(total())}</span>
            </div>
            <Link to="/checkout" className="mt-6 block text-center bg-charcoal text-warm py-4 rounded-full text-xs uppercase tracking-[0.22em] hover:bg-gold transition-colors">
              Proceed to Checkout
            </Link>
            <Link to="/collections" className="mt-3 block text-center text-xs uppercase tracking-[0.22em] text-muted-foreground">Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
