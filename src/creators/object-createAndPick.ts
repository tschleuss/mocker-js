import type { ObjectGenerator, ObjectSource } from "~/types";
import { objectCreate } from "~/creators/object-create";

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
