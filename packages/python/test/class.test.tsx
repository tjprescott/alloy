import { expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";
import { d } from "@alloy-js/core/testing";

it("empty class", () => {
  const res = toSourceText(<py.ClassDeclaration name="testClass" />);

  expect(res).toBe(d`
    class TestClass:
      pass
  `);
});

it("single base class", () => {
  const baseClasses = "Foo";
  const res = toSourceText(<py.ClassDeclaration name="testClass" extends={baseClasses}/>);

  expect(res).toBe(d`
    class TestClass(Foo):
      pass
  `);
});

it("multi-base classes", () => {
  const baseClasses = ["Foo", "Bar"];
  const res = toSourceText(<py.ClassDeclaration name="testClass" extends={baseClasses}/>);

  expect(res).toBe(d`
    class TestClass(Foo, Bar):
      pass
  `);
});

it("with decorator", () => {
  const decorators = [{name: "dataclass"}];
  const res = toSourceText(<py.ClassDeclaration name="testClass" decorators={decorators}/>);

  expect(res).toBe(d`
    @dataclass
    class TestClass:
      pass
  `);
});

it("with decorators", () => {
  const decorators = [{name: "dataclass"}, {name: "noodle"}];
  const res = toSourceText(<py.ClassDeclaration name="testClass" decorators={decorators}/>);

  expect(res).toBe(d`
    @dataclass
    @noodle
    class TestClass:
      pass
  `);
});
