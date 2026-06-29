import { test } from "@playwright/test";

test("Add a product to cart", async ({ page }) => {
  // Go to products page
  await page.goto("/inventory.html");

  // Get the "Add to Cart" button assign to a variable
  let addButton = page.getByRole("button", {
    name: "Add to Cart",
  });
});
