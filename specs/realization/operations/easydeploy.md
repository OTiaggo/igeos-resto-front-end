# Entrega com EasyDeploy

## Finalidade e escopo

Entregar o componente front-end como imagem e chart OCI. A plataforma proprietária
executa reconciliação GitOps; publicação de artefatos não comprova implantação.

## Fontes e autorização

A instrução de completar as lacunas autoriza a preparação técnica apresentada
na revisão, incluindo manifesto, descoberta, container, workflows e validação.
O toolkit inspecionado está fixado em `0418cf1c31bd77c1834c12da0119b4cd39d64e22`.
Seu [contrato Argo CD](https://github.com/ideos/easydeploy/blob/0418cf1c31bd77c1834c12da0119b4cd39d64e22/specs/realization/integrations/argo-cd.md)
define descoberta; o [contrato cross-org](https://github.com/ideos/easydeploy/blob/0418cf1c31bd77c1834c12da0119b4cd39d64e22/specs/realization/operations/cross-org-private-usage.md)
define checkout autenticado. O código da action nessa versão exige namespace
explícito no documento original; não depender da inferência descrita em suas specs.

## Arquivos e configuração

- [app.yaml](../../../app.yaml): Application v1alpha5, um workload frontend com
  Dockerfile local, serviço interno e probes do servidor na porta http.
- [Marcador](../../../.easydeploy/app-metadata.yaml): habilita descoberta em dev.
- [Workflow](../../../.github/workflows/easydeploy.yml): valida PR sem publicar;
  publica imagem/chart em main depois da verificação do componente.
- [.gitignore](../../../.gitignore): ignora estado gerado e preserva o marcador.

Nome, ambiente e namespace são configuração atual, não requisitos de produto.
O namespace explícito acompanha `namespacePrefix` + ambiente. Antes de mudar o
ambiente, alinhar manifesto, marcador e workflow.

## Pré-requisitos externos

1. Secret GitHub `EASYDEPLOY_REPO_TOKEN` com leitura do toolkit privado.
2. Permissão do workflow para publicar packages no repositório consumidor.
3. Plataforma ApplicationSet com descoberta autorizada para `OTiaggo` e acesso
   ao repositório. Ela configura Argo CD, Kargo, acesso GHCR e reconciliação.
4. Domínio, TLS e configuração pública definidos pelo agregador antes de exposição.

Não escrever tokens neste repositório. O PAT para checkout não é segredo de
aplicação e não deve entrar em `app.yaml` ou configuração do navegador.

## Validação

Executar `npm ci`, `npm run check`, `easydeploy validate` e build/smoke Docker.
O workflow repete as verificações, testa a imagem e executa o toolkit com
`push_image: false` e `push_chart: false` nos PRs. A action verifica Helm lint e
template. O workflow precisa de acesso privado mesmo em PR; forks não recebem
o secret. Não usar `pull_request_target` para executar código de PR com credenciais.

## Recuperação

Restaurar a referência anterior de imagem/chart no GitOps proprietário. Não
editar manifests gerados ou manter cópias de values em Git. Este componente
não possui dados persistentes nem oferece comando de rollback de cluster.

## Rastreabilidade

[ARCH-DELIVERY-001](../architecture.md#arch-delivery-001),
[QUAL-MAINTAINABILITY-001](../../intent/quality.md#qual-maintainability-001),
[QUAL-SECURITY-001](../../intent/quality.md#qual-security-001),
[verificação](../../verification.md).
