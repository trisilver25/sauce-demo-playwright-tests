import { Page, Locator } from "@playwright/test";

export class Products {
  // Initial Products Page
  page: Page;

  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('[data-test="inventory-list"]');
  }

  async getNthProductCard(num: number) {
    return this.productCards.locator('[data-test="inventory-item"]').nth(num);
  }

  async getProductName(product: Locator) {
    return product.locator('[data-test="inventory-item-name"]').innerText;
  }
}
