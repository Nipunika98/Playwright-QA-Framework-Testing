import { expect, test } from "@playwright/test";
import HomePage from "../pages/home-page";

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  homePage.gotoHomePage("https://onlinelibrary.wiley.com/");
});

test.describe("Search Bar Functionality", () => {
  test("Perform Search", async () => {
    const searchTerm = "Playwright Testing";
    await homePage.performSearch(searchTerm);
  });

  test("XSS Attack Test in URL", async () => {
    await homePage.performSearch('<img src=x onerror=alert("XSS")>');
    const isXSS = await homePage.isXSSinURL();
    expect(isXSS).toBe(false);
  });

  test("SQL Injection Test in URL", async () => {
    await homePage.performSearch("admin' OR '1'='1");
    const isSQLInjection = await homePage.isSQLInjectionURL();
    expect(isSQLInjection).toBe(false);
  });
});
