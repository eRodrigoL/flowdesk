# services

No Angular, **services** são classes usadas para concentrar lógicas reutilizáveis da aplicação que não devem ficar dentro dos componentes.

Na prática, um service costuma ser usado para:

- acessar APIs
- centralizar regras de negócio simples
- compartilhar estado
- reutilizar lógica entre componentes
- isolar da interface aquilo que não é responsabilidade visual

Essa separação ajuda a manter os componentes mais organizados. Em geral:

- **componente** cuida da interface
- **service** cuida da lógica reutilizável e do acesso a dados

Services normalmente são criados com `@Injectable()` e usados por meio da injeção de dependência do Angular.

Exemplo simples:

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChamadosService {}
```

Nesse exemplo:

- `@Injectable(...)` marca a classe para o sistema de injeção de dependência
- `providedIn: 'root'` registra o service no injetor raiz da aplicação
- `ChamadosService` poderá ser reutilizado em qualquer parte da aplicação

---

## 1. Motivo do uso

Services são usados para evitar que componentes acumulem responsabilidades demais.

Sem services, seria comum colocar dentro do componente tarefas como:

- chamar API
- transformar dados
- montar filtros
- repetir regras em várias telas
- compartilhar valores com outras partes da aplicação

Isso tende a deixar o componente maior, mais difícil de manter e mais difícil de testar.

Com services, a organização costuma ficar mais clara:

- **componente** chama métodos
- **service** executa a lógica reutilizável

---

## 2. Onde eles aparecem com frequência

Em aplicações Angular, services aparecem com frequência em casos como:

- consumo de API com `HttpClient`
- integração com backend fake ou real
- compartilhamento de estado
- encapsulamento de regras de negócio
- reutilização de lógica entre páginas
- acesso a armazenamento local
- preparação de dados antes de exibir na tela

---

## 3. Exemplo com acesso HTTP

Um dos usos mais comuns de services é centralizar o acesso a dados.

Exemplo:

```ts
//          ┌── Injectable ➡️ decorator usado para permitir injeção de dependência
//          │           ┌── inject ➡️ função usada para obter dependências sem constructor
import { Injectable, inject } from '@angular/core';

//           ┌── HttpClient ➡️ serviço do Angular usado para fazer requisições HTTP
import { HttpClient } from '@angular/common/http';

//           ┌── Observable ➡️ tipo retornado pelas operações HTTP do Angular
import { Observable } from 'rxjs';

import { Chamado } from '@shared/interfaces/chamado';

@Injectable({
  //            ┌── providedIn: 'root' ➡️ registra o service no injetor raiz
  providedIn: 'root',
})
export class ChamadosService {
  //               ┌── http ➡️ referência local ao HttpClient
  //               │         ┌── inject(HttpClient) ➡️ obtém a dependência do HttpClient
  private readonly http = inject(HttpClient);

  //                 ┌── apiUrl ➡️ endereço base do recurso no backend
  private readonly apiUrl = 'http://localhost:3000/chamados';

  //  ┌── getAll() ➡️ método responsável por buscar todos os chamados
  //  |         ┌── Observable<Chamado[]> ➡️ retorna fluxo com lista de chamados
  getAll(): Observable<Chamado[]> {
    //                ┌── this.http.get<Chamado[]>(...) ➡️ faz requisição GET tipada
    return this.http.get<Chamado[]>(this.apiUrl);
  }
}
```

Nesse exemplo:

- o componente não precisa saber como a requisição é feita
- o endereço da API fica centralizado
- o retorno já vem tipado
- o acesso ao backend fica isolado em um único ponto

---

## 4. Exemplo de GET com filtros

Além do GET simples, também é comum o service precisar buscar dados com filtros.

No Angular, isso pode ser feito com `HttpParams`.

Exemplo:

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Chamado } from '@shared/interfaces/chamado';

@Injectable({
  providedIn: 'root',
})
export class ChamadosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/chamados';

  getAll(busca?: string, status?: string): Observable<Chamado[]> {
    let params = new HttpParams();

    if (busca) {
      params = params.set('q', busca);
    }

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<Chamado[]>(this.apiUrl, { params });
  }
}
```

```ts
//                       ┌── HttpParams ➡️ classe usada para montar query params da requisição
import { HttpClient, HttpParams } from '@angular/common/http';

[...]

getAll(busca?: string, status?: string): Observable<Chamado[]> {
  //                 ┌── new HttpParams() ➡️ cria objeto vazio de parâmetros da URL
  let params = new HttpParams();


  //   ┌── if (busca) ➡️ só adiciona o filtro se busca tiver valor
  //   │                     ┌── params.set('q', busca) ➡️ adiciona ?q=valor na URL
  if (busca) { params = params.set('q', busca); }


  //   ┌── if (status) ➡️ só adiciona o filtro se status tiver valor
  //   │                    ┌── params.set('status', status) ➡️ adiciona ?status=valor na URL
  if (status) { params = params.set('status', status); }

  //                                               ┌── { params } ➡️ envia os query params junto da requisição
  return this.http.get<Chamado[]>(this.apiUrl, { params });
}
```

