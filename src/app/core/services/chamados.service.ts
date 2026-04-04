import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Chamado, FiltrosChamados, PayloadChamado } from '@models/chamado';

@Injectable({
  providedIn: 'root',
})
export class ChamadosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/chamados';

  // Método   create / post
  criar(payload: PayloadChamado): Observable<Chamado> {
    return this.http.post<Chamado>(this.apiUrl, payload);
  }

  // Métodos   Read / GET
  listar(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.apiUrl);
  }

  listarFiltrados(filtros: FiltrosChamados): Observable<Chamado[]> {
    return this.listar().pipe(
      map((chamados) =>
        chamados.filter((chamado) => {
          const termo = filtros.busca.trim().toLowerCase();

          const correspondeBusca =
            !termo ||
            chamado.titulo.toLowerCase().includes(termo) ||
            chamado.descricao.toLowerCase().includes(termo) ||
            chamado.tags.some((tag) => tag.toLowerCase().includes(termo));

          const correspondeStatus = filtros.status === 'todos' || chamado.status === filtros.status;

          const correspondePrioridade =
            filtros.prioridade === 'todos' || chamado.prioridade === filtros.prioridade;

          const correspondeCategoria =
            filtros.categoriaId === 'todos' || chamado.categoriaId === filtros.categoriaId;

          return (
            correspondeBusca && correspondeStatus && correspondePrioridade && correspondeCategoria
          );
        }),
      ),
    );
  }

  buscarPorId(id: string): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.apiUrl}/${id}`);
  }

  // Método   Update / PUT
  atualizar(id: string, payload: PayloadChamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${this.apiUrl}/${id}`, payload);
  }

  // Método   Delete / DELETE
  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
