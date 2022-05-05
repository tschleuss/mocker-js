import type { Faker } from "@faker-js/faker";

export type FactoryGenerator<T> = (faker: Faker) => T;

export type Source<T> = Partial<T> | FactoryGenerator<Partial<T>>;

export interface Builder<T> {
  assign(object: Source<T>): Builder<T>;
  seed(seed?: number): Builder<T>;
  create(): T;
  createMany(quantity: number): T[];
  createWith(paths: Array<keyof T>): Partial<T>;
  createManyWith(quantity: number, paths: Array<keyof T>): Partial<T>[];
}
