import { Page, expect } from "@playwright/test";
import { capitalizeFirstLetter } from "./../helpers/text-format";
import { Config } from "../configs/register-config";

export default class RegisterPage {
  readonly page: Page;
  readonly inputEmail: string;
  readonly inputConfirmEmail: string;
  readonly inputPassword: string;
  readonly inputConfirmPassword: string;
  readonly inputFirstName: string;
  readonly inputSurname: string;
  readonly selectorCountryLocation: string;
  readonly selectorAreaOfInterest: string;
  readonly checkLetsStayInTouch: string;
  readonly checkTermsOfUse: string;
  readonly buttonRegister: string;

  constructor(page: Page) {
    this.page = page;
    this.inputEmail = 'input[name="login.email"]';
    this.inputConfirmEmail = 'input[name="login.email2"]';
    this.inputPassword = 'input[name="login.password"]';
    this.inputConfirmPassword = 'input[name="login.password2"]';
    this.inputFirstName = 'input[name="personal.givenNames"]';
    this.inputSurname = 'input[name="personal.surname"]';
    this.selectorCountryLocation = 'select[name="taxonomy[0].values"]';
    this.selectorAreaOfInterest = 'select[name="taxonomy[1].values"]';
    this.checkLetsStayInTouch = "(//span[@class='label-txt'])[1]";
    this.checkTermsOfUse = "(//label[@class='checkbox--primary'])[2]";
    this.buttonRegister = "(//input[@name='submit'])[1]";
  }

  async gotoRegisterPage(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForTimeout(5000);
  }

  async register(registerDataConfig: Config): Promise<void> {
    await this.page.fill(this.inputEmail, registerDataConfig.email);
    await this.page.fill(
      this.inputConfirmEmail,
      registerDataConfig.confirmEmail
    );
    await this.page.fill(this.inputPassword, registerDataConfig.password);
    await this.page.fill(
      this.inputConfirmPassword,
      registerDataConfig.confirmPassword
    );
    await this.page.fill(this.inputFirstName, registerDataConfig.firstName);
    await this.page.fill(this.inputSurname, registerDataConfig.surname);

    await this.page.selectOption(
      this.selectorCountryLocation,
      registerDataConfig.countryLocation.toUpperCase()
    );
    await this.page.selectOption(
      this.selectorAreaOfInterest,
      capitalizeFirstLetter(registerDataConfig.areaOfInterest)
    );

    await this.page.check(this.checkLetsStayInTouch);
    await this.page.waitForTimeout(1000);
    await this.page.check(this.checkTermsOfUse);
    await this.page.waitForTimeout(10000);
    await this.page.click(this.buttonRegister);
  }
}
