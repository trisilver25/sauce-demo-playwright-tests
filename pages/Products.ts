import { Page, Locator } from "@playwright/test";

export class Products {
  // Initial Products Page
  page: Page;

  readonly productCards: Locator;
  readonly dropDown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('[data-test="inventory-list"]');
    this.dropDown = page.locator('[data-test="product-sort-container"]');
  }

  async getProductCount() {
    return this.productCards.locator('[data-test="inventory-item"]').count();
  }

  async getNthProductCard(num: number) {
    return this.productCards.locator('[data-test="inventory-item"]').nth(num);
  }

  async getProductName(product: Locator) {
    return product.locator('[data-test="inventory-item-name"]').innerText();
  }

  async setDropDownFilter(option: string) {
    await this.dropDown.selectOption(option);
  }
}
