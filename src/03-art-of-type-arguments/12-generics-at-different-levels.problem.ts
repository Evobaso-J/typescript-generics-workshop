import { expect, it, describe } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export const getHomePageFeatureFlags2 = <
  T extends {
    rawConfig: {
      featureFlags: {
        homePage: {
          showBanner: boolean;
          showLogOut: boolean;
        };
      };
    };
  }
>(
  config: T,
  override: <U extends T["rawConfig"][`featureFlags`]["homePage"]>(
    // This solution is potentially wrong: the U that the function
    // is taking as a parameter will most likely be different
    // after "override" is applied, so you should return
    // T["rawConfig"][`featureFlags`]["homePage"]
    // This is working just because you defined both the
    // `showBanner` and `showLogout` types, but actually you should
    // not know the types inside the `homePage` feature flags.
    flags: U
  ) => U
) => {
  return override(config.rawConfig.featureFlags.homePage);
};

// Here's a better solution to avoid the drilling
export const getHomePageFeatureFlags = <HomePageFlags>(
  config: {
    rawConfig: {
      featureFlags: {
        homePage: HomePageFlags; // We use the generic here to make typescript infer it
      };
    };
  },
  override: (flags: HomePageFlags) => HomePageFlags // We reuse it later here
) => {
  return override(config.rawConfig.featureFlags.homePage);
};

describe("getHomePageFeatureFlags", () => {
  const EXAMPLE_CONFIG = {
    apiEndpoint: "https://api.example.com",
    apiVersion: "v1",
    apiKey: "1234567890",
    rawConfig: {
      featureFlags: {
        homePage: {
          showBanner: true,
          showLogOut: false,
        },
        loginPage: {
          showCaptcha: true,
          showConfirmPassword: false,
        },
      },
    },
  };
  it("Should return the homePage flag object", () => {
    const flags = getHomePageFeatureFlags(
      EXAMPLE_CONFIG,
      (defaultFlags) => defaultFlags
    );

    expect(flags).toEqual({
      showBanner: true,
      showLogOut: false,
    });

    type tests = [
      Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>
    ];
  });

  it("Should allow you to modify the result", () => {
    const flags = getHomePageFeatureFlags(EXAMPLE_CONFIG, (defaultFlags) => ({
      ...defaultFlags,
      showBanner: false,
    }));

    expect(flags).toEqual({
      showBanner: false,
      showLogOut: false,
    });

    type tests = [
      Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>
    ];
  });
});
