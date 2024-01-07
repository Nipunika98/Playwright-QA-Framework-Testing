import { test } from "@playwright/test";
import LoginPage from "../pages/login-page";
import loginDataConfig from "../configs/login-config";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  loginPage.gotoLoginPage("https://onlinelibrary.wiley.com");
});

test.describe("User Logout Scenario", () => {
  test("Positive User Logout Test", async () => {
    // Action: Perform a positive login to ensure a user is logged in
    await loginPage.login(
      loginDataConfig.correctEmail,
      loginDataConfig.correctPassword
    );

    // Action: Perform a user logout
    await loginPage.logout();
  });
});
