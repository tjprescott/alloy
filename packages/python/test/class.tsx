import { expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.js";
import { d } from "@alloy-js/core/testing";

it("works", () => {
  const res = toSourceText(<py.ClassDeclaration name="testClass" />);

  expect(res).toBe(d`
    class TestClass:
      pass
  `);
});
