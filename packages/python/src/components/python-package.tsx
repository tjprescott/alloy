import { Children, SourceDirectory } from "@alloy-js/core";
import { InitFile } from "./init-file.js";
import { PythonModule, PythonModuleModel } from "./python-module.js";

/** A Python package is a SourceDirectory with an __init__ file.
 * Every package will have an __init__.py file.
 */
export interface PythonPackageModel {
  name: string;
  subpackages?: PythonPackageModel[];
  modules?: PythonModuleModel[];
  children?: Children;
}
export function PythonPackage({ name, subpackages, modules, children }: PythonPackageModel) {
  const packageComponents = subpackages?.map((pkg) => <PythonPackage {...pkg} />);
  const moduleComponents = modules?.map((mod) => <PythonModule {...mod} />);
  // TODO: Make components for each of these key files?
  // TODO: Check if components are already supplied by children
  return (
    <SourceDirectory path={name}>
      <InitFile packages={subpackages} />
      {packageComponents}
      {moduleComponents}
      {children}
    </SourceDirectory>
  );
}