import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductTax:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: Id del producto asociado a este impuesto
 *         rate:
 *           type: number
 *           description: Tasa del impuesto entre 0.00000 y 1.000000
 *         taxId:
 *           type: string
 *           description: Impuesto. Catálogo del SAT c_Impuesto
 *         tax:
 *           $ref: '#/components/schemas/CatalogDto'
 *         taxFlagId:
 *           type: string
 *           description: Naturaleza del impuesto. "T" Traslado o "R" Retención
 *         taxFlag:
 *           $ref: '#/components/schemas/CatalogDto'
 *         taxTypeId:
 *           type: string
 *           description: Tipo de impuesto "Tasa" | "Cuota" | "Exento"
 *         taxType:
 *           $ref: '#/components/schemas/CatalogDto'
 *       required:
 *         - rate
 *         - taxId
 *         - taxFlagId
 *         - taxTypeId
 *
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador único del producto
 *         description:
 *           type: string
 *           description: Descripción o nombre del producto
 *         unitPrice:
 *           type: number
 *           description: Precio unitario del producto sin impuestos
 *         satUnitMeasurementId:
 *           type: string
 *           description: Código de la unidad de medida. Catálogo del SAT c_ClaveUnidad
 *         satUnitMeasurement:
 *           $ref: '#/components/schemas/CatalogDto'
 *         satTaxObjectId:
 *           type: string
 *           description: Código que identifica las obligaciones fiscales del producto
 *         satTaxObject:
 *           $ref: '#/components/schemas/CatalogDto'
 *         satProductCodeId:
 *           type: string
 *           description: Código del producto o servicio. Catálogo del SAT c_ClaveProdServ
 *         satProductCode:
 *           $ref: '#/components/schemas/CatalogDto'
 *         productTaxes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductTax'
 *           description: Impuestos aplicables al producto
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API para gestionar productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.put('/:id', updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       400:
 *         description: Error al eliminar
 */
router.delete('/:id', deleteProduct);

export default router;