import type { Faker } from "@faker-js/faker";

export type FakerGenerator<T> = (faker: Faker) => T;

export type ObjectGenerator<T> = FakerGenerator<T>;
export type ConstantGenerator<T> = T[] | FakerGenerator<T>;

export type ObjectSource<T> = Partial<T> | ObjectGenerator<Partial<T>>;

export interface IObjectBuilder<T> {
  assign(object: ObjectSource<T>): IObjectBuilder<T>;
  seed(seed?: number): IObjectBuilder<T>;
  create(): T;
  createMany(quantity: number): T[];
  createWith(paths: Array<keyof T>): Partial<T>;
  createManyWith(quantity: number, paths: Array<keyof T>): Partial<T>[];
}

export interface IConstantBuilder<T> {
  seed(seed?: number): IConstantBuilder<T>;
  entry(): T;
  entries(quantity: number): T[];
}
