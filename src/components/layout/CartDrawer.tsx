import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/store";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const { items, open, setOpen, update, remove, total } = useCart();
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-charcoal/40 z-50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[440px] bg-background z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-gold">Your Selection</div>
                <div className="text-xl font-serif mt-1">Shopping Cart</div>
              </div>
              <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-secondary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {items.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <p className="font-serif text-2xl text-foreground mb-2">Your cart is empty</p>
                  <p className="text-sm">Curate your selection from the boutique.</p>
                </div>
              ) : (
                items.map((i) => (
                  <div key={i.productId} className="flex gap-4">
                    <div className="w-20 h-24 overflow-hidden rounded-md bg-secondary shrink-0">
                      <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{i.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {i.color ? "· Color" : ""} {i.size ? `· ${i.size}` : ""}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 border border-border rounded-full px-1">
                          <button className="p-1.5" onClick={() => update(i.productId, i.qty - 1)}>
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm min-w-4 text-center">{i.qty}</span>
                          <button className="p-1.5" onClick={() => update(i.productId, i.qty + 1)}>
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-sm font-medium">{formatINR(i.price * i.qty)}</div>
                      </div>
                    </div>
                    <button onClick={() => remove(i.productId)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-serif text-2xl">{formatINR(total())}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center bg-charcoal text-warm py-4 rounded-full text-sm uppercase tracking-[0.22em] hover:bg-gold transition-colors"
                >
                  Checkout via WhatsApp
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center text-sm text-muted-foreground hover:text-foreground"
                >
                  View full cart →
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
