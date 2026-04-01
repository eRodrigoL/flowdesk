import { Routes } from '@angular/router';

export const routes: Routes = [
  // Painel Inicial
  {
    path: '',
    loadComponent: () =>
      import('@pages/painel/painel-inicial/painel-inicial').then((m) => m.PainelInicial),
    pathMatch: 'full',
  },

  // Listagem de Chamados
  {
    path: 'chamados',
    loadComponent: () =>
      import('@pages/chamados/listagem-chamados/listagem-chamados').then((m) => m.ListagemChamados),
  },

  // Criação de Chamados
  {
    path: 'chamados/novo',
    loadComponent: () =>
      import('@pages/chamados/criacao-chamado/criacao-chamado').then((m) => m.CriacaoChamado),
  },

  // Edição de Chamados
  {
    path: 'chamados/:id/editar',
    loadComponent: () =>
      import('@pages/chamados/edicao-chamado/edicao-chamado').then((m) => m.EdicaoChamado),
  },

  // Fallback
  {
    path: '**',
    redirectTo: '',
  },
];
