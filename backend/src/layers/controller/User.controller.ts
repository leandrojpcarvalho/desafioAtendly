import { NextFunction, Request, RequestHandler, Response } from "express";
import UserService from "../service/User.service";
import IControllerMethods from "../../interface/controller.interface";

export default class UserController implements IControllerMethods {
  private service: UserService;

  private constructor(service: UserService) {
    this.service = service;
  }
  async create(req: Request, res: Response) {
    const { body } = req;
    const { data, status } = await this.service.create(body);
    res.send(status).json(data);
  }
  async login(req: Request, res: Response) {
    const { body } = req;
    const { data, status } = await this.service.login(body);
    res.send(status).json(data);
  }

  async profile(req: Request, res: Response) {
    const { body } = req;
    const { data, status } = await this.service.findOne(body);
    res.send(status).json(data);
  }

  private asyncHandler(fn: (req: Request, res: Response) => Promise<void>) {
    return (req: Request, res: Response, next: NextFunction) => {
      return fn(req, res).catch(next);
    };
  }

  public getMethod(method: keyof IControllerMethods): RequestHandler {
    return this.asyncHandler(this[method].bind(this));
  }

  public static getInstance(service = UserService.getInstance()) {
    return new UserController(service);
  }
}
