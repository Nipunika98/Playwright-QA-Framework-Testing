import { expect, test } from "@playwright/test";
import LoginPage from "../pages/login-page";
import loginDataConfig from "../configs/login-config";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  loginPage.gotoLoginPage("https://onlinelibrary.wiley.com");
});

test.describe("User Session Management on the Login Page", () => {
  test("Successful Login and Logout Session Test", async ({ page }) => {
    // Arrange: Navigate to the login page
    await loginPage.login(
      loginDataConfig.correctEmail,
      loginDataConfig.correctPassword
    );

    // Act: Perform the login and logout actions
    await loginPage.logout();

    // Assert: Verify that the user is logged out
    await page.goto("https://onlinelibrary.wiley.com/?login=true");
    const loggedInText = await page.textContent(
      "//span[text()='Login / Register']"
    );

    // Expectation: Ensure the user is redirected to the login/register page
    expect(loggedInText).toBe("Login / Register");
  });
});
