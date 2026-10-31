# Roteiro de demonstração e validação

## Requisitos do relatório

| Requisito | Fluxo demonstrável |
| --- | --- |
| RF01 — registrar visita sem rede | ACS → Simular offline → Família → Iniciar visita → Concluir → Envios → Ver registro salvo |
| RF02 — retomar após interrupção | Preencher observação, recarregar a página ou Salvar e sair, retomar em Rascunhos |
| RF03 — saber o que foi enviado | Envios → simular falha → sincronizar → conferir falha → tentar novamente |
| RF04 — corrigir cadastro | Secretaria → Revisão → devolver com motivo → ACS → Envios → corrigir → sincronizar → nova revisão |
| RF05 — planejar visitas | Famílias → buscar nome/endereço → Prioritárias → selecionar microárea |
| RNF01 — legibilidade em campo | Inspecionar tela de 390 px; avaliação real em campo ainda pendente |
| RNF02 — perdas e duplicatas | Repetir sincronização e verificar registro único; conflito exige escolha de versão |

## Demonstração sugerida (5–8 minutos)

1. Na Secretaria, visite as cinco abas. Em Microáreas, clique em Ver registros e confira o filtro.
2. Em Revisão, abra o conflito de José Antônio. Tente aprovar sem escolher endereço; selecione uma versão e aprove. Confira o Histórico.
3. No ACS, procure Maria de Lourdes. Inicie visita, avance e digite observações fictícias. Recarregue e confira que o texto continua disponível.
4. Conclua a visita, abra Envios e consulte o registro salvo. Simule uma falha e sincronize. Tente de novo e confira o recebimento na Secretaria.
5. Devolva um registro com motivo. No ACS, salve a correção em modo offline. Reconecte e sincronize. Confira a nova revisão e a versão anterior no Histórico.
6. Arquive e restaure uma família. Ao final, em Envios, reinicie a amostra se desejar.

## Testes automatizados

`npm test` usa o executor nativo do Node.js, com ambiente DOM simplificado. Cobre: restauração do rascunho; offline/falha/reenvio sem duplicação; correção com preservação da versão anterior; campos da visita concluída; filtro por microárea; bloqueio de aprovação de conflito sem escolha.

Esses testes não substituem testes visuais no navegador, acessibilidade, avaliação com ACS ou testes de integração de um sistema real. A versão não implementa integração externa.

## Verificação desta entrega — 31/10/2026

Seis testes automatizados passaram. No Chrome, foram verificados os cliques das cinco abas da Secretaria, filtro por microárea, recarga do rascunho, conclusão e consulta de visita, falha/reenvio, correção e layout de 390 px. Não foram observados erros JavaScript nesses fluxos. Capturas desktop (1440 px) e mobile foram inspecionadas.
