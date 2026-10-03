import { Locator } from "@playwright/test";

export class ProductCard {
  private readonly name: Locator;
  private readonly description: Locator;
  private readonly price: Locator;
  private readonly addToCartBtn: Locator;
  private readonly removeBtn: Locator;

  constructor(private readonly root: Locator) {
    this.name = this.root.getByTestId("inventory-item-name");
    this.description = this.root.getByTestId("inventory-item-desc");
    this.price = this.root.getByTestId("inventory-item-price");
    this.addToCartBtn = this.root.getByRole("button", {
      name: "Add to cart",
    });
    this.removeBtn = this.root.getByRole("button", {
      name: "Remove",
    });
  }

  // to do add public methods
  async clickAddToCart() {
    await this.addToCartBtn.click();
  }

  async clickRemove() {
    await this.removeBtn.click();
  }

  async getDescription() {
    return this.description.innerText();
  }

  async getName() {
    return this.name.innerText();
  }

  async getPrice() {
    let price = this.price.innerText();

    return parseFloat((await price).slice(1, (await price).length));
  }
}
