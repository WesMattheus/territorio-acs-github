# Arquitetura do primeiro protótipo

Aplicação estática de página única, sem bibliotecas de interface. A URL usa fragmentos (`#/acs`, `#/gestao/revisao`); links de abas renderizam a tela correspondente. O build concatena os arquivos JavaScript em uma ordem explícita. Separar responsabilidades facilita uma evolução futura, embora esta versão ainda compartilhe variáveis entre arquivos.

## Estado e fluxos

A chave `territorio-demo-v1` guarda famílias, registros recebidos, fila de envio, histórico e um rascunho de visita. O rascunho guarda família, etapa e campos; ao reabrir sua rota, a tela restaura esse estado. Uma visita concluída guarda resultado do contato, motivo e observação na fila. A consulta está em Envios → Ver registro salvo.

Estados da fila: `waiting → sending → synced`; falhas levam a `failed`, com nova tentativa. A sincronização compara o ID antes de inserir registros, evitando duplicação ao repetir o envio. Uma correção atualiza o registro existente e preserva a versão anterior no histórico. Os indicadores de registros recebidos usam a fila da Secretaria; famílias permanecem compartilhadas localmente no protótipo.

A revisão municipal possui `pending`, `conflict`, `returned` e `approved`. Devoluções exigem motivo. Conflitos exigem escolha explícita de endereço. O histórico permite reverter a última alteração elegível; correções posteriores invalidam reversões antigas para não sobrescrever a versão mais recente.

## Decisões e próximos passos

- Cadastro individual e visita usam campos reduzidos para avaliação de IHC.
- Dados demonstrativos podem ser vistos entre microáreas; não representa permissão real de um ACS.
- O filtro por microárea ajuda a testar localização e planejamento previstos em RF05.
- Numa implementação real, armazenamento offline, autenticação, autorização por perfil/microárea, API, proteção de dados e concorrência exigem projeto próprio.
- A estrutura atual não é um aplicativo React Native. É um protótipo web para validar navegação antes da implementação prevista no relatório.
- Nenhum envio chama sistemas oficiais; o CSV é apenas uma tabela demonstrativa.

## Visual preservado

Cores, tipografia de sistema, cartões, navegação lateral da Secretaria e barra inferior do ACS foram preservados. Estados têm texto e ícone, além de cor. A avaliação de acessibilidade e usabilidade com os participantes continua pendente.
