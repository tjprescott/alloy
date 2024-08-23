import { Children, Declaration, DeclarationProps, mapJoin, Scope } from "@alloy-js/core";
import { Decorator, DecoratorProps } from "./decorator.js";
import { usePythonNamePolicy } from "../name-policy.js";
import { joinChildren } from "./util.js";

/**
 * Represents the properties for a class declaration.
 */
export interface ClassDeclarationProps extends DeclarationProps {
  decorators?: DecoratorProps[];
  extends?: Children;
}

export function ClassDeclaration(props: ClassDeclarationProps) {
  if (!props.name) {
    throw new Error("ClassDeclaration must have a name");
  }
  const name = usePythonNamePolicy().getName(props.name, "class");
  let extendsExpr = joinChildren(props.extends, ", ");
  if (extendsExpr && extendsExpr !== "") {
    extendsExpr = `(${extendsExpr})`;
  }
  const decoratorComponents = mapJoin(props.decorators ?? [], (decorator) => <Decorator {...decorator} />, {ender: '\n'});
  return (
    <Declaration {...props} name={name}>
      {decoratorComponents}class {name}{extendsExpr}:
        <Scope name={name} kind='class'>
          {props.children ?? 'pass'}
        </Scope>
    </Declaration>
  )
}