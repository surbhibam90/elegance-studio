import watch1 from "@/assets/products/watch-1.jpg";
import watch2 from "@/assets/products/watch-2.jpg";
import watch3 from "@/assets/products/watch-3.jpg";
import bag1 from "@/assets/products/handbag-1.jpg";
import bag2 from "@/assets/products/handbag-2.jpg";
import bag3 from "@/assets/products/handbag-3.jpg";
import cloth1 from "@/assets/products/clothing-1.jpg";
import cloth2 from "@/assets/products/clothing-2.jpg";
import perfume from "@/assets/products/perfume-1.jpg";
import shoes from "@/assets/products/shoes-1.jpg";
import jewel from "@/assets/products/jewelry-1.jpg";

export type Category = "watches" | "handbags" | "clothing" | "private";

export interface Product {
  id: string;
  code: string;
  name: string;
  brand: string;
  category: Category;
  subcategory: string;
  price: number;
  compareAt?: number;
  images: string[];
  colors: string[];
  sizes?: string[];
  material: string;
  description: string;
  stock: number;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  trending?: boolean;
  rating: number;
  reviews: number;
}

const IMG: Record<string, string[]> = {
  watches: [watch1, watch2, watch3],
  handbags: [bag1, bag2, bag3],
  clothing: [cloth1, cloth2],
  extras: [perfume, shoes, jewel],
};

const WATCH_NAMES = [
  ["Aurora Chronographe", "Aurora Genève", 189000],
  ["Régent Steel & Gold", "Maison Régent", 145000],
  ["Onyx Automatic 42", "Noir Horlogerie", 128000],
  ["Céleste Moonphase", "Céleste", 215000],
  ["Rive Gauche Classic", "Rive", 98000],
  ["Empire Skeleton", "Empire", 268000],
  ["Solstice GMT", "Solstice", 172000],
  ["Meridian Tourbillon", "Meridian", 340000],
  ["Vintage 1962", "Aurora Genève", 156000],
  ["Sport Diver 300", "Solstice", 112000],
];

const BAG_NAMES = [
  ["Émeraude Quilted Mini", "Maison Léon", 89000],
  ["Beige Cannage Top Handle", "Aureli", 112000],
  ["Noir Chain Flap", "Maison Léon", 76000],
  ["Ivoire Structured Tote", "Aureli", 68000],
  ["Camel Saddle Crossbody", "Riva", 54000],
  ["Bordeaux Evening Clutch", "Riva", 42000],
  ["Champagne Micro Bag", "Aureli", 58000],
  ["Sable Bucket Bag", "Maison Léon", 72000],
  ["Cognac Weekender", "Riva", 96000],
  ["Espresso Shoulder Bag", "Aureli", 82000],
];

const CLOTH_NAMES: [string, string, number, "men" | "women"][] = [
  ["Linen Tailored Blazer", "Atelier Nord", 34000, "men"],
  ["Silk Slip Dress", "Marchesi", 52000, "women"],
  ["Cashmere Roll Neck", "Atelier Nord", 28000, "men"],
  ["Pleated Wide Trousers", "Marchesi", 22000, "women"],
  ["Wool Overcoat", "Atelier Nord", 68000, "men"],
  ["Silk Camisole", "Marchesi", 18000, "women"],
  ["Poplin Shirt", "Atelier Nord", 14000, "men"],
  ["Wrap Midi Dress", "Marchesi", 46000, "women"],
  ["Tailored Chinos", "Atelier Nord", 19000, "men"],
  ["Knit Cardigan", "Marchesi", 24000, "women"],
];

const PRIVATE_NAMES = [
  ["Reserve No. 01 — Rose Absolue", "Parfums Privés", 128000, "fragrance", perfume],
  ["Reserve No. 02 — Oud Impérial", "Parfums Privés", 156000, "fragrance", perfume],
  ["Signet Ring — Yellow Gold", "Maison Léon Privé", 245000, "jewelry", jewel],
  ["Diamond Pendant — 1.2ct", "Maison Léon Privé", 620000, "jewelry", jewel],
  ["Editor's Watch — Platinum", "Aurora Genève", 890000, "watches", watch3],
  ["Alligator Kelly Bag", "Aureli Privé", 1250000, "handbags", bag2],
  ["Bespoke Trench Coat", "Atelier Nord Privé", 210000, "clothing", cloth1],
  ["Hand-lasted Loafers", "Corsini", 96000, "shoes", shoes],
] as const;

