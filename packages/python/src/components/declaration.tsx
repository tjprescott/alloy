import {
  Children,
  Declaration as CoreDeclaration,
  Refkey,
} from "@alloy-js/core";
import { createPythonSymbol } from "../symbols/index.js";

export interface DeclarationProps {
  name: string;
  refkey?: Refkey;
  children?: Children;
}

export function Declaration(props: DeclarationProps) {
  const sym = createPythonSymbol(props);
  return (
    <CoreDeclaration symbol={sym}>
      {props.children}
    </CoreDeclaration>
  );
}
