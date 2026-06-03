// src/app.js
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')

const authRoutes        = require('./routes/auth.routes')
const membersRoutes     = require('./routes/members.routes')
const projectsRoutes    = require('./routes/projects.routes')
const allocationsRoutes = require('./routes/allocations.routes')
const dashboardRoutes   = require('./routes/dashboard.routes')

const app = express()

// Permite requisições do frontend (CORS)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'], // portas do Vite
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())

// Documentação Swagger — acesse em http://localhost:3000/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Rotas
app.use('/auth',        authRoutes)
app.use('/members',     membersRoutes)
app.use('/projects',    projectsRoutes)
app.use('/allocations', allocationsRoutes)
app.use('/dashboard',   dashboardRoutes)

// Rota raiz de verificação
app.get('/', (req, res) => {
  res.json({ message: '🚀 Mega Jr. API está rodando!', docs: '/api-docs' })
})

// Handler de erros global
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Erro interno no servidor.' })
})

module.exports = app
