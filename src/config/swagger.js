// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mega Jr. — API de Gestão de Projetos',
      version: '1.0.0',
      description: 'Documentação da API REST do Sistema de Gestão de Projetos e Alocação de Membros da Mega Jr.',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'], // lê as anotações JSDoc das rotas
}

module.exports = swaggerJsdoc(options)
