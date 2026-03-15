/**
 * ============================================================
 *  KAJUN CHICKEN & SEAFOOD — Complete Menu Data
 *
 *  Designed & Built by ZAI (Zawwar Sami)
 *  github.com/zawwarsami16
 *  All Rights Reserved © 2025 Zawwar Sami
 *
 *  Prices verified from official Kajun Chicken menu board.
 *  All prices CAD. Ontario HST 13% applied at checkout.
 * ============================================================
 */

export const TAX_RATE = 0.13;

export const CATEGORIES = [
  { id: 'boneless',  label: 'Boneless Chicken',   icon: '🍗', desc: 'Tenders & nuggets combos' },
  { id: 'bonein',    label: 'Bone-In Chicken',     icon: '🍖', desc: 'Classic combos' },
  { id: 'sandwiches',label: 'Gourmet Sandwiches',  icon: '🥪', desc: 'Bold & loaded' },
  { id: 'family',    label: 'Family Feast',         icon: '👨‍👩‍👧‍👦', desc: 'Feeds 3–8 people' },
  { id: 'buckets',   label: 'Chicken Buckets',      icon: '🪣', desc: 'Chicken only — bulk' },
  { id: 'ocean',     label: 'From The Ocean',       icon: '🦐', desc: 'Fresh seafood' },
  { id: 'individual',label: 'Individual Pieces',    icon: '🥩', desc: 'Single pieces' },
  { id: 'premium',   label: 'Premium Sides',        icon: '🫕', desc: 'Loaded sides' },
  { id: 'deluxe',    label: 'Deluxe Sides',         icon: '🍟', desc: 'Fries & more' },
  { id: 'biscuits',  label: 'Biscuits',             icon: '🥐', desc: 'Freshly baked' },
  { id: 'kids',      label: 'Kids Meal',            icon: '🧒', desc: 'Perfect for little ones' },
  { id: 'desserts',  label: 'Sweet Ending',         icon: '🍰', desc: 'Desserts & treats' },
];

