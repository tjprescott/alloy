import { Children, Declaration, DeclarationProps, mapJoin, Scope } from "@alloy-js/core";
import { ParameterDescriptor } from "./parameter.js";

export interface InitDeclarationProps extends Omit<DeclarationProps, "name"> {
  parameters?: Record<string, Children | ParameterDescriptor>;
}

function isParameterDescriptor(value: Children | ParameterDescriptor): value is ParameterDescriptor {
  return (
    typeof value === "object" && value !== null && Object.hasOwn(value, "type")
  );
}

export function InitDeclaration(props: InitDeclarationProps) {
  const name = "__init__";
  const args = props.parameters ?? {};
  args.self = "self";
  const argsClause = mapJoin(Object.entries(args), ([name, param]) => {
    if (isParameterDescriptor(param)) {
      return `${name}: ${param.type}`;
    } else if (param) {
      return `${name}: ${param}`
    } else {
      return name;
    }
  });
  return (
    <Declaration {...props} name={name}>
      __init__(${argsClause}):
        <Scope name={name} kind='method'>
          {props.children ?? 'pass'}
        </Scope>
    </Declaration>
  );
}