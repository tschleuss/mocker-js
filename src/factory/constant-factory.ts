import { ConstantBuilder } from "~/builder/constant-builder";
import type { ConstantGenerator, IConstantBuilder } from "~/types";

/**
 * Factory responsible for creating a new instance of constant builder.
 * @param generator Function generator responsible for creating constants.
 * @returns A constant builder used to create constants.
 */
export const constantFactory = <T>(
  generator: ConstantGenerator<T>
): IConstantBuilder<T> => new ConstantBuilder<T>(generator);
