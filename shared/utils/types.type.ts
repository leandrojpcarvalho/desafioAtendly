export type Remove<T, K extends keyof T> = Omit<T, K>;
export type Creation<T> = Omit<T, "id">;
export type Keys<T> = keyof T;
