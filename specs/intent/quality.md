# Qualidade

<a id="qual-maintainability-001"></a>

## QUAL-MAINTAINABILITY-001: Mudanças verificáveis

**Atributo:** Manutenibilidade.

**Descrição:** Cada mudança deve ter contrato rastreável e verificações reproduzíveis.

**Impacto:** Permitir que a equipe continue o desenvolvimento com evidência clara.

**Métrica:** Todas as mudanças de contrato têm vínculo de verificação; instalação
fixada, análise estática e compilação terminam sem erro antes da publicação.

**Prioridade:** Must. **Verificação:** Inspeção e verificações automatizadas.

**Rastreabilidade:** [Arquitetura](../realization/architecture.md#arch-foundation-001),
[verificação](../verification.md).

<a id="qual-security-001"></a>

## QUAL-SECURITY-001: Configuração pública e credenciais

**Atributo:** Segurança.

**Descrição:** Configurações entregues ao navegador não contêm segredos ou
credenciais de serviço. A fundação não concede permissões de negócio.

**Impacto:** Evitar exposição de credenciais e acesso presumido a dados.

**Métrica:** Zero segredos de serviço em arquivos publicados; integração de
identidade só é habilitada com parâmetros públicos completos e contrato confirmado.

**Prioridade:** Must. **Verificação:** Inspeção e testes da configuração.

**Rastreabilidade:** [Interface](../realization/interfaces/runtime-and-aggregate.md),
[verificação](../verification.md).
