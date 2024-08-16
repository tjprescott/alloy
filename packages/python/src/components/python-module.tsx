import { SourceFile } from "@alloy-js/core"
import { Children } from "@alloy-js/core"

/**
 * A Python Module is basically a SourceFile containing declarations.
 */
export interface PythonModuleModel {
  name: string;
  children?: Children;
}
export function PythonModule({ name, children }: PythonModuleModel) {
  return (
    <SourceFile path={name} filetype="python">
      {children}
    </SourceFile>
  );
}