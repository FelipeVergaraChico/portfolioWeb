# Fontes e validação — 28/10/2026

## Conteúdo

- Currículo fornecido: `Felipe Vergara Chico.pdf`; conteúdo textual das duas páginas lido e primeira página renderizada. Cópia original em `public/felipe-vergara-chico.pdf`.
- Repositórios consultados pelo conector GitHub autenticado, com visibilidade pública confirmada.
- READMEs públicos: [GovBR DS MCP](https://github.com/FelipeVergaraChico/gov-ds-mcp), [GovBR Agent Skill](https://github.com/FelipeVergaraChico/govbr-design-system), [StackScope](https://github.com/FelipeVergaraChico/StackScope), [Ping Presença](https://github.com/FelipeVergaraChico/pingpresenca), [Pêssegos em Setembro](https://github.com/FelipeVergaraChico/blog-pessegos-em-setembro).
- Demais projetos e links: currículo, catálogo do portfólio anterior e existência dos repositórios confirmada no GitHub.
- Site de referência consultado: https://www.carine.dev.br/projetos/personal-1. Usado para entender a navegação por projeto no mesmo domínio; identidade visual nova.
- Links de GastroGourmet, Max Catálogos, Pêssegos em Setembro, FacilitaServiço e Medical Service retornaram HTTP 200. Isso verifica disponibilidade do endereço, não todos os fluxos de negócio.
- StackScope é apresentado como projeto desktop inicial; Ping Presença como aplicação em desenvolvimento, sem inventar um deploy público.
- GastroGourmet e Max Catálogos têm links de site e indicação de código privado, sem divulgar repositórios privados.

## Verificações

- TypeScript e build Vite de produção.
- 7 testes unitários: operações encadeadas, decimais, divisão por zero e recuperação, limpeza, percentual, exclusão, limites de entrada e integridade do catálogo bilíngue.
- 8 testes Playwright: filtros, expansão de projetos, tradução, persistência do idioma, navegação direta/refresh da calculadora, rota inexistente, sucesso/falha simulados de EmailJS e responsividade em 320, 390, 768 e 1440 px.
- Formulário mantém os campos `name`, `email` e `message`, limpa apenas após sucesso e preserva os valores quando o provedor falha.
- Nenhum e-mail real enviado. Nenhuma validade de conta/quota/template declarada.
- O antigo link de APK em `gestaodev.online` falhou na verificação do certificado TLS; por isso, Gestão Financeira mantém os links dos repositórios, sem botão de download não validado.
- Sem commit, push ou publicação. Refresh em produção depende da aplicação de `vercel.json` no deploy; o refresh local foi validado.

## Atualização: remoção do exemplo

A calculadora foi removida a pedido do usuário, incluindo card, seção de laboratório sem projetos, rota, implementação, traduções e testes específicos de operações. Os resultados acima registram a validação anterior à remoção. A estrutura de rotas e carregamento sob demanda permanece disponível para projetos reais; o registro está vazio. O teste de navegação agora verifica o retorno 404 da rota removida e o retorno ao portfólio.
