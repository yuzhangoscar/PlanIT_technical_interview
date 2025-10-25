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
    }
}