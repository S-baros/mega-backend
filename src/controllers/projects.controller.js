// src/controllers/projects.controller.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// GET /projects
async function listar(req, res) {
  const { status } = req.query

  const projects = await prisma.project.findMany({
    where: status ? { status } : undefined,
    include: {
      allocations: {
        include: { member: { select: { id: true, name: true, role: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
  return res.json(projects)
}

// GET /projects/:id
async function buscarPorId(req, res) {
  const { id } = req.params
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
    include: {
      allocations: {
        include: { member: true },
      },
    },
  })
  if (!project) return res.status(404).json({ error: 'Projeto não encontrado.' })
  return res.json(project)
}

// POST /projects
async function criar(req, res) {
  const { name, description, status, startDate, endDate } = req.body

  if (!name || !description || !startDate) {
    return res.status(400).json({ error: 'Nome, descrição e data de início são obrigatórios.' })
  }

  const statusValidos = ['Planejamento', 'Ativo', 'Pausado', 'Concluído']
  if (status && !statusValidos.includes(status)) {
    return res.status(400).json({ error: `Status inválido. Use: ${statusValidos.join(', ')}` })
  }

  const project = await prisma.project.create({
    data: {
      name,
      description,
      status: status || 'Planejamento',
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
    },
  })
  return res.status(201).json(project)
}

// PUT /projects/:id
async function atualizar(req, res) {
  const { id } = req.params
  const { name, description, status, startDate, endDate } = req.body

  const existe = await prisma.project.findUnique({ where: { id: Number(id) } })
  if (!existe) return res.status(404).json({ error: 'Projeto não encontrado.' })

  const project = await prisma.project.update({
    where: { id: Number(id) },
    data: {
      name,
      description,
      status,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : null,
    },
  })
  return res.json(project)
}

// DELETE /projects/:id
async function deletar(req, res) {
  const { id } = req.params

  const existe = await prisma.project.findUnique({ where: { id: Number(id) } })
  if (!existe) return res.status(404).json({ error: 'Projeto não encontrado.' })

  await prisma.project.delete({ where: { id: Number(id) } })
  return res.status(204).send()
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar }
