import { Children, SourceFile } from "@alloy-js/core";
import { PythonPackageModel } from "./python-package.js";

export interface InitFileModel {
  packages?: PythonPackageModel[];
  children?: Children;
}

export function InitFile({ packages, children }: InitFileModel) {
  const packageNames = packages?.map((pkg) => {
    return pkg.name;
  });
  let imports = "";
  let all = "";
  if (packageNames && packageNames.length > 0) {
    imports = `from . import ${packageNames.join(", ")}\n`;
    all = `__all__ = [${packageNames.map((x) => `"${x}"`).join(", ")}]\n`;
  }
  return (
    <SourceFile path="__init__.py" filetype="python">
      {imports}
      {all}
      {children}
    </SourceFile>
  );
}