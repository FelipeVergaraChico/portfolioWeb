import { describe, expect, it } from "vitest";
import {
  compareJson,
  JsonInputError,
  MAX_BYTES,
  parseDocument,
} from "./engine";
describe("JSON comparison", () => {
  it("ignores object key order and whitespace", () => {
    expect(
      compareJson(
        parseDocument('{"a":1,"b":true}'),
        parseDocument('{ "b": true, "a": 1 }'),
      ).every((x) => x.kind === "unchanged"),
    ).toBe(true);
  });
  it("finds additions, removals, changed types and nested values", () => {
    expect(
      compareJson(
        { removed: null, typed: 1, deep: { value: false } },
        { added: null, typed: "1", deep: { value: true } },
      ),
    ).toEqual([
      { path: "/added", kind: "added", after: null },
      { path: "/deep/value", kind: "changed", before: false, after: true },
      { path: "/removed", kind: "removed", before: null },
      { path: "/typed", kind: "changed", before: 1, after: "1" },
    ]);
  });
  it("compares arrays by index including tail additions and removals", () => {
    expect(compareJson([1, 2], [2, 1, 3]).map((x) => x.kind)).toEqual([
      "changed",
      "changed",
      "added",
    ]);
    expect(compareJson([1, 2], [1])[1]).toEqual({
      path: "/1",
      kind: "removed",
      before: 2,
    });
  });
  it("supports primitive roots and distinguishes null from absence", () => {
    expect(compareJson(null, null)).toEqual([
      { path: "", kind: "unchanged", before: null, after: null },
    ]);
    expect(compareJson(false, 0)[0].kind).toBe("changed");
    expect(compareJson({}, { value: null })[0].kind).toBe("added");
  });
  it("distinguishes arrays from objects and empty containers", () => {
    expect(compareJson([], {})[0].kind).toBe("changed");
    expect(compareJson({}, {})[0].kind).toBe("unchanged");
    expect(compareJson([], [])[0].kind).toBe("unchanged");
  });
  it("escapes JSON Pointer keys and treats prototype keys as ordinary data", () => {
    const a = parseDocument('{"__proto__":1,"a/b~c":false}');
    const b = parseDocument('{"__proto__":2,"a/b~c":true}');
    expect(compareJson(a, b).map((x) => x.path)).toEqual([
      "/__proto__",
      "/a~1b~0c",
    ]);
    expect(compareJson({}, b).every((x) => x.kind === "added")).toBe(true);
  });
  it("does not modify input values", () => {
    const left = { items: [1, 2] };
    const right = { items: [2] };
    compareJson(left, right);
    expect(left).toEqual({ items: [1, 2] });
    expect(right).toEqual({ items: [2] });
  });
});
describe("input validation", () => {
  function issue(source: string) {
    try {
      parseDocument(source);
    } catch (error) {
      expect(error).toBeInstanceOf(JsonInputError);
      return (error as JsonInputError).issue;
    }
    throw new Error("Expected rejection");
  }
  it("rejects empty, malformed and oversized input", () => {
    expect(issue("  ")).toBe("empty");
    expect(issue('{"x":}')).toBe("syntax");
    expect(issue(" ".repeat(MAX_BYTES) + "0")).toBe("size");
  });
  it("bounds depth and total values", () => {
    expect(issue("[".repeat(102) + "0" + "]".repeat(102))).toBe("depth");
    expect(issue(JSON.stringify(Array.from({ length: 20001 }, () => 0)))).toBe(
      "nodes",
    );
  });
  it("rejects unsafe integers and nonfinite numeric literals", () => {
    expect(issue("9007199254740993")).toBe("number");
    expect(issue("1e400")).toBe("number");
    expect(parseDocument('"9007199254740993"')).toBe("9007199254740993");
  });
});
