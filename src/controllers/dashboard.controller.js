// src/controllers/dashboard.controller.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET /dashboard
async function getDashboard(req, res) {
  const [
    totalMembros,
    totalProjetos,
    projetosPorStatus,
    membrosMaisAlocados,
    projetosComPrazo,
  ] = await Promise.all([

    // Total de membros
    prisma.member.count(),

    // Total de projetos
    prisma.project.count(),

    // Projetos agrupados por status
    prisma.project.groupBy({
      by: ['status'],
      _count: { status: true },
    }),

    // Top 5 membros com mais alocações
    prisma.member.findMany({
      take: 5,
      include: {
        allocations: { include: { project: { select: { name: true, status: true } } } },
      },
      orderBy: { allocations: { _count: 'desc' } },
    }),

    // Projetos ativos com prazo nos próximos 30 dias
    prisma.project.findMany({
      where: {
        status: 'Ativo',
        endDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      },
      include: {
        allocations: { include: { member: { select: { name: true } } } },
      },
      orderBy: { endDate: 'asc' },
    }),
  ])

  // Formata projetos por status para facilitar no front
  const statusMap = {}
  projetosPorStatus.forEach(({ status, _count }) => {
    statusMap[status] = _count.status
  })

  // Soma carga horária total por membro
  const membrosCargaTotal = membrosMaisAlocados.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    totalProjetos: m.allocations.length,
    cargaTotal: m.allocations.reduce((acc, a) => acc + a.workload, 0),
    projetos: m.allocations.map((a) => ({ nome: a.project.name, status: a.project.status })),
  }))

  return res.json({
    resumo: {
      totalMembros,
      totalProjetos,
      projetosPorStatus: statusMap,
    },
    membrosMaisAlocados: membrosCargaTotal,
    projetosComPrazoProximo: projetosComPrazo,
  })
}

module.exports = { getDashboard }
