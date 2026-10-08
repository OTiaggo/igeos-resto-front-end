# Especificações do IGEOS Resto Front-end

## Finalidade

Este conjunto registra os contratos do componente front-end. A solicitação de
08/10/2026 autoriza sua preparação para desenvolvimento IGEOS e entrega EasyDeploy.
O escopo técnico foi confirmado na instrução de completar as lacunas identificadas
na análise do EasyDeploy. Funcionalidades de negócio e o agregador de produto
continuam pendentes.

## Caminhos de leitura

| Interesse | Entrada | Continuação |
| --- | --- | --- |
| Propósito e limites | [Produto](intent/product.md) | [Capacidades](intent/capabilities/index.md), [domínio](intent/domain.md) |
| Qualidade | [Qualidade](intent/quality.md) | [Verificação](verification.md) |
| Implementação | [Arquitetura](realization/architecture.md) | [Interfaces](realization/interfaces/runtime-and-aggregate.md) |
| Entrega | [EasyDeploy](realization/operations/easydeploy.md) | [Verificação](verification.md) |
| Preparação de histórias | [Admissão de produto](intent/product-backlog.md) | Agregador proprietário, ainda não identificado |

## Responsabilidades

Intenção registra propósito, necessidades, comportamento e qualidade. Realização
registra stack, interfaces, execução e entrega. Verificação relaciona cada contrato
a evidência, distinguindo verificações realizadas de pendências.

O agregador será proprietário de atores, épicos, features, histórias e acompanhamento
de entrega. Este componente mantém as especificações e os vínculos recebidos desse
agregador. Não há manifesto de agregador ou histórico de produto neste repositório.

## Rastreabilidade e referências

IDs permanecem estáveis: `QUAL-*` para qualidade, `ARCH-*` para contratos técnicos
e `CAP-*` somente após admissão de uma capacidade de produto. Realização referencia
intenção; verificação referencia ambas. Mudanças exigem atualização dos vínculos.

A separação segue o padrão canônico da skill IGEOS: requisitos e rastreabilidade
(ISO/IEC/IEEE 29148), descrição de arquitetura (42010) e verificação no ciclo de
vida (15288). Esta organização não representa certificação nessas normas.
