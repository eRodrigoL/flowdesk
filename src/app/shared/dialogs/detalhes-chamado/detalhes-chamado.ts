import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { Categoria } from '@models/categoria';
import { Chamado } from '@models/chamado';
import { ConfirmacaoExclusao } from '@dialogs/confirmacao-exclusao/confirmacao-exclusao';
import { ChamadosService } from '@services/chamados.service';

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
  private readonly dialog = inject(MatDialog);

  readonly dados = inject<DadosDialogDetalhes>(MAT_DIALOG_DATA);
  readonly chamados = signal<Chamado[]>([]);

  editar(): void {
    this.dialogRef.close({ acao: 'editar', chamado: this.dados.chamado });
  }

  solicitarExclusao(): void {
    const dialogRefConfirmacao = this.dialog.open(ConfirmacaoExclusao, {
      width: '420px',
      data: {
        titulo: 'Excluir chamado',
        mensagem: `Deseja realemnte excluir o chamado "${this.dados.chamado.titulo}."?`,
      },
    });

    dialogRefConfirmacao.afterClosed().subscribe((confirmado) => {
      if (!confirmado) return;

      this.dialogRef.close({
        acao: 'excluir',
        chamado: this.dados.chamado,
      });
    });
  }

  readonly nomeCategoria =
    this.dados.categorias.find((item) => item.id === this.dados.chamado.categoriaId)?.nome ??
    'Sem categoria';

  fechar(): void {
    this.dialogRef.close();
  }
}
