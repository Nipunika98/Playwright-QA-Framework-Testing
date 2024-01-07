import { Page, expect } from "@playwright/test";
import { replaceSpaceToPlusMark } from "../helpers/text-format";

export default class HomePage {
  readonly page: Page;
  readonly inputSearch: string;
  readonly buttonSearch: string;
  private searchResultsSelector = ".search__item .meta__title .hlFld-Title a";

  constructor(page: Page) {
    this.page = page;
    this.inputSearch = "#searchField1";
    this.buttonSearch = "//button[contains(@class,'btn quick-search__button')]";
  }

  async gotoHomePage(url: string) {
    await this.page.goto(url);
  }

  async performSearch(searchTerm: string) {
    const searchInputSelector = this.inputSearch;
    const searchButtonSelector = this.buttonSearch;

    await this.page.fill(searchInputSelector, searchTerm);
    await this.page.click(searchButtonSelector);

    const searchTermUrlFormat: string = await replaceSpaceToPlusMark(
      searchTerm
    );

    await this.page.waitForTimeout(1000);
    const currentURL = this.page.url();
    expect(currentURL).toBe(
      `https://onlinelibrary.wiley.com/action/doSearch?AllField=${searchTermUrlFormat}`
    );
  }

  async isXSSinURL() {
    const currentURL = this.page.url();
    return currentURL.includes('<img src=x onerror=alert("XSS")>');
  }

  async isSQLInjectionURL() {
    const currentURL = this.page.url();
    return currentURL.includes("admin' OR '1'='1");
  }
}
