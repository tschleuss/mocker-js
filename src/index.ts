import { faker } from '@faker-js/faker';
import type { FactoryApi, CreateApi, FactoryGenerator } from './types';

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

export const mockFactory = <T> (generator: FactoryGenerator<T>): FactoryApi<T> => {
  
  function create(): T;
  function create(quantity: number): T[];
  function create(quantity?: number): T | T[] {
    const models = innerCreate(generator, quantity)
    return (quantity ?? 1) > 1 ? models : models[0];
  }

  function pick(paths: Array<keyof T>): Partial<T>;
  function pick(paths: Array<keyof T>, quantity: number): Partial<T>[];
  function pick(paths: Array<keyof T>, quantity?: number): Partial<T> | Partial<T>[] {
    const models = innerPick(generator, paths, quantity)
    return (quantity ?? 1) > 1 ? models : models[0];
  }

  return {
    create,
    pick,
  }
}