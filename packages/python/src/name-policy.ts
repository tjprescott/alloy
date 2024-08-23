import { createNamePolicy, NamePolicy, useNamePolicy } from "@alloy-js/core";
import { snakeCase, constantCase, pascalCase } from "change-case";

export type PythonElements =
  | "class"
  | "classMember"
  | "enum"
  | "enumMember"
  | "function"
  | "parameter"
  | "constant"
  | "variable"

export function createPythonNamePolicy(): NamePolicy<PythonElements> {
  return createNamePolicy((name, element) => {
    switch (element) {
      case "class":
      case "enum":
        return pascalCase(name);
      case "enumMember":
      case "constant":
        return constantCase(name);
      default:
        return snakeCase(name);
    }
  });
}

export function usePythonNamePolicy(): NamePolicy<PythonElements> {
  return createPythonNamePolicy();
}
