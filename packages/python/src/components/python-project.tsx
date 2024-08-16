import { Children, SourceDirectory, SourceFile } from "@alloy-js/core";
import { InitFile } from "./init-file.js";
import { PythonPackage, PythonPackageModel } from "./python-package.js";

/**
 * A Python project is a collection of Python packages and packaging metadata.
 * {path}/{project_name}/
 * |-- LICENSE
 * |-- pyproject.toml
 * |-- README.md
 * |-- setup.py
 * |-- src/
 *     |-- {package_name}/
 *     |   |-- __init__.py
 *     |   |-- {module_name}.py
 *     |-- {package_name}/
 *         |-- __init__.py
 *         |-- {module_name}.py
 */
export interface PythonProjectModel {
  name: string;
  path: string;
  version: string;
  packages: PythonPackageModel[];
  children?: Children;
}
export function PythonProject({ name, path, version, packages, children }: PythonProjectModel) {
  // COMMENT: Is there a way to do this looping in the JSX?
  const packageComponents = packages.map((pkg) => {
    return <PythonPackage {...pkg} />;
  });
  // TODO: Make components for each of these key files? Also, add necessary file types.
  return (
    <SourceDirectory path={path}>
      <SourceFile path="pyproject.toml" filetype="toml" />
      <SourceFile path="LICENSE" filetype="plain-text" />
      <SourceFile path="README.md" filetype="markdown" />
      <SourceFile path="setup.py" filetype="python" />
      <SourceDirectory path="src">
        <InitFile packages={packages} />
        {packageComponents}
        {children}
      </SourceDirectory>
    </SourceDirectory>
  );
}