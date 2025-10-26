export const selectors = {
    contact_page: {
        Forename: 'input#forename',
        Forename_error_field: 'span#forename-err',
        surname: 'input#surname',
        Email: 'input#email',
        Email_error_field: 'span#email-err',
        telephone: 'input#telephone',
        Message: 'textarea#message',
        Message_error_field: 'span#message-err',
        submit: 'a.btn-primary:contains("Submit")',
    },
    navigation_menu: {
        home_page: 'a:contains("Home")',
        shop_page: 'a:contains("Shop")',
        contact_page: 'a:contains("Contact")',
        cart_page: 'a:contains("Cart")',
    },
    shop_page: {
        buy_button_for_product: 'a.btn-success:contains("Buy")',
        cart_counter: 'span.cart-count',
        product_title: 'h4.product-title',
        parent_element_of_product_title: 'div',
    }
}