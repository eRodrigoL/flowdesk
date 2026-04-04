# Aliases de importação

## 1. O que são

Aliases de importação são apelidos criados para evitar caminhos longos e frágeis nos imports.

Exemplo sem alias:

```ts
import { Produto } from '../../../features/pages/produto';
```

Exemplo com alias:

```ts
import { Produto } from '@pages/produto';
```

---

## 2. Motivo do uso

Aliases são opcionais em aplicações Angular e, quando adotados, servem para:

- reduzir caminhos relativos longos
- melhorar a leitura dos imports
- facilitar manutenção
- deixar mais claro de que parte da arquitetura vem cada arquivo

Isso acontece porque o import deixa de depender tanto da posição do arquivo que está importando e passa a depender mais de um ponto base configurado para o projeto.

Na prática, isso também reduz a necessidade de ajustar imports quando um arquivo `.ts` é movido de pasta.

---

## 3. Estrutura de criação e de uso

O alias é definido no `tsconfig.json` e usado em arquivos que importam artefatos da própria aplicação.

Supondo a estrutura:

```text
src/
└── app/
    └── features/
        └── pages/
            └── listagem.ts
```

No `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    //  └── "baseUrl" ➡️ define a pasta base usada para resolver os caminhos do projeto
    //  ┌── "paths" ➡️ cria mapeamentos de apelidos para caminhos reais
    "paths": {
      //   ┌── "@pages/*" ➡️ nome do alias que será usado nos imports
      //   │           └── * ➡️ indica que o alias pode apontar para vários arquivos dessa base
      "@pages/*": ["app/features/pages/*"]
      //                   └── "app/features/pages/*" ➡️ caminho real da pasta apontada pelo alias
    }
  }
}
```

No arquivo que precisar importar a página `Listagem`:

```ts
//          ┌── Listagem ➡️ artefato importado do arquivo de destino
import { Listagem } from '@pages/listagem';
//                              └── "@pages/listagem" ➡️ uso do alias @pages apontando para o arquivo listagem
```

Substituindo algo como:

```ts
import { Listagem } from '../../features/pages/listagem';
```

---

## 4. Leitura prática do exemplo

Neste caso:

- `baseUrl: "./src"` define `src` como ponto de partida
- `@pages/*` é o apelido criado
- `app/features/pages/*` é o caminho real que esse apelido representa
- `@pages/listagem` significa “buscar o arquivo `listagem` dentro da base `app/features/pages`”
- `Listagem` é o símbolo importado desse arquivo

Ou seja, no exemplo, `@pages/listagem` equivale a `app/features/pages/listagem` considerando `src` como base.

---
