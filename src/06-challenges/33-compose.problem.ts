import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

// Here we don't have any way to compose functions but to add one overload for each number of functions we want to compose manually
// However, this is a generally used and respected solution since it's the only way to have type safety in this case.
// We can add as many overloads as we want, but we can't have a solution for any number of functions.

export function compose<T1, T2, T3, T4, T5>(
  func1: (input: T1) => T2,
  func2: (input: T2) => T3,
  func3: (input: T3) => T4,
  func4: (input: T4) => T5
): (input: T1) => T5;
export function compose<T1, T2, T3, T4>(
  func1: (input: T1) => T2,
  func2: (input: T2) => T3,
  func3: (input: T3) => T4
): (input: T1) => T4;
export function compose<T1, T2, T3>(
  func1: (input: T1) => T2,
  func2: (input: T2) => T3
): (input: T1) => T3;
export function compose<T1, T2>(func: (input: T1) => T2): (input: T1) => T2;
export function compose(...funcs: Array<(input: any) => any>) {
  return (input: any) => {
    return funcs.reduce((acc, fn) => fn(acc), input);
  };
}

const addOne = (num: number) => {
  return num + 1;
};

const addTwoAndStringify = compose(addOne, addOne, String);

it("Should compose multiple functions together", () => {
  const result = addTwoAndStringify(4);

  expect(result).toEqual("6");

  type tests = [Expect<Equal<typeof result, string>>];
});

it("Should error when the input to a function is not typed correctly", () => {
  const stringifyThenAddOne = compose(
    // addOne takes in a number - so it shouldn't be allowed after
    // a function that returns a string!
    // @ts-expect-error
    String,
    addOne
  );
});
