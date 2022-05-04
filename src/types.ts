import type { Faker } from "@faker-js/faker";

export type FactoryGenerator<T> = (faker: Faker) => T;

export interface FactoryApi<T> {
  create: CreateApi<T>,
}

export interface CreateApi<T> {
  (): T
  (quantity: number): T[],
}