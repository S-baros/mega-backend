const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' })
  }

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return res.status(401).json({ error: 'E-mail ou senha incorretos.' })
  }

  const senhaCorreta = await bcrypt.compare(password, user.password)
  if (!senhaCorreta) {
    return res.status(401).json({ error: 'E-mail ou senha incorretos.' })
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  })
}

async function register(req, res) {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' })
  }

  const existe = await prisma.user.findUnique({ where: { email } })
  if (existe) {
    return res.status(409).json({ error: 'E-mail já cadastrado.' })
  }

  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { name, email, password: hash },
  })

  return res.status(201).json({ id: user.id, name: user.name, email: user.email })
}

module.exports = { login, register }
