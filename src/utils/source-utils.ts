import { faker } from "@faker-js/faker";
import type { ObjectSource, ObjectGenerator } from "../types";

export const isSourceGenerator = <T>(
  source: ObjectSource<T>
): source is ObjectGenerator<T> => {
  return typeof source === "function";
};

export const getDefinedSource = <T>(source: ObjectSource<T> = {}) => {
  if (isSourceGenerator(source)) {
    return source(faker);
  }
  return source;
};
