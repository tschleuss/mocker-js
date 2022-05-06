import { faker } from "@faker-js/faker";
import type { ConstantGenerator } from "~/types";
import { getConstantGeneratorResult } from "~/utils/generator-utils";
import { getPositiveQuantity } from "~/utils/property-validators";

export const constantEntry = <T>(
  generator: ConstantGenerator<T>,
  quantity: number
) => {
  const absQuantity = getPositiveQuantity(quantity);
  return Array.from<T>({ length: absQuantity }).map(() => {
    const generatorResult = getConstantGeneratorResult(generator);
    const rand = faker.datatype.number(generatorResult.length - 1);
    return generatorResult[rand];
  });
};
