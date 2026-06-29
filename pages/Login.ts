import { Page, Locator } from "@playwright/test";

export class Login {
  // Initial Login Page
  page: Page;

  // Locators
  readonly user_input: Locator;
  readonly password_input: Locator;
  readonly login_button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.user_input = page.getByPlaceholder("Username");
    this.password_input = page.getByPlaceholder("Password");
    this.login_button = page.locator('[data-test="login-button"]');
  }

  async sign_in(user: string, pass: string) {
    await this.page.goto("");
    await this.user_input.fill(user);
    await this.password_input.fill(pass);
    await this.login_button.click();
  }
}
