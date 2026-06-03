// src/routes/auth.routes.js
const { Router } = require('express')
const { login, register } = require('../controllers/auth.controller')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Login e cadastro de usuários
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Faz login e retorna um token JWT
 *     tags: [Autenticação]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@soumega.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', login)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Autenticação]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 *       409:
 *         description: E-mail já cadastrado
 */
router.post('/register', register)

module.exports = router
