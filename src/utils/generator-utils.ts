import { faker } from "@faker-js/faker";
import { ConstantGenerator, FakerGenerator } from "~/types";

/**
 * Type guard to detect whether the generator is a Faker function or not.
 * @param generator List of static objects or function generator.
 * @returns true if generator is a function.
 */
export const isFakerGenerator = <T>(
  generator: ConstantGenerator<T>
): generator is FakerGenerator<T> => {
  return typeof generator === "function";
};

/**
 * Process the provided generator according to its type returning a list of constants.
 * @param generator List of static objects or Function generator.
 * @returns List of constants.
 */
export const getConstantGeneratorResult = <T>(
  generator: ConstantGenerator<T>
) => {
  if (isFakerGenerator(generator)) {
    return [generator(faker)];
  }
  return generator;
};
