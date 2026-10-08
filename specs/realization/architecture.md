# Arquitetura

## Contexto e propriedade

Este repositório é um componente, não uma raiz agregadora. Possui código da
interface, dependências fixadas, especificações e empacotamento. O agregador
proprietário define composição, ambiente, domínio, TLS e cadastro de produto.

<a id="arch-foundation-001"></a>

## ARCH-FOUNDATION-001: Fundação solicitada

**Contrato:** React 18, TypeScript strict, Vite, Ant Design 5,
React Router 6, TanStack Query v5, Axios, oidc-client-ts/react-oidc-context,
dayjs e zustand. npm e lockfile reproduzem a instalação. Rotas e providers
estabelecem uma aplicação mínima, sem funcionalidades de negócio presumidas.

**Justificativa:** A stack foi definida expressamente na solicitação.

**Rastreabilidade:** [QUAL-MAINTAINABILITY-001](../intent/quality.md#qual-maintainability-001),
[verificação](../verification.md).

<a id="arch-delivery-001"></a>

## ARCH-DELIVERY-001: Entrega do componente

**Contrato:** Build estático em imagem Nginx, porta 8080, fallback de
rotas para a SPA e endpoint de saúde separado. Configuração pública em runtime
permite reutilizar a imagem. EasyDeploy declara apenas o front-end, sem banco,
segredos ou serviços do componente irmão.

`app.yaml`, marcador de descoberta e workflow publicam imagem e chart para
consumo pela plataforma. A configuração inicial segue o ambiente dev do componente
irmão, com namespace próprio explícito e serviço interno. Domínio e TLS serão
definidos na composição do agregador; recursos não são fixados sem necessidade.
Não há auto-instrumentação de Node: o runtime é Nginx, não o servidor de build.

O workflow faz checkout autenticado do toolkit privado em SHA fixado, executa
a action local e mantém o ambiente igual ao manifesto. PRs executam build e
pré-validação sem publicar; main publica após as mesmas verificações.
O marcador de descoberta deve ser versionado mesmo que o estado gerado do
EasyDeploy seja ignorado. Ver [operação](operations/easydeploy.md).

**Rastreabilidade:** [QUAL-SECURITY-001](../intent/quality.md#qual-security-001),
[interfaces](interfaces/runtime-and-aggregate.md), [verificação](../verification.md).

## Integrações e persistência

O componente irmão possui APIs FastAPI de previsão e otimização. Sua configuração
atual permite CORS apenas para origens locais e não oferece contrato OIDC.
Este trabalho não altera esse componente nem declara integração autenticada
funcional. Nenhum dado de negócio ou token será persistido pelo estado global.

## Decisões e limites

A instrução de completar as lacunas confirma a fundação apresentada e o marcador
de descoberta encontrado na análise. A escolha de React 18 atende ao mínimo solicitado e à compatibilidade nativa
do Ant Design 5. A estrutura seguirá as menores responsabilidades necessárias:
entrada, providers, rotas, configuração e pontos de integração documentados.
