import { test, expect } from "@playwright/test";
import { Login } from "../pages/Login";
import { Users } from "../types/Users";
import fs from "fs";
import path from "path";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

// Grab the location of the LoginData Path.
const loginDataFile = path.resolve(
  __dirname,
  "../playwright/.auth/userCreds.json",
);

// Check if Local File Exists
const isFilePresent = fs.existsSync(loginDataFile);

// Create a variable to hold users.
let users: Users[] | undefined;

// Verify isFilePresent, before making assigning a User array to the users Variable.
// Parse the json data from the loginDataFile and create an object to hold the Username.
if (isFilePresent) {
  users = JSON.parse(fs.readFileSync(loginDataFile, "utf-8")) as Users[];
}

// Find the "error" user in users, and assign to errorUser variable.
const errorUser = users?.find((t) => t.type === "error");

// Secret Repo Variables for Error User
const errorUserName: string | undefined = process.env.SAUCE_ERROR_USER;
const errorPass: string | undefined = process.env.SAUCE_ERROR_PASS;

// Find the "locked out" user in users, and assign to lockedUser variable.
const lockedUser = users?.find((t) => t.type === "locked");

// Secret Repo Variables for Locked User
const lockedUserName: string | undefined = process.env.SAUCE_LOCKED_USER;
const lockedPass: string | undefined = process.env.SAUCE_LOCKED_PASS;

// Final Variables to hold user/pass of either local/remote.
const finalErrorUser = errorUser?.user || errorUserName;
const finalErrorPass = errorUser?.pass || errorPass;

const finalLockedUser = lockedUser?.user || lockedUserName;
const finalLockedPass = lockedUser?.pass || lockedPass;

// Verify the final variables are not empty before executing Tests
if (
  !finalErrorUser ||
  !finalErrorPass ||
  !finalLockedPass ||
  !finalLockedUser
) {
  throw new Error("Username and Password were not provided.");
}

// BeforeEach test go to the loginpage of SauceDemo.
test.beforeEach(async ({ page }) => {
  // Go to Login Page
  await page.goto("");
});

test("Verify error message, for a missing username", async ({ page }) => {
  // Create a LoginPage Object
  const LoginPage = new Login(page);

  // Click "Login"
  await LoginPage.loginButton.click();

  // Verify an error is visible
  await expect(LoginPage.isErrorVisible()).toBeTruthy();

  // Verify the expected error message displays
  await expect(LoginPage.getErrorMessage()).resolves.toContain(
    "Epic sadface: Username is required",
  );
});

test("Verify error message, for a missing password", async ({ page }) => {
  // Create a LoginPage Object
  const LoginPage = new Login(page);

  // Fill in the username field using the testUser
  await LoginPage.userInput.fill(finalErrorUser);

  // Click "Login"
  await LoginPage.loginButton.click();

  // Verify an error is visible
  await expect(LoginPage.isErrorVisible()).toBeTruthy();
  // Verify the expected error message displays
  await expect(LoginPage.getErrorMessage()).resolves.toContain(
    "Epic sadface: Password is required",
  );
});

test("Verify error message, for an incorrect password", async ({ page }) => {
  const LoginPage = new Login(page);

  // Fill in the username field using the testUser
  await LoginPage.userInput.fill(finalErrorUser);

  // Fill in the password field using testUser
  await LoginPage.passwordInput.fill(finalErrorPass);

  // Click "Login"
  await LoginPage.loginButton.click();

  // Verify an error is visible
  await expect(LoginPage.isErrorVisible()).toBeTruthy();

  // Verify the expected error message displays
  await expect(LoginPage.getErrorMessage()).resolves.toContain(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("Verify error message, for a Locked Out User", async ({ page }) => {
  const LoginPage = new Login(page);

  await LoginPage.userInput.fill(finalLockedUser);
  await LoginPage.passwordInput.fill(finalLockedPass);

  await LoginPage.loginButton.click();

  // Verify an error is visible
  await expect(LoginPage.isErrorVisible()).resolves.toBeTruthy();

  // Verify the expected error message displays
  await expect(LoginPage.getErrorMessage()).resolves.toContain(
    "Epic sadface: Sorry, this user has been locked out.",
  );
});
