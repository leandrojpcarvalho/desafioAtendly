import {use, expect} from "chai";
import chaiHttp from "chai-http";
import Sinon from "sinon";
import server from "../../../backend/src/server";
import { Routes } from "../../../shared/mapping/route";

use(chaiHttp);

beforeEach(() => {
  Sinon.restore();
});

describe("controller", async function () {
  const app = request.execute(server);
  it("profile", async function () {
    const req = {};
    const res = {
      send: Sinon.spy(),
    };
    const response = app.get(`/api${Routes.getRoute("profile")}`);
    console.log(response);
  });
});
