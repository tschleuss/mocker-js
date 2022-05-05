import { faker } from "@faker-js/faker";
import { objectCreate } from "~/creators/object-create";
import { objectPick } from "~/creators/object-pick";
import type { FactoryGenerator, IObjectBuilder } from "~/types";

const DEFAULT_QUANTITY = 1;

export class ObjectBuilder<T> implements IObjectBuilder<T> {
  #generator: FactoryGenerator<T>;
  #source?: Partial<T>;

  constructor(generator: FactoryGenerator<T>) {
    this.#generator = generator;
  }

  seed = (seed?: number): ObjectBuilder<T> => {
    faker.seed(seed);
    return this;
  };

  assign = (object: Partial<T>): ObjectBuilder<T> => {
    this.#source = object;
    return this;
  };

  create = (): T => {
    const models = objectCreate(
      this.#generator,
      DEFAULT_QUANTITY,
      this.#source
    );
    return models[0];
  };

  createMany = (quantity: number): T[] => {
    const models = objectCreate(this.#generator, quantity, this.#source);
    return models;
  };

  createWith = (paths: Array<keyof T>): Partial<T> => {
    const models = objectPick(
      this.#generator,
      paths,
      DEFAULT_QUANTITY,
      this.#source
    );
    return models[0];
  };

  createManyWith = (quantity: number, paths: Array<keyof T>): Partial<T>[] => {
    const models = objectPick(this.#generator, paths, quantity, this.#source);
    return models;
  };
}
