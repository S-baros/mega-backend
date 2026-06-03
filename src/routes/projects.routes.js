// src/routes/projects.routes.js
const { Router } = require('express')
const ctrl = require('../controllers/projects.controller')
const auth = require('../middlewares/auth.middleware')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Projetos
 *   description: CRUD de projetos
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Lista todos os projetos
 *     tags: [Projetos]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Planejamento, Ativo, Pausado, Concluído]
 *         description: Filtra por status
 *     responses:
 *       200:
 *         description: Lista de projetos com membros alocados
 */
router.get('/', auth, ctrl.listar)

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Busca um projeto pelo ID
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Projeto encontrado
 *       404:
 *         description: Projeto não encontrado
 */
router.get('/:id', auth, ctrl.buscarPorId)

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Cria um novo projeto
 *     tags: [Projetos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, startDate]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Website Institucional
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Planejamento, Ativo, Pausado, Concluído]
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-12-31"
 *     responses:
 *       201:
 *         description: Projeto criado
 */
router.post('/', auth, ctrl.criar)

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Atualiza um projeto
 *     tags: [Projetos]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Projeto atualizado
 *       404:
 *         description: Projeto não encontrado
 */
router.put('/:id', auth, ctrl.atualizar)

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Remove um projeto
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Projeto removido
 *       404:
 *         description: Projeto não encontrado
 */
router.delete('/:id', auth, ctrl.deletar)

module.exports = router
