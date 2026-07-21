import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-warm mt-24">
      <div className="container-lux py-20 grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <div className="text-3xl font-serif">Luxora</div>
          <p className="mt-4 text-sm text-warm/60 max-w-xs leading-relaxed">
            A curated maison of watches, handbags, tailoring and reserved pieces. Every order finished by hand, delivered by conversation.
          </p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Facebook, Youtube].map((I, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full border border-warm/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-5">Boutique</div>
          <ul className="space-y-3 text-sm text-warm/70">
            <li><Link to="/collections">All Collections</Link></li>
            <li><Link to="/collections/watches">Watches</Link></li>
            <li><Link to="/collections/handbags">Handbags</Link></li>
            <li><Link to="/collections/clothing">Clothing</Link></li>
            <li><Link to="/private">Private Collection</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-5">Service</div>
          <ul className="space-y-3 text-sm text-warm/70">
            <li><Link to="/about">About Luxora</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Care Guide</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-5">Newsletter</div>
          <p className="text-sm text-warm/60 mb-4 leading-relaxed">
            Private previews, seasonal edits and quiet arrivals — once a month.
          </p>
          <form className="flex glass-dark rounded-full overflow-hidden pl-5 pr-1 py-1 items-center">
            <input
              placeholder="your@email.com"
              className="bg-transparent text-sm flex-1 outline-none py-2.5 placeholder:text-warm/40"
            />
            <button className="h-10 w-10 rounded-full bg-gold text-charcoal flex items-center justify-center hover:bg-gold-soft transition">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-warm/10">
        <div className="container-lux py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-warm/50">
          <span>© 2026 Luxora Maison. Crafted with intention.</span>
          <span>Mumbai · Delhi · Milan</span>
        </div>
      </div>
    </footer>
  );
}
