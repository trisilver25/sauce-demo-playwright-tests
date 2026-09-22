import { test as base, expect } from "@playwright/test";
import { Login } from "../pages/Login";
import { Products } from "../pages/Products";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";

// Declare fixtures
type SauceFixtures = {
  loginPage: Login;
  productsPage: Products;
  cartPage: Cart;
  checkoutPage: Checkout;
};

export const test = base.extend<SauceFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up
    const loginPage = new Login(page);
    await loginPage.goto();

    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new Products(page);
    await productsPage.goto();

    await use(productsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new Cart(page);
    await cartPage.goto();

    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new Checkout(page);
    await checkoutPage.goto();

    await use(checkoutPage);
  },
});
export { expect } from "@playwright/test";
