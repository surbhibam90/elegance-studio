import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Heart, Search, User, Lock, Menu, X } from "lucide-react";
import { useCart, useWishlist } from "@/store";
import { cn } from "@/lib/utils";

const NAV: Array<{ to: string; label: string; icon?: typeof Lock }> = [
  { to: "/", label: "Home" },
  { to: "/collections", label: "Collections" },
  { to: "/private", label: "Exclusive", icon: Lock },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openCart = useCart((s) => s.setOpen);
  const cartCount = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const wishCount = useWishlist((s) => s.ids.length);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 glass border-b border-border/40",
        /*transparent ? "bg-transparent" : "glass border-b border-border/40"*/
      )}
    >
      <div className="container-lux flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-serif tracking-tight text-foreground">LUXORA</span>
          <span className="hidden sm:inline text-[10px] tracking-[0.3em] text-muted-foreground uppercase mt-1">
            Maison
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={cn(
                "text-[13px] uppercase tracking-[0.22em] text-foreground/80 hover:text-gold transition-colors flex items-center gap-1.5",
                pathname === n.to && "text-gold"
              )}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.icon ? <n.icon className="h-3.5 w-3.5" /> : null}
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button className="p-2.5 rounded-full hover:bg-secondary transition-colors" aria-label="Search">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <button className="p-2.5 rounded-full hover:bg-secondary transition-colors relative" aria-label="Wishlist">
            <Heart className="h-[18px] w-[18px]" />
            {wishCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {wishCount}
              </span>
            )}
          </button>
          <button
            onClick={() => openCart(true)}
            className="p-2.5 rounded-full hover:bg-secondary transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <Link to="/admin" className="p-2.5 rounded-full hover:bg-secondary transition-colors" aria-label="Admin">
            <User className="h-[18px] w-[18px]" />
          </Link>
          <button className="lg:hidden p-2.5" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass border-t border-border/40 py-4">
          <nav className="container-lux flex flex-col gap-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm uppercase tracking-[0.22em] py-2"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
