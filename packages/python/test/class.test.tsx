import { expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";
import { d } from "@alloy-js/core/testing";
import { ref } from "../src/index.js";
import { Children, refkey } from "@alloy-js/core";

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

it("with class variables", () => {
  const res = toSourceText((
    <py.ClassDeclaration name="testClass">
      <py.ClassVariable name="fooVar" type="int" />
      <py.ClassVariable name="barVar" type="str" />
    </ py.ClassDeclaration>
  ));

  expect(res).toBe(d`
    class TestClass:
      foo_var: int
      bar_var: str
  `);
});

it("with instance variables", () => {
  const args = {
    fooVar: {type: "int", refkey: refkey("fooVar")},
    barVar: {type: "str", refkey: refkey("barVar")},
  }
  const res = toSourceText((
    <py.ClassDeclaration name="testClass">
      <py.InitDeclaration parameters={args} />
    </ py.ClassDeclaration>
  ));

  expect(res).toBe(d`
    class TestClass:
      __init__(self, foo_var: int, bar_var: str):
        pass
  `);
});