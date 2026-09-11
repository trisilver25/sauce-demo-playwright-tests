import { test, expect } from "@playwright/test";
import { Checkout } from "../pages/Checkout";

test("Verify checkout form errors out on submit", async ({ page }) => {
  await page.goto("/checkout-step-one.html");

  const CheckoutPage = new Checkout(page);

  await CheckoutPage.clickContinueBtn();

  expect(CheckoutPage.error).toBeVisible();

  expect(CheckoutPage.error).toHaveText("Error: First Name is required");
});

test("Verify checkout form errors with first name only filled in", async ({
  page,
}) => {
  await page.goto("/checkout-step-one.html");

  const CheckoutPage = new Checkout(page);

  await CheckoutPage.setFirstName("Pokemon");

  await CheckoutPage.clickContinueBtn();

  expect(CheckoutPage.error).toBeVisible();

  expect(CheckoutPage.error).toHaveText("Error: Last Name is required");
});

test("Verify checkout form errors with first, and last name only filled in", async ({
  page,
}) => {
  await page.goto("/checkout-step-one.html");

  const CheckoutPage = new Checkout(page);

  await CheckoutPage.setFirstName("Test");

  await CheckoutPage.setLastName("Smit");

  await CheckoutPage.clickContinueBtn();

  expect(CheckoutPage.error).toBeVisible();

  expect(CheckoutPage.error).toHaveText("Error: Postal Code is required");
});

test("Verify on click, the user is redirected to step test 2", async ({
  page,
}) => {
  await page.goto("/checkout-step-one.html");

  const CheckoutPage = new Checkout(page);

  await CheckoutPage.setFirstName("Test");

  await CheckoutPage.setLastName("Smitty");

  await CheckoutPage.setPostalCode("32822");

  await CheckoutPage.clickContinueBtn();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html",
  );
});
