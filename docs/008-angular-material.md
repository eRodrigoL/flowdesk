# Angular Material

Angular Material [🔍](https://material.angular.dev/) é a biblioteca oficial de componentes visuais do Angular baseada no Material Design.

Ela fornece elementos prontos que ajudam a construir interfaces com mais rapidez, consistência visual e integração com o ecossistema Angular, tais como:

- botões
- campos de formulário
- inputs
- selects
- cards
- dialogs
- tabelas
- menus
- ícones
- barras de navegação

---

## 1. Motivo do uso

Com vantagens como:

- biblioteca oficial do ecossistema Angular
- boa integração com componentes standalone
- grande quantidade de componentes prontos
- visual consistente
- suporte à acessibilidade
- documentação ampla

o Angular Material é indicado quando se deseja:

- acelerar a construção da interface
- manter consistência visual entre os componentes
- evitar criar tudo do zero
- focar mais na lógica da aplicação do que na base visual

---

## 2. Desvantagens

- exige conhecer a forma de uso dos componentes
- pode adicionar complexidade em interfaces muito personalizadas
- nem sempre o visual padrão atende exatamente ao design desejado
- alguns componentes exigem imports e configurações específicas

---

## 3. Instalação

A instalação pode ser feita com a CLI do Angular, usando o comando:

```bash
npx ng add @angular/material
```

Esse comando:

- instala os pacotes necessários
- configura tema globalinicial
- configura suporte a animações

---

## 4. Como usar

Depois de instalar a biblioteca Angular Material, o uso de cada componente exige:

### 4.1. Importar o módulo na classe do componente

Exemplo:

```ts
// src/app/pages/pagina-exemplo.ts

import { MatToolbarModule } from '@angular/material/toolbar';
[...]
```

### 4.2. Adicionar o módulo no `imports` do componente

Exemplos:

```ts
// src/app/pages/pagina-exemplo.ts

// import {MatToolbarModule} from '@angular/material/toolbar';
// import { Component } from '@angular/core';

@Component({
  // selector: 'app-pagina-exemplo',
  imports: [MatToolbarModule],
  // templateUrl: './pagina-exemplo.html',
  // styleUrl: './pagina-exemplo.scss',
})
export class PaginaExemplo {}
```

### 4.3. Usar o seletor no template

Exemplo:

```html
<!-- src/app/pages/pagina-exemplo.html -->

<mat-toolbar>Cabeçalho da aplicação</mat-toolbar>
```

### 4.4. (Opcional) Personalizar tema e estilos com Sass

Essa etapa só é necessária quando o tema padrão não atende à necessidade da aplicação.

Exemplo:

```scss
// src/styles.scss

@use '@angular/material' as mat;

:root {
  @include mat.toolbar-overrides(
    (
      container-background-color: orange,
      container-text-color: red,
    )
  );
}
```

Nesse caso, `:root` é apenas um seletor global de exemplo. A personalização pode ser aplicada de forma global ou em um seletor específico, dependendo da estratégia de tema adotada.

---

## 5. Exemplos comuns de componentes usados

Alguns dos componentes mais frequentes são:

- `MatButtonModule`
- `MatFormFieldModule`
- `MatInputModule`
- `MatSelectModule`
- `MatCardModule`
- `MatIconModule`
- `MatToolbarModule`
- `MatDialogModule`
- `MatTableModule`
- `MatCheckboxModule`
- `MatSlideToggleModule`

---

## 6. Quando pode não ser a melhor escolha

Angular Material pode não ser a melhor escolha quando:

- o projeto exige identidade visual muito distante do Material Design
- a interface será extremamente customizada
- a equipe prefere construir um design system próprio
- o objetivo é ter controle total de cada detalhe visual desde o início

---
