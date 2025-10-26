export const selectors = {
  ContactPage: {
    Forename: 'input#forename',
    ForenameErrorField: 'span#forename-err',
    Surname: 'input#surname',
    Email: 'input#email',
    EmailErrorField: 'span#email-err',
    Telephone: 'input#telephone',
    Message: 'textarea#message',
    MessageErrorField: 'span#message-err',
    Submit: 'a.btn-primary:contains("Submit")'
  },
  NavigationMenu: {
    Home: 'a[href="#/home"]',
    Shop: 'a[href="#/shop"]',
    Contact: 'a[href="#/contact"]',
    Cart: 'a[href="#/cart"]'
  },
  ShopPage: {
    BuyButtonForProduct: 'a.btn-success:contains("Buy")',
    CartCounter: 'span.cart-count',
    ProductTitle: 'h4.product-title',
    ParentElementOfProductTitle: 'div',
    ItemInCatalog: 'li.product.ng-scope',
    Price: 'span.product-price'
  },
  CartPage: {
    CartTable: 'table.cart-items',
    CartRow: 'tr.cart-item.ng-scope',
    ProductName: 'td:nth-child(1)',
    Price: 'td:nth-child(2)',
    Quantity: 'td:nth-child(3) > input.input-mini',
    Subtotal: 'td:nth-child(4)'
  }
};
