import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cabecalho-aplicacao',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './cabecalho-aplicacao.html',
  styleUrl: './cabecalho-aplicacao.scss',
})
export class CabecalhoAplicacao {}
