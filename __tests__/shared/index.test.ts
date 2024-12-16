import * as chai from "chai";
import { Routes } from "../../shared/mapping/route";
import Validations from "../../shared/utils/validations";

const { expect } = chai;
const { getRoute } = Routes;

describe("mapping", function () {
  it("getRoute", function () {
    expect(getRoute("profile", "root")).to.be.equal("/api/profile");
    expect(getRoute("profile", "fetch")).to.be.equal(
      "http://localhost:3000/api/profile"
    );
    expect(getRoute("email")).to.be.equal("/api/email");
    expect(getRoute("email", "fetch")).to.be.equal(
      "http://localhost:3000/api/email"
    );
    expect(getRoute("login")).to.be.equal("/api/login");
    expect(getRoute("login", "fetch")).to.be.equal(
      "http://localhost:3000/api/login"
    );
    expect(getRoute("register")).to.be.equal("/api/register");
    expect(getRoute("register", "fetch")).to.be.equal(
      "http://localhost:3000/api/register"
    );
  });
});

const { isEmail, isName, isPassword } = Validations.Validations;

describe("Validations", function () {
  it("isEmail", function () {
    expect(isEmail("a@.com")).to.be.false;
    expect(isEmail("")).to.be.false;
    expect(isEmail("@a.com")).to.be.false;
    expect(isEmail("a@a.com")).to.be.true;
  });
  it("isName", function () {
    expect(isName("")).to.be.false;
    expect(isName("a")).to.be.false;
    expect(isName("a@")).to.be.false;
    expect(isName("a@a")).to.be.false;
    expect(isName("asdf")).to.be.true;
    expect(isName("asdf asd")).to.be.true;
  });

  it("isPassword", function () {
    expect(isPassword("")).to.be.false;
    expect(isPassword("a")).to.be.false;
    expect(isPassword("a@")).to.be.false;
    expect(isPassword("a@a")).to.be.false;
    expect(isPassword("asdf")).to.be.false;
    expect(isPassword("asdf asd")).to.be.true;
  });
});
