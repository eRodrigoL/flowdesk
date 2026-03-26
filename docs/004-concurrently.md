# concurrently

## 1. O que é

concurrently [🔍](https://www.npmjs.com/package/concurrently) é uma ferramenta que permite executar vários comandos ao mesmo tempo no terminal.

Na prática, isso é importante quando o projeto precisa iniciar mais de um processo em paralelo, como o frontend e o backend fake.

---

## 2. Motivo do uso

O concurrently foi adotado para simplificar o fluxo de desenvolvimento.

Sem ele, seria necessário abrir mais de um terminal para subir cada parte do projeto separadamente. Com ele, é possível iniciar tudo com um único comando, o que deixa o uso mais prático e mais organizado.

---

## 3. Vantagens

- permite subir vários processos com um único comando
- reduz a necessidade de múltiplos terminais abertos
- melhora a organização do fluxo de desenvolvimento
- facilita a leitura dos logs quando cada processo recebe identificação
- combina bem com scripts do `package.json`

---

## 4. Desvantagens

- adiciona mais uma dependência ao projeto
- pode deixar o terminal mais poluído quando há muitos logs ao mesmo tempo
- exige atenção para entender qual processo gerou cada saída
- em fluxos muito simples, pode ser desnecessário

---

## 5. Instalação

Por ser um recurso de desenvolvimento, isto é, não usado no deploy do produto final, a instalação mais indicada é como dependência de desenvolvimento:

```bash
npm install -D concurrently
```

---

## 6. Forma de uso simples

O uso mais simples é passar dois ou mais comandos para serem executados em paralelo.

Exemplo:

```bash
# ┌── npx ➡️ executa o pacote sem exigir instalação global prévia
# |      ┌── concurrently ➡️ pacote responsável por executar múltiplos comandos ao mesmo tempo
# |      |           ┌── "ng serve" ➡️ primeiro comando executado em paralelo
# |      |           |          ┌── "json-server mock/db.json --port 3000" ➡️ segundo comando executado em paralelo
npx concurrently "ng serve" "json-server mock/db.json --port 3000"
```

---

## 7. Forma de uso recomendada no projeto

Em vez de escrever comandos longos diretamente toda vez, o uso mais indicado é colocar os processos em scripts do `package.json` e deixar o `concurrently` apenas como orquestrador.

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

> **NOTA:** No npm, é possível definir scripts auxiliares com os prefixos `pre` e `post`. Assim, nesse exemplo, ao executar `npm run server`, o npm roda `preserver` antes de `server`. Se também existisse `postserver`, ele seria executado depois de `server`.

Depois disso, basta executar:

```bash
npm run dev
```

Essa abordagem é melhor porque separa responsabilidades:

- `start` sobe o frontend
- `server` sobe o backend fake
- `dev` sobe ambos juntos

---

## 8. Variações úteis do comando concurrently

A documentação atual do pacote mostra várias opções úteis para controle de saída, nomes, reinício e encerramento dos processos.

### 8.1. Nomear os processos

```bash
npx concurrently --names "front,server" "ng serve" "json-server mock/db.json --port 3000"
```

Permite definir nomes para identificar cada processo no log.

### 8.2. Definir cores dos prefixos

```bash
npx concurrently --names "front,server" --prefix-colors "blue,magenta" "ng serve" "json-server mock/db.json --port 3000"
```

Ajuda a distinguir visualmente a saída de cada processo.

### 8.3. Encerrar os demais processos se um falhar

```bash
npx concurrently --kill-others "ng serve" "json-server mock/db.json --port 3000"
```

Útil quando faz sentido interromper tudo se um dos processos parar com erro.

### 8.4. Definir condição de sucesso

```bash
npx concurrently --success first "ng serve" "json-server mock/db.json --port 3000"
```

Controla como o comando geral será considerado bem-sucedido.

### 8.5. Reiniciar processos automaticamente

```bash
npx concurrently --restart-tries 3 "ng serve" "json-server mock/db.json --port 3000"
```

Permite tentar reiniciar um processo em caso de falha.

---

## 9. Quando ele faz sentido

O concurrently faz mais sentido quando o projeto precisa executar dois ou mais processos em paralelo durante o desenvolvimento, como por exemplo:

- frontend + backend fake
- frontend + backend real local
- aplicação + watcher
- aplicação + servidor de arquivos
- múltiplos serviços auxiliares

---

## 10. Quando ele pode ser desnecessário

O concurrently pode ser desnecessário quando:

- o projeto depende de apenas um processo
- o ambiente é extremamente simples
- a equipe prefere outra forma de orquestração

---

## 11. O que ele faz na prática

O concurrently não substitui nenhum dos processos que ele executa.

Ele apenas inicia vários comandos ao mesmo tempo e centraliza a saída deles no mesmo terminal.

Ou seja, ele não cria frontend, não cria backend e não altera a lógica da aplicação. Sua função é apenas facilitar a execução simultânea dos comandos necessários ao desenvolvimento.

---
