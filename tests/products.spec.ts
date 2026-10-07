import { test, expect } from "../fixtures/sauce-fixtures";
import { Products } from "../pages/Products";

test("Add a product to cart", async ({ productsPage }) => {
  // Retrieve the first product item
  const firstProductCard = productsPage.getNthProductCard(0);

  // Click "Add to Cart"
  await firstProductCard.clickAddToCart();

  // Confirm the "1" displays in the cart button notification
  await expect(productsPage.shoppingCartBadge).toHaveText("1");
});

// Parameterized Tests
[
  {
    description: "Verify default A-Z filter",
    option: "az",
    compare: (a: any, b: any) => a.localeCompare(b),
    type: "names",
  },
  {
    description: "Verify Z-A filter",
    option: "za",
    compare: (a: any, b: any) => b.localeCompare(a),
    type: "names",
  },
  {
    description: "Verify Price (L to H) filter",
    option: "lohi",
    compare: (a: any, b: any) => a - b,
    type: "prices",
  },
  {
    description: "Verify Price (H to L) filter",
    option: "hilo",
    compare: (a: any, b: any) => b - a,
    type: "prices",
  },
].forEach(({ description, option, compare, type }) => {
  test(`${description}`, async ({ productsPage }) => {
    // Set Filter

    await productsPage.setDropDownFilter(option);

    // get type of filter
    const data =
      type === "names"
        ? await productsPage.getAllProductNames()
        : await productsPage.getAllProductPrices();

    expect(data).toEqual([...data].sort(compare));
  });
});

test("Navigate to About Us", async ({ productsPage }) => {
  await productsPage.clickNavMenuBtn("about");

  // Pull the current URL of the Page
  const currUrl = await productsPage.page.url();

  await expect(currUrl).toContain("saucelabs.com");
});

test("Logout", async ({ productsPage }) => {
  await productsPage.clickNavMenuBtn("logout");

  // Check if the URL Changed back to the original.
  await expect(productsPage.page).toHaveURL("");
});