Se o usuário informar:

- `busca = 'email'`
- `status = 'aberto'`

a URL gerada ficará equivalente a:

```text
http://localhost:3000/chamados?q=email&status=aberto
```

Nesse exemplo:

- `q` é útil no JSON Server para busca textual
- `status` é um filtro direto por campo
- os filtros só são enviados se tiverem valor

Essa abordagem é melhor do que montar a URL manualmente com concatenação de string.

---

## 5. Exemplo de uso no componente

Depois de criar o service, ele pode ser consumido no componente.

Exemplo:

```ts
import { Component, inject, signal } from '@angular/core';

import { ChamadosService } from '@core/services/chamados.service';
import { Chamado } from '@shared/interfaces/chamado';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.html',
  styleUrl: './listagem.scss',
})
export class Listagem {
  private readonly chamadosService = inject(ChamadosService);

  chamados = signal<Chamado[]>([]);
  carregando = signal(true);
  erro = signal('');

  ngOnInit(): void {
    this.chamadosService.getAll().subscribe({
      next: (dados) => {
        this.chamados.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Erro ao carregar chamados.');
        this.carregando.set(false);
      },
    });
  }
}
```

Nesse exemplo:

- o componente usa o service em vez de chamar `HttpClient` diretamente
- o componente continua responsável pelo estado da tela
- o acesso aos dados permanece centralizado no service

---

## 6. Leitura prática da divisão de responsabilidades

De forma objetiva:

### 6.1. O componente

O componente costuma cuidar de:

- interação com o template
- eventos da tela
- estado visual
- carregamento, erro e vazio
- chamada de métodos do service

### 6.2. O service

O service costuma cuidar de:

- acesso HTTP
- transformação de dados reutilizável
- regras compartilhadas
- centralização de endpoints
- comunicação entre partes da aplicação

---

## 7. Forma comum de geração

Services podem ser criados manualmente, mas também podem ser gerados pela CLI.

Exemplo:

```bash
npx ng generate service core/services/chamados
```

Forma curta:

```bash
npx ng g s core/services/chamados
```

Isso normalmente gera um arquivo como:

```text
src/app/core/services/chamados.service.ts
```

Dependendo do comando e das opções usadas, também pode gerar o arquivo de teste correspondente.

---

## 8. Estrutura comum no projeto

Uma organização frequente é manter services em uma pasta como:

```text
src/
└── app/
    └── core/
        └── services/
            ├── chamados.service.ts
            ├── usuarios.service.ts
            └── dashboard.service.ts
```

Essa organização ajuda a deixar explícito que esses arquivos concentram serviços reutilizáveis da aplicação.

---

## 9. Exemplo de CRUD em service

Um service de CRUD costuma reunir operações como listar, buscar por id, criar, editar e excluir.

Exemplo:

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Chamado } from '@shared/interfaces/chamado';

@Injectable({
  providedIn: 'root',
})
export class ChamadosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/chamados';

  getAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.apiUrl);
  }

  getById(id: number): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.apiUrl}/${id}`);
  }

  create(chamado: Omit<Chamado, 'id'>): Observable<Chamado> {
    return this.http.post<Chamado>(this.apiUrl, chamado);
  }

  update(id: number, chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${this.apiUrl}/${id}`, chamado);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

Nesse exemplo:

- `getAll()` busca todos os registros
- `getById(id)` busca um item específico
- `create(...)` envia um novo registro
- `update(...)` atualiza um registro existente
- `remove(id)` exclui um registro

---

## 10. Vantagens

- melhora a separação de responsabilidades
- reduz repetição de lógica
- facilita manutenção
- facilita testes
- melhora reutilização
- deixa os componentes mais limpos
- centraliza integração com API

---

## 11. Cuidados importantes

O ganho existe quando o service tem uma responsabilidade clara.

Alguns cuidados importantes:

- não misturar responsabilidades muito diferentes no mesmo service
- não transformar o service em depósito de lógica
- manter nomes claros
- centralizar apenas o que realmente faz sentido reutilizar

---

## 12. Relação com HttpClient

Quando o service usa HTTP, ele normalmente depende do `HttpClient`.

Para isso, a aplicação precisa ter o provider do cliente HTTP configurado.

Exemplo no `app.config.ts`:

```ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig = {
  providers: [provideHttpClient()],
};
```

Sem isso, o Angular não consegue injetar `HttpClient` no service.

---

## 13. Leitura prática do fluxo

Em um fluxo comum com Angular + JSON Server, a sequência costuma ser:

1. o usuário interage com a tela
2. o componente chama um método do service
3. o service faz a requisição HTTP
4. o backend responde
5. o componente recebe os dados
6. a interface é atualizada

Ou seja, o service funciona como uma camada intermediária entre a tela e a fonte de dados.

---
