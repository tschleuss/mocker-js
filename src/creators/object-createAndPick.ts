import type { ObjectGenerator, ObjectSource } from "~/types";
import { objectCreate } from "~/creators/object-create";

/**
 * Generates and return a list of objects containing only the provided paths.
 * @param generator Function generator responsible for creating constants.
 * @param paths List of properties to be returned in each object.
 * @param quantity The number of constants to be generated.
 * @param source Optinal object to extend/override the generated object.
 * @returns List constaining _quantity_ number of objects.
 */
export const objectCreateAndPick = <T>(
  generator: ObjectGenerator<T>,
  paths: Array<keyof T>,
  quantity: number,
  source?: ObjectSource<T>
) => {
  const models = objectCreate(generator, quantity, source);
  return models.map((model) => {
    const objKeys = Object.keys(model) as Array<keyof T>;
    const allowedPaths = objKeys.filter((key) => paths.includes(key));
    return allowedPaths.reduce((acc, key) => {
      const obj = { ...acc, [key]: model[key] };
      return obj;
    }, {} as Partial<T>);
  });
};
