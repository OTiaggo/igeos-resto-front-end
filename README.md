# IGEOS Resto Front-end

Componente React preparado para desenvolvimento IGEOS e consumo pelo EasyDeploy.
Esta entrega cria a fundação técnica; funcionalidades de negócio aguardam histórias
aprovadas no agregador proprietário.

## Desenvolvimento

Use Node 24.11.1 e npm. A versão está em [.node-version](.node-version).

```sh
npm ci
npm run dev
```

Abra `http://127.0.0.1:5173`. Execute `npm run check` para lint, TypeScript strict,
testes e build. `npm run preview` serve o build já gerado.

Stack: React 18, TypeScript strict, Vite, Ant Design 5, React Router 6,
TanStack Query v5, Axios, oidc-client-ts/react-oidc-context, dayjs e zustand.

## Container e configuração pública

```sh
docker build -t igeos-resto-front-end .
docker run --rm -p 8080:8080 -e PUBLIC_API_BASE_URL=/api igeos-resto-front-end
bash scripts/smoke-container.sh
```

O servidor Nginx executa sem root e expõe `/healthz`. Rotas da aplicação suportam
recarregamento direto; HTML e configuração pública não ficam em cache.

| Variável | Padrão | Uso |
| --- | --- | --- |
| `PUBLIC_API_BASE_URL` | `/api` | Base pública de API, sem chamadas de negócio nesta entrega |
| `PUBLIC_OIDC_AUTHORITY` | vazio | Issuer HTTP(S) do cliente público OIDC |
| `PUBLIC_OIDC_CLIENT_ID` | vazio | Client ID público; configurar junto com o issuer |

A imagem gera `/runtime-config.json` com serialização JSON. Essas variáveis são
públicas: nunca incluir client secret, senha, token de serviço ou PAT. Em dev,
edite [public/runtime-config.json](public/runtime-config.json). O callback OIDC
é `/auth/callback` na origem atual. Tokens ficam em memória; não há login funcional
ou API autenticada comprovados sem um provedor e contratos externos reais.

## EasyDeploy

O conjunto de integração é:

- [app.yaml](app.yaml): v1alpha5, workload `frontend`, porta 8080, ambiente dev,
  namespace `igeos-resto-front-end-dev`, serviço interno e configuração pública.
- [.easydeploy/app-metadata.yaml](.easydeploy/app-metadata.yaml): marcador
  versionado para descoberta pelo ApplicationSet da plataforma.
- [Workflow](.github/workflows/easydeploy.yml): verifica PRs sem publicar e publica
  imagem/chart em main após lint, typecheck, testes, build e smoke Docker.

Configure o secret GitHub `EASYDEPLOY_REPO_TOKEN` com leitura de `ideos/easydeploy`.
O toolkit privado é consumido por checkout em SHA fixado e action local, pois
o repositório consumidor está em outro owner. O workflow usa `GITHUB_TOKEN` para
publicar packages no namespace do consumidor. PRs de forks não recebem o PAT.

Artefatos esperados após um workflow de publicação bem-sucedido:

- Imagem: `ghcr.io/otiaggo/igeos-resto-front-end-frontend:<tag>`.
- Chart: `oci://ghcr.io/otiaggo/igeos-resto-front-end/charts/igeos-resto-front-end`.

Domínio e TLS não estão definidos. A plataforma precisa descobrir este owner,
ter acesso ao repositório e aos packages e reconciliar o chart. Criar o marcador
ou publicar artefatos não comprova deploy. Consulte a [operação EasyDeploy](specs/realization/operations/easydeploy.md).

## Workflow IGEOS

Comece por [specs/index.md](specs/index.md). Intenção, realização e verificação
ficam separadas e têm IDs rastreáveis. [AGENTS.md](AGENTS.md) orienta agentes.

O agregador IGEOS de produto ainda não foi identificado. Atores, épicos, features
e histórias devem ser cadastrados nele e vinculados às specs deste componente,
conforme [admissão de produto](specs/intent/product-backlog.md).
