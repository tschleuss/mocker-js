import { ConstantBuilder } from "~/builder/constant-builder";
import type { FactoryGenerator, IConstantBuilder } from "~/types";

export const constantFactory = <T>(
  generator: FactoryGenerator<T>
): IConstantBuilder<T> => new ConstantBuilder<T>(generator);
