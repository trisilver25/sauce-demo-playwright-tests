import { Page, Locator } from "@playwright/test";

export class Checkout {
  page: Page;

  // Locator
  readonly continueBtn;
  readonly error;

  constructor(page: Page) {
    this.page = page;
    this.continueBtn = page.locator('[data-test="continue"]');
    this.error = page.locator('[data-test="error"]');
  }

  async getErrorMessage() {
    return this.error.innerText();
  }
}
