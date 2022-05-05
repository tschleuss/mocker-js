import { faker } from "@faker-js/faker";
import type { Source, FactoryGenerator, Builder } from "./types";

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

class MockBuilder<T> implements Builder<T> {
  static #DEFAULT_QUANTITY = 1;

  #generator: FactoryGenerator<T>;
  #source?: Partial<T>;

  constructor(generator: FactoryGenerator<T>) {
    this.#generator = generator;
  }

  assign = (object: Partial<T>): Builder<T> => {
    this.#source = object;
    return this;
  };

  create = (): T => {
    const models = innerCreate(
      this.#generator,
      MockBuilder.#DEFAULT_QUANTITY,
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
      MockBuilder.#DEFAULT_QUANTITY,
      this.#source
    );
    return models[0];
  };

  createManyWith = (quantity: number, paths: Array<keyof T>): Partial<T>[] => {
    const models = innerPick(this.#generator, paths, quantity, this.#source);
    return models;
  };
}

export const mockFactory = <T>(generator: FactoryGenerator<T>): Builder<T> => {
  const builder = new MockBuilder<T>(generator);

  return builder;
};
