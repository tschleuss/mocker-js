import { faker } from '@faker-js/faker';
import type { FactoryApi, CreateApi, FactoryGenerator, Builder } from './types';

const innerCreate = <T> (generator: FactoryGenerator<T>, quantity = 1) => {
  const models = Array.from({ length: quantity }).map(() => generator(faker))
  return models;
}

const innerPick = <T> (generator: FactoryGenerator<T>, paths: Array<keyof T>, quantity = 1) => {
  const models = innerCreate(generator, quantity);
  return models.map(model => {
    const objKeys = Object.keys(model) as Array<keyof T>;
    const allowedPaths = objKeys.filter((key) => paths.includes(key));
    return allowedPaths.reduce((acc, key) => {
      const obj = {...acc, [key]: model[key] };
      return obj;
    }, {} as Partial<T>);
  });
}

class MockBuilder<T> implements Builder<T> {
  #generator: FactoryGenerator<T>;

  constructor(generator: FactoryGenerator<T>) {
    this.#generator = generator;
  }

  create = (): T => {
    const models = innerCreate(this.#generator)
    return models[0];
  }

  createMany = (quantity: number): T[] => {
    const models = innerCreate(this.#generator, quantity)
    return models;
  }

  createWith = (paths: Array<keyof T>): Partial<T> => {
    const models = innerPick(this.#generator, paths)
    return models[0];
  }

  createManyWith = (quantity: number, paths: Array<keyof T>): Partial<T>[] => {
    const models = innerPick(this.#generator, paths, quantity)
    return models;
  }
}

export const mockFactory = <T> (generator: FactoryGenerator<T>): Builder<T> => {
  const builder = new MockBuilder<T>(generator);

  return builder;
}