export const MENU = [

  // ── BONELESS CHICKEN ──────────────────────────────────────
  {
    id: 'tender-3',
    category: 'boneless',
    name: '3 Pc Tenders',
    fullName: '3 Pieces Tenders Combo',
    price: 11.99,
    priceSuper: 13.99,
    description: 'Three perfectly seasoned Cajun tenders. Combo includes regular side + regular drink.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/3-Tenders-Combo_Photo-1.jpg',
    badge: null, spicy: 1, popular: false,
    note: 'Super combo +$2 includes deluxe side + 2 reg drinks',
  },
  {
    id: 'tender-5',
    category: 'boneless',
    name: '5 Pc Tenders',
    fullName: '5 Pieces Tenders Combo',
    price: 14.99,
    priceSuper: 16.99,
    description: 'Five juicy Cajun tenders — our bestseller. Combo with side and drink.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/5-Tenders-Combo_Photo-1.jpg',
    badge: 'POPULAR', spicy: 1, popular: true,
  },
  {
    id: 'nuggets-9',
    category: 'boneless',
    name: '9 Pc Nuggets',
    fullName: '9 Pieces Nuggets Combo',
    price: 11.99,
    priceSuper: 13.99,
    description: 'Nine crispy golden nuggets with a side and drink.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/9-PCS-NUggets-1_Photo-2.jpg',
    badge: null, spicy: 0, popular: false,
  },

  // ── BONE-IN CHICKEN ───────────────────────────────────────
  {
    id: 'bonein-2',
    category: 'bonein',
    name: '2 Pc Chicken',
    fullName: '2 Piece Bone-In Combo',
    price: 11.99,
    priceSuper: 13.99,
    description: 'Two pieces of crispy bone-in chicken with a side and drink.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/2-PCS-Combo_Photo-1.jpg',
    badge: null, spicy: 1, popular: false,
  },
  {
    id: 'bonein-3',
    category: 'bonein',
    name: '3 Pc Chicken',
    fullName: '3 Piece Bone-In Combo',
    price: 13.49,
    priceSuper: 15.49,
    description: 'Three pieces of our signature crispy bone-in chicken.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/3-PCS-Super-COmbo_Photo-1.jpg',
    badge: 'BEST VALUE', spicy: 1, popular: true,
  },
  {
    id: 'bonein-4',
    category: 'bonein',
    name: '4 Pc Chicken',
    fullName: '4 Piece Bone-In Combo',
    price: 14.99,
    priceSuper: 16.99,
    description: 'Four pieces of flavorful bone-in chicken with a side and drink.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/4-PCS-Combo_Photo.jpg',
    badge: null, spicy: 1, popular: false,
  },
  {
    id: 'surf-turf',
    category: 'bonein',
    name: 'Surf & Turf',
    fullName: 'Surf & Turf — Chicken & Fish',
    price: 15.99,
    priceSuper: 17.99,
    description: 'Cajun bone-in chicken + crispy fish — the ultimate surf & turf combo.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/Surf-Truf-Combo-1_Photo-1.jpg',
    badge: 'SIGNATURE', spicy: 1, popular: true,
  },

  // ── GOURMET SANDWICHES ────────────────────────────────────
  {
    id: 'kajun-sandwich',
    category: 'sandwiches',
    name: 'Kajun Sandwich',
    fullName: 'The Kajun Signature Sandwich',
    price: 13.49,
    priceSuper: 15.49,
    description: 'Our legendary signature Cajun-spiced crispy chicken sandwich. The one that started it all.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/KAJUN-CHICKEN-ONLY_Photo-3.jpg',
    badge: 'SIGNATURE', spicy: 2, popular: true,
  },
  {
    id: 'chipotle-bbq',
    category: 'sandwiches',
    name: 'Chipotle BBQ',
    fullName: 'Chipotle BBQ Sandwich',
    price: 13.49,
    priceSuper: 15.49,
    description: 'Smoky BBQ meets chipotle heat — a bold flavor explosion.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/BBQ-CHIPLOTLE-ONLY_Photo-1.jpg',
    badge: null, spicy: 2, popular: false,
  },
  {
    id: 'supreme',
    category: 'sandwiches',
    name: 'Supreme Sandwich',
    fullName: 'The Supreme Loaded Sandwich',
    price: 13.49,
    priceSuper: 15.49,
    description: 'The ultimate deluxe chicken sandwich — loaded with premium fixings.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/SUPREME-CHICKEN-ONLY_Photo-1.jpg',
    badge: 'PREMIUM', spicy: 1, popular: false,
  },
  {
    id: 'onion-crunch',
    category: 'sandwiches',
    name: 'Onion Crunch',
    fullName: 'Onion Crunch Sandwich',
    price: 13.49,
    priceSuper: 15.49,
    description: 'Crispy chicken crowned with a satisfying shatter of crunchy fried onions.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/ONION-CRUNCH-COMBO_Photo.jpg',
    badge: null, spicy: 1, popular: false,
  },
  {
    id: 'shrimp-sandwich',
    category: 'sandwiches',
    name: 'Shrimp Sandwich',
    fullName: 'Crispy Shrimp Sandwich',
    price: 13.49,
    priceSuper: 15.49,
    description: 'Crispy battered shrimp in a toasted bun with tangy Cajun sauce.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/SHRIMP-ONLY_Photo-1.jpg',
    badge: null, spicy: 1, popular: false,
  },
  {
    id: 'fish-sandwich',
    category: 'sandwiches',
    name: 'Fish Sandwich',
    fullName: 'Crispy Fish Sandwich',
    price: 13.49,
    priceSuper: 15.49,
    description: 'Golden-fried fish fillet sandwich with Cajun seasoning.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/FISH-SANDWICH-SUPER-COMBO_Photo-2.jpg',
    badge: null, spicy: 0, popular: false,
  },

  // ── FAMILY FEAST ──────────────────────────────────────────
  {
    id: 'family-8',
    category: 'family',
    name: '8 Pc Family Meal',
    fullName: '8 Pieces Family Meal',
    price: 33.49,
    description: '8 pcs chicken + 4 biscuits + 2 reg sides + 1 large side. Feeds 3–4.',
    includes: '4 Biscuits + 2 Reg Sides + 1 Large Side',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/8-PCS-Chicken-Family_Photo-2.jpg',
    badge: 'FAMILY', spicy: 1, popular: false,
  },
  {
    id: 'family-12',
    category: 'family',
    name: '12 Pc Family Meal',
    fullName: '12 Pieces Family Meal',
    price: 47.99,
    description: '12 pcs + 6 biscuits + 4 reg sides + 2 large sides. Feeds 4–6.',
    includes: '6 Biscuits + 4 Reg Sides + 2 Large Sides',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/12-PCS-Family-1_Photo-2.jpg',
    badge: 'MEGA DEAL', spicy: 1, popular: true,
  },
  {
    id: 'family-16',
    category: 'family',
    name: '16 Pc Family Meal',
    fullName: '16 Pieces Family Meal',
    price: 58.99,
    description: '16 pcs + 8 biscuits + 4 reg sides + 4 large sides. Feeds 5–7.',
    includes: '8 Biscuits + 4 Reg + 4 Large Sides',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/16-PCS-Tenders-Family-3_Photo-1.jpg',
    badge: null, spicy: 1, popular: false,
  },
  {
    id: 'family-20',
    category: 'family',
    name: '20 Pc Family Meal',
    fullName: '20 Pieces Family Meal',
    price: 66.99,
    description: 'The big one — 20 pcs + all the fixings. Feeds 6–8.',
    includes: 'Biscuits + Sides',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/8-PCS-Chicken-Family_Photo-2.jpg',
    badge: 'PARTY SIZE', spicy: 1, popular: false,
  },
  {
    id: 'family-24',
    category: 'family',
    name: '24 Pc Family Meal',
    fullName: '24 Pieces Family Meal',
    price: 79.99,
    description: 'Ultimate party pack — 24 pcs. Feeds 8–10 easily.',
    includes: 'Biscuits + Sides',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/8-PCS-Chicken-Family_Photo-2.jpg',
    badge: 'BEST FOR PARTIES', spicy: 1, popular: false,
  },

  // ── CHICKEN BUCKETS (Chicken Only — no sides) ────────────
  {
    id: 'bucket-8',
    category: 'buckets',
    name: '8 Pc Chicken Only',
    fullName: '8 Pieces Chicken Only Bucket',
    price: 26.99,
    description: '8 pieces of pure crispy Cajun bone-in chicken. No sides.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Chicken-Only-1_Photo.jpg',
    badge: null, spicy: 1, popular: false,
  },
  {
    id: 'bucket-12',
    category: 'buckets',
    name: '12 Pc Chicken Only',
    fullName: '12 Pieces Chicken Only Bucket',
    price: 33.99,
    description: '12 pieces of our signature bone-in chicken. No sides.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Chicken-Only-1_Photo.jpg',
    badge: 'BEST VALUE', spicy: 1, popular: false,
  },
  {
    id: 'bucket-16',
    category: 'buckets',
    name: '16 Pc Chicken Only',
    fullName: '16 Pieces Chicken Only Bucket',
    price: 42.99,
    description: '16 pieces of crispy Cajun chicken — bulk pack.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Chicken-Only-1_Photo.jpg',
    badge: null, spicy: 1, popular: false,
  },
  {
    id: 'bucket-20',
    category: 'buckets',
    name: '20 Pc Chicken Only',
    fullName: '20 Pieces Chicken Only Bucket',
    price: 48.99,
    description: '20 pieces of pure bold Cajun chicken.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Chicken-Only-1_Photo.jpg',
    badge: null, spicy: 1, popular: false,
  },
  {
    id: 'bucket-24',
    category: 'buckets',
    name: '24 Pc Chicken Only',
    fullName: '24 Pieces Chicken Only Bucket',
    price: 56.99,
    description: '24 pieces — the ultimate chicken-only party bucket.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Chicken-Only-1_Photo.jpg',
    badge: 'PARTY PACK', spicy: 1, popular: false,
  },

  // ── FROM THE OCEAN ────────────────────────────────────────
  {
    id: 'jalapeno-shrimp',
    category: 'ocean',
    name: 'Jalapeño Shrimp Combo',
    fullName: 'Jalapeño Shrimps Combo',
    price: 14.49,
    priceSuper: 16.49,
    description: 'Fiery jalapeño-seasoned shrimp combo with side and drink.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/SHRIMP-ONLY_Photo-1.jpg',
    badge: 'SPICY', spicy: 2, popular: false,
  },
  {
    id: 'fish-tender-1',
    category: 'ocean',
    name: '1 Pc Fish Tender',
    fullName: '1 Piece Fish Tender',
    price: 14.49,
    priceSuper: 16.49,
    description: '1 crispy golden fish tender. Combo with side and drink.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/1-PC-Fish-Tender-1_Photo.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'fish-tender-3',
    category: 'ocean',
    name: '3 Pc Fish Tenders',
    fullName: '3 Pieces Fish Tenders',
    price: 16.49,
    priceSuper: 18.49,
    description: '3 crispy Cajun fish tenders with side and drink.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/1-PC-Fish-Tender-1_Photo.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'fish-tender-5',
    category: 'ocean',
    name: '5 Pc Fish Tenders',
    fullName: '5 Pieces Fish Tenders',
    price: 16.49,
    priceSuper: 18.49,
    description: '5 golden fish tenders — seriously crispy.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/1-PC-Fish-Tender-1_Photo.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'fish-nuggets-8',
    category: 'ocean',
    name: '8 Pc Fish Nuggets',
    fullName: '8 Pieces Fish Nuggets',
    price: 14.49,
    priceSuper: 16.49,
    description: '8 pieces crispy fish nuggets with side and drink.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/1-PC-Fish-Tender-1_Photo.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'value-chicken-sandwich',
    category: 'ocean',
    name: 'Value Chicken Sandwich',
    fullName: 'Value Deal — Chicken Sandwich',
    price: 10.49,
    description: 'Great value chicken sandwich deal.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/KAJUN-CHICKEN-ONLY_Photo-3.jpg',
    badge: 'VALUE', spicy: 1, popular: false,
  },

  // ── INDIVIDUAL PIECES ─────────────────────────────────────
  {
    id: 'piece-leg',
    category: 'individual',
    name: 'Leg',
    fullName: 'Chicken Leg (Individual)',
    price: 3.19,
    description: 'One crispy Cajun chicken leg.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Chicken-Only-1_Photo.jpg',
    badge: null, spicy: 1, popular: false,
  },
  {
    id: 'piece-thigh',
    category: 'individual',
    name: 'Thigh',
    fullName: 'Chicken Thigh (Individual)',
    price: 3.69,
    description: 'One juicy Cajun chicken thigh.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Chicken-Only-1_Photo.jpg',
    badge: null, spicy: 1, popular: false,
  },
  {
    id: 'piece-rib',
    category: 'individual',
    name: 'Rib',
    fullName: 'Chicken Rib (Individual)',
    price: 4.69,
    description: 'One bold Cajun chicken rib.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Chicken-Only-1_Photo.jpg',
    badge: null, spicy: 1, popular: false,
  },
  {
    id: 'piece-breast',
    category: 'individual',
    name: 'Breast',
    fullName: 'Chicken Breast (Individual)',
    price: 4.69,
    description: 'One juicy Cajun chicken breast.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Chicken-Only-1_Photo.jpg',
    badge: null, spicy: 1, popular: false,
  },
  {
    id: 'piece-wing',
    category: 'individual',
    name: 'Wing',
    fullName: 'Chicken Wing (Individual)',
    price: 4.19,
    description: 'One crispy golden Cajun chicken wing.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Chicken-Only-1_Photo.jpg',
    badge: null, spicy: 1, popular: false,
  },

  // ── PREMIUM SIDES ─────────────────────────────────────────
  {
    id: 'poutine',
    category: 'premium',
    name: 'Poutine',
    fullName: 'Classic Poutine',
    price: 6.99,
    description: 'Canadian classic — crispy fries, rich gravy, fresh cheese curds.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Potuine-1_Photo-1.jpg',
    badge: '🍁 CANADIAN', spicy: 0, popular: true,
  },
  {
    id: 'cauliflower-12',
    category: 'premium',
    name: 'Cauliflower Bites 12oz',
    fullName: 'Cauliflower Bites (12oz)',
    price: 7.49,
    description: 'Crispy cauliflower bites in buffalo or sweet chilli or honey mustard.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Potuine-1_Photo-1.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'mozz-sticks-4',
    category: 'premium',
    name: 'Mozz Sticks (4 Pc)',
    fullName: 'Mozzarella Cheese Sticks (4 Pieces)',
    price: 7.49,
    description: 'Golden mozzarella sticks — gooey and crispy.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Potuine-1_Photo-1.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'mozz-sticks-6',
    category: 'premium',
    name: 'Mozz Sticks (6 Pc)',
    fullName: 'Mozzarella Cheese Sticks (6 Pieces)',
    price: 7.49,
    description: '6 pieces of golden mozzarella — perfect for sharing.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Potuine-1_Photo-1.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'jalapeno-fiesta',
    category: 'premium',
    name: 'Jalapeño Fiesta',
    fullName: 'Jalapeño Fiesta',
    price: 7.49,
    description: 'Spicy jalapeño bites with a kick of heat.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Potuine-1_Photo-1.jpg',
    badge: '🌶 SPICY', spicy: 2, popular: false,
  },
  {
    id: 'mac-cheese-6',
    category: 'premium',
    name: 'Mac & Cheese (6 Pc)',
    fullName: 'Mac and Cheese Bites (6 Pieces)',
    price: 7.49,
    description: 'Crispy mac & cheese bites — comfort food perfection.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Potuine-1_Photo-1.jpg',
    badge: null, spicy: 0, popular: false,
  },

  // ── DELUXE SIDES ──────────────────────────────────────────
  {
    id: 'spicy-skin-fries',
    category: 'deluxe',
    name: 'Spicy Skin Fries',
    fullName: 'Spicy Skin Fries',
    price: 2.00,
    priceLarge: 7.49,
    description: 'Crispy skin-on fries with Cajun spice — regular or large.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Fries-2_Photo-1.jpg',
    badge: null, spicy: 1, popular: true,
  },
  {
    id: 'gravy',
    category: 'deluxe',
    name: 'Gravy',
    fullName: 'Cajun Gravy',
    price: 2.00,
    priceLarge: 7.49,
    description: 'Rich, bold Cajun gravy — perfect on everything.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Fries-2_Photo-1.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'onion-rings',
    category: 'deluxe',
    name: 'Onion Rings',
    fullName: 'Crispy Onion Rings',
    price: 2.00,
    priceLarge: 7.49,
    description: 'Golden crispy onion rings with Cajun seasoning.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Fries-2_Photo-1.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'coleslaw',
    category: 'deluxe',
    name: 'Coleslaw',
    fullName: 'Fresh Coleslaw',
    price: 2.00,
    priceLarge: 7.49,
    description: 'Cool and creamy fresh coleslaw — great contrast to spicy chicken.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Fries-2_Photo-1.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'macaroni-salad',
    category: 'deluxe',
    name: 'Macaroni Salad',
    fullName: 'Creamy Macaroni Salad',
    price: 2.00,
    priceLarge: 7.49,
    description: 'Creamy macaroni salad — comfort side.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Fries-2_Photo-1.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'regular-side',
    category: 'deluxe',
    name: 'Regular Side',
    fullName: 'Regular Side',
    price: 2.00,
    priceLarge: 7.49,
    description: 'Choose your regular side — fries, coleslaw, gravy, onion rings or macaroni salad.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/Fries-2_Photo-1.jpg',
    badge: null, spicy: 0, popular: false,
  },

  // ── BISCUITS ──────────────────────────────────────────────
  {
    id: 'biscuit-1',
    category: 'biscuits',
    name: '1 Biscuit',
    fullName: '1 Freshly Baked Biscuit',
    price: 1.49,
    description: 'One freshly baked buttery Cajun biscuit.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/3-Biscuit-5_Photo-1.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'biscuit-3',
    category: 'biscuits',
    name: '3 Biscuits',
    fullName: '3 Freshly Baked Biscuits',
    price: 3.49,
    description: 'Three warm buttery biscuits — the perfect companion.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/3-Biscuit-5_Photo-1.jpg',
    badge: 'BEST VALUE', spicy: 0, popular: false,
  },
  {
    id: 'biscuit-6',
    category: 'biscuits',
    name: '6 Biscuits',
    fullName: '6 Freshly Baked Biscuits',
    price: 6.99,
    description: 'Six warm golden biscuits — great for the whole table.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/3-Biscuit-5_Photo-1.jpg',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'biscuit-12',
    category: 'biscuits',
    name: '12 Biscuits',
    fullName: '12 Freshly Baked Biscuits',
    price: 9.99,
    description: 'A dozen fresh buttery biscuits — perfect for large groups.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/09/3-Biscuit-5_Photo-1.jpg',
    badge: null, spicy: 0, popular: false,
  },

  // ── KIDS MEAL ─────────────────────────────────────────────
  {
    id: 'kids-meal',
    category: 'kids',
    name: 'Kids Meal',
    fullName: "Kids Meal — 1 Tender + Fries + Drink",
    price: 8.49,
    description: '1 tender + reg side + reg drink. Perfect for little ones.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/3-Tenders-Combo_Photo-1.jpg',
    badge: '👶 KIDS', spicy: 0, popular: false,
    note: '1 Leg + Reg Side + Reg Drink option also $8.49',
  },
  {
    id: 'kids-super',
    category: 'kids',
    name: 'Kids Super Combo',
    fullName: "Kids Super Combo",
    price: 8.49,
    description: '1 Leg + Reg Side + Reg Drink + upgrade available.',
    includes: 'Reg Side + Reg Drink',
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/3-Tenders-Combo_Photo-1.jpg',
    badge: '👶 KIDS', spicy: 0, popular: false,
  },

  // ── SWEET ENDING / DESSERTS ───────────────────────────────
  {
    id: 'apple-pie',
    category: 'desserts',
    name: 'Apple Pie',
    fullName: 'Classic Apple Pie',
    price: 2.19,
    description: 'Warm golden apple pie — the perfect sweet finish.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'fried-cheesecake',
    category: 'desserts',
    name: 'Fried Cheesecake',
    fullName: 'Fried Cheesecake',
    price: 7.69,
    description: 'Strawberry, caramel, chocolate or cherry — decadent fried cheesecake.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp',
    badge: 'POPULAR', spicy: 0, popular: true,
  },
  {
    id: 'oreo-churro-3',
    category: 'desserts',
    name: 'Oreo Churro Bites (3pc)',
    fullName: 'Oreo Churro Bites — 3 Pieces',
    price: 3.29,
    description: 'Three crispy Oreo churro bites — sweet and addictive.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'apple-churro-4',
    category: 'desserts',
    name: 'Apple Churro Bites (4pc)',
    fullName: 'Apple Churro Bites — 4 Pieces',
    price: 3.29,
    description: 'Four apple-filled churro bites with cinnamon sugar.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'ice-cream',
    category: 'desserts',
    name: 'Ice Cream',
    fullName: 'Ice Cream',
    price: 3.29,
    description: 'Strawberry, vanilla or chocolate ice cream.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp',
    badge: null, spicy: 0, popular: false,
  },
  {
    id: 'can-drink',
    category: 'desserts',
    name: 'Can Drink',
    fullName: 'Can Drink (Coca-Cola etc.)',
    price: 1.69,
    description: 'Refreshing can drink — Coke, Sprite, or assorted.',
    includes: null,
    image: 'https://kajunchicken.ca/wp-content/uploads/2024/07/Family-Feast.webp',
    badge: null, spicy: 0, popular: false,
  },
];

