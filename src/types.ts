import type { Faker } from "@faker-js/faker";

export type FactoryGenerator<T> = (faker: Faker) => T;

export interface FactoryApi<T> {
  create: CreateApi<T>,
  pick: PickApi<T>,
}

export interface CreateApi<T> {
  create(): T;
  create(): T[];
}

export interface PickApi<T> {
  (paths: Array<keyof T>): Partial<T>
  (paths: Array<keyof T>, quantity: number): Partial<T>[],
}

export interface Builder<T> {
  create(): T;
  createMany(quantity: number): T[];
  createWith(paths: Array<keyof T>): Partial<T>;
  createManyWith(quantity: number, paths: Array<keyof T>): Partial<T>[];
}