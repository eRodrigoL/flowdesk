import { Component, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface DadosConfirmacaoExclusao {
  titulo: string;
  mensagem: string;
}

@Component({
  selector: 'app-confirmacao-exclusao',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmacao-exclusao.html',
  styleUrl: './confirmacao-exclusao.scss',
})
export class ConfirmacaoExclusao {
  private readonly dialogRef = inject(MatDialogRef<ConfirmacaoExclusao>);
  readonly dados = inject<DadosConfirmacaoExclusao>(MAT_DIALOG_DATA);

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
