import { Router } from 'express';
import {
  getInvoiceList,
  getInvoiceById,
  createInvoiceIva16,
  createInvoiceIvaExento,
  createInvoiceIvaTasaCero,
  createInvoiceByReferences,
  createCreditNoteByValues,
  createCreditNoteByReferences,
  createPaymentComplementByValues,
  createPaymentComplementByReferences,
  createPaymentUsdMxn,
  createPaymentMxnUsd,
  createPaymentEurUsd,
  cancelInvoiceByValues,
  cancelInvoiceById,
  getInvoiceStatusByValues,
  getInvoiceStatusById,
  generatePdfByValues,
  generatePdfById,
  getXmlById,
  sendInvoiceByValues,
  sendInvoiceById,
  createFacturaGlobalPorValores,
  createFacturaGlobalPorReferencias
} from '../controllers/invoiceController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     InvoiceTax:
 *       type: object
 *       properties:
 *         taxCode:
 *           type: string
 *           description: Código del impuesto. Catálogo del SAT c_Impuesto
 *         taxTypeCode:
 *           type: string
 *           description: Tipo de factor. Catálogo del SAT c_TipoFactor
 *         taxRate:
 *           type: string
 *           description: Tasa o cuota del impuesto
 *         taxFlagCode:
 *           type: string
 *           description: Naturaleza del impuesto (T=Traslado, R=Retención)
 *       required:
 *         - taxCode
 *         - taxTypeCode
 *         - taxFlagCode
 *
 *     InvoiceItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del producto o servicio (opcional si se usan referencias)
 *         itemCode:
 *           type: string
 *           description: Código del producto o servicio. Catálogo del SAT c_ClaveProdServ
 *         quantity:
 *           type: number
 *           description: Cantidad del producto o servicio
 *         unitOfMeasurementCode:
 *           type: string
 *           description: Código de la unidad de medida. Catálogo del SAT c_ClaveUnidad
 *         description:
 *           type: string
 *           description: Descripción del producto o servicio
 *         unitPrice:
 *           type: number
 *           description: Precio unitario del producto o servicio sin impuestos
 *         taxObjectCode:
 *           type: string
 *           description: Código de obligaciones de impuesto aplicables al producto
 *         itemSku:
 *           type: string
 *           description: SKU o clave del sistema externo
 *         discount:
 *           type: number
 *           description: Cantidad monetaria del descuento
 *         itemTaxes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/InvoiceTax'
 *           description: Impuestos aplicables al producto
 *
 *     RelatedInvoice:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *           description: UUID de la factura relacionada
 *         relationshipTypeCode:
 *           type: string
 *           description: Código del tipo de relación. Catálogo del SAT c_TipoRelacion
 *       required:
 *         - uuid
 *         - relationshipTypeCode
 *
 *     Issuer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del emisor (opcional si se usan referencias)
 *         tin:
 *           type: string
 *           description: RFC del emisor
 *         legalName:
 *           type: string
 *           description: Razón social del emisor
 *         taxRegimeCode:
 *           type: string
 *           description: Código del régimen fiscal. Catálogo del SAT c_RegimenFiscal
 *         taxCredentials:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               base64File:
 *                 type: string
 *               fileType:
 *                 type: number
 *               password:
 *                 type: string
 *
 *     Recipient:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del receptor (opcional si se usan referencias)
 *         tin:
 *           type: string
 *           description: RFC del receptor
 *         legalName:
 *           type: string
 *           description: Razón social del receptor
 *         zipCode:
 *           type: string
 *           description: Código postal del receptor
 *         taxRegimeCode:
 *           type: string
 *           description: Código del régimen fiscal del receptor
 *         cfdiUseCode:
 *           type: string
 *           description: Código del uso CFDI. Catálogo del SAT c_UsoCFDI
 *         email:
 *           type: string
 *           description: Correo electrónico del receptor
 *
 *     PaidInvoice:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *           description: UUID de la factura que se está pagando
 *         series:
 *           type: string
 *           description: Serie de la factura
 *         number:
 *           type: string
 *           description: Número de la factura
 *         currencyCode:
 *           type: string
 *           description: Código de la moneda
 *         equivalence:
 *           type: number
 *           description: Tipo de cambio cuando es necesario
 *         partialityNumber:
 *           type: number
 *           description: Número de parcialidad
 *         previousBalance:
 *           type: number
 *           description: Saldo anterior
 *         paymentAmount:
 *           type: number
 *           description: Cantidad pagada
 *         remainingBalance:
 *           type: number
 *           description: Saldo restante
 *         taxObjectCode:
 *           type: string
 *           description: Código de objeto de impuesto
 *         paidInvoiceTaxes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/InvoiceTax'
 *
 *     Payment:
 *       type: object
 *       properties:
 *         paymentDate:
 *           type: string
 *           description: Fecha y hora del pago
 *         paymentFormCode:
 *           type: string
 *           description: Código de la forma de pago
 *         currencyCode:
 *           type: string
 *           description: Código de la moneda
 *         exchangeRate:
 *           type: number
 *           description: Tipo de cambio
 *         amount:
 *           type: number
 *           description: Monto del pago
 *         sourceBankTin:
 *           type: string
 *           description: RFC del banco emisor
 *         sourceBankAccount:
 *           type: string
 *           description: Cuenta del banco emisor
 *         targetBankTin:
 *           type: string
 *           description: RFC del banco receptor
 *         targetBankAccount:
 *           type: string
 *           description: Cuenta del banco receptor
 *         paidInvoices:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PaidInvoice'
 *
 *     Invoice:
 *       type: object
 *       properties:
 *         versionCode:
 *           type: string
 *           description: Versión del CFDI
 *         series:
 *           type: string
 *           description: Serie de la factura
 *         date:
 *           type: string
 *           description: Fecha y hora de emisión
 *         paymentFormCode:
 *           type: string
 *           description: Código de la forma de pago
 *         paymentMethodCode:
 *           type: string
 *           description: Código del método de pago
 *         currencyCode:
 *           type: string
 *           description: Código de la moneda
 *         typeCode:
 *           type: string
 *           description: Tipo de comprobante
 *         expeditionZipCode:
 *           type: string
 *           description: Código postal de expedición
 *         exchangeRate:
 *           type: number
 *           description: Tipo de cambio
 *         exportCode:
 *           type: string
 *           description: Código de exportación
 *         issuer:
 *           $ref: '#/components/schemas/Issuer'
 *         recipient:
 *           $ref: '#/components/schemas/Recipient'
 *         relatedInvoices:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RelatedInvoice'
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/InvoiceItem'
 *         payments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Payment'
 */

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: API para gestionar facturas
 */

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Obtener todas las facturas
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Lista de facturas
 *       500:
 *         description: Error al listar facturas
 */
