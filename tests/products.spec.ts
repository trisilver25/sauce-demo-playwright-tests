import { test, expect } from "@playwright/test";
import { Products } from "../pages/Products";

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
