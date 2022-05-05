import { faker } from "@faker-js/faker";
import type { ConstantGenerator, IConstantBuilder } from "~/types";

const DEFAULT_QUANTITY = 1;

export class ConstantBuilder<T> implements IConstantBuilder<T> {
  #generator: ConstantGenerator<T>;

  constructor(generator: ConstantGenerator<T>) {
    this.#generator = generator;
  }

  seed = (seed?: number): IConstantBuilder<T> => {
    faker.seed(seed);
    return this;
  };

  entry = (): T => {
    return {} as T; // TODO
  };

  entries = (quantity: number): T[] => {
    return [] as T[]; // TODO
  };
}
