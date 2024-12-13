export default interface IModel<T, R> {
  readonly create: (model: T) => Promise<R>;
  readonly findOne: (model: Partial<R>) => Promise<R | null>;
}
