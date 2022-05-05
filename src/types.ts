import type { Faker } from "@faker-js/faker";

export type FactoryGenerator<T> = (faker: Faker) => T;

export type Source<T> = Partial<T> | FactoryGenerator<Partial<T>>;

export interface IObjectBuilder<T> {
  assign(object: Source<T>): IObjectBuilder<T>;
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
