import type { Faker } from "@faker-js/faker";

export type FactoryGenerator<T> = (faker: Faker) => T;

export type Source<T> = Partial<T> | FactoryGenerator<Partial<T>>;

export interface ObjectBuilder<T> {
  assign(object: Source<T>): ObjectBuilder<T>;
  seed(seed?: number): ObjectBuilder<T>;
  create(): T;
  createMany(quantity: number): T[];
  createWith(paths: Array<keyof T>): Partial<T>;
  createManyWith(quantity: number, paths: Array<keyof T>): Partial<T>[];
}

export interface ConstantBuilder<T> {
  seed(seed?: number): ObjectBuilder<T>;
  entry(): T;
  entries(quantity: number): T[];
}