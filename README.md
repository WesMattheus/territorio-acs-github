
Protótipo acadêmico desenvolvido para a disciplina de **Interação Humano-Computador (IHC)** da **Universidade de Pernambuco (UPE)**. O projeto propõe uma solução para apoiar o trabalho dos **Agentes Comunitários de Saúde (ACS)** e a gestão das informações pela **Secretaria Municipal de Saúde**, considerando o contexto de Vicência, Pernambuco.

## Contexto e objetivo

O trabalho dos ACS envolve visitas domiciliares, cadastro de famílias e acompanhamento da população. Em áreas rurais e distritos do interior, esse trabalho pode ocorrer com conectividade limitada, interrupções e dificuldades no uso de fichas em papel.

O Território busca apoiar a digitalização desse processo, reduzir o retrabalho e facilitar o fluxo de informações entre os profissionais de campo e a gestão municipal. Esses benefícios são objetivos do projeto e ainda precisam ser avaliados com os usuários.

Este repositório contém um **protótipo web funcional** para explorar a navegação, o preenchimento de registros, a recuperação de rascunhos e os estados de sincronização. O aplicativo mobile em **React Native**, previsto no relatório, corresponde a uma etapa futura de implementação.

## Perfis de uso

| Perfil | Interface | Finalidade |
| --- | --- | --- |
| Agente Comunitário de Saúde | Mobile | Consultar famílias, cadastrar moradores, registrar visitas e acompanhar envios. |
| Secretaria de Saúde | Desktop | Revisar registros recebidos, solicitar correções e acompanhar informações do território. |

## Funcionalidades do protótipo

### Agente Comunitário de Saúde

- Consulta de famílias com busca por nome ou endereço e filtros por prioridade, arquivamento e microárea.
- Cadastro demonstrativo de famílias e moradores.
- Registro de visitas em três etapas: contato, observações e revisão.
- Salvamento de rascunho e retomada após interrupção ou recarga da página.
- Consulta de registros concluídos e acompanhamento da fila de envio.
- Simulação de falta de conexão, falha de envio e nova tentativa.
- Correção de registros devolvidos pela Secretaria.
- Arquivamento e restauração de famílias.

### Secretaria de Saúde

- Painel com indicadores da amostra demonstrativa.
- Revisão de registros com busca e filtros por situação e microárea.
- Aprovação ou devolução para correção, com indicação do motivo.
- Escolha explícita de versão em um cenário demonstrativo de conflito.
- Consulta de microáreas e exportação de resumo em CSV.
- Histórico de alterações e reversão de ações elegíveis.

## Fluxo principal

**Selecionar família → Registrar visita → Revisar → Salvar no aparelho → Sincronizar → Revisão pela Secretaria**

Quando necessário, a Secretaria devolve o registro com um motivo. O agente salva a correção e sincroniza novamente para uma nova revisão.

**Concluir uma visita e sincronizá-la são ações diferentes.** A interface distingue registros aguardando envio, em envio, sincronizados ou com falha. As correções reenviadas preservam a versão anterior no histórico.

## Princípios de IHC

O relatório e os materiais da disciplina orientam o projeto a partir do Design Centrado no Usuário e da Engenharia de Usabilidade. A proposta prioriza:

- **Visibilidade do estado:** feedback sobre salvamento, conexão e envio.
- **Controle pelo usuário:** retomada de rascunhos, confirmação e reversão de ações.
- **Redução da carga cognitiva:** etapas curtas, opções de seleção e linguagem direta.
- **Consistência:** padrões visuais e termos comuns às interfaces mobile e desktop.
- **Prevenção e recuperação de erros:** revisão antes da conclusão, motivos de devolução e nova tentativa de envio.
- **Legibilidade:** contraste, estados acompanhados de texto e ícones e áreas de interação adequadas ao contexto mobile.

A identidade visual utiliza uma paleta própria inspirada nas cores de Pernambuco, sem logotipos ou símbolos oficiais. A avaliação de usabilidade com ACS e gestores, assim como a verificação de acessibilidade, permanece como etapa futura.

## Tecnologias

- HTML5, CSS3 e JavaScript.
- `localStorage` para persistência demonstrativa no navegador.
- Node.js para servidor local, geração dos arquivos e testes.
- Executor de testes nativo do Node.js.

Não há dependências externas a instalar para executar esta versão.

## Executar localmente

Requisito: **Node.js 22 ou superior**, com npm.

Na pasta do projeto:

```sh
npm run dev
```

Acesse **http://127.0.0.1:8765** e selecione o perfil desejado:

- ACS: `http://127.0.0.1:8765/#/acs`
- Secretaria: `http://127.0.0.1:8765/#/gestao`

Edite os arquivos de `src/`, salve e recarregue o navegador. O servidor regenera `dist/` ao salvar. Para encerrar, pressione `Ctrl+C`.

## Estrutura do repositório

```text
src/
  index.html           Estrutura da página
  style.css            Estilos e adaptação às telas
  js/
    ui.js              Ícones e utilitários de interface
    state.js           Dados fictícios e persistência
    acs.js             Telas do agente
    secretaria.js      Telas da gestão
    actions.js         Navegação e ações
    events.js          Formulários e inicialização
    browser-tools.js   Integração opcional com o navegador
dist/                  Arquivos gerados para hospedagem
scripts/               Build, servidor e verificação
tests/                Testes de comportamento
docs/                  Documentação e roteiros
.vscode/               Configuração de tarefas
```

Edite `src/`, não os arquivos gerados em `dist/`.

## Verificação

```sh
npm run build
npm run check
npm test
```

Os testes automatizados cobrem recuperação de rascunhos, preservação da fila após falha, reenvio sem duplicação, correção com preservação da versão anterior, campos da visita concluída, filtro por microárea e bloqueio de aprovação de conflito sem escolha de versão.

Esses testes não substituem a avaliação com usuários nem a validação de um sistema em produção.

## Limites desta versão

- Todos os dados são fictícios; não utilize informações pessoais reais.
- A troca de perfil é demonstrativa, sem autenticação ou autorização.
- Os dados ficam no navegador e não são compartilhados entre dispositivos.
- A sincronização é simulada: não há backend ou envio a servidores de saúde.
- A simulação offline não garante abrir ou recarregar o aplicativo sem internet.
- Não há integração com o e-SUS; o CSV não corresponde a um formato oficial de integração.
- Cadastros e formulários apresentam apenas um subconjunto dos campos previstos para o sistema final.

Para restaurar a amostra inicial, acesse **ACS → Envios → Reiniciar demonstração**.

## Próximas etapas

- Avaliar os fluxos com ACS e gestores e revisar o protótipo a partir dos resultados.
- Desenvolver o aplicativo mobile previsto no relatório.
- Implementar backend, persistência offline e sincronização real.
- Implementar autenticação, autorização por perfil e microárea e proteção dos dados.
- Validar acessibilidade, recuperação de falhas e tratamento de alterações concorrentes.
- Investigar a viabilidade técnica e institucional de integração com sistemas oficiais.

## Documentação complementar

- [Arquitetura e limites](docs/ARQUITETURA.md)
- [Roteiro de demonstração e testes](docs/TESTES.md)
- [Guia de publicação no GitHub](docs/GITHUB.md)

O projeto é fundamentado no relatório acadêmico e nos materiais de aula da disciplina de IHC. Este protótipo não representa um produto oficial do Governo de Pernambuco ou da Prefeitura de Vicência.
