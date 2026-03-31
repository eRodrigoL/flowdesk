# main.ts

`main.ts` é o ponto de entrada da aplicação. Sua função é iniciar o Angular no navegador e dar início ao processo de bootstrap da aplicação. Em aplicações standalone, esse arquivo normalmente chama `bootstrapApplication(...)` para carregar o componente raiz.

No Angular 21, o uso de `main.ts` continua ligado à forma moderna de inicialização da aplicação. Em vez de iniciar um módulo raiz com `bootstrapModule(...)`, a recomendação para código novo é usar `bootstrapApplication(...)`, que faz o bootstrap direto de um componente standalone.

Uma forma simples de entender a organização é:

- `main.ts` inicia a aplicação
- `app.config.ts` [🔍](./009-app.config.ts.md) registra a configuração global
- `app.routes.ts` concentra as rotas
- componentes cuidam da interface
- serviços cuidam da lógica e do acesso a dados

Essa separação ajuda a deixar cada arquivo com uma responsabilidade mais clara. No fluxo mais comum, o `main.ts` importa o componente raiz e também a configuração global da aplicação para usá-los no bootstrap.

---

## 1. Estrutura básica

Uma estrutura básica de `main.ts` costuma ser esta:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
```

Nesse exemplo:

- `bootstrapApplication(...)` inicia a aplicação Angular
- `App` é o componente raiz standalone
- `appConfig` fornece a configuração global usada no bootstrap
- `.catch(...)` trata erro de inicialização no navegador

---

## 2. Papel de cada parte

### `bootstrapApplication`

É a função usada para fazer o bootstrap da aplicação standalone. Ela recebe o componente raiz como primeiro argumento e pode receber um objeto de configuração como segundo argumento.

### `App`

É o componente raiz da aplicação. No modelo standalone, o componente passado para `bootstrapApplication(...)` precisa ser standalone.

### `appConfig`

É a configuração global da aplicação, normalmente definida em `app.config.ts`. É nesse ponto que entram providers globais como roteamento e HTTP.

---
