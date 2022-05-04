import { faker } from '@faker-js/faker';
import type { FactoryApi, CreateApi, FactoryGenerator } from './types';

const innerCreate = <T> (generator: FactoryGenerator<T>, quantity = 1) => {
  const list = Array.from({ length: quantity }).map(() => generator(faker))
  return quantity > 1 ? list : list[0];
}

export const mockFactory = <T> (generator: FactoryGenerator<T>): FactoryApi<T> => {
  
  function create(): T;
  function create(quantity: number): T[];
  function create(quantity?: number): T | T[] {
    return innerCreate(generator, quantity)
  }

  return {
    create,
  }
}