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

  // Store shopping cart button to check the notification with an expect
  const cartButton = page.locator(".shopping_cart_link");

  // Confirm the "1" displays in the cart button notification
  await expect(cartButton).toContainText("1");
});

test("Verify default A-Z filter", async ({ page }) => {
  await page.goto("inventory.html");

  const ProductsPage = new Products(page);

  // Get the 1st product card to compare later.
  let prevProduct = await ProductsPage.getNthProductCard(0);

  // Get the 1st product card name
  let prevProductName = await ProductsPage.getProductName(prevProduct);

  // Get the current count of Product Cards displayed on the page
  const count = await ProductsPage.getProductCount();

  // Loop through the count of product cards, and compare the previous card to the current card.
  // Verifiying the previous card is less than the current name. As A is less than B.
  for (let i = 0; i < count; i++) {
    if (i + 1 != count) {
      let currProductName = await ProductsPage.getProductName(
        await ProductsPage.getNthProductCard(i + 1),
      );
      await expect(prevProductName <= currProductName).toBeTruthy();
      prevProductName = currProductName;
    } else {
      break;
    }
  }
});

test("Verify Z-A filter", async ({ page }) => {
  await page.goto("inventory.html");

  const ProductsPage = new Products(page);

  // Select the Z-A Filter
  await ProductsPage.setDropDownFilter("za");

  let prevProduct = await ProductsPage.getNthProductCard(0);

  let prevProductName = await ProductsPage.getProductName(prevProduct);

  const count = await ProductsPage.getProductCount();

  for (let i = 0; i < count; i++) {
    if (i + 1 != count) {
      let currProductName = await ProductsPage.getProductName(
        await ProductsPage.getNthProductCard(i + 1),
      );
      await expect(prevProductName >= currProductName).toBeTruthy();
      prevProductName = currProductName;
    } else {
      break;
    }
  }
});

test("Verify Price (L to H) filter", async ({ page }) => {
  await page.goto("inventory.html");

  const ProductsPage = new Products(page);

  // Select the Lo-Hi filter
  await ProductsPage.setDropDownFilter("lohi");

  let prevProduct = await ProductsPage.getNthProductCard(0);

  let prevProductPrice = await ProductsPage.getProductPrice(prevProduct);

  const count = await ProductsPage.getProductCount();

  for (let i = 0; i < count; i++) {
    if (i + 1 != count) {
      let currProductPrice = await ProductsPage.getProductPrice(
        await ProductsPage.getNthProductCard(i + 1),
      );
      await expect(prevProductPrice <= currProductPrice).toBeTruthy();
      prevProductPrice = currProductPrice;
    } else {
      break;
    }
  }
});

test("Verify Price (H to L) filter", async ({ page }) => {
  await page.goto("inventory.html");

  const ProductsPage = new Products(page);

  // Select the Hi-Lo filter
  await ProductsPage.setDropDownFilter("hilo");

  let prevProduct = await ProductsPage.getNthProductCard(0);

  let prevProductPrice = await ProductsPage.getProductPrice(prevProduct);

  const count = await ProductsPage.getProductCount();

  for (let i = 0; i < count; i++) {
    if (i + 1 != count) {
      let currProductPrice = await ProductsPage.getProductPrice(
        await ProductsPage.getNthProductCard(i + 1),
      );
      await expect(prevProductPrice >= currProductPrice).toBeTruthy();
      prevProductPrice = currProductPrice;
    } else {
      break;
    }
  }
});

test("Navigate to About Us", async ({ page }) => {
  await page.goto("inventory.html");

  const ProductPage = new Products(page);

  await ProductPage.burgerMenu.click();

  await ProductPage.about.click();

  // Pull the current URL of the Page
  const currUrl = await page.url();

  await expect(currUrl).toContain("saucelabs.com");
});
