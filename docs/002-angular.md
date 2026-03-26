# Angular

## 1. O que é

Angular [🔍](https://angular.dev/overview) é um framework para construção de aplicações web.

Seu uso faz mais sentido quando o objetivo não é apenas criar telas isoladas, mas montar uma aplicação com estrutura clara, componentes, navegação, serviços, formulários, integração com APIs e organização escalável. A CLI oficial faz parte importante dessa experiência, porque cria e mantém o workspace do projeto.

---

## 2. Motivo do uso

Angular foi adotado porque entrega uma base sólida para projetos completos e organizados.

Para um projeto de portfólio, isso ajuda a demonstrar não apenas interface, mas também arquitetura, separação de responsabilidades, padronização de código e uso de ferramentas comuns no mercado. Além disso, a CLI acelera a criação inicial e reduz configuração manual repetitiva.

---

## 3. Vantagens

- estrutura forte para aplicações maiores
- CLI oficial madura
- organização baseada em componentes
- suporte nativo a roteamento, formulários e HTTP
- boa integração com Angular Material
- padronização de projeto e geração de arquivos

Esses pontos tornam Angular especialmente útil quando a intenção é estudar, construir projetos mais completos e manter uma base de código previsível.

---

## 4. Desvantagens

- curva de aprendizado maior que em abordagens mais simples
- mais convenções e mais conceitos para dominar
- pode parecer excessivo em projetos muito pequenos
- a estrutura inicial costuma ser mais opinativa

Isso não é necessariamente um problema, mas significa que Angular costuma recompensar mais em projetos com alguma complexidade.

---

## 5. Criação de projeto Angular

A criação de um projeto Angular pode ser realizada via CLI por meio de um comando com a estrutura abaixo:

```bash
# ┌── npx ➡️ executa um pacote Node sem exigir instalação global prévia
# |       ┌── @angular/cli ➡️ pacote oficial da CLI do Angular
# |       |      ┌── @21 ➡️ uso opcional, define a versão da CLI que será usada. Sem @número-da-versão = versão mais recente diponível
# |       |      |   ┌── new ➡️ comando responsável por criar um novo projeto
# |       |      |   |        ┌── flowdesk ➡️ nome do projeto que será criado
# |       |      |   |        |              ┌── --style=scss ➡️ uso opcional, flags alteram a criação do projeto e podem ser combinadas
npx @angular/cli@21 new nome-do-projeto --style=scss
```

Para um ambiente que busca padronizar a versão na qual desenvolve, o comando padrão é:

```bash
npm install -g @angular/cli
ng new nome-do-projeto
```

---

## 6. Variações úteis do comando ng new

O comando base é:

```bash
npx @angular/cli@21 new nome-do-projeto
```

A CLI oferece várias opções para alterar a criação inicial do workspace e da aplicação. Essas opções permitem adaptar o projeto desde o início, evitando ajustes manuais logo após a criação.

### 6.1. Criar projeto com roteamento

```bash
npx @angular/cli@21 new nome-do-projeto --routing
```

Cria o projeto já com suporte inicial a navegação entre páginas.

### 6.2. Criar projeto com SCSS

```bash
npx @angular/cli@21 new nome-do-projeto --style=scss
```

Define SCSS como formato de estilo do projeto.

### 6.3. Criar projeto com roteamento e SCSS

```bash
npx @angular/cli@21 new nome-do-projeto --routing --style=scss
```

É uma das combinações mais comuns para aplicações reais.

### 6.4. Criar projeto sem instalar dependências logo após a geração

```bash
npx @angular/cli@21 new nome-do-projeto --skip-install
```

Gera os arquivos, mas não executa a instalação automática dos pacotes. Depois, a instalação pode ser feita manualmente.

### 6.5. Criar projeto sem inicializar Git

```bash
npx @angular/cli@21 new nome-do-projeto --skip-git
```

Útil quando o repositório já foi criado antes ou quando o controle de versão será iniciado manualmente.

### 6.6. Criar projeto com valores padrão, sem perguntas interativas

```bash
npx @angular/cli@21 new nome-do-projeto --defaults
```

Útil para automação ou quando já se sabe exatamente o que se quer.

### 6.7. Criar projeto em um diretório específico

```bash
npx @angular/cli@21 new nome-do-projeto --directory .
```

A opção `--directory` precisa do caminho que define onde o workspace será criado. Isso é útil quando se deseja criar o projeto no diretório atual, em vez de gerar uma nova pasta com o nome da aplicação.

- `--directory .`: cria na pasta atual
- `--directory ./caminho-desejado`: cria no caminho informado
- `--directory "./caminho desejado"`: as aspas são necessárias quando há espaço no caminho informado

### 6.8. Criar workspace vazio, sem aplicação inicial

```bash
npx @angular/cli@21 new meu-workspace --no-create-application
```

Esse formato cria apenas o workspace, sem uma aplicação inicial. Depois, aplicações podem ser geradas separadamente.

### 6.9. Criar projeto minimalista

```bash
npx @angular/cli@21 new nome-do-projeto --minimal
```

Cria uma base mais enxuta, voltada a aprendizado, testes rápidos ou experimentação.

### 6.10. Criar projeto com SSR

```bash
npx @angular/cli@21 new nome-do-projeto --ssr
```

Já configura a aplicação para renderização no servidor.

### 6.11. Criar projeto zoneless

```bash
npx @angular/cli@21 new nome-do-projeto --zoneless
```

Cria a aplicação inicial sem `zone.js`.

### 6.12. Definir gerenciador de pacotes

```bash
npx @angular/cli@21 new nome-do-projeto --package-manager=npm
```

Permite definir qual gerenciador de pacotes será usado no projeto.

### 6.13. Definir runner de testes

```bash
npx @angular/cli@21 new nome-do-projeto --test-runner=vitest
```

Permite definir a ferramenta usada para testes já na criação do projeto.

---

## 7. O que o comando ng new cria

O comando `ng new` cria um workspace Angular.

Esse workspace contém a configuração principal do projeto e, por padrão, uma aplicação inicial com o mesmo nome informado no comando.

Isso é importante porque Angular não cria apenas uma pasta com arquivos soltos. Ele cria uma base estruturada para desenvolvimento, build, testes e manutenção por meio da CLI.

---
