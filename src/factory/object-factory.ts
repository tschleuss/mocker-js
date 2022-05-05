import { ObjectBuilder } from "~/builder/object-builder";
import type { ObjectGenerator, IObjectBuilder } from "~/types";

export const objectFactory = <T>(
  generator: ObjectGenerator<T>
): IObjectBuilder<T> => new ObjectBuilder<T>(generator);
