import { Component, computed, input, output } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Chamado } from '@models/chamado';
import { Categoria } from '@models/categoria';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-card-chamado',
  imports: [MatCardModule, MatChipsModule, MatAnchor, MatButtonModule, MatIconModule],
  templateUrl: './card-chamado.html',
  styleUrl: './card-chamado.scss',
})
export class CardChamado {
  readonly chamado = input.required<Chamado>();
  readonly categorias = input.required<Categoria[]>();

  readonly visualizar = output<void>();

  readonly nomeCategoria = computed(() => {
    const categoria = this.categorias().find((item) => item.id === this.chamado().categoriaId);
    return categoria?.nome ?? 'Sem categoria';
  });
}
