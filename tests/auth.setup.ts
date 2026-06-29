import path from "path";
import fs from "fs";
import { test } from "@playwright/test";
import { Login } from "../pages/Login";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

const loginDataFile = path.resolve(
  __dirname,
  "../playwright/.auth/loginData.json",
);

const loginData = JSON.parse(fs.readFileSync(loginDataFile, "utf-8")) as {
  user: string;
  pass: string;
};

test("authenticate", async ({ page }) => {
  const loginPage = new Login(page);

  await loginPage.sign_in(loginData.user, loginData.pass);

  await page.context().storageState({
    path: authFile,
  });
});
