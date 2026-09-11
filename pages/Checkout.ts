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
    this.continueBtn = page.getByRole("button", {
      name: "Continue",
    });
    this.error = page.getByTestId("error");
    this.firstNameField = page.getByPlaceholder("First Name");
    this.lastNameField = page.getByPlaceholder("Last Name");
    this.postalCodeField = page.getByPlaceholder("Zip/Postal Code");
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

  async clickContinueBtn() {
    await this.continueBtn.click();
  }
}