const COLORS = ["#1B1B1B", "#B8935A", "#EFE7D8", "#3B4A2A", "#6B2A2A", "#F5F0E6", "#8C7355"];
const SIZES = ["XS", "S", "M", "L", "XL"];

const products: Product[] = [];

WATCH_NAMES.forEach(([name, brand, price], i) => {
  const img = IMG.watches[i % IMG.watches.length];
  products.push({
    id: `w-${i + 1}`,
    code: `LX-W-${1000 + i}`,
    name: String(name),
    brand: String(brand),
    category: "watches",
    subcategory: i % 2 === 0 ? "Chronograph" : "Automatic",
    price: Number(price),
    compareAt: i % 3 === 0 ? Number(price) * 1.15 : undefined,
    images: [img, IMG.watches[(i + 1) % IMG.watches.length]],
    colors: [COLORS[0], COLORS[1], COLORS[5]],
    material: i % 2 === 0 ? "Stainless Steel" : "18k Gold-plated Steel",
    description: `${name} — a study in horological restraint. Hand-finished case, sapphire crystal, Swiss automatic movement. Presented on a matching bracelet with butterfly clasp.`,
    stock: 4 + (i % 8),
    featured: i < 4,
    bestSeller: i % 3 === 0,
    newArrival: i > 6,
    trending: i % 4 === 1,
    rating: 4.5 + (i % 5) * 0.1,
    reviews: 20 + i * 7,
  });
});

BAG_NAMES.forEach(([name, brand, price], i) => {
  const img = IMG.handbags[i % IMG.handbags.length];
  products.push({
    id: `b-${i + 1}`,
    code: `LX-B-${2000 + i}`,
    name: String(name),
    brand: String(brand),
    category: "handbags",
    subcategory: i % 2 === 0 ? "Top Handle" : "Shoulder",
    price: Number(price),
    images: [img, IMG.handbags[(i + 1) % IMG.handbags.length]],
    colors: [COLORS[2], COLORS[0], COLORS[6]],
    material: i % 2 === 0 ? "Lambskin Leather" : "Calfskin",
    description: `${name} — meticulously hand-stitched in our Milan atelier. Signature hardware, protective feet, and interior card compartments.`,
    stock: 3 + (i % 6),
    featured: i < 3,
    bestSeller: i % 2 === 0,
    newArrival: i > 5,
    trending: i % 3 === 0,
    rating: 4.6 + (i % 4) * 0.1,
    reviews: 15 + i * 5,
  });
});

CLOTH_NAMES.forEach(([name, brand, price, seg], i) => {
  const img = seg === "men" ? IMG.clothing[0] : IMG.clothing[1];
  products.push({
    id: `c-${i + 1}`,
    code: `LX-C-${3000 + i}`,
    name: name,
    brand: brand,
    category: "clothing",
    subcategory: seg === "men" ? "Menswear" : "Womenswear",
    price: price,
    images: [img, IMG.clothing[(IMG.clothing.indexOf(img) + 1) % IMG.clothing.length]],
    colors: [COLORS[2], COLORS[6], COLORS[0]],
    sizes: SIZES,
    material: i % 2 === 0 ? "Italian Linen" : "Silk Charmeuse",
    description: `${name} — cut from responsibly sourced fabrics, finished with mother-of-pearl buttons and hand-rolled hems.`,
    stock: 6 + (i % 10),
    featured: i < 2,
    bestSeller: i % 3 === 0,
    newArrival: i % 2 === 1,
    trending: i % 4 === 0,
    rating: 4.4 + (i % 5) * 0.1,
    reviews: 10 + i * 4,
  });
});

PRIVATE_NAMES.forEach(([name, brand, price, sub, img], i) => {
  products.push({
    id: `p-${i + 1}`,
    code: `LX-P-${9000 + i}`,
    name: name,
    brand: brand,
    category: "private",
    subcategory: sub as string,
    price: price,
    images: [img as string],
    colors: [COLORS[1], COLORS[0]],
    material: "Reserved / Bespoke",
    description: `${name} — offered exclusively to members of the Private Collection. Ships in a numbered presentation case with certificate of provenance.`,
    stock: 1 + (i % 3),
    featured: i < 3,
    bestSeller: false,
    newArrival: true,
    trending: i % 2 === 0,
    rating: 4.9,
    reviews: 5 + i,
  });
});

export const PRODUCTS = products;

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function byCategory(c: Category) {
  return PRODUCTS.filter((p) => p.category === c);
}
