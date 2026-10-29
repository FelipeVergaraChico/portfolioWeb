import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("portfolio-language"))
      localStorage.setItem("portfolio-language", "pt");
  });
});
test("language, filtering and additional projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ideias no papel",
  );
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await expect(page.locator(".project-card h3")).toHaveText([
    "Gestão Financeira↗",
    "IniciApp↗",
  ]);
  await page.getByRole("button", { name: "Jogos", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText("Dots and Boxes");
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await page.getByRole("button", { name: "Ver mais projetos" }).click();
  await expect(page.locator(".project-card")).toHaveCount(14);
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ideas on paper",
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ideas on paper",
  );
});
test("persists selected language across reloads", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "EN", exact: true }).click();
  expect(
    await page.evaluate(() => localStorage.getItem("portfolio-language")),
  ).toBe("en");
});
test("removed example and unknown routes show 404", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a[href="/calculadoraweb"]')).toHaveCount(0);
  for (const path of ["/calculadoraweb", "/nao-existe"]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Esse caminho",
    );
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Esse caminho",
    );
    await page.getByRole("link", { name: "Voltar ao início" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Ideias",
    );
  }
});
test("contact submits original template fields, clears on success and retains values on failure", async ({
  page,
}) => {
  let fail = false;
  let calls = 0;
  let payload = "";
  await page.route("https://api.emailjs.com/**", async (route) => {
    calls++;
    payload = route.request().postData() ?? "";
    await route.fulfill({
      status: fail ? 500 : 200,
      body: fail ? "Failure" : "OK",
    });
  });
  await page.goto("/");
  const fill = async () => {
    await page.getByLabel("Seu nome", { exact: true }).fill("Teste local");
    await page
      .getByLabel("Seu e-mail", { exact: true })
      .fill("teste@example.com");
    await page
      .getByLabel("O que você tem em mente?")
      .fill("Teste automatizado sem envio real.");
  };
  await fill();
  await page.getByRole("button", { name: "Enviar mensagem" }).click();
  await expect(page.locator(".form-status")).toContainText("Mensagem enviada");
  expect(calls).toBe(1);
  expect(payload).toContain("Teste local");
  expect(payload).toContain("teste@example.com");
  await expect(page.getByLabel("Seu nome", { exact: true })).toHaveValue("");
  fail = true;
  await fill();
  await page.getByRole("button", { name: "Enviar mensagem" }).click();
  await expect(page.locator(".form-status")).toContainText(
    "Não foi possível enviar",
  );
  await expect(page.getByLabel("Seu nome", { exact: true })).toHaveValue(
    "Teste local",
  );
});
for (const width of [320, 390, 768, 1440])
  test(`responsive layout ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    if (width < 760) {
      await page.getByRole("button", { name: "Abrir navegação" }).click();
      await page.getByRole("link", { name: "Sobre", exact: true }).click();
      await expect(
        page.getByRole("button", { name: "Abrir navegação" }),
      ).toHaveAttribute("aria-expanded", "false");
    }
    await page.evaluate(async () => {
      await Promise.all(
        Array.from(document.images).map(async (image) => {
          image.loading = "eager";
          await image.decode();
        }),
      );
      window.scrollTo(0, 0);
    });
    await page.screenshot({
      path: `test-results/portfolio-${width}.png`,
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