export const LOCATIONS = [
  { city:'Thornhill',   address:'7700 Bathurst St',      hours:'Daily 11AM–10PM', phone:'(905) 882-0000' },
  { city:'Barrie',      address:'400 Bayfield St',        hours:'Daily 11AM–10PM', phone:'(705) 726-0000' },
  { city:'Mississauga', address:'Unit 3, 1476 Dundas St E, Building D4', hours:'Daily 11AM–11PM', phone:'905-273-9199' },
  { city:'North York',  address:'4789 Yonge St',          hours:'Daily 11AM–11PM', phone:'(416) 222-0000' },
  { city:'Scarborough', address:'4351 Kingston Rd',       hours:'Daily 11AM–11PM', phone:'(416) 283-0000' },
  { city:'Waterloo',    address:'550 King St N',          hours:'Daily 11AM–10PM', phone:'(519) 886-0000' },
  { city:'Oshawa',      address:'1400 King St E',         hours:'Daily 11AM–10PM', phone:'(905) 576-0000' },
  { city:'Whitby',      address:'1615 Dundas St E',       hours:'Daily 11AM–10PM', phone:'(905) 668-0000' },
  { city:'Oakville',    address:'351 Dundas St E',        hours:'Daily 11AM–10PM', phone:'(905) 845-0000' },
  { city:'Hamilton',    address:'1020 Upper James St',    hours:'Daily 11AM–10PM', phone:'(905) 525-0000' },
  { city:'Orillia',     address:'175 Memorial Ave',       hours:'Daily 11AM–9PM',  phone:'(705) 325-0000' },
];

