import { test, expect } from "../fixtures/sauce-fixtures";
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

test("Verify error message, for a missing username", async ({ loginPage }) => {
  // Click "Login"
  await loginPage.loginButton.click();

  // Verify an error is visible
  await expect(loginPage.error).toBeVisible();

  // Verify the expected error message displays
  await expect(loginPage.error).toHaveText(
    "Epic sadface: Username is required",
  );
});

test("Verify error message, for a missing password", async ({ loginPage }) => {
  // Fill in the username field using the testUser
  await loginPage.userInput.fill(finalErrorUser);

  // Click "Login"
  await loginPage.loginButton.click();

  // Verify an error is visible
  await expect(loginPage.error).toBeVisible();
  // Verify the expected error message displays
  await expect(loginPage.error).toHaveText(
    "Epic sadface: Password is required",
  );
});

test("Verify error message, for an incorrect password", async ({
  loginPage,
}) => {
  // Fill in the username field using the testUser
  await loginPage.userInput.fill(finalErrorUser);

  // Fill in the password field using testUser
  await loginPage.passwordInput.fill(finalErrorPass);

  // Click "Login"
  await loginPage.loginButton.click();

  // Verify an error is visible
  await expect(loginPage.error).toBeVisible();

  // Verify the expected error message displays
  await expect(loginPage.error).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("Verify error message, for a Locked Out User", async ({ loginPage }) => {
  await loginPage.userInput.fill(finalLockedUser);
  await loginPage.passwordInput.fill(finalLockedPass);

  await loginPage.loginButton.click();

  // Verify an error is visible
  await expect(loginPage.error).toBeVisible();

  // Verify the expected error message displays
  await expect(loginPage.error).toHaveText(
    "Epic sadface: Sorry, this user has been locked out.",
  );
});
