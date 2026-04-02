import { Routes } from '@angular/router';

export const routes: Routes = [
  // Painel Inicial
  {
    path: '',
    loadComponent: () =>
      import('@dashboard/pages/painel-inicial/painel-inicial').then((m) => m.PainelInicial),
    pathMatch: 'full',
  },

  // Listagem de Chamados
  {
    path: 'chamados',
    loadComponent: () =>
      import('@pages-t/listagem-chamados/listagem-chamados').then((m) => m.ListagemChamados),
  },

  // Criação de Chamados
  {
    path: 'chamados/novo',
    loadComponent: () =>
      import('@pages-t/criacao-chamado/criacao-chamado').then((m) => m.CriacaoChamado),
  },

  // Edição de Chamados
  {
    path: 'chamados/:id/editar',
    loadComponent: () =>
      import('@pages-t/edicao-chamado/edicao-chamado').then((m) => m.EdicaoChamado),
  },

  // Fallback
  {
    path: '**',
    redirectTo: '',
  },
];
