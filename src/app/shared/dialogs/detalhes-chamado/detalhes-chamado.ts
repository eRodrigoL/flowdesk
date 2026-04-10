import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { Categoria } from '@models/categoria';
import { Chamado } from '@models/chamado';

interface DadosDialogDetalhes {
  chamado: Chamado;
  categorias: Categoria[];
}

@Component({
  selector: 'app-detalhes-chamado',
  imports: [MatDialogModule, MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './detalhes-chamado.html',
  styleUrl: './detalhes-chamado.scss',
})
export class DetalhesChamado {
  private readonly dialogRef = inject(MatDialogRef<DetalhesChamado>);

  readonly dados = inject<DadosDialogDetalhes>(MAT_DIALOG_DATA);

  editar(): void {
    this.dialogRef.close({ acao: 'editar', chamado: this.dados.chamado });
  }

  readonly nomeCategoria =
    this.dados.categorias.find((item) => item.id === this.dados.chamado.categoriaId)?.nome ??
    'Sem categoria';

  fechar(): void {
    this.dialogRef.close();
  }
}
