export type PrioridadeChamado = 'baixa' | 'media' | 'alta' | 'critica';

export type StatusChamado = 'aberto' | 'em_progresso' | 'resolvido' | 'fechado';

export interface Chamado {
  id: string;
  titulo: string;
  descricao: string;
  categoriaId: string;
  prioridade: PrioridadeChamado;
  status: StatusChamado;
  solicitante: string;
  dataAbertura: string;
  prazo: string | null;
  tags: string[];
  custoEstimado?: number;
}

export interface FiltrosChamados {
  busca: string;
  status: StatusChamado | 'todos';
  prioridade: PrioridadeChamado | 'todos';
  categoriaId: string | 'todos';
}

export type PayloadChamado = Omit<Chamado, 'id'>;
