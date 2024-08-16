import { Children, code, useNamePolicy } from "@alloy-js/core";
import { TypeExpression } from "./type-expression.js";
import { mapWithSep } from "./utils.js";

export interface FunctionDeclarationModel {
  name: string;
  children?: Children;
}

export function FunctionDeclaration({ name, children }: FunctionDeclarationModel) {
  const namer = useNamePolicy();
  const functionName = name ?? namer.getName(type, "function");
  const signature = mapWithSep(
    type.parameters.properties.values(),
    (param) => (
      <>
        {param.name}: <TypeExpression type={param.type} />
      </>
    ),
    ", "
  );
  return code`
    def ${functionName}(${signature}):
      ${children}
  `;
}