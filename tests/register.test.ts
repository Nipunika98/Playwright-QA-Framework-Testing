import { test } from "@playwright/test";
import RegisterPage from "../pages/register-page";
import registerDataConfig from "../configs/register-config";

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  registerPage = new RegisterPage(page);
  registerPage.gotoRegisterPage(
    "https://onlinelibrary.wiley.com/action/registration?acdl-redirect=true"
  );
});

test.describe("User Registration Scenarios", () => {
  test("Successful Registration Test", async () => {
    // Action: Perform a successful user registration
    await registerPage.register(registerDataConfig);
  });
});
