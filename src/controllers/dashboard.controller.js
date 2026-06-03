const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getDashboard(req, res) {
  const [
    totalMembros,
    totalProjetos,
    projetosPorStatus,
    membrosMaisAlocados,
    projetosComPrazo,
  ] = await Promise.all([
    prisma.member.count(),
    prisma.project.count(),
    prisma.project.groupBy({
      by: ['status'],
      _count: { status: true },
    }),
    prisma.member.findMany({
      take: 5,
      include: {
        allocations: { include: { project: { select: { name: true, status: true } } } },
      },
      orderBy: { allocations: { _count: 'desc' } },
    }),
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

  const statusMap = {}
  projetosPorStatus.forEach(({ status, _count }) => {
    statusMap[status] = _count.status
  })

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
