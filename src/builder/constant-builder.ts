import { faker } from "@faker-js/faker";
import { constantEntry } from "~/creators/constant-entry";
import { constantSample } from "~/creators/constant-sample";
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
    const entries = constantEntry(this.#generator, DEFAULT_QUANTITY);
    return entries[0];
  };

  entries = (quantity: number): T[] => {
    const entries = constantEntry(this.#generator, quantity);
    return entries;
  };

  sample = (quantity: number): T[] => {
    const entries = constantSample(this.#generator, quantity);
    return entries;
  };
}
