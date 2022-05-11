import { faker } from "@faker-js/faker";
import type { ObjectGenerator, ObjectSource } from "~/types";
import { getDefinedSource } from "~/utils/source-utils";

/**
 * Generates and return a list of objects.
 * @param generator Function generator responsible for creating objects.
 * @param quantity The number of objects to be generated.
 * @param source Optinal object to extend/override the generated object.
 * @returns List constaining _quantity_ number of objects.
 */
export const objectCreate = <T>(
  generator: ObjectGenerator<T>,
  quantity: number,
  source?: ObjectSource<T>
) => {
  const length = Math.max(1, quantity);
  const sourceObject = getDefinedSource(source);
  const models = Array.from({ length }).map(() => ({
    ...generator(faker),
    ...sourceObject,
  }));
  return models;
};