router.get('/', getInvoiceList);

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Obtener una factura por ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura encontrada
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error al obtener factura
 */
router.get('/:id', getInvoiceById);

/**
 * @swagger
 * /api/invoices/create/iva-16:
 *   post:
 *     summary: Crear factura con IVA 16%
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Factura creada exitosamente
 *       500:
 *         description: Error al crear factura
 */
router.post('/create/iva-16', createInvoiceIva16);

/**
 * @swagger
 * /api/invoices/create/iva-exento:
 *   post:
 *     summary: Crear factura con IVA exento
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Factura creada exitosamente
 *       500:
 *         description: Error al crear factura
 */
router.post('/create/iva-exento', createInvoiceIvaExento);

/**
 * @swagger
 * /api/invoices/create/iva-tasa-cero:
 *   post:
 *     summary: Crear factura con IVA tasa cero
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Factura creada exitosamente
 *       500:
 *         description: Error al crear factura
 */
router.post('/create/iva-tasa-cero', createInvoiceIvaTasaCero);

/**
 * @swagger
 * /api/invoices/create/by-references:
 *   post:
 *     summary: Crear factura por referencias
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Factura creada exitosamente
 *       500:
 *         description: Error al crear factura
 */
router.post('/create/by-references', createInvoiceByReferences);

/**
 * @swagger
 * /api/invoices/create/credit-note/by-values:
 *   post:
 *     summary: Crear nota de crédito por valores
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Nota de crédito creada exitosamente
 *       500:
 *         description: Error al crear nota de crédito
 */
router.post('/create/credit-note/by-values', createCreditNoteByValues);

/**
 * @swagger
 * /api/invoices/create/credit-note/by-references:
 *   post:
 *     summary: Crear nota de crédito por referencias
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Nota de crédito creada exitosamente
 *       500:
 *         description: Error al crear nota de crédito
 */
router.post('/create/credit-note/by-references', createCreditNoteByReferences);

/**
 * @swagger
 * /api/invoices/create/payment-complement/by-values:
 *   post:
 *     summary: Crear complemento de pago por valores
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Complemento de pago creado exitosamente
 *       500:
 *         description: Error al crear complemento de pago
 */
router.post('/create/payment-complement/by-values', createPaymentComplementByValues);

/**
 * @swagger
 * /api/invoices/create/payment-complement/by-references:
 *   post:
 *     summary: Crear complemento de pago por referencias
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Complemento de pago creado exitosamente
 *       500:
 *         description: Error al crear complemento de pago
 */
