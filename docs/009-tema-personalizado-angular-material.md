# Angular Material — geração de tema (theme-color)

O comando:

```bash
npx ng generate @angular/material:theme-color
```

gera um arquivo de tema baseado no **Material 3 (M3)** usando cores fornecidas pelo usuário.

Esse processo cria **paletas de cores + variáveis de tema**, que serão usadas na aplicação.

---

## 1. O que esse comando faz

- gera um arquivo de tema (SCSS ou CSS)
- cria paletas de cores baseadas nos HEX informados
- configura tokens do Material 3 (cores, superfícies, estados)
- permite personalizar o visual da aplicação Angular Material

---

## 2. Fluxo das perguntas (CLI)

Durante a execução, o CLI solicita cores para montar o tema.

---

### 2.1 Primary color

```bash
What HEX color should be used to generate the M3 theme? It will represent your primary color palette.
```

- **Resposta:** cor hexgonal, ex. #000000
- **Serve para:** cor principal da aplicação
- **Afeta:** botões, destaques, ações principais
- **Depende de:** identidade visual da aplicação

---

### 2.2 Secondary color

```bash
What HEX color should be used represent the secondary color palette? (Leave blank to use generated colors from Material)
```

- **Resposta:** cor hexgonal, ex. #808080
- **Serve para:** cor de apoio
- **Afeta:** elementos menos prioritários
- **Se vazio:** Angular gera automaticamente

---

### 2.3 Tertiary color

```bash
What HEX color should be used represent the tertiary color palette? (Leave blank to use generated colors from Material)
```

- **Resposta:** cor hexgonal, ex. #F5F5F5
- **Serve para:** variação adicional de cor
- **Uso comum:** diferenciação visual (cards, destaques)
- **Se vazio:** gerado automaticamente

---

### 2.4 Neutral color

```bash
What HEX color should be used represent the neutral color palette? (Leave blank to use generated colors from Material)
```

- **Resposta:** cor hexgonal, ex. #F8F9FA
- **Serve para:** base de fundo (background)
- **Afeta:** superfícies gerais
- **Exemplo:** fundo da aplicação

---

### 2.5 Neutral variant

```bash
What HEX color should be used represent the neutral variant palette? (Leave blank to use generated colors from Material)
```

- **Resposta:** cor hexgonal, ex. #D1D1D1
- **Serve para:** variações de neutro
- **Afeta:** bordas, divisores, estados sutis

---

### 2.6 Error color

```bash
What HEX color should be used represent the error palette? (Leave blank to use generated colors from Material)
```

- **Resposta:** cor hexgonal, ex. #B00020
- **Serve para:** estados de erro
- **Afeta:** validações, alerts, mensagens críticas
- **Se vazio:** Angular gera padrão

---

### 2.7 High contrast

```bash
theme when a user specifies helps increase the accesibility of your application.
```

- **Resposta:** `no` ou `yes`
- **Serve para:** acessibilidade (alto contraste)
- **Depende de:** necessidade de acessibilidade
- **Se "Yes":** gera mixins adicionais

---

### 2.8 Diretório do arquivo

```bash
What is the directory you want to place the generated theme file in? (Enter the relative path such as 'src/app/styles/'
or leave blank to generate at your project root)
```

- **Resposta:** local do arquivo gerado, ex. `src/`
- **Serve para:** definir onde o tema será criado
- **Depende de:** organização do projeto
- **Boa prática:** usar `src/styles/` ou `src/theme/`

---

### 2.9 Tipo do arquivo

```bash
Do you want the generated file to be a scss file? This is the recommended way of setting up theming in your application.
If not, a CSS file will be generated with all the system variables defined. (Leave blank to generate a scss file)
```

- **Resposta:** `no` ou `yes`
- **Serve para:** definir formato do tema
- **Opções:**
  - `yes` = SCSS → recomendado (flexível)
  - `no` = CSS → apenas variáveis prontas

- **Preferir:** SCSS

---

## 3. Estrutura gerada (SCSS)

Após o comando, um arquivo semelhante a este é criado:

```scss
@use '@angular/material' as mat;

$theme: mat.define-theme(
  (
    color: (
      primary: mat.define-palette(...),
      secondary: mat.define-palette(...),
    ),
  )
);
```

---

## 4. Uso do tema

### Importar no styles global

```scss
@use './theme' as theme;
```

---

### Aplicar o tema

```scss
@include mat.all-component-themes(theme.$theme);
```

Exemplo de uso:

```scss
// styles.scss
@use './theme-colors' as theme;
@use '@angular/material' as mat;

html {
  height: 100%;
  @include mat.theme(
    (
      color: (
        primary: theme.$primary-palette,
        tertiary: theme.$tertiary-palette,
      ),
      typography: Roboto,
      density: 0,
    )
  );
}

body {
  color-scheme: light;

  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  font: var(--mat-sys-body-medium);

  margin: 0;
  height: 100%;
}
```

---

## 5. Dependências reais do uso

Para o tema funcionar corretamente, depende de:

- Angular Material instalado
- arquivo de tema gerado
- import no `styles.scss`
- aplicação do mixin (`all-component-themes`)
- componentes Material na aplicação

Sem isso:

- o tema não é aplicado visualmente

---

## 6. Relação com Material 3

Esse generator usa **Material Design 3 (M3)**:

- cores são derivadas automaticamente
- gera tons (light/dark, surface, container)
- usa sistema de design baseado em tokens

---

## 7. Observação prática

- você não precisa definir todas as cores
- o Angular consegue gerar variações automaticamente
- normalmente basta definir:
  - primary
  - (opcional) secondary

---
