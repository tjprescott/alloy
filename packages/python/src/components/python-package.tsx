import { Children, createContext, SourceDirectory, SourceDirectoryContext, useContext } from "@alloy-js/core";
import { InitFile } from "./init-file.js";
import { PythonModule, PythonModuleProps } from "./python-module.js";
import { PythonPackageScope } from "../symbols/python-package-scope.js";

export interface PythonPackageContext {
  scope: PythonPackageScope;
  /** Full package path, e.g src/main/java/me/example/code */
  path: string;
  /** Name of package, usually name of this directory */
  name: string;
  /** Full qualified name of package, e.g me.example.code */
  qualifiedName: string;
}

export const PythonPackageContext = createContext<PythonPackageContext>();

export function usePackage() {
  return useContext(PythonPackageContext);
}

/** A Python package is a SourceDirectory with an __init__ file.
 * Every package will have an __init__.py file.
 */
export interface PythonPackageProps {
  name: string;
  subpackages?: PythonPackageProps[];
  modules?: PythonModuleProps[];
  children?: Children;
}

export function PythonPackage(props: PythonPackageProps) {
  const sourceDirectory = useContext(SourceDirectoryContext);
  const parentPackage = usePackage();
  const packageComponents = props.subpackages?.map((pkg) => <PythonPackage {...pkg} />);
  const moduleComponents = props.modules?.map((mod) => <PythonModule {...mod} />);
  // TODO: Make components for each of these key files?
  // TODO: Check if components are already supplied by children
  return (
    <SourceDirectory path={props.name}>
      <InitFile packages={props.subpackages} />
      {packageComponents}
      {moduleComponents}
      {props.children}
    </SourceDirectory>
  );
}

//   const packageNames = props.package.split(".");
//   const packageName = packageNames[0];

//   const fullyQualifiedPackageName = parentPackage ?
//     parentPackage.qualifiedName + "." + packageName
//   : packageName;

//   const scope = createJavaPackageScope(
//     useBinder(),
//     useScope(),
//     fullyQualifiedPackageName,
//   );

//   const packagePath = sourceDirectory?.path + "/" + packageName;
//   const packageContext: PackageDirectoryContext = {
//     scope,
//     path: packagePath,
//     name: packageName,
//     qualifiedName: fullyQualifiedPackageName,
//   };

//   /**
//    * Recursively defines package directories if we pass name like 'one.two.three'
//    */
//   function ChildPackageDirectory() {
//     if (packageNames.length > 1) {
//       return <PackageDirectory package={packageNames.slice(1, packageNames.length).join(".")}>
//           {props.children}
//         </PackageDirectory>;
//     } else {
//       return props.children;
//     }
//   }

//   return <PackageDirectoryContext.Provider value={packageContext}>
//       <Scope value={scope}>
//         <SourceDirectory path={packagePath}>
//           <ChildPackageDirectory />
//         </SourceDirectory>
//       </Scope>
//     </PackageDirectoryContext.Provider>;
// }
