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

app.use(cors(({
  origin: ['http://localhost:5173', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})))

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/auth',        authRoutes)
app.use('/members',     membersRoutes)
app.use('/projects',    projectsRoutes)
app.use('/allocations', allocationsRoutes)
app.use('/dashboard',   dashboardRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API mega-projeto rodando!', docs: '/api-docs' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Erro interno no servidor.' })
})

module.exports = app
