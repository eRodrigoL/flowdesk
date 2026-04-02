import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-painel-inicial',
  imports: [MatCardModule, MatGridListModule],
  templateUrl: './painel-inicial.html',
  styleUrl: './painel-inicial.scss',
})
export class PainelInicial {}
