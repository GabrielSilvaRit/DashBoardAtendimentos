import { NextResponse } from "next/server"
import * as XLSX from "xlsx"
import * as fs from "fs"

const EXCEL_FILE_PATH = "C:\\Temp\\DashBoardTest1.xlsx"

export async function GET() {
  try {
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      throw new Error(`Arquivo não encontrado: ${EXCEL_FILE_PATH}`)
    }

    const fileBuffer = fs.readFileSync(EXCEL_FILE_PATH)

    let workbook: XLSX.WorkBook
    try {
      workbook = XLSX.read(fileBuffer, {
        type: "buffer",
        cellDates: true,
        cellNF: false,
        cellText: false,
      })
    } catch (xlsxError: any) {
      throw new Error(`Arquivo não é um Excel válido: ${xlsxError.message}`)
    }

    const atendentesSheet = workbook.Sheets["Atendentes"]
    if (!atendentesSheet) {
      throw new Error("Aba 'Atendentes' é obrigatória")
    }

    const atendentesRaw = XLSX.utils.sheet_to_json(atendentesSheet, { defval: "" })
    const atendentes = atendentesRaw.map((item: any, index) => ({
      id: index + 1,
      nome: String(item.nome || item.Nome || `Atendente ${index + 1}`),
      atendimentos: Number.parseInt(String(item.atendimentos || item.Atendimentos || "0")) || 0,
      tempoMedio: String(item.tempoMedio || item["Tempo Medio"] || item["Tempo_Medio"] || "0m 0s"),
      satisfacao: Number.parseFloat(String(item.satisfacao || item.Satisfacao || "0")) || 0,
      status: String(item.status || item.Status || "online").toLowerCase(),
      eficiencia: Number.parseInt(String(item.eficiencia || item.Eficiencia || "0")) || 0,
    }))

    const estatisticasSheet = workbook.Sheets["Estatisticas"]
    let estatisticas = {
      totalAtendimentos: 0,
      chamadosFinalizados: 0,
      chamadosEmAtendimento: 0,
      taxaResolucao: 0,
      filaEspera: 0,
      tempoMedioEspera: "0m 0s",
    }

    if (estatisticasSheet) {
      const estatisticasRaw = XLSX.utils.sheet_to_json(estatisticasSheet, { defval: "" })
      if (estatisticasRaw.length > 0) {
        const estatisticasData = estatisticasRaw[0] as any
        estatisticas = {
          totalAtendimentos: Number.parseInt(String(estatisticasData.totalAtendimentos || "0")) || 0,
          chamadosFinalizados: Number.parseInt(String(estatisticasData.chamadosFinalizados || "0")) || 0,
          chamadosEmAtendimento: Number.parseInt(String(estatisticasData.chamadosEmAtendimento || "0")) || 0,
          taxaResolucao: Number.parseFloat(String(estatisticasData.taxaResolucao || "0")) || 0,
          filaEspera: Number.parseInt(String(estatisticasData.filaEspera || "0")) || 0,
          tempoMedioEspera: String(estatisticasData.tempoMedioEspera || "0m 0s"),
        }
      }
    }

    const graficoSheet = workbook.Sheets["Grafico"]
    const dadosGrafico = graficoSheet
      ? XLSX.utils.sheet_to_json(graficoSheet, { defval: "" }).map((item: any) => ({
          hora: String(item.hora || item.Hora || ""),
          atendimentos: Number.parseInt(String(item.atendimentos || item.Atendimentos || "0")) || 0,
        }))
      : []

    const clientesSheet = workbook.Sheets["Clientes"]
    const clientes = clientesSheet
      ? XLSX.utils.sheet_to_json(clientesSheet, { defval: "" }).map((item: any) => ({
          cliente: String(item.cliente || item.Cliente || ""),
          atendimentos: Number.parseInt(String(item.atendimentos || item.Atendimentos || "0")) || 0,
          porcentagem: Number.parseInt(String(item.porcentagem || item.Porcentagem || "0")) || 0,
        }))
      : []

    return NextResponse.json({
      success: true,
      data: {
        atendentes,
        estatisticas,
        dadosGraficoHora: dadosGrafico,
        dadosClientes: clientes,
      },
      lastUpdate: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao processar planilha Excel",
        message: error.message,
        path: EXCEL_FILE_PATH,
      },
      { status: 500 },
    )
  }
}
