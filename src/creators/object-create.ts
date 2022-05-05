import { faker } from "@faker-js/faker";
import type { FactoryGenerator, Source } from "~/types";
import { getPositiveQuantity } from "~/utils/property-validators";
import { getDefinedSource } from "~/utils/source-utils";

export const objectCreate = <T>(
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
