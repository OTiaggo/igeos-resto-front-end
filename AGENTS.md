# IGEOS Resto Front-end

Este repositório é um componente front-end; não é uma raiz agregadora IGEOS.
Leia [specs/index.md](specs/index.md), intenção afetada, realização e verificação
antes de alterar contratos. Use as skills IGEOS de desenvolvimento quando disponíveis.

## Comandos

- Node definido em [.node-version](.node-version); dependências com `npm ci`.
- Desenvolvimento: `npm run dev`.
- Verificação: `npm run check`.
- Manifesto: `easydeploy validate`.
- Imagem: `bash scripts/smoke-container.sh` com Docker disponível.

## Limites

Manter a stack solicitada e TypeScript strict. Não criar APIs, dados fictícios,
permissões ou jornadas de negócio sem contrato. Axios está disponível para as
integrações futuras; TanStack Query possui o provider, mas não há chamadas de negócio.

Atores, épicos, features, histórias e coordenação pertencem ao agregador validado.
Não inventar manifesto agregador neste componente. O marcador EasyDeploy é
exclusivamente de descoberta GitOps.

## Entrega

Alinhar ambiente, nome e namespace em manifesto, marcador e workflow. Fixar o
toolkit privado em commit e manter checkout autenticado cross-org. Versionar
`.easydeploy/app-metadata.yaml`, ignorando somente o estado gerado da pasta.
Runtime é Nginx; não injetar auto-instrumentação Node em aplicação estática.

Não colocar segredos em configuração pública ou imagem. Tokens OIDC ficam em
memória; autorização de APIs deve ser garantida pelo servidor. Preservar alterações
do usuário e assinatura Git; relatar validações indisponíveis sem declarar paridade
com CI. Publicação de chart não comprova implantação na plataforma.
