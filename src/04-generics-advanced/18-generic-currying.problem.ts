import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export const curryFunction =
  <T extends number, U extends number, V extends number>(t: T) =>
  (u: U) =>
  (
    v: V
  ): {
    t: number;
    u: number;
    v: number;
  } => {
    return {
      t,
      u,
      v,
    };
  };

it("Should return an object which matches the types of each input", () => {
  const result = curryFunction(1)(2)(3);

  expect(result).toEqual({
    t: 1,
    u: 2,
    v: 3,
  });

  type test = [
    Expect<Equal<typeof result, { t: number; u: number; v: number }>>
  ];
});

// This works, but the following solution is way, way better

export const curryFunction2 =
  <T>(t: T) =>
  <U>(u: U) =>
  <V>(v: V) => {
    return {
      t,
      u,
      v,
    };
  };

// We just need to move the type generics to the right function call!
// The problem was that every generic type was attached to the first function call.
// Each function should have its own generic instead

it("Should return an object which matches the types of each input", () => {
  const result = curryFunction2(1)(2)(3);

  expect(result).toEqual({
    t: 1,
    u: 2,
    v: 3,
  });

  type test = [
    Expect<Equal<typeof result, { t: number; u: number; v: number }>>
  ];
});
