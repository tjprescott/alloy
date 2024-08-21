import { Children, Declaration, DeclarationProps, Scope, code } from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";

/**
 * Represents the properties for a class declaration.
 */
export interface ClassDeclarationProps extends DeclarationProps {
  extends?: Children;
}

export function ClassDeclaration(props: ClassDeclarationProps) {
  if (!props.name) {
    throw new Error("ClassDeclaration must have a name");
  }
  const name = usePythonNamePolicy().getName(props.name, "class");
  const extendsExpression = props.extends ? code`(${props.extends})` : "";
  return (
    <Declaration {...props} name={name}>
      class {name}{extendsExpression}:
      <Scope name={name} kind='class'>
        {props.children ?? code`pass`}
      </Scope>
    </Declaration>
  )
}