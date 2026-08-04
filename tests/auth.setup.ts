import path from "path";
import fs from "fs";
import { test } from "@playwright/test";
import { Login } from "../pages/Login";
import { Users } from "../types/Users";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

const loginDataFile = path.resolve(
  __dirname,
  "../playwright/.auth/userCreds.json",
);

// Check if the Local File is present
const isFilePresent = fs.existsSync(loginDataFile);

// Variable to hold LoginData
let users: Users[] | undefined;

// If the file is present add the user data to the loginData variable.
if (isFilePresent) {
  users = JSON.parse(fs.readFileSync(loginDataFile, "utf-8")) as Users[];
}

// Find the standard user within the Users Array and assign to the variable
let standardUser = users?.find((t) => t.type === "standard");

// Variables to hold the GitHub Secret
const userName: string | undefined = process.env.SAUCE_DEMO_USER;
const pass: string | undefined = process.env.SAUCE_DEMO_PASS;

// Variable to hold either the Local User/Pass or the Secret Variable User/Pass
const finalUsername = standardUser?.user || userName;
const finalPassword = standardUser?.pass || pass;

// Verify finalUsername and finalpassword are NOT empty
if (!finalUsername || !finalPassword) {
  throw new Error("Username and Password were not provided.");
}

test("authenticate", async ({ page }) => {
  const loginPage = new Login(page);

  await loginPage.sign_in(finalUsername, finalPassword);

  await page.context().storageState({
    path: authFile,
  });
});
