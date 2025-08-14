export interface Atendente {
  id: number
  nome: string
  atendimentos: number
  tempoMedio: string
  satisfacao: number
  status: string
  eficiencia: number
  vendas: number
  meta: number
}

export interface Estatisticas {
  totalAtendimentos: number
  chamadosFinalizados: number
  chamadosEmAtendimento: number
  atendimentosHoje: number
  filaEspera: number
  tempoMedioEspera: string
  taxaResolucao: number
  vendas: number
  metaVendas: number
  ticketsAbertos: number
  ticketsFechados: number
  chamadosPendentes: number
  totalChamados: number
}

export interface DadosGraficoHora {
  hora: string
  atendimentos: number
}

export interface Cliente {
  cliente: string
  atendimentos: number
  porcentagem: number
  cor: string
}

export interface Alerta {
  tipo: "warning" | "success" | "error"
  mensagem: string
  tempo: string
}

export interface DashboardData {
  atendentes: Atendente[]
  estatisticas: Estatisticas
  dadosGraficoHora: DadosGraficoHora[]
  dadosClientes: Cliente[]
  alertas: Alerta[]
}
