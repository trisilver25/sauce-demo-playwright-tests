import { Page, Locator } from "@playwright/test";

export class Products {
  // Initial Products Page
  page: Page;

  readonly productCards: Locator;
  readonly dropDown: Locator;
  readonly burgerMenu: Locator;
  readonly about: Locator;
  readonly logout: Locator;
  readonly shoppingCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.getByTestId("inventory-container");
    this.dropDown = page.getByRole("combobox");
    this.burgerMenu = page.getByRole("button", {
      name: "Open Menu",
    });
    this.about = page.getByRole("link", {
      name: "About",
    });
    this.logout = page.getByRole("button", {
      name: "Logout",
    });
    this.shoppingCartBtn = this.page.getByTestId("shopping-cart-link");
  }

  async getProductCount() {
    return this.productCards.getByTestId("inventory-item").count();
  }

  async getNthProductCard(num: number) {
    return this.productCards.getByTestId("inventory-item").nth(num);
  }

  async getProductName(product: Locator) {
    return product.getByTestId("inventory-item-name").innerText();
  }

  async getAllProductPrices() {
    const rawPrices = await this.productCards
      .getByTestId("inventory-item-price")
      .allInnerTexts();
    return rawPrices.map((raw) => this.parsePrice(raw));
  }

  async setDropDownFilter(option: string) {
    await this.dropDown.selectOption(option);
  }

  async clickNavMenuBtn(name: string) {
    await this.burgerMenu.click();

    if (name.toLowerCase() === "about") {
      await this.about.click();

      return;
    }

    if (name.toLowerCase() === "logout") {
      await this.logout.click();

      return;
    }

    console.log(
      "The provided string does not match the expectation of this function",
    );
  }

  async clickShoppingCartBtn() {
    await this.shoppingCartBtn.click();
  }

  async getAllProductNames() {
    return this.productCards.getByTestId("inventory-item-name").allInnerTexts();
  }

  // Helper methods
  private parsePrice(raw: string): number {
    return Number(raw.replace(/[^\d.-]/g, ""));
  }
}