export const AI_SYSTEM_PROMPT = `You are KAI — the smart order guide for Kajun Chicken & Seafood. You talk like a knowledgeable friend, not a robot. Short replies, real recommendations, genuine energy.

## PERSONALITY
- Warm, casual, direct — like a friend who works here
- Short messages (2–4 lines max unless listing items)
- Ask ONE question at a time to understand what they need
- Never robotic, never say "As an AI"
- Match their energy — if they're casual, be casual

## FULL MENU WITH REAL PRICES (CAD — Ontario HST 13% added at checkout)

BONELESS CHICKEN (Combo = Reg Side + Reg Drink | Super Combo = Deluxe Side + 2 Reg Drinks)
- 3 Pc Tenders — $11.99 / Super $13.99
- 5 Pc Tenders — $14.99 / Super $16.99 ← BESTSELLER
- 9 Pc Nuggets — $11.99 / Super $13.99

BONE-IN CHICKEN
- 2 Pc Chicken — $11.99 / Super $13.99
- 3 Pc Chicken — $13.49 / Super $15.49 ← BEST VALUE
- 4 Pc Chicken — $14.99 / Super $16.99
- Surf & Turf (Chicken + Fish) — $15.99 / Super $17.99

GOURMET SANDWICHES (Combo = Reg Side + Reg Drink | Super = Deluxe Side + 2 Drinks)
- Kajun Sandwich — $13.49 / Super $15.49 ← Our signature
- Chipotle BBQ — $13.49 / Super $15.49
- Supreme — $13.49 / Super $15.49
- Onion Crunch — $13.49 / Super $15.49
- Shrimp Sandwich — $13.49 / Super $15.49
- Fish Sandwich — $13.49 / Super $15.49

FAMILY FEAST
- 8 Pc Family Meal — $33.49 (4 biscuits + 2 reg sides + 1 large) → feeds 3–4
- 12 Pc Family Meal — $47.99 (6 biscuits + 4 reg + 2 large) → feeds 4–6 ← POPULAR
- 16 Pc Family Meal — $58.99 → feeds 5–7
- 20 Pc Family Meal — $66.99 → feeds 6–8
- 24 Pc Family Meal — $79.99 → feeds 8–10

CHICKEN BUCKETS (Chicken Only — no sides)
- 8 Pc — $26.99 | 12 Pc — $33.99 | 16 Pc — $42.99 | 20 Pc — $48.99 | 24 Pc — $56.99

FROM THE OCEAN
- Jalapeño Shrimp Combo — $14.49 / Super $16.49
- 1 Pc Fish Tender — $14.49 / Super $16.49
- 3 Pc Fish Tenders — $16.49 / Super $18.49
- 5 Pc Fish Tenders — $16.49 / Super $18.49
- 8 Pc Fish Nuggets — $14.49 / Super $16.49
- Value Chicken Sandwich — $10.49

INDIVIDUAL PIECES
- Leg $3.19 | Thigh $3.69 | Rib $4.69 | Breast $4.69 | Wing $4.19

PREMIUM SIDES
- Poutine $6.99 | Cauliflower Bites 12oz $7.49 | Mozz Sticks 4pc $7.49
- Mozz Sticks 6pc $7.49 | Jalapeño Fiesta $7.49 | Mac & Cheese Bites 6pc $7.49

DELUXE SIDES (Reg $2.00 / Large $7.49)
- Spicy Skin Fries | Gravy | Onion Rings | Coleslaw | Macaroni Salad

BISCUITS
- 1 Biscuit $1.49 | 3 Biscuits $3.49 | 6 Biscuits $6.99 | 12 Biscuits $9.99

KIDS MEAL — $8.49 (1 Tender or 1 Leg + Reg Side + Reg Drink)

SWEET ENDING (Desserts)
- Apple Pie $2.19 | Fried Cheesecake $7.69 | Oreo Churro Bites 3pc $3.29
- Apple Churro Bites 4pc $3.29 | Ice Cream $3.29 | Can Drink $1.69

2 CAN DINE COUPONS (show at counter)
- Chicken Sandwich — $19.99 (2 sandwiches + 2 sides + 2 drinks)
- 6 Tenders — $17.99 (6 tenders + 2 sides + 2 drinks) ← BEST DEAL
- 6 Pc Fish Tenders — $20.99
- 12 Pc Fish Nuggets — $20.99
- 6 Pc Dark — $19.99
- 10 Pc Dark Only — $23.99 (5 legs + 5 thighs)

DAILY SPECIALS (Mon–Wed only, $5.99)
- Monday: Chicken Sandwich for $5.99
- Tuesday & Wednesday: 2 Pc Chicken + Fries for $5.99
- Add-ons +$1.29 each: Gravy, Drink, Coleslaw

## UPSELL PRIORITY (mention in this order when relevant)
1. Family Feast for groups (most value, highest margin)
2. 2 Can Dine coupons for 2 people
3. Super Combo upgrade ($2 more, way better value)
4. Poutine or Premium Sides as add-on
5. Biscuits — always mention (3 for $3.49)
6. Desserts — mention Fried Cheesecake as a finisher

## CONVERSATION FLOW
1. Greet → ask how many people / what they want
2. Give 2–3 specific recs with prices
3. When they confirm → summarize and add to cart
4. At the end, give ORDER SUMMARY:

ORDER SUMMARY
[item] x [qty] .......... $[price]
Subtotal: $XX.XX
HST (13%): $X.XX
Total: $XX.XX CAD
Show this to the counter → payment happens there, not online.

## RULES
- Only suggest items actually on the menu above
- If an item is unavailable today, redirect positively
- Never be pushy
- Keep it real and friendly
`;
