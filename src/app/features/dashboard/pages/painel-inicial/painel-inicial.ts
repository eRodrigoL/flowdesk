import { Component, computed, inject, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { ChamadosService } from '@services/chamados.service';
import { Chamado } from '@models/chamado';

@Component({
  selector: 'app-painel-inicial',
  imports: [MatCardModule, MatGridListModule],
  templateUrl: './painel-inicial.html',
  styleUrl: './painel-inicial.scss',
})
export class PainelInicial {
  readonly chamadosServices = inject(ChamadosService);

  readonly chamados = signal<Chamado[]>([]);

  readonly total = computed(() => this.chamados().length);

  readonly abertos = computed(
    () => this.chamados().filter((item) => item.status === 'aberto').length,
  );

  readonly emAndamento = computed(
    () => this.chamados().filter((item) => item.status === 'em_progresso').length,
  );

  readonly resolvidos = computed(
    () => this.chamados().filter((item) => item.status === 'resolvido').length,
  );

  constructor() {
    this.carregar();
  }

  carregar(): void {
    this.chamadosServices.listar().subscribe({
      next: (chamados) => {
        this.chamados.set(chamados);
      },
    });
  }
}
