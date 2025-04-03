import { Router } from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *         - priority
 *       properties:
 *         id:
 *           type: string
 *           description: ID único autogenerado del todo
 *         title:
 *           type: string
 *           description: El título del todo
 *         priority:
 *           type: number
 *           description: La prioridad del todo (más alto = más importante)
 *       example:
 *         id: d5fE_asz
 *         title: Completar proyecto de Express
 *         priority: 5
 */

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API para gestionar tareas (todos)
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Obtener todos los todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Lista de todos los todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/', getAllTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Obtener un todo por ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del todo
 *     responses:
 *       200:
 *         description: Todo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo no encontrado
 */
router.get('/:id', getTodoById);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Crear un nuevo todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - priority
 *             properties:
 *               title:
 *                 type: string
 *               priority:
 *                 type: number
 *     responses:
 *       201:
 *         description: Todo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Actualizar un todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - priority
 *             properties:
 *               title:
 *                 type: string
 *               priority:
 *                 type: number
 *     responses:
 *       200:
 *         description: Todo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo no encontrado
 *       400:
 *         description: Datos inválidos
 */
router.put('/:id', updateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Eliminar un todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del todo
 *     responses:
 *       204:
 *         description: Todo eliminado exitosamente
 *       404:
 *         description: Todo no encontrado
 */
router.delete('/:id', deleteTodo);

export default router;