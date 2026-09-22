import { test, expect } from "../fixtures/sauce-fixtures";

test("Verify checkout form errors out on submit", async ({ checkoutPage }) => {
  await checkoutPage.clickContinueBtn();

  expect(checkoutPage.error).toBeVisible();

  expect(checkoutPage.error).toHaveText("Error: First Name is required");
});

test("Verify checkout form errors with first name only filled in", async ({
  checkoutPage,
}) => {
  await checkoutPage.setFirstName("Pokemon");

  await checkoutPage.clickContinueBtn();

  expect(checkoutPage.error).toBeVisible();

  expect(checkoutPage.error).toHaveText("Error: Last Name is required");
});

test("Verify checkout form errors with first, and last name only filled in", async ({
  checkoutPage,
}) => {
  await checkoutPage.setFirstName("Test");

  await checkoutPage.setLastName("Smit");

  await checkoutPage.clickContinueBtn();

  expect(checkoutPage.error).toBeVisible();

  expect(checkoutPage.error).toHaveText("Error: Postal Code is required");
});

test("Verify on click, the user is redirected to step test 2", async ({
  checkoutPage,
}) => {
  await checkoutPage.setFirstName("Test");

  await checkoutPage.setLastName("Smitty");

  await checkoutPage.setPostalCode("32822");

  await checkoutPage.clickContinueBtn();

  await expect(checkoutPage.page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html",
  );
});
