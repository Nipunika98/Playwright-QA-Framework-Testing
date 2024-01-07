export interface Config {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  surname: string;
  countryLocation: string;
  areaOfInterest: string;
}

const registerDataConfig: Config = {
  email: "default_email@example.com",
  confirmEmail: "your_username",
  password: "default_password",
  confirmPassword: "default_password",
  firstName: "John",
  surname: "Doe",
  countryLocation: "SRI LANKA",
  areaOfInterest: "Accounting",
};

export default registerDataConfig;
