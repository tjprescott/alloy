import { Children, Declaration, code, useNamePolicy } from "@alloy-js/core";
import { BaseClasses } from "./base-classes.js";
import { ConstantDeclaration } from "./constant-declaration.js";
import { mapWithSep } from "./utils.js";

/**
 * Represents the properties for a class declaration.
 */
export interface EnumDeclarationModel {
  /** Name of the enum */
  name: string;
  children?: Children;
}

export function EnumDeclaration({ name, children }: EnumDeclarationModel) {
  const namer = useNamePolicy();
  const enumName = name ?? namer.getName(type, "class");
  const memberComponents = mapWithSep(
    type.members.values(),
    (member) => {
      const value = member.value ?? member.name;
      return <ConstantDeclaration name={member.name} value={value} />;
    },
    "\n"
  );
  const baseClasses = ["Enum"];
  const baseClassComponents = <BaseClasses values={baseClasses} />;

  // TODO: Check if anything is already defined in children
  return (
    <Declaration name={enumName} refkey={type}>
      {code`
        class ${enumName}${baseClassComponents}:
          ${memberComponents}
          ${children}
      `}
    </Declaration>
  );
}