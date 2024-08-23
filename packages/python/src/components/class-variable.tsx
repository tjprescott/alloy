import { code } from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";

export interface ClassVariableProps {
    name: string;
    // TODO: Replace this with a component so we can handle imports?
    type: string;
}

export function ClassVariable(props: ClassVariableProps) {
  const name = usePythonNamePolicy().getName(props.name, "classMember");

  // TODO: Some way to configure whether you actually want types
  // Python doesn't require them.
  return code`${name}: ${props.type}`;
}
