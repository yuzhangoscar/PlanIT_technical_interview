interface cart_item_details {
    price: number;
    quantity: number;
    subtotal: number;
}

export interface cart_summary {
    [product_name: string]: cart_item_details;
}

export const error_messages = {
  forename: 'Forename is required',
  email: 'Email is required',
  message: 'Message is required'
};

export const URLS = {
  base_url: 'https://jupiter.cloud.planittesting.com/#/',
  contact_page: 'https://jupiter.cloud.planittesting.com/#/contact',
  shop_page: 'https://jupiter.cloud.planittesting.com/#/shop',
  cart_page: 'https://jupiter.cloud.planittesting.com/#/cart'
};

export const success_messages = {
  submit: 'we appreciate your feedback.'
};

export const valid_products:string[] = [
  'Teddy Bear', 'Stuffed Frog', 'Handmade Doll', 'Fluffy Bunny',
  'Smiley Bear', 'Funny Cow', 'Valentine Bear', 'Smiley Face'
];
