# Adicionar um projeto dentro do portfólio

Resultado esperado: `https://portfolio-felipe-vergara.vercel.app/meuprojeto`.

## Aplicação React

1. Crie `src/projects/meuprojeto/MeuProjeto.tsx` com exportação padrão.
2. Coloque estilos em um CSS próprio, com classes prefixadas (por exemplo `.meuprojeto-page`). Não use seletores globais como `body`, `button` ou `h1` no CSS do projeto: eles afetariam o portfólio depois da navegação. CSS Modules também é uma opção.
3. Importe `lazy` de `react` em `src/projects/registry.ts` e acrescente a rota ao array `independentProjects`:

```tsx
{
  path: '/meuprojeto',
  titleKey: 'meuprojeto.title',
  Component: lazy(() => import('./meuprojeto/MeuProjeto')),
}
```

4. Adicione `meuprojeto.title` em ambos os arquivos de tradução. Use `useTranslation()` no projeto se ele também precisar ser bilíngue.
5. Adicione um `Link to="/meuprojeto"` na seção de projetos ou onde desejar apresentar o projeto. Adicione também sua URL no sitemap.
6. Rode `npm run build` e abra a rota diretamente. Atualize a página e teste voltar ao portfólio.

O JSON Diff em `src/projects/json-diff/` é uma aplicação real registrada em `/json-diff`. Não instancie um segundo `BrowserRouter`: a aplicação já possui um roteador na raiz. Se precisar de subrotas, registre `/meuprojeto/*` e use rotas internas relativas.

## Projeto existente em outro repositório

Para projetos React/Vite, incorpore os componentes e dependências na pasta própria, ajuste imports e escopo de estilos e registre a rota. Use `/images/...` ou imports de assets para não depender do caminho atual.

Para uma aplicação estática com build totalmente separado, gere o build com base `/meuprojeto/` e coloque seus arquivos em `public/meuprojeto/`. Use uma navegação de documento (`<a href="/meuprojeto/index.html">`) para abrir esse HTML independente; para uma URL limpa exata `/meuprojeto`, adicione uma regra específica antes do fallback SPA em `vercel.json`, direcionando `/meuprojeto` para `/meuprojeto/index.html`. Se houver um roteador próprio, acrescente também o fallback específico de `/meuprojeto/:path*`, depois de considerar os arquivos estáticos. Teste os assets e o refresh no ambiente Vercel. Não é necessário fazer isso para módulos React registrados na base atual.

Aplicações Next.js com SSR, APIs Node.js, bancos de dados e apps Flutter/Tauri não são convertidos automaticamente em páginas estáticas. Nesses casos, integre apenas uma versão web compatível ou mantenha links para seus deploys/repositórios.
