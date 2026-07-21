export const CATEGORIES = [
  { slug: "watches", name: "Luxury Watches", tagline: "Timeless mechanics on your wrist" },
  { slug: "handbags", name: "Luxury Handbags", tagline: "Crafted to be carried, made to be kept" },
  { slug: "clothing", name: "Luxury Clothing", tagline: "Tailoring for the modern connoisseur" },
  { slug: "private", name: "Private Collection", tagline: "Reserved for approved members" },
] as const;

export const DEMO_ORDERS = [
  { id: "LX-24081", customer: "Aarav Mehta", items: 2, total: 234000, status: "Delivered", date: "2026-07-18", channel: "WhatsApp" },
  { id: "LX-24082", customer: "Priya Sharma", items: 1, total: 89000, status: "Packed", date: "2026-07-19", channel: "Web" },
  { id: "LX-24083", customer: "Rohan Verma", items: 3, total: 512000, status: "Confirmed", date: "2026-07-20", channel: "WhatsApp" },
  { id: "LX-24084", customer: "Ananya Iyer", items: 1, total: 68000, status: "Pending", date: "2026-07-21", channel: "Web" },
  { id: "LX-24085", customer: "Kabir Kapoor", items: 2, total: 156000, status: "Pending", date: "2026-07-21", channel: "WhatsApp" },
  { id: "LX-24086", customer: "Meera Nair", items: 1, total: 340000, status: "Delivered", date: "2026-07-15", channel: "Web" },
] as const;

export const DEMO_CUSTOMERS = [
  { id: "C-001", name: "Aarav Mehta", email: "aarav@example.com", city: "Mumbai", orders: 4, spent: 512000 },
  { id: "C-002", name: "Priya Sharma", email: "priya@example.com", city: "Delhi", orders: 2, spent: 178000 },
  { id: "C-003", name: "Rohan Verma", email: "rohan@example.com", city: "Bengaluru", orders: 6, spent: 1245000 },
  { id: "C-004", name: "Ananya Iyer", email: "ananya@example.com", city: "Chennai", orders: 1, spent: 68000 },
  { id: "C-005", name: "Kabir Kapoor", email: "kabir@example.com", city: "Pune", orders: 3, spent: 289000 },
  { id: "C-006", name: "Meera Nair", email: "meera@example.com", city: "Kochi", orders: 5, spent: 890000 },
] as const;

export const DEMO_REVIEWS = [
  { name: "Ishaan Roy", city: "Mumbai", text: "The unboxing alone felt like a Bond film. The watch has become a permanent part of me.", rating: 5 },
  { name: "Aditi Rao", city: "Bengaluru", text: "Every stitch tells a story. Luxora is now my only stop for occasion pieces.", rating: 5 },
  { name: "Vikram Bose", city: "Delhi", text: "Personal service via WhatsApp was faster and warmer than any boutique I've visited.", rating: 5 },
  { name: "Sana Malik", city: "Hyderabad", text: "The Private Collection is genuinely private — and genuinely extraordinary.", rating: 5 },
] as const;

export const REVENUE_SERIES = [
  { m: "Feb", v: 820 }, { m: "Mar", v: 1120 }, { m: "Apr", v: 980 },
  { m: "May", v: 1450 }, { m: "Jun", v: 1720 }, { m: "Jul", v: 2140 },
];
