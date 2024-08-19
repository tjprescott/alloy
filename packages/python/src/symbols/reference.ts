import { memo, Refkey, resolve, untrack, useContext } from "@alloy-js/core";
import { SourceFileContext } from "../components/index.js";
import { PythonOutputScope } from "./scopes.js";
import { PythonOutputSymbol } from "./python-output-symbol.js";

/**
 * Resolve reference to symbol reference, and handle dependency management
 *
 * @param refkey Reference key to symbol
 */
export function ref(refkey: Refkey) {
  const sourceFile = useContext(SourceFileContext);
  const result = resolve<PythonOutputScope, PythonOutputSymbol>(refkey as Refkey);

  return memo(() => {
    if (result.value === undefined) {
      return "<Unresolved Symbol>";
    }

    const { targetDeclaration, pathDown, pathUp, commonScope } = result.value;

    return untrack(() => sourceFile!.addImport(targetDeclaration));
  });
}
