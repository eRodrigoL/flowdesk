import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { Categoria } from '@models/categoria';
import { PayloadChamado, PrioridadeChamado, StatusChamado } from '@models/chamado';

import { CategoriasService } from '@services/categorias.service';
import { ChamadosService } from '@services/chamados.service';
@Component({
  selector: 'app-criacao-chamado',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './criacao-chamado.html',
  styleUrl: './criacao-chamado.scss',
})
export class CriacaoChamado {
  private readonly chamadosService = inject(ChamadosService);
  private readonly categoriasService = inject(CategoriasService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  readonly categorias = signal<Categoria[]>([]);

  readonly formulario = new FormGroup({
    titulo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    descricao: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    categoriaId: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),

    prioridade: new FormControl<PrioridadeChamado>('media', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    status: new FormControl<StatusChamado>('aberto', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    solicitante: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),

    responsavelId: new FormControl<string | null>(null),

    prazo: new FormControl<Date | null>(null),

    tags: new FormControl('', { nonNullable: true }),

    custoEstimado: new FormControl<number | null>(null),
  });

  constructor() {
    this.carregarDadosAuxiliares();
  }

  carregarDadosAuxiliares(): void {
    this.categoriasService.listar().subscribe({
      next: (categorias) => this.categorias.set(categorias),
    });
  }

  salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.getRawValue();

    const payload: PayloadChamado = {
      titulo: valores.titulo,
      descricao: valores.descricao,
      categoriaId: obterValorOuLancar(valores.categoriaId),
      prioridade: valores.prioridade,
      status: valores.status,
      solicitante: obterValorOuLancar(valores.solicitante),
      dataAbertura: new Date().toISOString(),
      prazo: valores.prazo ? valores.prazo.toISOString() : null,
      tags: valores.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      custoEstimado: valores.custoEstimado ?? undefined,
    };

    this.chamadosService.criar(payload).subscribe({
      next: () => {
        this.snackBar.open('Chamado criado com sucesso.', 'Fechar');
        this.router.navigate(['/chamados']);
      },
    });
  }
}

function obterValorOuLancar<T>(valor: T | null): T {
  if (valor === null) {
    throw new Error('Valor obrigatório ausente no formulário.');
  }

  return valor;
}
