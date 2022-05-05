import { ConstantBuilder } from "~/builder/constant-builder";
import type { ConstantGenerator, IConstantBuilder } from "~/types";

export const constantFactory = <T>(
  generator: ConstantGenerator<T>
): IConstantBuilder<T> => new ConstantBuilder<T>(generator);
