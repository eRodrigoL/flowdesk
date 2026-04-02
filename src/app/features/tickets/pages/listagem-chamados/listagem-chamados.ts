import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

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
  ],
  templateUrl: './listagem-chamados.html',
  styleUrl: './listagem-chamados.scss',
})
export class ListagemChamados {}
