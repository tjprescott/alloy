import { Children, Declaration, code, useNamePolicy } from "@alloy-js/core";
import { ClassVariable } from "./class-variable.js";
import { Initializer } from "./initializer.js";
import { mapWithSep } from "./utils.js";

/**
 * Represents the properties for a class declaration.
 */
export interface ClassDeclarationModel {
  name: string;
  children?: Children;
}

export function ClassDeclaration({ name, children }: ClassDeclarationModel) {
  // COMMENT: Is there a way for me to create and set the naming policy I want? What does that look like?
  const namer = useNamePolicy();
  // COMMENT: It's kind of annoying that I have to "just know" these kind values. I've had plenty of crashes due
  // to putting an unsupported value here. Could we expose it as an enum instead?
  // Alternatively, maybe the name just accepts an enum of known formats (pascalCase, camelCase, etc.)
  // so you don't have to invent these "kinds" but just state explicitly the desired end-format. Or maybe
  // that is just a different method on the namer.
  // COMMENT: Definitely would like getName to accept: Type | string.
  const className = name ?? namer.getName(type, "class");

  // TODO: Sort the model properties based on presence of decorator to separate class and instance variables.
  const classProperties: ModelProperty[] = [];
  const instanceProperties: ModelProperty[] = [];

  // COMMENT: While trying to debug this, I noticed the stack trace just became a huge mess of alternating "renderWorker"
  // and "handleChildren" calls. I never actually could find what instantiated this component in the stack trace. Probably
  // something we want to look at since it could make it difficult to debug.
  for (const prop of type.properties.values()) {
    // FIXME: This should be triggered based on the presence of the @classVariable decorator.
    // But I can't get it to work. I suspect something isn't being exported fully, but it's
    // a distraction right now so I'll just use this wonky magic string for testing.
    if (prop.name === "special") {
      classProperties.push(prop);
    } else {
      instanceProperties.push(prop);
    }
  }

  const classVariableComponents = mapWithSep(
    classProperties,
    (prop) => {
      return <ClassVariable type={prop} />;
    },
    "\n"
  );
  const initializerComponents = <Initializer type={[...instanceProperties, ...classProperties]} />;

  // TODO: Implement these
  const methodComponents = undefined;
  const decoratorComponents = undefined; //<Decorators values={decorators} />;
  const baseClassComponents = undefined; //<BaseClasses values={baseClasses} />;

  // TODO: Check if anything is already defined in children
  return (
    <Declaration name={className} refkey={type}>
      {code`
        ${decoratorComponents}
        class ${className}${baseClassComponents}:
          ${classVariableComponents}
          ${initializerComponents}
          ${methodComponents}
          ${children}
      `}
    </Declaration>
  );
}