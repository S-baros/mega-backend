// src/routes/members.routes.js
const { Router } = require('express')
const ctrl = require('../controllers/members.controller')
const auth = require('../middlewares/auth.middleware')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Membros
 *   description: CRUD de membros da Mega Jr.
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Lista todos os membros
 *     tags: [Membros]
 *     responses:
 *       200:
 *         description: Lista de membros com suas alocações
 */
router.get('/', auth, ctrl.listar)

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Busca um membro pelo ID
 *     tags: [Membros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Membro encontrado
 *       404:
 *         description: Membro não encontrado
 */
router.get('/:id', auth, ctrl.buscarPorId)

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Cadastra um novo membro
 *     tags: [Membros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, role]
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@soumega.com
 *               role:
 *                 type: string
 *                 example: Desenvolvedor
 *     responses:
 *       201:
 *         description: Membro criado
 *       409:
 *         description: E-mail já cadastrado
 */
router.post('/', auth, ctrl.criar)

/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Atualiza um membro
 *     tags: [Membros]
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
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Membro atualizado
 *       404:
 *         description: Membro não encontrado
 */
router.put('/:id', auth, ctrl.atualizar)

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Remove um membro
 *     tags: [Membros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Membro removido
 *       404:
 *         description: Membro não encontrado
 */
router.delete('/:id', auth, ctrl.deletar)

module.exports = router
