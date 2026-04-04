import { Component, inject, signal } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Categoria } from '@models/categoria';
import { Chamado } from '@models/chamado';
import { CategoriasService } from '@services/categorias.service';
import { ChamadosService } from '@services/chamados.service';
import { CardChamado } from '@tickets/components/card-chamado/card-chamado';
import { EstadoVazio } from '@components/estado-vazio/estado-vazio';

@Component({
  selector: 'app-listagem-chamados',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    EstadoVazio,
    CardChamado,
    EstadoVazio,
  ],
  templateUrl: './listagem-chamados.html',
  styleUrl: './listagem-chamados.scss',
})
export class ListagemChamados {
  private readonly chamadosService = inject(ChamadosService);
  private readonly categoriasService = inject(CategoriasService);

  readonly chamados = signal<Chamado[]>([]);
  readonly categorias = signal<Categoria[]>([]);

  constructor() {
    this.carregarChamados();
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriasService.listar().subscribe({
      next: (categorias) => this.categorias.set(categorias),
    });
  }

  carregarChamados(): void {
    this.chamadosService.listar().subscribe({
      next: (chamados) => {
        this.chamados.set(chamados);
      },
    });
  }
}
