import { Locator } from "@playwright/test";

export class ProductCard {
  private readonly name: Locator;
  private readonly description: Locator;
  private readonly price: Locator;
  private readonly addToCartBtn: Locator;
  private readonly removeBtn: Locator;

  constructor(private readonly root: Locator) {
    this.root = root;
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
    this.addToCartBtn.click();
  }

  async clickRemove() {
    this.removeBtn.click();
  }

  async getDescription() {
    return this.description.innerText();
  }
}
