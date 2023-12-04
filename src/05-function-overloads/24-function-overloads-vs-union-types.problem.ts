import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

type GeneratorFunction<T> = () => T;
type GeneratorObject<T> = { run: () => T };

function runGenerator<T>(generator: GeneratorFunction<T>): T;
function runGenerator<T>(generator: GeneratorObject<T>): T;
function runGenerator<T>(
  generator: GeneratorFunction<T> | GeneratorObject<T>
): T {
  if (typeof generator === "function") {
    return generator();
  }
  return generator.run();
}
// Note that the return type doesn't changed based on the parameters,
// so we might as well use a union type for this, and actually we should

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator({
    run: () => "hello",
  });

  expect(result).toBe("hello");

  type test1 = Expect<Equal<typeof result, string>>;
});

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator(() => "hello");

  expect(result).toBe("hello");

  type test1 = Expect<Equal<typeof result, string>>;
});
