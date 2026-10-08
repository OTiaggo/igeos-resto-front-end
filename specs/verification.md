# Verificação

## Verificações necessárias

Executar `npm ci` e `npm run check` para instalação fixada, análise estática,
testes e build. Validar o manifesto com `easydeploy validate` e o chart com
`easydeploy convert --verify-helm`. Verificar scripts e workflows, além do
smoke Docker e da aplicação no navegador quando disponíveis.

## Matriz de rastreabilidade

| Contrato | Verificação | Estado |
| --- | --- | --- |
| [QUAL-MAINTAINABILITY-001](intent/quality.md#qual-maintainability-001) | `npm ci`, `npm run check`, vínculos e âncoras das specs | Verificado localmente |
| [QUAL-SECURITY-001](intent/quality.md#qual-security-001) | [15 testes](../src/runtime-config.test.ts) de configuração válida, incompleta, URLs inseguras, identidade parcial e campos extras | Verificado; OIDC real pendente |
| [ARCH-FOUNDATION-001](realization/architecture.md#arch-foundation-001) | Dependências, strict, lint, testes e build | Verificado; inspeção visual indisponível |
| [ARCH-DELIVERY-001](realization/architecture.md#arch-delivery-001) | Manifesto, identidade de descoberta, Helm lint/template, syntax shell e [smoke container](../scripts/smoke-container.sh) | Parte estática verificada; execução Docker pendente |

## Evidência já coletada

Na descoberta de 08/10/2026: repositório sem commits e sem código; apenas `plan.md`
preexistente. Componente irmão inspecionado em leitura; possui APIs de previsão e
otimização, sem agregador validado.

Depois da autorização para completar as lacunas:

- Instalação limpa com `npm ci` e `npm run check` concluídas: lint sem avisos,
  TypeScript strict, 15 testes e build de produção.
- `easydeploy validate --json`: um arquivo, zero erros e zero avisos.
- Conversão com Helm 3.17.3, SHA256 do download verificado: `helm_verified: true`.
  O digest de imagem usado nessa renderização é placeholder, não imagem publicada.
  A prévia conserva `workloadImages.frontend: "."`, pois não houve build Docker;
  o workflow resolve a imagem antes de converter e publica a referência por digest.
- YAML e identidade de manifesto/marcador validados; links das specs resolvidos.
- Sintaxe dos scripts shell validada com `bash -n`.
- Os dois workflows passaram no actionlint; ShellCheck não foi executado localmente.
- Simplificação em contexto limpo aplicada e reverificada. Revisão independente
  derivou a superfície completa e não encontrou falhas acionáveis por inspeção.
- Build reporta um chunk maior que 500 kB; não há orçamento de bundle aprovado.

Essas verificações não equivalem a execução completa do workflow remoto ou deploy.

## Lacunas conhecidas

- Agregador de produto, funcionalidades, domínio e TLS aguardam definição.
- Docker CLI existe, mas o daemon Docker Desktop Linux está indisponível.
- Não há navegador conectado para inspeção visual; HTTP local respondeu, sem
  comprovação de renderização ou interação.
- Secret GitHub de acesso ao toolkit e descoberta pela plataforma não verificados.
- Não há ambiente OIDC nem integração de API confirmada.

## Dependências e segurança

`npm audit --omit=dev --audit-level=high` não encontrou vulnerabilidades altas ou
críticas, mas reportou dois pacotes com alertas moderados ligados ao React Router 6.
Os advisories descrevem [navegação com destinos controlados por atacante](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6)
e [hidratação SSR](https://github.com/advisories/GHSA-337j-9hxr-rhxg).

A versão 6 foi solicitada explicitamente. A fundação usa somente destinos literais
`/` nos links e não usa SSR, loaders ou hidratação de dados. A análise desses usos
não encontrou um caminho explorável nesta entrega; a dependência continua afetada.
Antes de adicionar destinos dinâmicos ou SSR, rever esses limites e a versão.
Não atualizar silenciosamente para Router 7 nem afirmar que a dependência está livre
de vulnerabilidades.

## Suposições não verificadas aceitas

Nenhuma. Propostas não equivalem a contratos aprovados ou integração validada.
