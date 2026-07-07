import { test, expect } from "@playwright/test";

test("Add a product to cart", async ({ page }) => {
  // Go to products page
  await page.goto("/inventory.html");

  // Retrieve the first product item
  const firstProductCard = page.locator(".inventory_item").first();

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
