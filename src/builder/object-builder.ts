import { faker } from "@faker-js/faker";
import { objectCreate } from "~/creators/object-create";
import { objectCreateAndPick } from "~/creators/object-createAndPick";
import type { ObjectGenerator, IObjectBuilder } from "~/types";

const DEFAULT_QUANTITY = 1;

export class ObjectBuilder<T> implements IObjectBuilder<T> {
  #generator: ObjectGenerator<T>;
  #source?: Partial<T>;

  /**
   * Default constructor.
   * @param generator Function generator responsible for creating objects.
   */
  constructor(generator: ObjectGenerator<T>) {
    this.#generator = generator;
  }

  /**
   * Sets the seed or generates a new one.
   * It's used in case you need consistent results in a test.
   * @param seed The seed to use to generate the data.
   * @returns The builder instance.
   */
  seed = (seed?: number): ObjectBuilder<T> => {
    faker.seed(seed);
    return this;
  };

  /**
   * Assigns own string keyed properties of source object to the destination object.
   * In practice you can define properties that will persist between every object created.
   * @param source The source object.
   * @returns A new builder instance with the persisted source object.
   */
  assign = (source: Partial<T>): ObjectBuilder<T> => {
    const builder = new ObjectBuilder(this.#generator);
    builder.#source = source;
    return builder;
  };

  /**
   * Creates one new object based on the previously provided factory generator.
   * @returns A new object.
   */
  create = (): T => {
    const models = objectCreate(
      this.#generator,
      DEFAULT_QUANTITY,
      this.#source
    );
    return models[0];
  };

  /**
   * Creates one or more objects based on the previously provided factory generator.
   * @param quantity Number of objects to be created.
   * @returns List constaining _quantity_ number of objects.
   */
  createMany = (quantity: number): T[] => {
    const models = objectCreate(this.#generator, quantity, this.#source);
    return models;
  };

  /**
   * Creates one object containing only the provided paths.
   * @param paths List of properties to be returned on the object.
   * @returns A new object.
   */
  createAndPick = (paths: Array<keyof T>): Partial<T> => {
    const models = objectCreateAndPick(
      this.#generator,
      paths,
      DEFAULT_QUANTITY,
      this.#source
    );
    return models[0];
  };

  /**
   * Creates one or more objects containing only the provided paths.
   * @param quantity Number of objects to be created.
   * @param paths List of properties to be returned on the object.
   * @returns List constaining _quantity_ number of objects.
   */
  createManyAndPick = (
    quantity: number,
    paths: Array<keyof T>
  ): Partial<T>[] => {
    const models = objectCreateAndPick(
      this.#generator,
      paths,
      quantity,
      this.#source
    );
    return models;
  };
}
