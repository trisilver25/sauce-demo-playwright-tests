import { Page, Locator } from "@playwright/test";

export class Checkout {
  page: Page;

  // Locator
  readonly continueBtn;
  readonly error;
  readonly firstNameField;
  readonly lastNameField;
  readonly postalCodeField;

  constructor(page: Page) {
    this.page = page;
    this.continueBtn = page.locator('[data-test="continue"]');
    this.error = page.locator('[data-test="error"]');
    this.firstNameField = page.locator('[data-test="firstName"]');
    this.lastNameField = page.locator('[data-test="lastName"]');
    this.postalCodeField = page.locator('[data-test="postalCode"]');
  }

  async getErrorMessage() {
    return this.error.innerText();
  }

  async setFirstName(name: string) {
    await this.firstNameField.fill(name);
  }

  async setLastName(name: string) {
    await this.lastNameField.fill(name);
  }

  async setPostalCode(zip: string) {
    await this.postalCodeField.fill(zip);
  }
}
