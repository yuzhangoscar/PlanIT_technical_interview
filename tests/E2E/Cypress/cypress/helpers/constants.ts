interface CartItemDetails {
    price: number;
    quantity: number;
    subtotal: number;
}

export interface CartSummary {
    [productName: string]: CartItemDetails;
}

export const ErrorMessages = {
  Forename: 'Forename is required',
  Email: 'Email is required',
  Message: 'Message is required'
};

export const URLS = {
  Home: 'https://jupiter.cloud.planittesting.com/#/',
  Contact: 'https://jupiter.cloud.planittesting.com/#/contact',
  Shop: 'https://jupiter.cloud.planittesting.com/#/shop',
  Cart: 'https://jupiter.cloud.planittesting.com/#/cart'
} as const;

/**
 * Type representing valid page names for navigation
 */
export type PageName = keyof typeof URLS;

export const SuccessMessages = {
  submit: 'we appreciate your feedback.'
};

export const ValidProducts:string[] = [
  'Teddy Bear', 'Stuffed Frog', 'Handmade Doll', 'Fluffy Bunny',
  'Smiley Bear', 'Funny Cow', 'Valentine Bear', 'Smiley Face'
];

export const CURRENCY_SYMBOL:string = '$';

export const TIMEOUTS = {
  DEFAULT: 4000,
  LONG: 20000,
  SHORT: 2000
} as const;
