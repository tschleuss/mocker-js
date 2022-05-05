import type { Faker } from "@faker-js/faker";

export type FactoryGenerator<T> = (faker: Faker) => T;

export interface FactoryApi<T> {
  create: CreateApi<T>,
  pick: PickApi<T>,
}

export interface CreateApi<T> {
  (): T
  (quantity: number): T[],
}

export interface PickApi<T> {
  (paths: Array<keyof T>): Partial<T>
  (paths: Array<keyof T>, quantity: number): Partial<T>[],
}