export type PrioridadeChamado = 'baixa' | 'media' | 'alta' | 'critica';

export type StatusChamado = 'aberto' | 'em_progresso' | 'resolvido' | 'fechado';

export interface Chamado {
  id: string;
  titulo: string;
  descricao: string;
  categoriaId: number;
  prioridade: PrioridadeChamado;
  status: StatusChamado;
  solicitanteId: number;
  responsavelId: number | null;
  dataAbertura: string;
  prazo: string | null;
  tags: string[];
  custoEstimado?: number;
}

export interface FiltrosChamados {
  busca: string;
  status: StatusChamado | 'all';
  prioridade: PrioridadeChamado | 'all';
  categoriaId: number | 'all';
}

export type PayloadChamado = Omit<Chamado, 'id'>;
