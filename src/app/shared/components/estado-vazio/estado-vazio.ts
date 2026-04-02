import { Component, input } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-estado-vazio',
  imports: [MatIconModule],
  templateUrl: './estado-vazio.html',
  styleUrl: './estado-vazio.scss',
})
export class EstadoVazio {
  readonly titulo = input('Nada encontrado');
  readonly descricao = input('Tente ajustar os filtros ou criar um novo registro.');
}
