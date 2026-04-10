import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Categoria } from '@models/categoria';
import { ChamadosService } from '@services/chamados.service';
import { CategoriasService } from '@services/categorias.service';
import { PayloadChamado, PrioridadeChamado, StatusChamado } from '@models/chamado';

@Component({
  selector: 'app-edicao-chamado',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './edicao-chamado.html',
  styleUrl: './edicao-chamado.scss',
})
export class EdicaoChamado {
  private readonly chamadosService = inject(ChamadosService);
  private readonly categoriasService = inject(CategoriasService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

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
    prazo: new FormControl<Date | null>(null),
    tags: new FormControl('', { nonNullable: true }),
    custoEstimado: new FormControl<number | null>(null),
  });

  readonly idChamado = this.route.snapshot.paramMap.get('id') ?? '';

  constructor() {
    this.carregarDadosAuxiliares();
    this.carregarChamado();
  }

  carregarDadosAuxiliares(): void {
    this.categoriasService.listar().subscribe({
      next: (categorias) => this.categorias.set(categorias),
    });
  }

  carregarChamado(): void {
    this.chamadosService.buscarPorId(this.idChamado).subscribe({
      next: (chamado) => {
        this.formulario.patchValue({
          titulo: chamado.titulo,
          descricao: chamado.descricao,
          categoriaId: chamado.categoriaId,
          prioridade: chamado.prioridade,
          status: chamado.status,
          solicitante: chamado.solicitante,
          prazo: chamado.prazo ? new Date(chamado.prazo) : null,
          tags: chamado.tags.join(', '),
          custoEstimado: chamado.custoEstimado ?? null,
        });
      },
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

    this.chamadosService.atualizar(this.idChamado, payload).subscribe({
      next: () => {
        this.snackBar.open('Chamado atualizado com sucesso.', 'Fechar');
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
