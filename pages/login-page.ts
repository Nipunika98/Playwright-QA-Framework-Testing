import { Page, expect } from "@playwright/test";
import { removeAttributeUsingClassName } from "../helpers/remove-attribute";

export default class LoginPage {
  readonly page: Page;
  readonly linkLogin: string;
  readonly inputUsername: string;
  readonly inputPassword: string;
  readonly buttonLogin: string;
  readonly xPathButtonLogout: string;
  readonly xPathLoginTextContent: string;
  readonly textLoginExpected: string;
  readonly urlLogoutExpected: string;

  constructor(page: Page) {
    this.page = page;
    this.linkLogin = "Login / Register";
    this.inputUsername = 'input[name="login"]';
    this.inputPassword = 'input[name="password"]';
    this.buttonLogin = 'input[value="Log In"]';
    this.xPathButtonLogout = "//a[contains(text(),'Logout')]";
    this.xPathLoginTextContent = "//span[text()='Sachintha']";
    this.textLoginExpected = "Sachintha";
    this.urlLogoutExpected = "https://onlinelibrary.wiley.com/?logout=true";
  }

  async gotoLoginPage(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.getByText(this.linkLogin).click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.inputUsername, username);
    await this.page.fill(this.inputPassword, password);
    await this.page.click(this.buttonLogin);

    await this.page.waitForTimeout(3000);

    const loggedInText = await this.page.textContent(
      this.xPathLoginTextContent
    );
    expect(loggedInText).toBe(this.textLoginExpected);
  }

  async loginWithIncorrectUsernameOrPassword(
    username: string,
    password: string
  ): Promise<void> {
    await this.page.fill(this.inputUsername, username);
    await this.page.fill(this.inputPassword, password);
    await this.page.click(this.buttonLogin);

    await this.page.waitForTimeout(3000);

    await this.page.waitForSelector("#login-error-message");
    const errorMessage = await this.page.$eval(
      "#login-error-message",
      (element) => element.textContent!.trim()
    );

    expect(errorMessage).toBe(
      "Your email or password is incorrect. Please try again."
    );
  }

  async loginWithoutUsername(
    username: string,
    messageSelector: string,
    expectedMessage: string
  ): Promise<void> {
    await this.page.fill(this.inputUsername, username);

    await removeAttributeUsingClassName(this.page, ".password", "required");
    await removeAttributeUsingClassName(this.page, ".accessSubmit", "disabled");
    await this.page.waitForTimeout(3000);
    await this.page.click(this.buttonLogin);

    await this.page.waitForSelector(messageSelector);
    const errorMessage = await this.page.$eval(messageSelector, (element) =>
      element.textContent!.trim()
    );

    expect(errorMessage).toBe(expectedMessage);
  }

  async loginWithoutPassword(
    password: string,
    messageSelector: string,
    expectedMessage: string
  ): Promise<void> {
    await this.page.fill(this.inputPassword, password);

    await removeAttributeUsingClassName(this.page, ".login", "required");
    await removeAttributeUsingClassName(this.page, ".accessSubmit", "disabled");
    await this.page.waitForTimeout(3000);
    await this.page.click(this.buttonLogin);

    await this.page.waitForSelector(messageSelector);
    const errorMessage = await this.page.$eval(messageSelector, (element) =>
      element.textContent!.trim()
    );

    expect(errorMessage).toBe(expectedMessage);
  }

  async loginWithoutCredentials(
    messageSelector: string,
    expectedMessage: string
  ): Promise<void> {
    await removeAttributeUsingClassName(this.page, ".login", "required");
    await removeAttributeUsingClassName(this.page, ".password", "required");
    await removeAttributeUsingClassName(this.page, ".accessSubmit", "disabled");
    await this.page.waitForTimeout(3000);

    await this.page.click(this.buttonLogin);
    await this.page.waitForSelector(messageSelector);
    const errorMessage = await this.page.$eval(messageSelector, (element) =>
      element.textContent!.trim()
    );
    expect(errorMessage).toBe(expectedMessage);
  }

  async logout(): Promise<void> {
    await this.page.click(".profile-text");
    await this.page.waitForTimeout(300);
    await this.page.click(this.xPathButtonLogout);

    const currentUrl = this.page.url();
    expect(currentUrl).toBe(this.urlLogoutExpected);
  }
}
