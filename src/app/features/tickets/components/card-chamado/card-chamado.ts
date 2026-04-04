import { Component, computed, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { Chamado } from '@models/chamado';
import { Categoria } from '@models/categoria';

@Component({
  selector: 'app-card-chamado',
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './card-chamado.html',
  styleUrl: './card-chamado.scss',
})
export class CardChamado {
  readonly chamado = input.required<Chamado>();
  readonly categorias = input.required<Categoria[]>();

  readonly nomeCategoria = computed(() => {
    const categoria = this.categorias().find((item) => item.id === this.chamado().categoriaId);
    return categoria?.nome ?? 'Sem categoria';
  });
}
