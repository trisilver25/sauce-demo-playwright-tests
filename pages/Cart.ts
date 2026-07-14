import { Page, Locator } from "@playwright/test";

export class Cart {
  // Initial Cart Page
  page: Page;

  // Locators
  readonly cont_shopping_btn: Locator;
  readonly checkout_btn: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;
    this.cont_shopping_btn = page.locator("[data-test='continue-shopping']");
    this.checkout_btn = page.locator("[data-test='checkout']");
  }
}
