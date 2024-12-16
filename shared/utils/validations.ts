abstract class Validations {
  public static regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  public static regexName = /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,})*$/;

  static isEmail(email: string): boolean {
    return Validations.regexEmail.test(email);
  }
  static isPassword(password: string): boolean {
    return password.length >= 6;
  }
  static isName(name: string): boolean {
    return Validations.regexName.test(name);
  }
}

export default { Validations };
