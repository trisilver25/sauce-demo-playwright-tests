import { test, expect } from "@playwright/test";
import { Products } from "../pages/Products";

test("Add a product to cart", async ({ page }) => {
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

  // Confirm the "1" displays in the cart button notification
  await expect(ProductsPage.shoppingCartBtn).toHaveText("1");
});

test("Verify default A-Z filter", async ({ page }) => {
  await page.goto("inventory.html");

  const ProductsPage = new Products(page);

  // Select the A-Z Filter
  await ProductsPage.setDropDownFilter("az");

  const names = await ProductsPage.getAllProductNames();

  expect(names).toEqual([...names].sort());
});

test("Verify Z-A filter", async ({ page }) => {
  await page.goto("inventory.html");

  const ProductsPage = new Products(page);

  // Select the Z-A Filter
  await ProductsPage.setDropDownFilter("za");

  const names = await ProductsPage.getAllProductNames();

  expect(names).toEqual([...names].sort().reverse());
});

test("Verify Price (L to H) filter", async ({ page }) => {
  await page.goto("inventory.html");

  const ProductsPage = new Products(page);

  // Select the Lo-Hi filter
  await ProductsPage.setDropDownFilter("lohi");

  const prices = await ProductsPage.getAllProductPrices();

  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test("Verify Price (H to L) filter", async ({ page }) => {
  await page.goto("inventory.html");

  const ProductsPage = new Products(page);

  // Select the Hi-Lo filter
  await ProductsPage.setDropDownFilter("hilo");

  const prices = await ProductsPage.getAllProductPrices();

  expect(prices).toEqual([...prices].sort((a, b) => a + b));
});

test("Navigate to About Us", async ({ page }) => {
  await page.goto("inventory.html");

  const ProductPage = new Products(page);

  await ProductPage.clickNavMenuBtn("about");

  // Pull the current URL of the Page
  const currUrl = await page.url();

  await expect(currUrl).toContain("saucelabs.com");
});

test("Logout", async ({ page }) => {
  await page.goto("inventory.html");

  const ProductPage = new Products(page);

  await ProductPage.clickNavMenuBtn("logout");

  // Check if the URL Changed back to the original.
  await expect(page).toHaveURL("");
});
