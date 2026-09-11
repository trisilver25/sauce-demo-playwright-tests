import { test, expect } from "@playwright/test";
import { Products } from "../pages/Products";
import { Cart } from "../pages/Cart";

test("Verify the product name in the cart match the product added from the Products page", async ({
  page,
}) => {
  // Go to products page
  await page.goto("/inventory.html");

  const ProductsPage = new Products(page);

  // Retrieve the first product item
  const firstProductCard = await ProductsPage.getNthProductCard(0);

  // Store the products name from the 1st product card.
  const firstProductName = await firstProductCard
    .locator(".inventory_item_name")
    .first()
    .textContent()!;

  // Store the add to cart button from the 1st product card.
  const firstButton = firstProductCard.getByRole("button", {
    name: "Add to cart",
  });

  // Click "Add to Cart"
  await firstButton.click();

  // Confirm the "1" displays in the cart button notification
  await expect(ProductsPage.shoppingCartBtn).toHaveText("1");

  // Click "Shopping Cart"
  await ProductsPage.clickShoppingCartBtn();

  // Pull the recently added cart item's name.
  const cartProductName = await page
    .getByTestId("inventory-item-name")
    .first()
    .textContent();

  // Confirm the 1st product name matches the cart name
  await expect(firstProductName).toEqual(cartProductName);
});

test("Remove an item from the cart", async ({ page }) => {
  // Go to products page
  await page.goto("/inventory.html");

  const ProductsPage = new Products(page);

  // Retrieve the first product item
  const firstProductCard = await ProductsPage.getNthProductCard(0);

  // Store the add to cart button from the 1st product card.
  const firstButton = firstProductCard.getByRole("button", {
    name: "Add to cart",
  });

  // Click "Add to Cart"
  await firstButton.click();

  await ProductsPage.clickShoppingCartBtn();

  // Click "Remove" on the first Cart item
  await page
    .getByRole("button", {
      name: "Remove",
    })
    .first()
    .click();

  // Verify Inventory item is no longer visible
  await expect(page.getByTestId("inventory-item")).toBeHidden();
});

test("Verify Cont Shopping Button", async ({ page }) => {
  await page.goto("/cart.html");

  // Create a cart pom
  const CartPage = new Cart(page);

  // Click Continue Shopping Button
  await CartPage.clickContShpBtn();

  // Verify user is brought back to Inventory Page
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test("Verify Checkout button functions", async ({ page }) => {
  await page.goto("/cart.html");

  // Create a cart pom
  const CartPage = new Cart(page);

  // Click Checkout Button
  CartPage.clickCheckoutBtn();

  // Verify user is brought to check out page
  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );
});
