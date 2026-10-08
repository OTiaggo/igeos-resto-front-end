# Interfaces de execução e agregação

## Finalidade

Definir o que o futuro agregador recebe deste componente e quais contratos
precisam ser confirmados antes da integração.

## Contrato de execução

| Interface | Resultado esperado | Estado |
| --- | --- | --- |
| HTTP 8080 | Serve aplicação estática | Contrato |
| `/healthz` | Saúde do servidor, sem indicar disponibilidade da API ou identidade | Contrato |
| Rotas da SPA | Recarregamento direto retorna a aplicação | Contrato |
| `/runtime-config.json` | URL da API e parâmetros públicos de identidade, sem segredo; sem cache | Contrato |
| Imagem e chart OCI | Artefatos imutáveis consumíveis pelo agregador | Contrato |

## Configuração pública

O documento JSON possui `apiBaseUrl`, `oidcAuthority` e `oidcClientId`.
A imagem gera o documento com `PUBLIC_API_BASE_URL`, `PUBLIC_OIDC_AUTHORITY`
e `PUBLIC_OIDC_CLIENT_ID` usando serialização JSON, sem interpolação executável.
Desenvolvimento lê o arquivo de [public](../../../public/runtime-config.json).

A base da API aceita caminho absoluto na origem atual ou URL HTTP(S) sem
credenciais, query ou fragmento. O issuer aceita URL HTTP(S); campos OIDC vazios
desabilitam a integração, mas pares incompletos são erro de configuração.
Configuração inválida ou indisponível interrompe o bootstrap com mensagem segura.

O callback OIDC é `/auth/callback` na origem atual, com código de autorização e
PKCE para cliente público; retorno limpa os parâmetros de autenticação da URL.
Tokens permanecem em memória. Não há API de negócio ou rota protegida nesta entrega;
o provedor não oferece autorização de servidor.

## Limites de API e identidade

A base da API, issuer, client ID, redirect URI e scopes devem vir de configuração
confirmada. Um navegador não recebe client secret. O estado global de interface
não guarda credenciais. Bibliotecas instaladas não comprovam integração.

O contrato da API deve ser inspecionado antes de criar tipos, chamadas, retries,
permissões ou payloads de negócio. A autenticação da API e a identidade no
navegador são responsabilidades distintas; o front-end não substitui autorização
no servidor.

## Integração com o agregador

O agregador deve registrar este repositório como componente front-end, referenciar
suas especificações e selecionar o artefato publicado. O formato desse registro
depende do manifesto real do agregador; não criar um formato paralelo aqui.

Para descoberta GitOps, versionar `.easydeploy/app-metadata.yaml` com `app`,
`enabled`, `environments`, `namespacePrefix` e `specPath`. O ApplicationSet
proprietário precisa ter acesso a este repositório e seu owner; sua descoberta
não é comprovada pela presença do marcador. Esse marcador não é um manifesto
agregador IGEOS de produto.

## Rastreabilidade

[ARCH-DELIVERY-001](../architecture.md#arch-delivery-001),
[QUAL-SECURITY-001](../../intent/quality.md#qual-security-001),
[verificação](../../verification.md).
