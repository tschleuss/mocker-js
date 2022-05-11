import { ObjectBuilder } from "~/builder/object-builder";
import type { ObjectGenerator, IObjectBuilder } from "~/types";

/**
 * Factory responsible for creating a new instance of object builder.
 * @param generator Function generator responsible for creating objects.
 * @returns A object builder used to create objects.
 */
export const objectFactory = <T>(
  generator: ObjectGenerator<T>
): IObjectBuilder<T> => new ObjectBuilder<T>(generator);
