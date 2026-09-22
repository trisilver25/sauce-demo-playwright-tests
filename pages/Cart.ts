import { Page, Locator } from "@playwright/test";

export class Cart {
  // Initial Cart Page
  page: Page;

  // Locators
  readonly contShopBtn: Locator;
  readonly checkoutBtn: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.contShopBtn = page.getByRole("button", {
      name: "Continue Shopping",
    });
    this.checkoutBtn = page.getByRole("button", {
      name: "Checkout",
    });
  }

  // Methods
  async goto() {
    await this.page.goto("/cart.html");
  }

  async clickContShpBtn() {
    await this.contShopBtn.click();
  }

  async clickCheckoutBtn() {
    await this.checkoutBtn.click();
  }
}
