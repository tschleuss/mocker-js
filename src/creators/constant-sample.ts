import { faker } from "@faker-js/faker";
import type { ConstantGenerator } from "~/types";
import { getConstantGeneratorResult } from "~/utils/generator-utils";

/**
 * Generates and return a sample subset of constants.
 * This subset contains unique/non duplicated constants.
 * @param generator Function generator responsible for creating constants.
 * @param quantity The number of constants to be generated.
 * @returns List containing _quantity_ number of constants.
 */
export const constantSample = <T>(
  generator: ConstantGenerator<T>,
  quantity: number
) => {
  const absQuantity = Math.max(1, quantity);
  const generatorResult = getConstantGeneratorResult(generator);
  const list = faker.helpers.shuffle([...generatorResult]);

  const size = list.length;
  const end = absQuantity > size ? size : absQuantity;
  let index = -1;

  while (++index < end) {
    const rand = faker.datatype.number(size - 1);
    const value = list[rand];
    list[rand] = list[index];
    list[index] = value;
  }

  return list.slice(0, end);
};
