# Publicar o código no GitHub, pelo VS Code

## 1. Abra a pasta preparada

Use a pasta **territorio-acs-github**, ao lado de `prototipos-acs`, ou extraia o ZIP entregue. Esta cópia não contém o repositório interno nem a configuração de hospedagem do Sites. Abra essa pasta pelo VS Code: **Arquivo → Abrir Pasta**.

Não execute estes comandos dentro de `prototipos-acs`: essa pasta já possui o remoto da hospedagem existente.

## 2. Confira localmente

No Terminal do VS Code, estando na raiz do projeto:

```sh
node --version
npm run build
npm run check
npm test
npm run dev
```

Abra http://127.0.0.1:8765. Após conferir, Ctrl+C encerra o servidor. Se `node` não existir, instale uma versão LTS do Node.js pelo site oficial https://nodejs.org e reabra o VS Code.

## 3. Crie o primeiro commit

```sh
git init -b main
git add .
git status
git commit -m "feat: adiciona protótipo funcional ACS e Secretaria"
```

Confira a lista em `git status`: deve conter apenas o projeto, sem PDFs das aulas ou arquivos pessoais. Se o Git solicitar identidade, configure **neste repositório**, substituindo os valores:

```sh
git config user.name "Seu nome"
git config user.email "Seu e-mail verificado ou noreply do GitHub"
```

Depois repita `git commit`.

## 4. Crie um repositório vazio no GitHub

Entre em https://github.com/new. Sugestão de nome: `territorio-acs`. Escolha a visibilidade desejada. Deixe desmarcadas as opções de adicionar README, `.gitignore` e licença, pois o projeto já tem os dois primeiros. Crie o repositório.

Copie a URL HTTPS exibida e substitua `SEU_USUARIO` abaixo:

```sh
git remote add origin https://github.com/SEU_USUARIO/territorio-acs.git
git remote -v
git push -u origin main
```

Conclua a autenticação solicitada pelo VS Code/GitHub. Não coloque tokens ou senhas em arquivos do projeto ou na URL do remoto.

Alternativa gráfica: depois do commit, use **Controle do Código-Fonte → Publicar Branch → Publicar no GitHub**, se a opção estiver disponível. Nesse caso, deixe o VS Code criar o repositório; não é necessário repetir a criação manual.

## 5. Rotina de alterações

Para uma nova funcionalidade:

```sh
git switch -c feat/filtro-de-visitas
# Edite src/ e atualize docs/ quando necessário.
npm run build
npm run check
npm test
git add .
git commit -m "feat: adiciona filtro de visitas"
git push -u origin feat/filtro-de-visitas
```

No GitHub, abra um Pull Request para `main`. Descreva o que mudou e quais fluxos testou. Para uma equipe, use Issues para tarefas e um Project com colunas **A fazer**, **Em andamento**, **Em revisão** e **Concluído**. Associe cada PR à sua Issue.

## Hospedagem

Enviar o código ao GitHub não publica automaticamente o site. O protótipo continua no endereço do Sites. Para uma hospedagem estática futura, use o conteúdo gerado de `dist/`. Não há backend a configurar nesta versão.

Referência oficial: https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github
