import { test, expect } from "@playwright/test";
import { Checkout } from "../pages/Checkout";

test("Verify checkout form errors out on submit", async ({ page }) => {
  page.goto("/checkout-step-one.html");

  const CheckoutPage = new Checkout(page);

  await CheckoutPage.continueBtn.click();

  expect(CheckoutPage.error).toBeVisible();

  expect(CheckoutPage.getErrorMessage()).resolves.toContain(
    "Error: First Name is required",
  );
});
