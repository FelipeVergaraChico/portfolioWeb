export type JsonValue =
  null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
export type ChangeKind = "added" | "removed" | "changed" | "unchanged";
export interface Difference {
  path: string;
  kind: ChangeKind;
  before?: JsonValue;
  after?: JsonValue;
}
export type InputIssue =
  "empty" | "size" | "syntax" | "depth" | "nodes" | "number";
export class JsonInputError extends Error {
  constructor(public issue: InputIssue) {
    super(issue);
  }
}
export const MAX_BYTES = 1024 * 1024;
export function parseDocument(source: string): JsonValue {
  if (!source.trim()) throw new JsonInputError("empty");
  if (new TextEncoder().encode(source).length > MAX_BYTES)
    throw new JsonInputError("size");
  let value: JsonValue;
  try {
    value = JSON.parse(source) as JsonValue;
  } catch {
    throw new JsonInputError("syntax");
  }
  const queue = [{ value, depth: 0 }];
  let nodes = 0;
  while (queue.length) {
    const item = queue.pop()!;
    if (++nodes > 20000) throw new JsonInputError("nodes");
    if (item.depth > 100) throw new JsonInputError("depth");
    if (
      typeof item.value === "number" &&
      (!Number.isFinite(item.value) ||
        (Number.isInteger(item.value) && !Number.isSafeInteger(item.value)))
    )
      throw new JsonInputError("number");
    if (item.value !== null && typeof item.value === "object") {
      for (const child of Object.values(item.value))
        queue.push({ value: child, depth: item.depth + 1 });
    }
  }
  return value;
}
const pointer = (key: string) => key.replace(/~/g, "~0").replace(/\//g, "~1");
export function compareJson(before: JsonValue, after: JsonValue): Difference[] {
  const differences: Difference[] = [];
  function visit(left: JsonValue, right: JsonValue, path: string) {
    const leftObject = left !== null && typeof left === "object";
    const rightObject = right !== null && typeof right === "object";
    if (
      leftObject &&
      rightObject &&
      Array.isArray(left) === Array.isArray(right)
    ) {
      const keys =
        Array.isArray(left) && Array.isArray(right)
          ? Array.from(
              { length: Math.max(left.length, right.length) },
              (_, i) => String(i),
            )
          : [...new Set([...Object.keys(left), ...Object.keys(right)])].sort();
      if (!keys.length) {
        differences.push({
          path,
          kind: "unchanged",
          before: left,
          after: right,
        });
        return;
      }
      for (const key of keys) {
        const next = `${path}/${pointer(key)}`;
        const a = left as Record<string, JsonValue>;
        const b = right as Record<string, JsonValue>;
        if (!Object.hasOwn(a, key))
          differences.push({ path: next, kind: "added", after: b[key] });
        else if (!Object.hasOwn(b, key))
          differences.push({ path: next, kind: "removed", before: a[key] });
        else visit(a[key], b[key], next);
      }
    } else
      differences.push({
        path,
        kind:
          Object.is(left, right) || (left === 0 && right === 0)
            ? "unchanged"
            : "changed",
        before: left,
        after: right,
      });
  }
  visit(before, after, "");
  return differences;
}
