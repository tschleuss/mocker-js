import type { FactoryGenerator, Source } from "~/types";
import { objectCreate } from "~/creators/object-create";

export const objectPick = <T>(
  generator: FactoryGenerator<T>,
  paths: Array<keyof T>,
  quantity: number,
  source?: Source<T>
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
