const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function listar(req, res) {
  const members = await prisma.member.findMany({
    include: {
      allocations: {
        include: { project: { select: { id: true, name: true, status: true } } },
      },
    },
    orderBy: { name: 'asc' },
  })
  return res.json(members)
}

async function buscarPorId(req, res) {
  const { id } = req.params
  const member = await prisma.member.findUnique({
    where: { id: Number(id) },
    include: { allocations: { include: { project: true } } },
  })
  if (!member) return res.status(404).json({ error: 'Membro não encontrado.' })
  return res.json(member)
}

async function criar(req, res) {
  const { name, email, role } = req.body
  if (!name || !email || !role) {
    return res.status(400).json({ error: 'Nome, e-mail e cargo são obrigatórios.' })
  }

  const existe = await prisma.member.findUnique({ where: { email } })
  if (existe) return res.status(409).json({ error: 'E-mail já cadastrado.' })

  const member = await prisma.member.create({ data: { name, email, role } })
  return res.status(201).json(member)
}

async function atualizar(req, res) {
  const { id } = req.params
  const { name, email, role } = req.body

  const existe = await prisma.member.findUnique({ where: { id: Number(id) } })
  if (!existe) return res.status(404).json({ error: 'Membro não encontrado.' })

  const member = await prisma.member.update({
    where: { id: Number(id) },
    data: { name, email, role },
  })
  return res.json(member)
}

async function deletar(req, res) {
  const { id } = req.params

  const existe = await prisma.member.findUnique({ where: { id: Number(id) } })
  if (!existe) return res.status(404).json({ error: 'Membro não encontrado.' })

  await prisma.member.delete({ where: { id: Number(id) } })
  return res.status(204).send()
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar }
