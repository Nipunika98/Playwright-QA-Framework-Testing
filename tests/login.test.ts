import { test } from "@playwright/test";
import LoginPage from "../pages/login-page";
import loginDataConfig from "../configs/login-config";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  loginPage.gotoLoginPage("https://onlinelibrary.wiley.com");
});

test.describe("Login Scenarios", () => {
  test("Positive Login Test", async () => {
    // Action: Perform a successful login
    await loginPage.login(
      loginDataConfig.correctEmail,
      loginDataConfig.correctPassword
    );
  });

  test("Negative Username Test", async () => {
    // Action: Attempt login with incorrect username
    await loginPage.loginWithIncorrectUsernameOrPassword(
      loginDataConfig.negativeEmail,
      loginDataConfig.correctPassword
    );
  });

  test("Negative Password Test", async () => {
    // Action: Attempt login with incorrect password
    await loginPage.loginWithIncorrectUsernameOrPassword(
      loginDataConfig.correctEmail,
      loginDataConfig.negativePassword
    );
  });

  test("Negative Empty Username Test", async () => {
    // Action: Attempt login with empty username
    await loginPage.loginWithoutUsername(
      loginDataConfig.correctEmail,
      "#login-error-message",
      "Your email address or password is incorrect. Please try again."
    );
  });

  test("Negative Empty Password Test", async () => {
    // Action: Attempt login with empty password
    await loginPage.loginWithoutPassword(
      loginDataConfig.correctPassword,
      "#login-error-message",
      "Your email address or password is incorrect. Please try again."
    );
  });

  test("Negative Empty Credentials Test", async () => {
    // Action: Attempt login with empty credentials
    await loginPage.loginWithoutCredentials(
      "#login-error-message",
      "Your email address or password is incorrect. Please try again."
    );
  });
});
