import {
  Children,
  render,
  Output,
  OutputDirectory,
  OutputFile,
} from "@alloy-js/core";
import * as py from "../src/index.js";
import { expect } from "vitest";
import { dedent } from "@alloy-js/core/testing";

export function toSourceText(c: Children): string {
  const packages = [
    {
      name: "test",
      modules: [
        { 
          name: "test",
          children: c,
        },
      ],
    },
  ];
  const res = render(
    <Output>
      <py.PythonProject path="test\python" name="alloy-python-test" version="0.1.0" packages={packages} />
    </Output>,
  );

  const file = findFile(res, "test.py");
  return file.contents;
}

export function testRender(c: Children): OutputDirectory {
  const packages = [
    {
      name: "test",
      modules: [
        { 
          name: "test",
          children: c,
        },
      ],
    },
  ];
  return render(
    <Output>
      <py.PythonProject path="test\python" name="alloy-python-test" version="0.1.0" packages={packages} />
    </Output>,
  );
}

export function findFile(res: OutputDirectory, path: string): OutputFile {
  const result = findFileWorker(res, path);

  if (!result) {
    throw new Error("Expected to find file " + path);
  }
  return result;

  function findFileWorker(
    res: OutputDirectory,
    path: string,
  ): OutputFile | null {
    for (const item of res.contents) {
      if (item.kind === "file") {
        if (item.path.includes(path)) {
          return item;
        }
        continue;
      } else {
        let found = findFileWorker(item, path);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
}

export function assertFileContents(
  res: OutputDirectory,
  expectedFiles: Record<string, string>,
) {
  for (const [path, contents] of Object.entries(expectedFiles)) {
    const file = findFile(res, path);
    expect(file.contents).toBe(dedent(contents));
  }
}
