import { ObjectBuilder } from "~/builder/object-builder";
import type { FactoryGenerator, IObjectBuilder } from "~/types";

export const objectFactory = <T>(
  generator: FactoryGenerator<T>
): IObjectBuilder<T> => new ObjectBuilder<T>(generator);
