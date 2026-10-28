import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowLeftRight,
  Braces,
  Download,
  FileUp,
  GitCompareArrows,
  ShieldCheck,
} from "lucide-react";
import { LanguageSwitch } from "../../components/Header";
import {
  compareJson,
  JsonInputError,
  MAX_BYTES,
  parseDocument,
  type ChangeKind,
  type Difference,
} from "./engine";
import "./json-diff.css";
type Side = "original" | "updated";
type Filter = ChangeKind | "differences" | "all";
const PAGE_SIZE = 50;
const example = {
  original:
    '{\n  "name": "Meu projeto",\n  "version": 1,\n  "active": false,\n  "tags": ["React", "JavaScript"],\n  "legacy": true\n}',
  updated:
    '{\n  "name": "Meu projeto",\n  "version": 2,\n  "active": true,\n  "tags": ["React", "TypeScript"],\n  "url": "/json-diff"\n}',
};
export default function JsonDiff() {
  const { t } = useTranslation();
  const text = (key: string, options?: Record<string, unknown>) =>
    t("jsonDiff." + key, options);
  const [documents, setDocuments] = useState({ original: "", updated: "" });
  const [errors, setErrors] = useState<Partial<Record<Side, string>>>({});
  const [results, setResults] = useState<Difference[] | null>(null);
  const [filter, setFilter] = useState<Filter>("differences");
  const [page, setPage] = useState(1);
  const reads = useRef({ original: 0, updated: 0 });
  function update(side: Side, value: string) {
    reads.current[side]++;
    setDocuments((prev) => ({ ...prev, [side]: value }));
    setErrors((prev) => ({ ...prev, [side]: undefined }));
    setResults(null);
    setPage(1);
  }
  function compare() {
    const issues: Partial<Record<Side, string>> = {};
    const parsed: Partial<Record<Side, ReturnType<typeof parseDocument>>> = {};
    for (const side of ["original", "updated"] as const) {
      try {
        parsed[side] = parseDocument(documents[side]);
      } catch (error) {
        issues[side] = error instanceof JsonInputError ? error.issue : "syntax";
      }
    }
    setErrors(issues);
    if (Object.keys(issues).length) {
      setResults(null);
      return;
    }
    setResults(compareJson(parsed.original!, parsed.updated!));
    setFilter("differences");
    setPage(1);
  }
  function format(side: Side) {
    try {
      update(side, JSON.stringify(parseDocument(documents[side]), null, 2));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [side]: error instanceof JsonInputError ? error.issue : "syntax",
      }));
      setResults(null);
    }
  }
  async function upload(side: Side, file: File | undefined) {
    if (!file) return;
    const revision = ++reads.current[side];
    setResults(null);
    if (file.size > MAX_BYTES) {
      setErrors((prev) => ({ ...prev, [side]: "size" }));
      return;
    }
    try {
      const content = await file.text();
      if (revision === reads.current[side]) update(side, content);
    } catch {
      if (revision === reads.current[side])
        setErrors((prev) => ({ ...prev, [side]: "fileError" }));
    }
  }
  function replace(next: typeof documents) {
    reads.current.original++;
    reads.current.updated++;
    setDocuments(next);
    setResults(null);
    setErrors({});
    setPage(1);
  }
  const counts = { added: 0, removed: 0, changed: 0, unchanged: 0 };
  results?.forEach((r) => counts[r.kind]++);
  const changed = counts.added + counts.removed + counts.changed;
  const filtered =
    results?.filter(
      (r) =>
        filter === "all" ||
        (filter === "differences" ? r.kind !== "unchanged" : r.kind === filter),
    ) ?? [];
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  function download() {
    if (!results) return;
    const blob = new Blob(
      [
        JSON.stringify(
          {
            format: "json-diff-v1",
            arrayComparison: "by-index",
            pathFormat: "JSON Pointer",
            summary: counts,
            differences: results.filter((r) => r.kind !== "unchanged"),
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "json-diff.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className="jd-page">
      <a className="skip-link" href="#json-diff-main">
        {t("common.skip")}
      </a>
      <header className="jd-header">
        <Link className="text-link" to="/">
          <ArrowLeft size={17} />
          {t("nav.home")}
        </Link>
        <span className="jd-brand">
          <Braces size={20} /> JSON DIFF
        </span>
        <LanguageSwitch />
      </header>
      <main id="json-diff-main" className="jd-main">
        <section className="jd-intro">
          <div>
            <p className="eyebrow">{text("eyebrow")}</p>
            <h1>
              JSON <span>Diff.</span>
            </h1>
            <h2>{text("subtitle")}</h2>
            <p>{text("intro")}</p>
          </div>
          <aside>
            <ShieldCheck size={22} />
            <p>{text("privacy")}</p>
          </aside>
        </section>
        <div className="jd-toolbar">
          <p>{text("hint")}</p>
          <div>
            <button onClick={() => replace(example)}>{text("example")}</button>
            <button
              onClick={() =>
                replace({
                  original: documents.updated,
                  updated: documents.original,
                })
              }
            >
              <ArrowLeftRight size={14} />
              {text("swap")}
            </button>
            <button onClick={() => replace({ original: "", updated: "" })}>
              {text("clear")}
            </button>
          </div>
        </div>
        <div className="jd-editors">
          {(["original", "updated"] as const).map((side, index) => (
            <section className="jd-editor" key={side}>
              <div className="jd-editor-heading">
                <label htmlFor={"jd-" + side} data-index={`0${index + 1}`}>
                  {text(side)}
                </label>
                <div>
                  <label className="jd-upload">
                    <FileUp size={14} />
                    {text("upload")}
                    <input
                      type="file"
                      accept=".json,application/json"
                      aria-label={text(side + "File")}
                      onChange={(e) => {
                        void upload(side, e.currentTarget.files?.[0]);
                        e.currentTarget.value = "";
                      }}
                    />
                  </label>
                  <button
                    aria-label={text(side + "Format")}
                    onClick={() => format(side)}
                  >
                    {text("format")}
                  </button>
                </div>
              </div>
              <textarea
                id={"jd-" + side}
                value={documents[side]}
                onChange={(e) => update(side, e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                    e.preventDefault();
                    compare();
                  }
                }}
                placeholder={text("placeholder")}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-invalid={Boolean(errors[side])}
                aria-describedby={errors[side] ? "jd-error-" + side : undefined}
              />
              <div className="jd-editor-foot">
                <span>
                  {new TextEncoder()
                    .encode(documents[side])
                    .length.toLocaleString()}{" "}
                  B
                </span>
                <p id={"jd-error-" + side} role="alert">
                  {errors[side] ? text(errors[side]!) : ""}
                </p>
              </div>
            </section>
          ))}
        </div>
        <div className="jd-compare-row">
          <div>
            <p>{text("rules")}</p>
            <p>{text("precision")}</p>
          </div>
          <button className="button primary" onClick={compare}>
            <GitCompareArrows size={19} />
            {text("compare")}
          </button>
        </div>
        <section className="jd-results" aria-label={text("results")}>
          {results === null ? (
            <div className="jd-empty">
              <GitCompareArrows size={30} />
              <h2>{text("ready")}</h2>
              <p>{text("readyBody")}</p>
            </div>
          ) : (
            <>
              <div className="jd-result-heading">
                <div>
                  <p className="eyebrow">{text("results")}</p>
                  <h2 role="status">
                    {changed
                      ? text("found", { count: changed })
                      : text("identical")}
                  </h2>
                </div>
                <button className="button outline" onClick={download}>
                  <Download size={16} />
                  {text("download")}
                </button>
              </div>
              <div className="jd-stats">
                {(["added", "removed", "changed", "unchanged"] as const).map(
                  (kind) => (
                    <div key={kind} className={"jd-stat " + kind}>
                      <strong>{counts[kind]}</strong>
                      <span>{text(kind)}</span>
                    </div>
                  ),
                )}
              </div>
              <div
                className="jd-filters"
                role="group"
                aria-label={text("filter")}
              >
                {(
                  [
                    "differences",
                    "all",
                    "added",
                    "removed",
                    "changed",
                    "unchanged",
                  ] as const
                ).map((kind) => (
                  <button
                    key={kind}
                    aria-pressed={filter === kind}
                    onClick={() => {
                      setFilter(kind);
                      setPage(1);
                    }}
                  >
                    {text(kind)}
                  </button>
                ))}
              </div>
              {!filtered.length ? (
                <p className="jd-no-results">{text("emptyFilter")}</p>
              ) : (
                <div className="jd-difference-list">
                  {filtered
                    .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                    .map((row) => (
                      <article
                        className={"jd-difference " + row.kind}
                        key={row.path}
                      >
                        <header>
                          <span className="jd-kind">
                            {row.kind === "added"
                              ? "+"
                              : row.kind === "removed"
                                ? "−"
                                : row.kind === "changed"
                                  ? "~"
                                  : "="}{" "}
                            {text(row.kind)}
                          </span>
                          <code title={text("path")}>
                            {row.path || text("root")}
                          </code>
                        </header>
                        <div className="jd-values">
                          <div>
                            <span>{text("original")}</span>
                            <pre>
                              {row.kind === "added"
                                ? text("absent")
                                : JSON.stringify(row.before, null, 2)}
                            </pre>
                          </div>
                          <div>
                            <span>{text("updated")}</span>
                            <pre>
                              {row.kind === "removed"
                                ? text("absent")
                                : JSON.stringify(row.after, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              )}
              {totalPages > 1 && (
                <nav className="jd-pagination" aria-label={text("results")}>
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    {text("previous")}
                  </button>
                  <span>
                    {text("page", { current: page, total: totalPages })}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    {text("next")}
                  </button>
                </nav>
              )}
            </>
          )}
        </section>
      </main>
      <footer className="jd-footer">
        JSON Diff · Felipe Vergara <span>React / TypeScript</span>
      </footer>
    </div>
  );
}
