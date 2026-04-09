import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

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
import { DetalhesChamado } from '@dialogs/detalhes-chamado/detalhes-chamado';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listagem-chamados',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    CardChamado,
    EstadoVazio,
  ],
  templateUrl: './listagem-chamados.html',
  styleUrl: './listagem-chamados.scss',
})
export class ListagemChamados {
  private readonly chamadosService = inject(ChamadosService);
  private readonly categoriasService = inject(CategoriasService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  readonly chamados = signal<Chamado[]>([]);
  readonly categorias = signal<Categoria[]>([]);

  readonly totalItens = computed(() => this.chamados().length);

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

  abrirDetalhes(chamado: Chamado): void {
    this.dialog.open(DetalhesChamado, {
      width: '700px',
      data: {
        chamado,
        categorias: this.categorias(),
      },
    });
  }

  editarChamado(chamado: Chamado): void {
    this.router.navigate(['/chamados', chamado.id, 'editar']);
  }
}
