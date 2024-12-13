import { StatusCodes } from "http-status-codes";

export interface IServiceResponse<T> {
  readonly data: T | string | boolean;
  readonly status: StatusCodes;
}
type RemovePassword<R> = Omit<R, "password">;

export default interface IService<T, R> {
  readonly create: (model: T) => Promise<IServiceResponse<RemovePassword<R>>>;
  readonly findOne: (
    model: Partial<R>
  ) => Promise<IServiceResponse<RemovePassword<R> | null>>;
  readonly login: (person: Partial<R>) => Promise<IServiceResponse<string>>;
}
