import * as chai from "chai";
import chaiHttp from "chai-http";
import server from "../../../backend/src/server";
import { Routes } from "../../../shared/mapping/route";

// chai.use(chaiHttp);

// describe("controller", async function () {
//   it.only("profile", async function () {
//     const response = await chai
//       .request(server)
//       .get(`/api${Routes.getRoute("profile")}`);
//     console.log(response);
//   });
// });
