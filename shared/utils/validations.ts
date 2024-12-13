export default abstract class Validations {
  public static regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  public static regexName = /^[a-zA-Z ]+$/;

  static isEmail(email: string): boolean {
    return this.regexEmail.test(email);
  }
  static isPassword(password: string): boolean {
    return password.length >= 6;
  }
  static isName(name: string): boolean {
    return this.regexName.test(name);
  }
}
