import { test, expect } from "../fixtures/sauce-fixtures";
import { Products } from "../pages/Products";

test("Add a product to cart", async ({ productsPage }) => {
  // Go to products page
  productsPage.goto();

  // Retrieve the first product item
  const firstProductCard = await productsPage.getNthProductCard(0);

  // Store the add to cart button from the 1st product card.
  const firstButton = firstProductCard.getByRole("button", {
    name: "Add to cart",
  });

  // Click "Add to Cart"
  await firstButton.click();

  // Confirm the "1" displays in the cart button notification
  await expect(productsPage.shoppingCartBtn).toHaveText("1");
});

test("Verify default A-Z filter", async ({ productsPage }) => {
  productsPage.goto();

  // Select the A-Z Filter
  await productsPage.setDropDownFilter("az");

  const names = await productsPage.getAllProductNames();

  expect(names).toEqual([...names].sort());
});

test("Verify Z-A filter", async ({ productsPage }) => {
  productsPage.goto();

  // Select the Z-A Filter
  await productsPage.setDropDownFilter("za");

  const names = await productsPage.getAllProductNames();

  expect(names).toEqual([...names].sort().reverse());
});

test("Verify Price (L to H) filter", async ({ productsPage }) => {
  productsPage.goto();

  // Select the Lo-Hi filter
  await productsPage.setDropDownFilter("lohi");

  const prices = await productsPage.getAllProductPrices();

  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

test("Verify Price (H to L) filter", async ({ productsPage }) => {
  productsPage.goto();

  // Select the Hi-Lo filter
  await productsPage.setDropDownFilter("hilo");

  const prices = await productsPage.getAllProductPrices();

  expect(prices).toEqual([...prices].sort((a, b) => a + b));
});

test("Navigate to About Us", async ({ productsPage }) => {
  productsPage.goto();

  await productsPage.clickNavMenuBtn("about");

  // Pull the current URL of the Page
  const currUrl = await productsPage.page.url();

  await expect(currUrl).toContain("saucelabs.com");
});

test("Logout", async ({ productsPage }) => {
  productsPage.goto();

  await productsPage.clickNavMenuBtn("logout");

  // Check if the URL Changed back to the original.
  await expect(productsPage.page).toHaveURL("");
});