router.post('/create/payment-complement/by-references', createPaymentComplementByReferences);

/**
 * @swagger
 * /api/invoices/create/payment-usd-mxn:
 *   post:
 *     summary: Crear complemento de pago en USD para facturas en MXN
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Complemento de pago creado exitosamente
 *       500:
 *         description: Error al crear complemento de pago
 */
router.post('/create/payment-usd-mxn', createPaymentUsdMxn);

/**
 * @swagger
 * /api/invoices/create/payment-mxn-usd:
 *   post:
 *     summary: Crear complemento de pago en MXN para facturas en USD
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Complemento de pago creado exitosamente
 *       500:
 *         description: Error al crear complemento de pago
 */
router.post('/create/payment-mxn-usd', createPaymentMxnUsd);

/**
 * @swagger
 * /api/invoices/create/payment-eur-usd:
 *   post:
 *     summary: Crear complemento de pago en EUR para facturas en USD
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Complemento de pago creado exitosamente
 *       500:
 *         description: Error al crear complemento de pago
 */
router.post('/create/payment-eur-usd', createPaymentEurUsd);

/**
 * @swagger
 * /api/invoices/cancel/by-values:
 *   post:
 *     summary: Cancelar factura por valores
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Factura cancelada exitosamente
 *       500:
 *         description: Error al cancelar factura
 */
router.post('/cancel/by-values', cancelInvoiceByValues);

/**
 * @swagger
 * /api/invoices/cancel/{id}:
 *   post:
 *     summary: Cancelar factura por ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura cancelada exitosamente
 *       500:
 *         description: Error al cancelar factura
 */
router.post('/cancel/:id', cancelInvoiceById);

/**
 * @swagger
 * /api/invoices/status/by-values:
 *   get:
 *     summary: Obtener estado de factura por valores
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Estado de factura obtenido exitosamente
 *       500:
 *         description: Error al obtener estado de factura
 */
router.get('/status/by-values', getInvoiceStatusByValues);

/**
 * @swagger
 * /api/invoices/status/{id}:
 *   get:
 *     summary: Obtener estado de factura por ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Estado de factura obtenido exitosamente
 *       500:
 *         description: Error al obtener estado de factura
 */
router.get('/status/:id', getInvoiceStatusById);

/**
 * @swagger
 * /api/invoices/pdf/by-values:
 *   get:
 *     summary: Generar PDF de factura por valores
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: PDF generado exitosamente
 *       500:
 *         description: Error al generar PDF
 */
router.get('/pdf/by-values', generatePdfByValues);

/**
 * @swagger
 * /api/invoices/pdf/{id}:
 *   get:
 *     summary: Generar PDF de factura por ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: PDF generado exitosamente
 *       500:
 *         description: Error al generar PDF
 */
router.get('/pdf/:id', generatePdfById);

/**
 * @swagger
 * /api/invoices/xml/{id}:
 *   get:
 *     summary: Descargar XML de factura por ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: XML descargado exitosamente
 *       500:
 *         description: Error al descargar XML
 */
router.get('/xml/:id', getXmlById);

/**
 * @swagger
 * /api/invoices/send/by-values:
 *   post:
 *     summary: Enviar factura por correo usando valores
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Factura enviada exitosamente
 *       500:
 *         description: Error al enviar factura por correo
 */
router.post('/send/by-values', sendInvoiceByValues);

/**
 * @swagger
 * /api/invoices/send/{id}:
 *   post:
 *     summary: Enviar factura por correo por ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email al que se enviará la factura
 *     responses:
 *       200:
 *         description: Factura enviada exitosamente
 *       500:
 *         description: Error al enviar factura por correo
 */
router.post('/send/:id', sendInvoiceById);



/**
 * @swagger
 * /api/invoices/factura-global-por-valores:
 *   post:
 *     summary: Crear factura global por valores
 *     tags: [Invoices]
 *     description: Crea una factura global con todos los datos del emisor y receptor
 *     responses:
 *       200:
 *         description: Factura global creada exitosamente
 *       500:
 *         description: Error al crear factura global por valores
 */
router.post('/factura-global-por-valores', createFacturaGlobalPorValores);

/**
 * @swagger
 * /api/invoices/factura-global-por-referencias:
 *   post:
 *     summary: Crear factura global por referencias
 *     tags: [Invoices]
 *     description: Crea una factura global usando IDs de emisor y receptor
 *     responses:
 *       200:
 *         description: Factura global creada exitosamente
 *       500:
 *         description: Error al crear factura global por referencias
 */
router.post('/factura-global-por-referencias', createFacturaGlobalPorReferencias);



export default router;