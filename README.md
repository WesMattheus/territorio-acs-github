# Território — Saúde em campo

Primeiro protótipo funcional acadêmico de IHC para agentes comunitários e a Secretaria de Saúde de Vicência (PE). Mantém o desenho original, com identidade própria.

## Começar no VS Code

Requisito: Node.js 22 ou superior, com npm. Não há dependências externas para instalar.

1. Abra esta pasta em **Arquivo → Abrir Pasta**.
2. Abra **Terminal → Novo Terminal**.
3. Execute `npm run dev`.
4. Abra http://127.0.0.1:8765 e escolha **Agente ACS** ou **Secretaria**.

Edite `src/`, salve e recarregue o navegador. O servidor regenera `dist/` ao salvar. Encerre com Ctrl+C.

```sh
npm run build   # gera dist/ a partir de src/
npm run check   # verifica sintaxe JavaScript
npm test        # verifica seis cenários críticos
```

## Funcionalidades

**ACS:** busca e filtros de famílias (incluindo microárea), cadastro domiciliar e de morador, consulta da família, visita em três etapas, rascunho retomável após recarregar, consulta de visitas concluídas, fila de envio, falha e nova tentativa, correção salva localmente, arquivamento e restauração.

**Secretaria:** painel, busca e filtros na revisão, aprovação, devolução com motivo, escolha de versão em conflitos, microáreas, exportação CSV e histórico com reversão. A correção enviada preserva a versão anterior no histórico.

## Organização

```text
src/
  index.html           estrutura da página
  style.css            identidade visual e adaptação a telas menores
  js/
    ui.js              ícones e escape de texto
    state.js           amostra fictícia e armazenamento local
    acs.js             telas do agente
    secretaria.js      telas da gestão
    actions.js         ações, navegação, sincronização e histórico
    events.js          formulários e inicialização
    browser-tools.js   integração opcional de navegação com o navegador
dist/                  versão gerada, pronta para hospedagem estática
scripts/               build, servidor local e verificação
tests/                 testes de comportamento com Node.js
docs/                  arquitetura, roteiro de teste e guia GitHub
.vscode/               tarefas e extensão de formatação sugerida
```

Os scripts do navegador compartilham estado; `scripts/build.mjs` define a ordem de concatenação. Não edite `dist/app.js` diretamente: o próximo build sobrescreve esse arquivo.

## Documentação

- [Como colocar no GitHub](docs/GITHUB.md)
- [Arquitetura e limites](docs/ARQUITETURA.md)
- [Roteiro de demonstração e testes](docs/TESTES.md)

## Limites

Use somente dados fictícios. O armazenamento é `localStorage`, exclusivo de cada navegador/origem. A troca de perfil é demonstrativa, sem autenticação ou controle de acesso. Não há backend, integração com e-SUS ou comunicação entre dispositivos. “Simular offline” testa estados da interface; não existe service worker que garanta abrir/recarregar sem rede. Os dados de famílias são compartilhados entre os perfis locais; a fila de revisão recebe visitas e correções após a sincronização simulada. Reinicie a amostra em **ACS → Envios → Reiniciar demonstração**.

## Base acadêmica e visual

O relatório local `main2-revisado.tex` orienta a distinção entre concluir e sincronizar, a recuperação de rascunhos, a devolução com motivo e a reversibilidade. Os materiais de aula sobre feedback, controle pelo usuário, consistência, padrões e prototipação orientam as interações. Veja a rastreabilidade em `docs/TESTES.md`. Os PDFs e o relatório não são redistribuídos neste pacote.

Paleta preservada: azul `#123c79`, azul profundo `#102b50`, verde `#087f77`, amarelo `#f5c845` e vermelho `#b43838`. Interpretação própria inspirada em Pernambuco; não representa produto oficial, certificação de acessibilidade ou validação com usuários.
