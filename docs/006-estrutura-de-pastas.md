# Estrutura de pastas

## 1. Estrutura criada pelo `ng new` no Angular 21

Ao criar um projeto com Angular 21, a CLI gera uma base de workspace e uma base da aplicação.

O comando `ng new nome-do-projeto` gera uma estrutura inicial semalhante a:

```text
nome-do-projeto/
├── public/
├── src/
│   ├── app/
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── app.html
│   │   ├── app.scss
│   │   ├── app.spec.ts
│   │   └── app.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── tsconfig.json
└── ...
```

### 1.1. Papel mais importante dessa base

- `main.ts`
  ponto de entrada da aplicação

- `index.html`
  página base carregada pelo navegador

- `styles.scss`
  estilos globais

- `app.ts`
  componente raiz

- `app.html`
  template do componente raiz

- `app.scss`
  estilo do componente raiz

- `app.config.ts`
  configuração principal da aplicação

- `app.routes.ts`
  definição das rotas

---

## 2. Organização estrutural da aplicação

A estrutura criada pelo Angular é a base inicial da aplicação, mas a organização interna de `src/app` é uma decisão de arquitetura, definida pelo desenvolvedor ou pela equipe de desenvolvimento. Hovendo diversos formas de estruturar a aplicação:

### 2.1. Divisão por responsabilidades

Uma forma comum de organizar a aplicação é dividir as pastas por responsabilidade.

Exemplo:

```text
src/app/
├── core/                 ⬅️ recursos centrais da aplicação
│   └── services/
├── features/             ⬅️ funcionalidades e telas principais
│   └── pages/
├── shared/               ⬅️ recursos reutilizáveis
│   ├── components/
│   ├── dialogs/
│   ├── interfaces/
│   └── pipes/
├── app.config.ts
├── app.routes.ts
├── app.html
├── app.scss
├── app.spec.ts
└── app.ts
```

**Papel da pasta `core`**

Guarda elementos centrais da aplicação, isto é, partes que sustentam o sistema.

Exemplo:

```text
core/
└── services/
```

Pode incluir:

- serviços principais
- guards
- interceptors
- configurações centrais

---

**Papel da pasta `features`**

Guarda as funcionalidades principais do sistema.

Exemplo:

```text
features/
└── pages/
```

Pode incluir:

- páginas de listagem
- páginas de criação
- páginas de edição
- agrupamentos por funcionalidade

---

**Papel da pasta `shared`**

Guarda elementos reutilizáveis entre várias partes da aplicação.

Exemplo:

```text
shared/
├── components/
├── dialogs/
├── interfaces/
└── pipes/
```

Pode incluir:

- componentes reutilizáveis
- dialogs
- interfaces e tipos
- pipes compartilháveis

---

### 2.2. Divisão por tipo de artefato

Agrupa os arquivos pelo tipo técnico.

Exemplo:

```text
src/app/
├── components/
├── pages/
├── services/
├── interfaces/
├── pipes/
└── ...
```

Útil em projetos bem pequenos, mas pode se tornar confuso quando a aplicação cresce, porque arquivos de uma mesma funcionalidade ficam espalhados.

---

### 2.3. Divisão por funcionalidade

Agrupa os arquivos por área do sistema.

Exemplo:

```text
src/app/
├── produtos/
│   ├── pages/
│   ├── services/
│   ├── interfaces/
│   └── components/
├── usuarios/
│   ├── pages/
│   ├── services/
│   ├── interfaces/
│   └── components/
└── ...
```

Essa abordagem costuma funcionar bem quando a aplicação tem módulos ou áreas bem definidas.

---
