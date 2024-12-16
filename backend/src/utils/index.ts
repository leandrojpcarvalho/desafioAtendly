import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.SECRET || "secret";
const HASH_SALT = process.env.HASH_SALT || 10;

export abstract class ServiceHelpers {
  public static bcryptValidation(hash: string, password?: string) {
    if (!password) return false;
    return bcrypt.compareSync(password, hash);
  }
  public static createToken(data: any) {
    return "Bearer " + jwt.sign(data, JWT_SECRET);
  }
  public static createResponse(data: any, status: number) {
    return { data, status };
  }

  public static decodeToken(token: string) {
    const [bearer, jwtToken] = token.split(" ");
    if (bearer !== "Bearer") return null;
    try {
      return jwt.verify(jwtToken, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  public static getHashedPassword(password: string) {
    return bcrypt.hashSync(password, HASH_SALT);
  }

  public static jwtValidation(token: string) {
    const [bearer, jwtToken] = token.split(" ");
    if (bearer !== "Bearer") return false;
    try {
      jwt.verify(jwtToken, JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  }
}
