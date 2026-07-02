import { test, expect } from "@playwright/test";
import { Login } from "../pages/Login";
import fs from "fs";
import path from "path";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test("Validate password error", async ({ page }) => {
  await page.goto("");

  const LoginPage = new Login(page);

  const loginDataFile = path.resolve(
    __dirname,
    "../playwright/.auth/loginData.json",
  );

  const testUser = JSON.parse(fs.readFileSync(loginDataFile, "utf-8")) as {
    user: string;
  };

  await LoginPage.user_input.fill(testUser.user);

  await LoginPage.login_button.click();

  await expect(page.locator("[data-test='error']")).toBeVisible();
  await expect(page.locator("[data-test='error']")).toContainText(
    "Epic sadface: Password is required",
  );
});
