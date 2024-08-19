import { Binder, OutputScope } from "@alloy-js/core";

/**
 * Represents an external dependency imported through pip
 */
export interface PythonDependency {
  groupId: string;
  artifactId: string;
  version?: string;
  scope?: "compile" | "test" | "runtime" | "provided";
}

/**
 * Represents the Python project itself
 */
export interface PythonProjectScope extends OutputScope {
  kind: "project";

  /**
   * The dependencies of this project
   * Map qualified package name to dependency
   */
  dependencies: Map<string, PythonDependency>;

  addDependency(dependency: PythonDependency): string;
}

export function createJavaProjectScope(
  binder: Binder,
  parent: OutputScope | undefined,
  name: string,
): PythonProjectScope {
  return binder.createScope<PythonProjectScope>({
    kind: "project",
    name,
    parent,
    dependencies: new Map(),
    addDependency(dependency: PythonDependency): string {
      const depKey = `${dependency.groupId}.${dependency.artifactId}.${dependency.version}`;

      if (this.dependencies.has(depKey)) {
        return depKey;
      }

      this.dependencies.set(depKey, dependency);
      return depKey;
    },
  });
}
