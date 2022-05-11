import { faker } from "@faker-js/faker";
import type { ObjectSource, ObjectGenerator } from "../types";

/**
 * Type guard to detect whether the source is a Faker function or not.
 * @param source Object or function generator
 * @returns true if source is a function.
 */
export const isSourceGenerator = <T>(
  source: ObjectSource<T>
): source is ObjectGenerator<T> => {
  return typeof source === "function";
};

/**
 * Process the provided source according to its type returning a resultant object.
 * @param source Object or function generator
 * @returns Source object.
 */
export const getDefinedSource = <T>(source: ObjectSource<T> = {}) => {
  if (isSourceGenerator(source)) {
    return source(faker);
  }
  return source;
};
