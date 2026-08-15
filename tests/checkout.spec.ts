import { test, expect } from "@playwright/test";

test("Verify checkout form errors out on submit", async ({ page }) => {
  page.goto("/checkout-step-one.html");

  await page.locator('[data-test="continue"]').click();

  expect(page.locator(".error-message-container")).toBeVisible();
});
