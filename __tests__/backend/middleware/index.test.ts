import * as chai from "chai";
import sinonChai from "sinon-chai";
import { Request, Response, NextFunction } from "express";
import Sinon from "sinon";
import ErrorHandler from "../../../backend/src/layers/middleware/ErrorHandler";
import MiddleWare from "../../../backend/src/layers/middleware/index.middleware";
import { ServiceHelpers } from "../../../backend/src/utils";

chai.use(sinonChai);

const { expect } = chai;

beforeEach(() => {
  Sinon.restore();
});

const { protectedMiddleware, validationMiddleware } = MiddleWare;

describe("protectedMiddelware", async function () {
  it("deve retornar 401 se token nao for fornecido", async function () {
    const req = {
      headers: {},
    } as Request;
    const res = {
      json: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
    } as unknown as Response;

    const next = Sinon.stub() as unknown as NextFunction;

    await protectedMiddleware()(req, res, next);

    expect(res.status).has.been.calledOnceWith(401);
    expect(res.json).has.been.calledOnceWith({
      message: "Voce precisa estar logado",
    });
  });
  it("deve retornar 401 se o token for invalido", async function () {
    const req = {
      headers: {
        authorization: "Bearer invalidToken",
      },
    } as Request;
    const res = {
      json: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
    } as unknown as Response;

    const next = Sinon.stub() as unknown as NextFunction;

    await protectedMiddleware()(req, res, next);

    expect(res.status).has.been.calledOnceWith(401);
    expect(res.json).has.been.calledOnceWith({
      message: "Token invalido",
    });
  });
  it("deve chamar a funcao next", async function () {
    const req = {
      headers: {
        authorization: ServiceHelpers.createToken({ id: 1 }),
      },
    } as Request;
    const res = {
      json: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;
    await protectedMiddleware()(req, res, next);
    expect(next).has.been.calledOnce;
  });
});

describe("validationMidlleware", async function () {
  it("deve retornar 400 se o body nao for valido", async function () {
    const req = {
      body: {
        email: "invalidEmail",
      },
    };
    const res = {
      json: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;
    await validationMiddleware("user", "userSchema")(req as Request, res, next);
    expect(res.status).has.been.calledOnceWith(400);
  });

  it("deve chamar a funcao next", async function () {
    const req = {
      body: {
        name: "teste",
        email: "a@a.com",
        password: "123456",
      },
    };
    const res = {
      json: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;
    await validationMiddleware("user", "userSchema")(req as Request, res, next);
    expect(next).has.been.calledOnce;
  });

  it("na no teste login deve retornar 400, caso nao tenha email ou password", async function () {
    const req = {
      body: {},
    };
    const res = {
      json: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;
    await validationMiddleware("user", "loginSchema")(
      req as Request,
      res,
      next
    );

    expect(res.status).has.been.calledWith(400);

    const req2 = {
      body: {
        email: "a@a.com",
      },
    };
    await validationMiddleware("user", "loginSchema")(
      req2 as Request,
      res,
      next
    );
    expect(res.status).has.been.calledWith(400);
  });

  it("na no teste login deve retornar 400, caso nao tenha email ou password", async function () {
    const req = {
      body: {
        email: "a",
      },
    };
    const res = {
      json: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;
    await validationMiddleware("user", "loginSchema")(
      req as Request,
      res,
      next
    );

    expect(res.status).has.been.calledWith(400);
  });

  it("na no teste login deve chamar o next", async function () {
    const req = {
      body: {
        email: "a@a.com",
        password: "123456",
      },
    };
    const res = {
      json: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;
    await validationMiddleware("user", "loginSchema")(
      req as Request,
      res,
      next
    );
    expect(next).has.been.calledOnce;
  });
});

describe("loginWithToken", async function () {
  it("deve continuar para o login", async function () {
    const req = {
      header: Sinon.stub().returns(""),
      headers: {},
    } as unknown as Request;
    const res = {
      json: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
    } as unknown as Response;

    const next = Sinon.stub() as unknown as NextFunction;

    await MiddleWare.loginWithToken()(req, res, next);
    expect(next).has.been.calledOnce;
  });
  it("deve continuar para o login se token for invalido", async function () {
    const req = {
      header: Sinon.stub().returns("Bearer invalidToken"),
      headers: {
        authorization: "Bearer invalidToken",
      },
    } as unknown as Request;
    const res = {
      json: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
    } as unknown as Response;

    const next = Sinon.stub() as unknown as NextFunction;

    await MiddleWare.loginWithToken()(req, res, next);

    expect(next).has.been.calledOnce;
  });
  it("deve chamar a funcao next", async function () {
    const token = ServiceHelpers.createToken({ id: 1 });
    const decoded = ServiceHelpers.decodeToken(token);
    const req = {
      headers: {
        authorization: token,
      },
    } as Request;
    const res = {
      json: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;
    await MiddleWare.loginWithToken()(req, res, next);
    expect(res.status).has.been.calledOnceWith(200);
    expect(res.json).has.been.calledOnce;
    expect(res.json).has.been.calledWith(decoded);
  });
});

describe("ErrorHandling", function () {
  it("deve retornar 500", async function () {
    const error = new Error("error");
    const req = {} as Request;
    const res = {
      json: Sinon.stub().returnsThis(),
      status: Sinon.stub().returnsThis(),
    } as unknown as Response;
    const next = Sinon.stub() as unknown as NextFunction;
    ErrorHandler.errorHandler(error, req, res, next);
    expect(res.status).has.been.calledOnceWith(500);
    expect(res.json).has.been.calledOnce;
  });
});
