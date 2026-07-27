import { test, expect } from "@playwright/test";
import { Products } from "../pages/Products";

test("Verify default A-Z filter", async ({ page }) => {
  page.goto("inventory.html");

  const ProductsPage = new Products(page);

  const product = await ProductsPage.getNthProductCard(0);

  const productName = ProductsPage.getProductName(product);

  // TO DO Fix Assertion
  // expect(productName).toBeGr
});
