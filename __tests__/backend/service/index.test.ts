import * as chai from "chai";
import Sinon from "sinon";
import UserService from "../../../backend/src/layers/service/User.service";
import mocks from "../../mocks/user.mock";
import UserModelSequelize from "../../../backend/src/db/model/User.model";
import { ServiceHelpers } from "../../../backend/src/utils";

const { expect } = chai;

beforeEach(() => {
  Sinon.restore();
});

describe("Service", () => {
  const service = UserService.getInstance();
  it("deve verificar se o email eexistir retorna status 409", async function () {
    Sinon.stub(UserModelSequelize, "findOne").resolves(mocks.createdUser);
    const { data, status } = await service.create(mocks.creationUser);

    expect(status).to.be.equal(409);
    expect(data).to.be.equal("O email ja esta cadastrado");
  });
  it("deve retornar true caso a operacao seja realizada com sucesso", async function () {
    Sinon.stub(UserModelSequelize, "findOne").resolves(null);
    Sinon.stub(UserModelSequelize, "create").resolves(mocks.createdUser);

    const { data, status } = await service.create(mocks.creationUser);

    expect(status).to.be.equal(201);
    expect(data).to.be.true;
  });

  it("deve retornar status 404 caso nao encontre usuario", async function () {
    Sinon.stub(UserModelSequelize, "findOne").resolves(null);

    const { data, status } = await service.findOne(mocks.creationUser);
    expect(status).to.be.equal(404);
    expect(data).to.be.equal("Usuario nao encontrado");
  });

  it("deve retornar um usuario sem o campo password", async function () {
    Sinon.stub(UserModelSequelize, "findOne").resolves(mocks.createdUser);

    const { data, status } = await service.findOne(mocks.creationUser);
    const { password, ...rest } = mocks.createdUser.dataValues;

    expect(status).to.be.equal(200);
    expect(data).not.have.property("password");
    expect(data).to.be.deep.equal(rest);
  });

  it("login deve retonar 401 caso o email nao seja encontrado", async function () {
    Sinon.stub(UserModelSequelize, "findOne").resolves(null);

    const { data, status } = await service.login(mocks.creationUser);

    expect(status).to.be.equal(401);
    expect(data).to.be.equal("Email e/ou senha estao errados");
  });

  it("login deve retonar 401 caso a senha seja invalida", async function () {
    Sinon.stub(UserModelSequelize, "findOne").resolves(mocks.createdUser);
    const { password, ...rest } = JSON.parse(JSON.stringify(mocks.createdUser));

    const { data, status } = await service.login({
      ...rest,
      password: "novasenha",
    });

    expect(status).to.be.equal(401);
    expect(data).to.be.equal("Email e/ou senha estao errados");
  });

  it("login deve retonar 200 e um token caso o seja correto", async function () {
    Sinon.stub(UserModelSequelize, "findOne").resolves(mocks.createdUser);

    const { data, status } = await service.login(mocks.creationUser);

    expect(status).to.be.equal(200);
    expect(true).to.be.equal(ServiceHelpers.jwtValidation(data));
  });
});
