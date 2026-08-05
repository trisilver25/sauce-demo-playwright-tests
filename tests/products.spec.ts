import { test, expect } from "@playwright/test";
import { Products } from "../pages/Products";

test("Verify default A-Z filter", async ({ page }) => {
  await page.goto("inventory.html");

  const ProductsPage = new Products(page);

  let prevProduct = await ProductsPage.getNthProductCard(0);

  let prevProductName = await ProductsPage.getProductName(prevProduct);

  const count = await ProductsPage.getProductCount();

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
