# JSON Server

## 1. O que é

JSON Server [🔍](https://www.npmjs.com/package/json-server) é uma ferramenta que cria uma API REST fake a partir de um arquivo JSON.

Na prática, isso permite simular um backend sem precisar desenvolver um servidor completo. Com isso, o frontend pode consumir rotas, enviar requisições HTTP e testar fluxos de CRUD de forma simples.

---

## 2. Motivo do uso

O JSON Server foi adotado para manter o foco principal no frontend, mas ainda assim permitir uma aplicação com fluxo completo de dados.

Essa escolha é útil quando o objetivo é praticar listagem, criação, edição, exclusão, busca e integração HTTP sem gastar tempo construindo um backend real. Para um projeto de portfólio frontend, isso ajuda a demonstrar a aplicação funcionando em um contexto mais próximo de um sistema real.

---

## 3. Vantagens

- criação muito rápida de uma API fake
- boa opção para praticar CRUD no frontend
- exige pouca configuração inicial
- ajuda a simular integração HTTP real
- reduz o tempo gasto com backend em projetos de estudo e portfólio

---

## 4. Desvantagens

- não substitui um backend real
- não representa regras de negócio complexas com fidelidade
- autenticação, autorização e validações avançadas não fazem parte do fluxo básico
- pode gerar uma falsa sensação de que a integração final será simples
- algumas opções antigas vistas em tutoriais já não estão disponíveis nas versões atuais

---

## 5. Instalação

Por ser um recurso de desenvolvimento, isto é, não usado no deploy do produto final, a instalação mais indicada é como dependência de desenvolvimento:

```bash
npm install -D json-server
```

---

## 6. Criação de uma API fake com JSON Server

### 6.1. Forma de uso simples

O uso mais simples parte de um arquivo JSON, normalmente chamado `db.json`.

Exemplo de estrutura:

```json
{
  "nome-da-colecao": [
    {
      "chave": "valor",
      "outraChave": "valor"
    }
  ]
}
```

Depois disso, basta subir o servidor com:

```bash
# ┌── npx ➡️ executa o pacote sem exigir instalação global prévia
# |    ┌── json-server ➡️ pacote responsável por criar a API fake
# |    |           ┌── db.json ➡️ arquivo que contém os dados que serão expostos como rotas
npx json-server db.json
```

> Se o arquivo contiver uma coleção, o servidor criará rotas compatíveis com esse recurso.

---

---

### 6.2. Forma de uso recomendada

Para evitar que os commits do banco sejam poluídos por alterações geradas durante o desenvolvimento, a abordagem mais segura é manter um arquivo base versionado e gerar o `db.json` localmente a partir dele.

A ideia é simples:

- versionar apenas um arquivo matriz
- gerar localmente o arquivo que será usado pelo JSON Server
- ignorar no Git o arquivo gerado

Essa abordagem ajuda a manter o repositório mais limpo e previsível.

#### 6.2.1. Instalar dependências

Instalar o JSON Server:

```bash
npm install -D json-server
```

Instalar o `concurrently` [🔍](./004-concurrently.md) para rodar frontend e backend juntos:

```bash
npm install -D concurrently
```

#### 6.2.2. Criar o arquivo matriz

Criar um arquivo base, por exemplo:

```text
mock/db.base.json
```

Exemplo vazio:

```json
{
  "nome-da-colecao": []
}
```

Exemplo com dados:

```json
{
  "nome-da-colecao": [
    {
      "chave": "valor"
    }
  ]
}
```

#### 6.2.3. Ignorar o arquivo gerado

Adicionar ao `.gitignore`:

```text
[...]

# fake-backend
mock/db.json
```

#### 6.2.4. Criar um script para gerar o banco local

Criar, por exemplo, o arquivo:

```text
scripts/preparar-db-json.mjs
```

Conteúdo:

```js
//            ┌── copyFileSync ➡️ função do Node usada para copiar arquivos de forma síncrona
//            │            ┌── existsSync ➡️ função do Node usada para verificar se um arquivo existe
import { copyFileSync, existsSync } from 'node:fs';

//      ┌── source ➡️ caminho do arquivo matriz/base
const source = 'mock/db.base.json';

//      ┌── target ➡️ caminho do arquivo que será criado ou sobrescrito
const target = 'mock/db.json';

/*
┌── if (...) ➡️ estrutura condicional
│  ┌── ! ➡️ negação lógica
│  │    ┌── existsSync(source) ➡️ verifica se o arquivo base existe
*/
if (!existsSync(source)) {
  //    ┌── console.error() ➡️ escreve mensagem de erro no terminal
  console.error(`Arquivo base não encontrado: ${source}`);

  // ┌── process.exit(1) ➡️ encerra o script com código de erro
  process.exit(1);
}

//    ┌── copyFileSync() ➡️ copia o conteúdo do arquivo base para o arquivo de destino
//    │        ┌── source ➡️ arquivo de origem
//    │        ┌── target ➡️ arquivo de destino
copyFileSync(source, target);

//    ┌── console.log() ➡️ escreve mensagem de sucesso no terminal
console.log(`Banco local recriado com sucesso: ${source} -> ${target}`);
```

#### 6.2.5. Adicionar scripts no package.json

Exemplo:

```json
{
  "scripts": {
    "start": "ng serve",
    "start:db": "node ./scripts/preparar-db-json.mjs",
    "preserver": "npm run start:db",
    "server": "json-server mock/db.json --port 3000",
    "dev": "concurrently \"npm:start\" \"npm:server\""
  }
}
```

#### 6.2.6. Rodar frontend e backend juntos

```bash
npm run dev
```

#### 6.2.7. Validar o endpoint

No navegador:

```text
http://localhost:3000/nome-da-colecao
```

No terminal:

```bash
curl http://localhost:3000/nome-da-colecao
```

---

---

## 7. Variações úteis do comando json-server

### 7.1. Definir porta

```bash
npx json-server db.json --port 3001
```

Permite alterar a porta padrão do servidor.

### 7.2. Definir host

```bash
npx json-server db.json --host 0.0.0.0
```

Permite alterar o host usado pelo servidor.

### 7.3. Servir arquivos estáticos

```bash
npx json-server db.json --static ./public
```

Permite servir arquivos estáticos junto com a API fake.

### 7.4. Servir mais de um diretório estático

```bash
npx json-server db.json --static ./public --static ./arquivos
```

Útil quando se deseja expor mais de uma pasta de arquivos estáticos.

---

## 8. Como o JSON Server ajuda no Angular

Em uma aplicação Angular, o JSON Server funciona como uma API fake para consumo via `HttpClient`.

Isso permite desenvolver fluxos como:

- buscar lista de registros
- buscar item por id
- criar novo registro
- editar registro existente
- excluir registro
- simular estados de carregamento, sucesso e erro no frontend

Com isso, o frontend pode ser construído com estrutura real de serviços, interfaces e páginas, mesmo sem backend definitivo.

---

## 9. Quando ele faz sentido

O JSON Server faz mais sentido quando o objetivo é:

- estudar integração HTTP
- praticar CRUD no frontend
- montar um projeto de portfólio
- prototipar rapidamente uma aplicação
- validar estrutura de telas e fluxo de dados antes de existir backend real

---

## 10. Quando ele deixa de ser suficiente

O JSON Server deixa de ser suficiente quando o projeto exige:

- autenticação real
- autorização por perfil
- regras de negócio complexas
- validações robustas no servidor
- persistência e segurança de produção
- comportamento muito próximo de um backend real

Nesses casos, ele continua útil como apoio inicial, mas não substitui uma API desenvolvida de fato.

---

## 11. O que ele cria na prática

O JSON Server não cria uma aplicação backend completa. Ele apenas expõe os dados do arquivo JSON como uma API fake.

Ou seja, a estrutura de dados continua simples, mas o frontend já consegue trabalhar com rotas e requisições HTTP como se estivesse integrado a um servidor.
