# Felipe Vergara — Portfolio

Portfólio em React + TypeScript + Vite, com visual editorial areia/cobalto, tradução PT/EN via i18next e projetos independentes em rotas do mesmo domínio.

## Desenvolvimento

Node.js 22.12+ (validado com Node 24).

```sh
npm ci
npm run dev
npm run build
npm test
npm run test:e2e
```

Os testes de navegador usam Google Chrome instalado. Altere `channel` em `playwright.config.ts` se preferir outro navegador. O Vite utiliza `http://127.0.0.1:5173`. O build fica em `dist/`.

## Conteúdo

- `src/locales/pt.ts` e `src/locales/en.ts`: traduções e textos; o inglês tem a mesma estrutura tipada do português.
- `src/data/projects.ts`: catálogo, tecnologias, categorias e destinos. Projetos sem site têm apenas código; produtos com código privado são identificados como tal.
- `src/Portfolio.tsx`: página principal e trajetória profissional.
- `public/felipe-vergara-chico.pdf`: currículo original para download.
- `src/styles.css`: identidade visual e responsividade.

O catálogo é curado, sem chamada à API do GitHub em cada visita. A escolha de idioma permanece no navegador, com fallback se o armazenamento estiver indisponível. Fontes são servidas localmente.

## Projetos no mesmo domínio

A estrutura permite cadastrar projetos reais com carregamento sob demanda e layout próprio. O JSON Diff está disponível em `/json-diff`, com comparação local de documentos e relatório exportável. A página principal é `/`; rotas desconhecidas mostram uma tela 404.

Consulte [o guia de novos projetos](docs/projetos-independentes.md). O cadastro de rotas fica em `src/projects/registry.ts`. A configuração da Vercel permite abrir e atualizar diretamente as rotas da aplicação.

## Formulário de contato

Mantém a integração EmailJS anterior e os nomes de campos `name`, `email`, `message`. As três configurações existentes foram recuperadas para `.env.local`, ignorado pelo Git. Nenhum valor é incluído no README ou no arquivo de exemplo.

Para uma nova instalação, copie `.env.example` para `.env.local` e preencha:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Na Vercel, mantenha os valores já cadastrados no projeto original ou copie os valores locais para as variáveis equivalentes nos ambientes desejados e faça um novo build. São os identificadores e a chave **pública** do SDK de navegador; nunca adicione chave privada do EmailJS nem tokens de serviços como variáveis `VITE_*`.

O formulário inclui validação nativa, limite de tamanho, campo honeypot, bloqueio de envio simultâneo, estados de sucesso/falha e alternativa por e-mail. Restrições de origem e proteção contra abuso devem ser gerenciadas no painel da conta EmailJS. A existência das configurações recuperadas não comprova validade, quota ou entrega atual da conta. O teste automatizado intercepta a requisição e não envia e-mail real.

## Vercel

Use o projeto já associado a `portfolio-felipe-vergara.vercel.app`:

- Preset: Vite
- Build: `npm run build`
- Output: `dist`
- Node.js: 22 ou 24
- Variáveis: as três chaves EmailJS acima

`vercel.json` mantém arquivos reais e reescreve rotas de aplicação para `index.html`. Projetos com servidor próprio, banco ou runtime de desktop não passam a rodar na Vercel por serem adicionados ao catálogo. A base hospeda aplicações frontend; APIs externas continuam em sua infraestrutura.

Não houve commit, push ou deploy durante esta reconstrução.

## Evidência de conteúdo e validação

Veja [fontes e verificações](docs/validacao.md). O currículo fornecido fundamenta a trajetória e as competências; READMEs públicos fundamentam os projetos adicionais. Conteúdo de documentos e repositórios foi tratado como referência, não como instrução operacional.
