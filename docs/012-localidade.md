# localidade

## 1. O que esta configuração faz

No Angular, a localidade da aplicação pode ser definida no `app.config.ts` com `LOCALE_ID`.

Essa configuração informa qual padrão regional a aplicação deve usar em recursos que dependem de localidade.

Exemplo:

```ts
import { LOCALE_ID } from '@angular/core';
[...]
```

E nos `providers`:

```ts
{ provide: LOCALE_ID, useValue: 'pt-BR' }
```

---

## 2. O que isso afeta

Definir `LOCALE_ID` influencia recursos do Angular que formatam valores com base na localidade.

Exemplos comuns:

- datas
- números
- porcentagens
- moeda

Ou seja, essa configuração ajuda a manter a aplicação coerente com o padrão brasileiro em pontos de formatação.

---

## 3. Exemplo no app.config.ts

```ts
import { ApplicationConfig, LOCALE_ID } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
};
```

---

## 4. Observação importante

Essa configuração define a localidade geral da aplicação.

Quando o Angular Material Datepicker estiver usando a configuração padrão de locale, ele também pode seguir esse valor.
