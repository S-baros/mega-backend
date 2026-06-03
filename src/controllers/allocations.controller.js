// src/controllers/allocations.controller.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET /allocations
async function listar(req, res) {
  const allocations = await prisma.allocation.findMany({
    include: {
      member: { select: { id: true, name: true, role: true, email: true } },
      project: { select: { id: true, name: true, status: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
  return res.json(allocations)
}

// POST /allocations
async function criar(req, res) {
  const { memberId, projectId, role, workload } = req.body

  if (!memberId || !projectId || !role || workload === undefined) {
    return res.status(400).json({ error: 'memberId, projectId, role e workload são obrigatórios.' })
  }

  // Verifica se membro e projeto existem
  const member = await prisma.member.findUnique({ where: { id: Number(memberId) } })
  if (!member) return res.status(404).json({ error: 'Membro não encontrado.' })

  const project = await prisma.project.findUnique({ where: { id: Number(projectId) } })
  if (!project) return res.status(404).json({ error: 'Projeto não encontrado.' })

  // Verifica duplicata
  const jaAlocado = await prisma.allocation.findUnique({
    where: { memberId_projectId: { memberId: Number(memberId), projectId: Number(projectId) } },
  })
  if (jaAlocado) return res.status(409).json({ error: 'Membro já alocado neste projeto.' })

  const allocation = await prisma.allocation.create({
    data: {
      memberId: Number(memberId),
      projectId: Number(projectId),
      role,
      workload: Number(workload),
    },
    include: {
      member: { select: { id: true, name: true } },
      project: { select: { id: true, name: true } },
    },
  })
  return res.status(201).json(allocation)
}

// PUT /allocations/:id
async function atualizar(req, res) {
  const { id } = req.params
  const { role, workload } = req.body

  const existe = await prisma.allocation.findUnique({ where: { id: Number(id) } })
  if (!existe) return res.status(404).json({ error: 'Alocação não encontrada.' })

  const allocation = await prisma.allocation.update({
    where: { id: Number(id) },
    data: { role, workload: workload ? Number(workload) : undefined },
  })
  return res.json(allocation)
}

// DELETE /allocations/:id
async function deletar(req, res) {
  const { id } = req.params

  const existe = await prisma.allocation.findUnique({ where: { id: Number(id) } })
  if (!existe) return res.status(404).json({ error: 'Alocação não encontrada.' })

  await prisma.allocation.delete({ where: { id: Number(id) } })
  return res.status(204).send()
}

module.exports = { listar, criar, atualizar, deletar }
