import { faker } from "@faker-js/faker";
import { objectCreate } from "~/creators/object-create";
import { objectCreateAndPick } from "~/creators/object-createAndPick";
import type { ObjectGenerator, IObjectBuilder } from "~/types";

const DEFAULT_QUANTITY = 1;

export class ObjectBuilder<T> implements IObjectBuilder<T> {
  #generator: ObjectGenerator<T>;
  #source?: Partial<T>;

  constructor(generator: ObjectGenerator<T>) {
    this.#generator = generator;
  }

  seed = (seed?: number): ObjectBuilder<T> => {
    faker.seed(seed);
    return this;
  };

  assign = (object: Partial<T>): ObjectBuilder<T> => {
    const builder = new ObjectBuilder(this.#generator);
    builder.#source = object;
    return builder;
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

  createAndPick = (paths: Array<keyof T>): Partial<T> => {
    const models = objectCreateAndPick(
      this.#generator,
      paths,
      DEFAULT_QUANTITY,
      this.#source
    );
    return models[0];
  };

  createManyAndPick = (quantity: number, paths: Array<keyof T>): Partial<T>[] => {
    const models = objectCreateAndPick(
      this.#generator,
      paths,
      quantity,
      this.#source
    );
    return models;
  };
}
