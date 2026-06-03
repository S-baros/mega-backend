// src/routes/allocations.routes.js
const { Router } = require('express')
const ctrl = require('../controllers/allocations.controller')
const auth = require('../middlewares/auth.middleware')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Alocações
 *   description: Vinculação de membros a projetos
 */

/**
 * @swagger
 * /allocations:
 *   get:
 *     summary: Lista todas as alocações
 *     tags: [Alocações]
 *     responses:
 *       200:
 *         description: Lista de alocações com membro e projeto
 */
router.get('/', auth, ctrl.listar)

/**
 * @swagger
 * /allocations:
 *   post:
 *     summary: Aloca um membro a um projeto
 *     tags: [Alocações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [memberId, projectId, role, workload]
 *             properties:
 *               memberId:
 *                 type: integer
 *                 example: 1
 *               projectId:
 *                 type: integer
 *                 example: 2
 *               role:
 *                 type: string
 *                 example: Dev Back-end
 *               workload:
 *                 type: integer
 *                 example: 20
 *                 description: Horas por semana
 *     responses:
 *       201:
 *         description: Alocação criada
 *       409:
 *         description: Membro já alocado neste projeto
 */
router.post('/', auth, ctrl.criar)

/**
 * @swagger
 * /allocations/{id}:
 *   put:
 *     summary: Atualiza uma alocação
 *     tags: [Alocações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               workload:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Alocação atualizada
 *       404:
 *         description: Alocação não encontrada
 */
router.put('/:id', auth, ctrl.atualizar)

/**
 * @swagger
 * /allocations/{id}:
 *   delete:
 *     summary: Remove uma alocação
 *     tags: [Alocações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Alocação removida
 *       404:
 *         description: Alocação não encontrada
 */
router.delete('/:id', auth, ctrl.deletar)

module.exports = router
