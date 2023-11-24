import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * There are two possible solutions to this problem - and it's
 * to do with the way you specify the generic. Can you get
 * both solutions?
 */

// SOLUTION 1
const typedObjectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as (keyof T)[];
};

it("Should return the keys of the object", () => {
  const result1 = typedObjectKeys({
    a: 1,
    b: 2,
  });

  expect(result1).toEqual(["a", "b"]);

  type test = Expect<Equal<typeof result1, Array<"a" | "b">>>;
});

// SOLUTION 2
const typedObjectKeys2 = <T extends object, U extends keyof T>(obj: T) => {
  return Object.keys(obj) as U[];
};

it("Should return the keys of the object", () => {
  const result2 = typedObjectKeys2({
    a: 1,
    b: 2,
  });

  expect(result2).toEqual(["a", "b"]);

  type test = Expect<Equal<typeof result2, Array<"a" | "b">>>;
});

// Solution 2 could have been done better, with just 1 generic
// REMEMBER THAT Record<T, U> EXISTS AND IT'S ACTUALLY USEFUL!
const typedObjectKeys3 = <T extends string>(obj: Record<T, any>) => {
  return Object.keys(obj) as T[];
};

it("Should return the keys of the object", () => {
  const result3 = typedObjectKeys3({
    a: 1,
    b: 2,
  });

  expect(result3).toEqual(["a", "b"]);

  type test = Expect<Equal<typeof result3, Array<"a" | "b">>>;
});
