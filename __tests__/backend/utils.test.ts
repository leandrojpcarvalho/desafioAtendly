import * as chai from "chai";
import Utils from "../../backend/src/utils/index.mjs";

const {
  bcryptValidation,
  createResponse,
  createToken,
  decodeToken,
  getHashedPassword,
  jwtValidation,
} = Utils.ServiceHelpers;
const { expect } = chai;

describe("utils", function () {
  const pass = "password";
  const user = { email: "a", password: "b" };
  it("getHashedPassword", function () {
    const hash = getHashedPassword(pass);
    expect(hash).to.be.a("string");
    expect(hash).to.not.equal(pass);
  });
  it("bcryptValidation", function () {
    const hash = getHashedPassword(pass);
    expect(bcryptValidation(hash, pass)).to.be.true;
    expect(bcryptValidation(hash, "password1")).to.be.false;
  });
  it("createToken", function () {
    const token = createToken(user);
    expect(token).to.be.a("string");
    expect(token).to.include("Bearer");
    const tokenDecoded = decodeToken(token) as any;
    expect(tokenDecoded.email).to.equal(user.email);
    expect(tokenDecoded.password).to.equal(user.password);
  });
  it("decodeToken", function () {
    expect(decodeToken("Bearer ")).to.be.null;
    expect(decodeToken("Bearer a.b.c")).to.be.null;
  });
  it("jwtValidation", function () {
    const token = createToken(user);
    expect(jwtValidation(token)).to.be.true;
    expect(jwtValidation("Bearer ")).to.be.false;
    expect(jwtValidation("Bearer a.b.c")).to.be.false;
  });
  it("createResponse", function () {
    const data = { a: 1 };
    const status = 200;
    const response = createResponse(data, status);
    expect(response).to.be.an("object");
    expect(response.data).to.equal(data);
    expect(response.status).to.equal(status);
  });
});
