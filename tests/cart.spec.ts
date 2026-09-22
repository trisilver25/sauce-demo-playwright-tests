import { test, expect } from "../fixtures/sauce-fixtures";
import { Cart } from "../pages/Cart";

test("Verify the product name in the cart match the product added from the Products page", async ({
  productsPage,
}) => {
  // Retrieve the first product item
  const firstProductCard = await productsPage.getNthProductCard(0);

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

  // Confirm the "1" displays in the cart button notification
  await expect(productsPage.shoppingCartBtn).toHaveText("1");

  // Click "Shopping Cart"
  await productsPage.clickShoppingCartBtn();

  // Pull the recently added cart item's name.
  const cartProductName = await productsPage.page
    .getByTestId("inventory-item-name")
    .first()
    .textContent();

  // Confirm the 1st product name matches the cart name
  await expect(firstProductName).toEqual(cartProductName);
});

test("Remove an item from the cart", async ({ productsPage }) => {
  // Retrieve the first product item
  const firstProductCard = await productsPage.getNthProductCard(0);

  // Store the add to cart button from the 1st product card.
  const firstButton = firstProductCard.getByRole("button", {
    name: "Add to cart",
  });

  // Click "Add to Cart"
  await firstButton.click();

  await productsPage.clickShoppingCartBtn();

  // Click "Remove" on the first Cart item
  await productsPage.page
    .getByRole("button", {
      name: "Remove",
    })
    .first()
    .click();

  // Verify Inventory item is no longer visible
  await expect(productsPage.page.getByTestId("inventory-item")).toBeHidden();
});

test("Verify Cont Shopping Button", async ({ cartPage }) => {
  // Click Continue Shopping Button
  await cartPage.clickContShpBtn();

  // Verify user is brought back to Inventory Page
  await expect(cartPage.page).toHaveURL(
    "https://www.saucedemo.com/inventory.html",
  );
});

test("Verify Checkout button functions", async ({ cartPage }) => {
  // Click Checkout Button
  await cartPage.clickCheckoutBtn();

  // Verify user is brought to check out page
  await expect(cartPage.page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-one.html",
  );
});
