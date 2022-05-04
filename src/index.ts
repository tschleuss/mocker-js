import { faker } from '@faker-js/faker';
import type { FactoryApi, FactoryGenerator } from './types';

const create = <T> (generator: FactoryGenerator<T>): T => {
  const model = generator(faker);

  return model;
}

export const mockFactory = <T> (generator: FactoryGenerator<T>): FactoryApi<T> => {

  return {
    create: () => create(generator),
  }
}