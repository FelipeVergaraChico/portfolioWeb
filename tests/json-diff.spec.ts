import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("portfolio-language"))
      localStorage.setItem("portfolio-language", "pt");
  });
});
test("opens from portfolio, compares highlighted differences and persists route on refresh", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Abrir JSON Diff", exact: true })
    .click();
  await expect(page).toHaveURL(/\/json-diff$/);
  await expect(page).toHaveTitle("JSON Diff | Felipe Vergara");
  await page
    .getByLabel("JSON original", { exact: true })
    .fill('{"name":"A","removed":true,"same":1}');
  await page
    .getByLabel("JSON atualizado", { exact: true })
    .fill('{"name":"B","added":null,"same":1}');
  await page
    .getByRole("button", { name: "Comparar JSONs", exact: true })
    .click();
  await expect(page.locator(".jd-difference")).toHaveCount(3);
  await expect(page.locator(".jd-difference.changed")).toContainText("/name");
  await expect(page.locator(".jd-difference.removed")).toContainText(
    "/removed",
  );
  await expect(page.locator(".jd-difference.added")).toContainText("null");
  await page
    .getByRole("button", { name: "Sem alteração", exact: true })
    .click();
  await expect(page.locator(".jd-difference")).toHaveCount(1);
  await expect(page.locator(".jd-difference")).toContainText("/same");
  await page.getByLabel("JSON original", { exact: true }).fill("{}");
  await expect(page.locator(".jd-difference")).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("JSON");
  await expect(page.getByLabel("JSON original", { exact: true })).toHaveValue(
    "",
  );
});
test("validates both inputs and handles equivalent JSON", async ({ page }) => {
  await page.goto("/json-diff");
  await page.getByRole("button", { name: "Comparar JSONs" }).click();
  await expect(page.locator('textarea[aria-invalid="true"]')).toHaveCount(2);
  await page.getByLabel("JSON original", { exact: true }).fill('{"a":1,}');
  await page.getByLabel("JSON atualizado", { exact: true }).fill('{"a":1}');
  await page.getByRole("button", { name: "Comparar JSONs" }).click();
  await expect(page.locator("#jd-error-original")).toContainText(
    "JSON inválido",
  );
  await page.getByLabel("JSON original", { exact: true }).fill('{ "a": 1 }');
  await page.getByRole("button", { name: "Comparar JSONs" }).click();
  await expect(page.getByRole("status")).toContainText("equivalentes");
  await page.getByRole("button", { name: "Todas", exact: true }).click();
  await expect(page.locator(".jd-difference.unchanged")).toHaveCount(1);
});
test("imports, formats, swaps, exports and clears without network requests", async ({
  page,
}) => {
  await page.goto("/json-diff");
  const outgoing: string[] = [];
  page.on("request", (request) => {
    if (
      !request.url().startsWith("http://127.0.0.1:5173") &&
      !request.url().startsWith("blob:")
    )
      outgoing.push(request.url());
  });
  await page
    .getByLabel("Importar JSON original", { exact: true })
    .setInputFiles({
      name: "original.json",
      mimeType: "application/json",
      buffer: Buffer.from('{"a":1}'),
    });
  await page
    .getByLabel("Importar JSON atualizado", { exact: true })
    .setInputFiles({
      name: "updated.json",
      mimeType: "application/json",
      buffer: Buffer.from('{"a":2}'),
    });
  await expect(page.getByLabel("JSON atualizado", { exact: true })).toHaveValue(
    '{"a":2}',
  );
  await page.getByRole("button", { name: "Formatar JSON original" }).click();
  await expect(page.getByLabel("JSON original", { exact: true })).toHaveValue(
    '{\n  "a": 1\n}',
  );
  await page.getByRole("button", { name: "Inverter lados" }).click();
  await page.getByRole("button", { name: "Comparar JSONs" }).click();
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Baixar relatório" }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe("json-diff.json");
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(chunk);
  const report = JSON.parse(Buffer.concat(chunks).toString());
  expect(report.differences).toEqual([
    { path: "/a", kind: "changed", before: 2, after: 1 },
  ]);
  expect(outgoing).toEqual([]);
  await page.getByRole("button", { name: "Limpar tudo" }).click();
  await expect(page.getByLabel("JSON original", { exact: true })).toHaveValue(
    "",
  );
  await expect(page.locator(".jd-difference")).toHaveCount(0);
});
test("paginates many differences and translates controls", async ({ page }) => {
  await page.goto("/json-diff");
  await page.getByLabel("JSON original", { exact: true }).fill("{}");
  await page
    .getByLabel("JSON atualizado", { exact: true })
    .fill(
      JSON.stringify(
        Object.fromEntries(
          Array.from({ length: 55 }, (_, i) => ["field" + i, i]),
        ),
      ),
    );
  await page.getByRole("button", { name: "Comparar JSONs" }).click();
  await expect(page.locator(".jd-difference")).toHaveCount(50);
  await page.getByRole("button", { name: "Próxima", exact: true }).click();
  await expect(page.locator(".jd-difference")).toHaveCount(5);
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Compare JSONs" }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("55 differences found");
});
for (const width of [320, 768, 1440])
  test(`JSON Diff responsive ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/json-diff");
    await page.getByRole("button", { name: "Carregar exemplo" }).click();
    await page.getByRole("button", { name: "Comparar JSONs" }).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/json-diff-${width}.png`,
      fullPage: true,
    });
  });
