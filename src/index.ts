import { faker } from "@faker-js/faker";
import type { Source, FactoryGenerator, ObjectBuilder } from "./types";

const isSourceGenerator = <T> (source: Source<T>): source is FactoryGenerator<T> => {
  return (typeof source === "function");
}

const getPositiveQuantity = (quantity: number) => {
  return quantity <= 0 ? 1 : quantity;
}

const getDefinedSource = <T>(source: Source<T> = {}) => {
  if(isSourceGenerator(source)) {
    return source(faker);
  }
  return source;
}

const innerCreate = <T>(
  generator: FactoryGenerator<T>,
  quantity: number,
  source?: Source<T>
) => {
  const length = getPositiveQuantity(quantity);
  const sourceObject = getDefinedSource(source);
  const models = Array.from({ length }).map(() => ({
    ...generator(faker),
    ...sourceObject,
  }));
  return models;
};

const innerPick = <T>(
  generator: FactoryGenerator<T>,
  paths: Array<keyof T>,
  quantity: number,
  source?: Source<T>
) => {
  const models = innerCreate(generator, quantity, source);
  return models.map((model) => {
    const objKeys = Object.keys(model) as Array<keyof T>;
    const allowedPaths = objKeys.filter((key) => paths.includes(key));
    return allowedPaths.reduce((acc, key) => {
      const obj = { ...acc, [key]: model[key] };
      return obj;
    }, {} as Partial<T>);
  });
};

class MockObjectBuilder<T> implements ObjectBuilder<T> {
  static #DEFAULT_QUANTITY = 1;

  #generator: FactoryGenerator<T>;
  #source?: Partial<T>;
  #seed?: number;

  constructor(generator: FactoryGenerator<T>) {
    this.#generator = generator;
  }

  seed = (seed?: number): ObjectBuilder<T> => {
    faker.seed(seed);
    return this;
  }

  assign = (object: Partial<T>): ObjectBuilder<T> => {
    this.#source = object;
    return this;
  };

  create = (): T => {
    const models = innerCreate(
      this.#generator,
      MockObjectBuilder.#DEFAULT_QUANTITY,
      this.#source
    );
    return models[0];
  };

  createMany = (quantity: number): T[] => {
    const models = innerCreate(this.#generator, quantity, this.#source);
    return models;
  };

  createWith = (paths: Array<keyof T>): Partial<T> => {
    const models = innerPick(
      this.#generator,
      paths,
      MockObjectBuilder.#DEFAULT_QUANTITY,
      this.#source
    );
    return models[0];
  };

  createManyWith = (quantity: number, paths: Array<keyof T>): Partial<T>[] => {
    const models = innerPick(this.#generator, paths, quantity, this.#source);
    return models;
  };
}

export const objectFactory = <T>(generator: FactoryGenerator<T>): ObjectBuilder<T> => {
  const builder = new MockObjectBuilder<T>(generator);

  return builder;
};
