import { faker } from "@faker-js/faker";
import type { Source, FactoryGenerator } from "../types";

export const isSourceGenerator = <T>(
  source: Source<T>
): source is FactoryGenerator<T> => {
  return typeof source === "function";
};

export const getDefinedSource = <T>(source: Source<T> = {}) => {
  if (isSourceGenerator(source)) {
    return source(faker);
  }
  return source;
};
