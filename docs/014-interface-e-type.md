# interfaces e tipos

No Angular, `interface` e `type` são recursos do TypeScript usados para definir a forma dos dados da aplicação.

Eles ajudam a tipar objetos, parâmetros, retornos de métodos, respostas de API e estruturas usadas pela aplicação. Em TypeScript:

- `interface` nomeia contratos de forma para valores
- `type` cria um nome para um tipo

> **NOTA:**
>
> O termo **model** é muito usado em projetos Angular para nomear arquivos e estruturas que representam os dados da aplicação, mas, na prática, esse “model” normalmente é escrito com `interface`, `type` ou, em alguns casos, `class`. O nome **model** costuma ser mais uma convenção de organização do projeto do que uma palavra com comportamento especial no Angular.

---

## 1. Interface

`interface` é usada principalmente para descrever a estrutura de objetos.

Ela funciona como um contrato: define quais propriedades um valor deve ter.

O TypeScript também permite estender interfaces e reabrir uma interface já declarada para adicionar novos campos.

Exemplo:

```ts
//        ┌── interface ➡️ palavra usada para declarar um contrato de estrutura
export interface Chamado {
  //                └── Chamado ➡️ nome da interface

  /*
   ┌── id ➡️ propriedade obrigatória do objeto */
  id: number;
  //    └── number ➡️ valor tipo numérico

  // ┌── titulo ➡️ propriedade obrigatória
  titulo: string;
  //        └── string ➡️ texto

  descricao: string;
  status: string;
}
```

Nesse exemplo:

- `Chamado` define o formato esperado do objeto
- todo objeto tipado como `Chamado` deve seguir essa estrutura

---

## 2. Type

`type` também pode nomear estruturas de dados, mas é mais flexível que `interface`. Com `type`, além de objetos, também é possível representar unions, intersections, tuplas e até tipos primitivos nomeados.

Exemplo com objeto:

```ts
export type Usuario = {
  id: number;
  nome: string;
  email: string;
};
```

Exemplo com union type:

```ts
export type StatusChamado = 'aberto' | 'em-atendimento' | 'encerrado';
```

Nesses exemplos:

- `Usuario` nomeia um tipo de objeto
- `StatusChamado` restringe os valores possíveis

---

## 3. Onde isso aparece no Angular

Em aplicações Angular, `interface` e `type` aparecem com frequência em:

- dados vindos da API
- contratos usados em serviços
- objetos exibidos em componentes
- parâmetros e retornos de métodos
- estados da aplicação
- formulários reativos tipados

O Angular usa TypeScript em toda a base da aplicação, e a própria documentação mostra o uso de interfaces em casos como lifecycle hooks e o uso de tipagem forte em formulários reativos.

Exemplo:

```ts
export type StatusChamado = 'aberto' | 'em-atendimento' | 'encerrado';

export interface Chamado {
  id: number;
  titulo: string;
  status: StatusChamado;
}
```

```ts
// TYPE AUXILIAR
export type StatusChamado = 'aberto' | 'em-atendimento' | 'encerrado';
//               └── StatusChamado ➡️ tipo reutilizável para controlar os valores permitidos

// INTERFACE USANDO O TYPE
export interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  status: StatusChamado;
  //  |        └── StatusChamado ➡️ em vez de string livre, usa um tipo controlado
  //  └── status ➡️ propriedade da interface
}
```

Nesse exemplo:

- `interface` define a estrutura principal do chamado
- `type` define um conjunto limitado de valores válidos para `status`

---

## 4. Relação com o termo model

Em muitos projetos, é comum encontrar arquivos como:

```text
chamado.model.ts
usuario.model.ts
produto.model.ts
```

Isso normalmente indica que o arquivo guarda a representação dos dados daquela entidade.

Esse arquivo pode conter:

- uma `interface`
- um `type`
- ambos

Exemplo:

```ts
export type CategoriaProduto = 'hardware' | 'software' | 'servico';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: CategoriaProduto;
}
```

Nesse caso, tudo isso poderia ser encontrado em um arquivo chamado `produto.model.ts`.

---

## 5. Leitura prática

De forma objetiva:

- **interface** → descreve a estrutura de objetos
- **type** → nomeia tipos em geral
- **model** → nome ou caminho comum para arquivos ou estruturas que representam dados da aplicação

---
