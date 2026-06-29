import { Page, Locator } from "@playwright/test";

export class Products {
  // Initial Products Page
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
