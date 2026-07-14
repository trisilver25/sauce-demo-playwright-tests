import { test, expect } from "@playwright/test";
import { Products } from "../pages/Products";
import { Cart } from "../pages/Cart";

test("Add a product to cart", async ({ page }) => {
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

  // Store shopping cart button to check the notification with an expect
  const cartButton = page.locator(".shopping_cart_link");

  // Confirm the "1" displays in the cart button notification
  await expect(cartButton).toContainText("1");
});

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

  // Store shopping cart button to check the notification with an expect
  const cartButton = page.locator(".shopping_cart_link");

  // Confirm the "1" displays in the cart button notification
  await expect(cartButton).toContainText("1");

  // Click "Shopping Cart"
  await cartButton.click();

  // Pull the recently added cart item's name.
  const cartProductName = await page
    .locator(".inventory_item_name")
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

  await page.locator(".shopping_cart_link").click();

  // Pull the recently added cart item's name.
  const cartProductName = await page
    .locator(".inventory_item_name")
    .first()
    .textContent();

  // Click "Remove" on the first Cart item
  await page.locator("[data-test='remove-sauce-labs-backpack']").click();

  // Verify Inventory item is no longer visible
  expect(page.locator("[data-test='inventory-item']")).toBeHidden();
});

test("Verify Cont Shopping Button", async ({ page }) => {
  await page.goto("/cart.html");

  // Create a cart pom
  const CartPage = new Cart(page);

  // Click Continue Shopping Button
  await CartPage.cont_shopping_btn.click();

  // Verify user is brought back to Inventory Page
  await expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
});

// TODO: Fix Bug, failing at the Assertion
test("Verify Checkout button functions", async ({ page }) => {
  await page.goto("/cart.html");

  // Create a cart pom
  const CartPage = new Cart(page);

  // Click Checkout Button
  CartPage.checkout_btn.click();

  // Verify user is brought to check out page
  await expect(page.url()).toEqual(
    "https://www.saucedemo.com/checkout-step-one.html",
  );
});
