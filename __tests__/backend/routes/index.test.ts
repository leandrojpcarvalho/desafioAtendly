import request from "supertest";
import * as chai from "chai";
import server from "../../../backend/src/server";
import { Routes } from "../../../shared/mapping/route";
import { ServiceHelpers } from "../../../backend/src/utils";
import mocks from "../../mocks/user.mock";

const { expect } = chai;

describe("controller", async function () {
  let token;
  it("ao receber requisicao na rota register sem email deve retornar 400 no status", async function () {
    const response = await request(server.app)
      .post(Routes.getRoute("register"))
      .send({ password: "123456" });
    expect(response.status).to.be.equal(400);
  });
  it("ao receber requisicao na rota register sem password deve retornar 400 no status", async function () {
    const response = await request(server.app)
      .post(Routes.getRoute("register"))
      .send({ email: "a@a.com" });
    expect(response.status).to.be.equal(400);
  });
  it.skip("ao receber requisicao na rota register com email e password deve retornar 200 no status", async function () {
    const response = await request(server.app)
      .post(Routes.getRoute("register"))
      .send(mocks.creationUser);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property("token");
    token = response.body.token;
  });
  it("ao receber requisicao na rota login sem email deve retornar 400 no status", async function () {
    const response = await request(server.app)
      .post(Routes.getRoute("login"))
      .send({ password: "123456" });
    expect(response.status).to.be.equal(400);
  });
  it("ao receber requisicao na rota login sem password deve retornar 400 no status", async function () {
    const response = await request(server.app)
      .post(Routes.getRoute("login"))
      .send({ email: "a@a.com" });
    expect(response.status).to.be.equal(400);
  });
  it.skip("ao receber requisicao na rota login com email e password deve retornar 200 no status", async function () {
    const response = await request(server.app)
      .post(Routes.getRoute("login"))
      .send({ email: "a@a.com", password: "123456" });
    console.log(response.body);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property("token");
    token = response.body.token;
  });

  it("ao receber requisicao na rota /profile sem token deve retornar 401 no status", async function () {
    const response = await request(server.app).get(Routes.getRoute("profile"));
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal("Voce precisa estar logado");
  });
  it("ao receber requisicao na rota /profile com token invalido deve retornar 401 no status", async function () {
    const response = await request(server.app)
      .get(Routes.getRoute("profile"))
      .set("Authorization", "Bearer invalidToken");
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal("Token invalido");
  });
  it.skip("ao receber requisicao na rota /profile com token valido deve retornar 200 no status", async function () {
    const response = await request(server.app)
      .get(Routes.getRoute("profile"))
      .set("Authorization", ServiceHelpers.createToken({ id: 1 }));
    console.log(response.body);
    expect(response.status).to.be.equal(200);
  });
});
