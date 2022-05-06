import { faker } from "@faker-js/faker";
import type { ConstantGenerator } from "~/types";
import { getConstantGeneratorResult } from "~/utils/generator-utils";
import { getPositiveQuantity } from "~/utils/property-validators";

export const constantSample = <T>(
  generator: ConstantGenerator<T>,
  quantity: number
) => {
  const absQuantity = getPositiveQuantity(quantity);
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
