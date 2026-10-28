# JSON Diff

Ferramenta em `/json-diff`, carregada sob demanda por `src/projects/registry.ts` e acessível pelo card JSON Diff no catálogo do portfólio.

## Funcionalidades

- Dois editores com importação de arquivos JSON, formatação, inversão e limpeza.
- Comparação estrutural com destaque textual e por cor de adições, remoções e alterações; visualização opcional dos valores sem mudança.
- Tipos são comparados estritamente. A ordem das chaves dos objetos não altera o resultado; arrays são comparados por índice, não por identidade ou similaridade.
- Caminhos seguem JSON Pointer: `~` vira `~0`, `/` vira `~1`; caminho vazio representa a raiz.
- Adição/remoção de uma subárvore é um único registro com seu conteúdo completo.
- Filtros e paginação local de 50 registros; contadores resumem a comparação completa.
- Relatório JSON com resumo e diferenças exportável. Não é um documento JSON Patch executável.
- Português e inglês, preservando a preferência do portfólio.

## Dados e limites

Documentos permanecem em memória na página, sem upload a servidor nem persistência automática. Recarregar ou sair da página descarta os editores. Exportação ocorre apenas pelo botão de download.

Limites por documento: 1 MiB UTF-8, 100 níveis e 20.000 valores. O parser usa a semântica JSON do JavaScript: chaves repetidas mantêm o último valor, decimais usam ponto flutuante; inteiros fora da faixa segura e números não finitos são recusados. IDs longos devem ser strings.

A edição de um documento invalida o resultado anterior, evitando mostrar uma comparação desatualizada. Erros de leitura, sintaxe e limites são exibidos por editor. Os valores são renderizados como texto, sem interpretação HTML.

## Arquivos

- `src/projects/json-diff/engine.ts`: validação e comparação, independente de React.
- `src/projects/json-diff/JsonDiff.tsx`: interface e ações locais.
- `src/projects/json-diff/json-diff.css`: estilos restritos à ferramenta.
- `src/projects/json-diff/copy.ts`: traduções PT/EN integradas ao i18next.

## Validação

10 testes unitários do motor + 1 teste do catálogo aprovados. Os 7 testes de navegador da ferramenta cobrem navegação direta e refresh, campos alterados, filtros, invalidação após edição, entradas inválidas, equivalência, arquivos importados, formatação, inversão, conteúdo do relatório exportado, ausência de requisições externas durante essas ações, limpeza, paginação, idioma e larguras de 320, 768 e 1440 px. A regressão existente do portfólio também passou (8 testes).

Build TypeScript/Vite validado. Não houve commit, push ou publicação; a rota em produção estará disponível após o deploy do portfólio.
