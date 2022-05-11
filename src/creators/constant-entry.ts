import { faker } from "@faker-js/faker";
import type { ConstantGenerator } from "~/types";
import { getConstantGeneratorResult } from "~/utils/generator-utils";

/**
 * Generates and return a list of constants.
 * This function calls the generator function a _quantity_ number of times.
 * @param generator Function generator responsible for creating constants.
 * @param quantity The number of constants to be generated.
 * @returns List containing _quantity_ number of constants.
 */
export const constantEntry = <T>(
  generator: ConstantGenerator<T>,
  quantity: number
) => {
  const absQuantity = Math.max(1, quantity);
  return Array.from<T>({ length: absQuantity }).map(() => {
    const generatorResult = getConstantGeneratorResult(generator);
    const rand = faker.datatype.number(generatorResult.length - 1);
    return generatorResult[rand];
  });
};
