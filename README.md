# FlowDesk

Aplicação frontend desenvolvida com **Angular 21** e **Angular Material 21** para simular um sistema de **gestão de chamados internos**.

O projeto foi criado com foco em **portfólio frontend**, buscando demonstrar uma aplicação coerente, com interface moderna e funcionalidades comuns em sistemas corporativos, como **CRUD**, **busca**, **filtros**, **paginação**, **dialogs**, **pipes** e **formulários reativos**.

---

## Demonstração

<!--
TODO: Adicionar o link do deploy quando estiver disponível.

```text
Deploy: <url-do-deploy>
```

TODO: Adicionar imagens ou GIFs da aplicação pronta.
-->

---

## Objetivo

Construído para praticar e demonstrar, de forma aplicada, recursos modernos do ecossistema Angular, tais como:

- **Signals**
- **Reactive Forms**
- **Angular Material**
- **Lazy Loading**
- **Pipes nativas e customizadas**
- **Consumo de API REST simulada com JSON Server**

A proposta foi desenvolver uma aplicação com cara de sistema real, priorizando organização, clareza visual e funcionalidades comuns em ambientes corporativos.

---

## Visão geral da aplicação

O **FlowDesk** simula um painel de solicitações internas, onde é possível:

- visualizar chamados cadastrados
- buscar por texto
- filtrar por status, prioridade e categoria
- paginar resultados
- criar novos chamados
- editar chamados existentes
- excluir registros
- visualizar detalhes em modal
- acompanhar informações em dashboard resumido

---

## Funcionalidades

- Dashboard com cards e visão resumida
- Listagem de chamados
- Busca textual
- Filtros combinados
- Paginação
- Cadastro de chamado
- Edição de chamado
- Exclusão com confirmação
- Modal de detalhes
- Pipe nativa para formatação
- Pipe customizada para exibição de informações derivadas
- Feedback visual para loading, erro e lista vazia

---

## Tecnologias utilizadas

- Angular 21
- Angular Material 21
- TypeScript
- SCSS
- RxJS
- JSON Server

---

## Arquitetura e conceitos explorados

Este projeto procura seguir uma organização simples e escalável, separando responsabilidades entre:

- `core`
- `shared`
- `features`

Além de explorar conceitos como:

- componentes standalone
- estado local com signals
- formulários reativos tipados
- consumo HTTP com services
- componentização
- reaproveitamento de layout e UI
- separação entre regras de interface, dados e componentes compartilháveis

---

## Backend mockado

O backend foi simulado com **JSON Server**, com o objetivo de manter o foco no frontend e ainda permitir a demonstração de um fluxo completo de CRUD.

A proposta aqui não é reproduzir um backend robusto, mas oferecer uma base suficiente para representar integrações comuns de aplicações reais.

---

## Motivação do projeto

Este repositório não pretende ser um produto final pronto para produção.

Ele foi desenvolvido como um projeto de portfólio para demonstrar:

- organização de código
- clareza na construção de interfaces
- domínio de fundamentos importantes do Angular
- capacidade de estruturar um sistema frontend com contexto de negócio
- preocupação com legibilidade, reutilização e evolução da aplicação

---

## Pontos que eu quis destacar neste projeto

- uso de padrões modernos do Angular
- interface com Angular Material aplicada a um cenário coerente
- fluxo completo de CRUD
- preocupação com usabilidade básica
- código legível e estrutura reutilizável

---

## Limitações atuais

Por ser um projeto de estudo e portfólio, algumas simplificações foram assumidas:

- autenticação não implementada
- backend apenas mockado
- sem controle avançado de permissões
- sem persistência real em ambiente produtivo
- sem cobertura de testes

---

## Observação

**1:** Este repositório foi escrito integralmente em português, com exceção de alguns nomes técnicos, termos do ecossistema Angular e caminhos de pastas.

A escolha foi intencional: reflete meu contexto de estudo e produção, e também contribui fornecendo material mais acessível para quem procura conteúdo atualizado de Angular em português.

**2:** Na raiz do projeto existe uma pasta `docs`, onde são adicionados textos didáticos conforme a construção da aplicação avança.

Essa pasta funciona como material complementar do repositório, registrando decisões, explicações de ambiente, setup, estrutura e recursos utilizados ao longo do desenvolvimento.

---

## Como executar o projeto

### Pré-requisitos

- Node.js
- npm

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd flowdesk-angular
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar simultaneamente a aplicação Angular e o JSON Server

```bash
npm run dev
```

### 4. Acessar no navegador

```text
http://localhost:4200
```

> Ajuste este endereço caso a sua configuração local utilize outra porta.

---

## Sobre o autor

Desenvolvedor Rodrigo, formado em **Desenvolvimento de Software Multiplataforma** desde julho de 2025.

Tive contato com diferentes frentes da área, como metodologias ágeis, modelagem de banco de dados, diagramas UML, análise de dados e inteligência artificial. Após a formação, direcionei meus estudos para o desenvolvimento full stack, com foco atual no fortalecimento das competências de frontend.

Este projeto nasce nesse contexto, como uma aplicação de portfólio pensada principalmente para destacar habilidades de **desenvolvimento frontend com Angular**, sem a intenção de aprofundar backend.

---

## Contato

- GitHub: [`github.com/eRodrigoL`](https://github.com/eRodrigoL)
- LinkedIn: [`linkedin.com/in/erodrigol/`](https://www.linkedin.com/in/erodrigol/)
