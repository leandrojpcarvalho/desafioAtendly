import { Request, Response } from "express";

interface IControllerMethods {
  readonly create: (req: Request, res: Response) => Promise<void>;
  readonly login: (req: Request, res: Response) => Promise<void>;
  readonly profile: (req: Request, res: Response) => Promise<void>;
  readonly emailValidation: (req: Request, res: Response) => Promise<void>;
}

export default IControllerMethods;
