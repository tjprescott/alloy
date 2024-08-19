import { Children } from "@alloy-js/core/jsx-runtime";
import {
  createContext,
  OutputSymbol,
  reactive,
  Scope,
  SourceFile as CoreSourceFile,
} from "@alloy-js/core";
import { PythonOutputSymbol } from "../symbols/index.js";
import { ImportStatements, ImportSymbol } from "./import-statement.jsx";

export interface SourceFileContext {
  addImport(symbol: OutputSymbol): string;
}

export const SourceFileContext = createContext<SourceFileContext>();

export interface SourceFileProps {
  path: string;
  children?: Children;
}

/**
 * Represents a Python source file.
 *
 * Handles top level package declaration, as well as importing other sources
 */
export function SourceFile(props: SourceFileProps) {
  const packageCtx = usePackage();

  if (!packageCtx) {
    throw new Error("SourceFile must be declared inside a package");
  }

  // Collection of import symbols
  const importRecords: ImportSymbol[] = reactive([]);
  // Map a symbol to import name, keep track of already imported symbols
  const importedSymbols = new Map<OutputSymbol, string>();

  // Add import to file if not already, returns name of imported symbol
  function addImport(symbol: PythonOutputSymbol): string {
    if (importedSymbols.has(symbol)) {
      return importedSymbols.get(symbol)!;
    }

    // Only need to import if not in same package
    if (symbol.package !== packageCtx?.qualifiedName) {
      importRecords.push({
        package: symbol.package ?? "",
        name: symbol.name,
        wildcard: false, // TODO
      });
    }
    importedSymbols.set(symbol, symbol.name);

    return symbol.name;
  }

  const sfContext: SourceFileContext = {
    addImport,
  };

  return <CoreSourceFile path={props.path} filetype="py" reference={Reference}>
      package {packageCtx.qualifiedName};

      {importRecords.length > 0 ? (
        <>
          <ImportStatements imports={importRecords} />
          {"\n"}
        </>
      ) : undefined}<SourceFileContext.Provider value={sfContext}>
      <Scope name={props.path} kind="source-file">
        {props.children}
      </Scope>
    </SourceFileContext.Provider>
    </CoreSourceFile>;
}
