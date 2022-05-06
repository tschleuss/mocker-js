import { faker } from "@faker-js/faker";
import { ConstantGenerator, FakerGenerator } from "~/types";

export const isFakerGenerator = <T>(
  generator: ConstantGenerator<T>
): generator is FakerGenerator<T> => {
  return typeof generator === "function";
};

export const getConstantGeneratorResult = <T>(
  generator: ConstantGenerator<T>
) => {
  if (isFakerGenerator(generator)) {
    return [generator(faker)];
  }
  return generator;
};
