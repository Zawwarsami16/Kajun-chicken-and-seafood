/**
 * Designed & Built by ZAI (Zawwar Sami)
 * github.com/zawwarsami16
 * All Rights Reserved © 2025 Zawwar Sami
 */
// ============================================================
//  KAJUN — Deals Data  (from actual Kajun flyers)
// ============================================================

export const DAILY_SPECIALS = [
  {
    id: 'mon-sandwich',
    day: 'MON',
    dayFull: 'Monday',
    title: 'Chicken Sandwich Special',
    price: 5.99,
    description: 'Any chicken sandwich for only $5.99. Best deal of the week.',
    emoji: '🥪',
    color: '#c8102e',
    addons: [
      { name: 'Small Gravy', price: 1.29 },
      { name: 'Drink',       price: 1.29 },
      { name: 'Coleslaw',    price: 1.29 },
    ],
  },
  {
    id: 'tue-wed-chicken',
    day: 'TUE–WED',
    dayFull: 'Tuesday & Wednesday',
    title: '2 Pc Chicken + Fries',
    price: 5.99,
    description: '2 pieces of crispy bone-in chicken with golden fries — just $5.99.',
    emoji: '🍗',
    color: '#d4a017',
    addons: [
      { name: 'Small Gravy', price: 1.29 },
      { name: 'Drink',       price: 1.29 },
      { name: 'Coleslaw',    price: 1.29 },
    ],
  },
];

export const COUPONS = [
  {
    id: 'coupon-2cd-sandwich',
    tag: '2 CAN DINE',
    title: 'Chicken Sandwich',
    subtitle: 'Pick any 2 Chicken Sandwiches',
    includes: '2 Reg. Deluxe Sides + 2 Regular Drinks',
    price: 19.99,
    savings: 'Save ~$8',
    expires: 'December 31, 2025',
    emoji: '🥪',
    color: '#c8102e',
    featured: false,
  },
  {
    id: 'coupon-2cd-6tenders',
    tag: '2 CAN DINE',
    title: '6 Tenders',
    subtitle: '6 Chicken Tenders for 2 people',
    includes: '2 Reg. Deluxe Sides + 2 Regular Drinks',
    price: 17.99,
    savings: 'Best Deal',
    expires: 'December 31, 2025',
    emoji: '🍗',
    color: '#d4a017',
    featured: true,
  },
  {
    id: 'coupon-2cd-6fish',
    tag: '2 CAN DINE',
    title: '6 Pc Fish Tenders',
    subtitle: '6 crispy fish tenders for 2',
    includes: '2 Reg. Deluxe Sides + 2 Regular Drinks',
    price: 20.99,
    savings: 'Save ~$7',
    expires: 'December 31, 2025',
    emoji: '🦐',
    color: '#3182ce',
    featured: false,
  },
  {
    id: 'coupon-2cd-12nuggets',
    tag: '2 CAN DINE',
    title: '12 Pc Fish Nuggets',
    subtitle: '12 fish nuggets for 2 people',
    includes: '2 Reg. Deluxe Sides + 2 Regular Drinks',
    price: 20.99,
    savings: 'Save ~$8',
    expires: 'December 31, 2025',
    emoji: '🐟',
    color: '#38a169',
    featured: false,
  },
  {
    id: 'coupon-2cd-6dark',
    tag: '2 CAN DINE',
    title: '6 Pc Dark',
    subtitle: '6 pieces of dark chicken for 2',
    includes: '2 Reg. Deluxe Sides + 2 Regular Drinks',
    price: 19.99,
    savings: 'Save ~$6',
    expires: 'December 31, 2025',
    emoji: '🍖',
    color: '#805ad5',
    featured: false,
  },
  {
    id: 'coupon-10pc-dark',
    tag: 'MEGA DEAL',
    title: '10 Pc Dark Only',
    subtitle: '5 Legs + 5 Thighs — pure chicken',
    includes: 'No sides — all chicken!',
    price: 23.99,
    savings: 'Save ~$10',
    expires: 'December 31, 2025',
    emoji: '👑',
    color: '#dd6b20',
    featured: false,
  },
];
