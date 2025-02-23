export const LOCATORS = {
    login: {
        usernameInput: '[data-test="username"]',
        passwordInput: '[data-test="password"]',
        loginButton: '[data-test="login-button"]',
        errorMessage: '[data-test="error"]',
    },
    inventory: {
        addToCartBackpack: '[data-test="add-to-cart-sauce-labs-backpack"]',
        addToCartBikeLight: '[data-test="add-to-cart-sauce-labs-bike-light"]',
        removeBikeLight: '[data-test="remove-sauce-labs-bike-light"]',
        cartIcon: '.shopping_cart_link',
    },
    cart: {
        checkoutButton: '[data-test="checkout"]',
        cartItem: '.cart_item',
    },
    checkoutForm: {
        firstNameInput: '[data-test="firstName"]',
        lastNameInput: '[data-test="lastName"]',
        zipCodeInput: '[data-test="postalCode"]',
        continueButton: '[data-test="continue"]',
        errorMessage: '[data-test="error"]',
    },
    checkoutOverview: {
        finishButton: '[data-test="finish"]',
    },
    checkoutComplete: {
        completeHeader: '.complete-header',
    },
    logout: {
        menuButton: '#react-burger-menu-btn',
        logoutButton: '#logout_sidebar_link',
    },
};
