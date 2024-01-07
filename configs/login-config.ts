export interface Config {
  correctEmail: string;
  correctPassword: string;

  negativeEmail: string;
  negativePassword: string;
}

const loginDataConfig: Config = {
  correctEmail: "infinity.dev0603@gmail.com",
  correctPassword: "Rced%E67$S",

  negativeEmail: "infinity.dev0603@gmail.com",
  negativePassword: "Rced%E67$S",
};

export default loginDataConfig;
