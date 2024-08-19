import { OutputSymbol, refkey, useBinder, useScope } from "@alloy-js/core";
import { DeclarationProps, usePackage } from "../components/index.js";
import { PythonOutputScope } from "./scopes.js";

/**
 * Represents an 'exported' symbol from a .java file. Class, enum, interface etc.
 * Not considered exported if private
 */
export interface PythonOutputSymbol extends OutputSymbol {
  /**
   * Fully qualified package name
   */
  package?: string;
}

export function createPythonSymbol(props: DeclarationProps) {
  const binder = useBinder();
  const scope = useScope() as PythonOutputScope;

  const parentPackage = usePackage();

  const sym = binder.createSymbol<PythonOutputSymbol>({
    name: props.name,
    scope,
    refkey: props.refkey ?? refkey(props.name),
    package: parentPackage !== null ? parentPackage?.qualifiedName : "",
  });

  return sym;
}
