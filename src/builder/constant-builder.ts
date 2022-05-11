import { faker } from "@faker-js/faker";
import { constantEntry } from "~/creators/constant-entry";
import { constantSample } from "~/creators/constant-sample";
import type { ConstantGenerator, IConstantBuilder } from "~/types";

const DEFAULT_QUANTITY = 1;

export class ConstantBuilder<T> implements IConstantBuilder<T> {
  #generator: ConstantGenerator<T>;

  /**
   * Default constructor.
   * @param generator Function generator responsible for creating constants.
   */
  constructor(generator: ConstantGenerator<T>) {
    this.#generator = generator;
  }

  /**
   * Sets the seed or generates a new one.
   * It's used in case you need consistent results in a test.
   * @param seed The seed to use to generate the data.
   * @returns The builder instance.
   */
  seed = (seed?: number): IConstantBuilder<T> => {
    faker.seed(seed);
    return this;
  };

  /**
   * Generates one random entry from the constants list.
   * @returns The generated constant.
   */
  entry = (): T => {
    const entries = constantEntry(this.#generator, DEFAULT_QUANTITY);
    return entries[0];
  };

  /**
   * Generates one or more random entries from the constants list.
   * @param quantity The number of constants to be generated.
   * @returns List containing _quantity_ number of constants.
   */
  entries = (quantity: number): T[] => {
    const entries = constantEntry(this.#generator, quantity);
    return entries;
  };

  /**
   * Generates and return a sample subset of the constants list.
   * This subset contains unique/non duplicated constants.
   * @param quantity The number of constants to be generated.
   * @returns List containing _quantity_ number of constants.
   */
  sample = (quantity: number): T[] => {
    const entries = constantSample(this.#generator, quantity);
    return entries;
  };
}
