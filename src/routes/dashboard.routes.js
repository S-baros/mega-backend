// src/routes/dashboard.routes.js
const { Router } = require('express')
const { getDashboard } = require('../controllers/dashboard.controller')
const auth = require('../middlewares/auth.middleware')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Painel gerencial consolidado
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Retorna dados consolidados para o painel gerencial
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dados do dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resumo:
 *                   type: object
 *                   properties:
 *                     totalMembros:
 *                       type: integer
 *                     totalProjetos:
 *                       type: integer
 *                     projetosPorStatus:
 *                       type: object
 *                 membrosMaisAlocados:
 *                   type: array
 *                 projetosComPrazoProximo:
 *                   type: array
 */
router.get('/', auth, getDashboard)

module.exports = router
