import * as chai from "chai";
import Sinon from "sinon";
import MiddleWare from "../../../backend/src/layers/middleware/index.middleware";

const { expect } = chai;

beforeEach(() => {
  Sinon.restore();
});

const { protectedMiddleware, validationMiddleware } = MiddleWare;

describe("protectedMiddelware", async function () {
  const req = {} as Request;
  req.headers.append("Authorization", "");
  const res = {
    send: Sinon.spy().returns(),
  } as Response;

  const next = Sinon.spy() as NextFunction;

  await protectedMiddleware()(req, res, next);

  expect(res).has.been.calledWith({
    status: 401,
    body: { message: "Voce precisa estar logado" },
  });
});
