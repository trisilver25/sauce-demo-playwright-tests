import { Page, Locator } from "@playwright/test";

export class Products {
  // Initial Products Page
  page: Page;

  readonly productCards: Locator;
  readonly dropDown: Locator;
  readonly burgerMenu: Locator;
  readonly about: Locator;
  readonly logout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('[data-test="inventory-list"]');
    this.dropDown = page.locator('[data-test="product-sort-container"]');
    this.burgerMenu = page.locator("#react-burger-menu-btn");
    this.about = page.locator("#about_sidebar_link");
    this.logout = page.locator("#logout_sidebar_link");
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

  async getProductPrice(product: Locator) {
    let raw = product.locator('[data-test="inventory-item-price"]').innerText();
    let num = Number((await raw).replace(/[^\d.-]/g, ""));
    return num;
  }

  async setDropDownFilter(option: string) {
    await this.dropDown.selectOption(option);
  }
}
