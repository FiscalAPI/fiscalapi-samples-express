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
  createPayrollComplementByValues,
  createLocalTaxesComplementByValues,
  createPayrollByReferences,
  createLocalTaxesInvoiceByReference,
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
  createFacturaGlobalPorReferencias,
  createLadingComplement,
  createLadingComplementByReference
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
 *     LocalTax:
 *       type: object
 *       properties:
 *         taxName:
 *           type: string
 *           description: Nombre del impuesto local
 *         taxRate:
 *           type: number
 *           description: Tasa del impuesto local (2 decimales)
 *         taxAmount:
 *           type: number
 *           description: Monto del impuesto local (2 decimales)
 *         taxFlagCode:
 *           type: string
 *           description: Naturaleza del impuesto (T=Traslado, R=Retenido)
 *
 *     LocalTaxesComplement:
 *       type: object
 *       properties:
 *         taxes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/LocalTax'
 *           description: Lista de impuestos locales
 *
 *     PaymentPaidInvoiceTax:
 *       type: object
 *       properties:
 *         taxCode:
 *           type: string
 *           description: Código del impuesto. Catálogo SAT c_Impuesto
 *         taxTypeCode:
 *           type: string
 *           description: Tipo de factor. Catálogo SAT c_TipoFactor
 *         taxRate:
 *           type: number
 *           description: Tasa del impuesto. Catálogo SAT c_TasaOCuota
 *         taxFlagCode:
 *           type: string
 *           description: Naturaleza del impuesto (T=Traslado, R=Retenido)
 *       required:
 *         - taxCode
 *         - taxTypeCode
 *         - taxRate
 *         - taxFlagCode
 *
 *     PaymentPaidInvoice:
 *       type: object
 *       properties:
 *         uuid:
 *           type: string
 *           description: UUID de la factura pagada
 *         series:
 *           type: string
 *           description: Serie de la factura pagada
 *         number:
 *           type: string
 *           description: Folio de la factura pagada
 *         paymentAmount:
 *           type: number
 *           description: Monto pagado en la factura
 *         currencyCode:
 *           type: string
 *           description: Código de la moneda utilizada en la factura pagada
 *         partialityNumber:
 *           type: number
 *           description: Número de parcialidad
 *         subTotal:
 *           type: number
 *           description: Subtotal de la factura pagada
 *         previousBalance:
 *           type: number
 *           description: Saldo anterior de la factura pagada
 *         remainingBalance:
 *           type: number
 *           description: Saldo restante de la factura pagada
 *         taxObjectCode:
 *           type: string
 *           description: Código de obligaciones de impuesto aplicables
 *         equivalence:
 *           type: number
 *           description: Equivalencia de la moneda
 *         paidInvoiceTaxes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PaymentPaidInvoiceTax'
 *       required:
 *         - uuid
 *         - series
 *         - number
 *         - paymentAmount
 *         - currencyCode
 *         - partialityNumber
 *         - subTotal
 *         - previousBalance
 *         - remainingBalance
 *         - taxObjectCode
 *
 *     PaymentComplement:
 *       type: object
 *       properties:
 *         paymentDate:
 *           type: string
 *           description: Fecha de pago (AAAA-MM-DDThh:mm:ss)
 *         paymentFormCode:
 *           type: string
 *           description: Código de la forma de pago. Catálogo SAT c_FormaPago
 *         currencyCode:
 *           type: string
 *           description: Código de la moneda utilizada en el pago. Default MXN
 *         exchangeRate:
 *           type: number
 *           description: Tipo de cambio
 *         amount:
 *           type: number
 *           description: Monto del pago
 *         operationNumber:
 *           type: string
 *           description: Número de operación asignado por el banco
 *         sourceBankTin:
 *           type: string
 *           description: RFC del banco origen
 *         sourceBankAccount:
 *           type: string
 *           description: Cuenta bancaria origen
 *         targetBankTin:
 *           type: string
 *           description: RFC del banco destino
 *         targetBankAccount:
 *           type: string
 *           description: Cuenta bancaria destino
 *         paidInvoices:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PaymentPaidInvoice'
 *       required:
 *         - paymentDate
 *         - paymentFormCode
 *         - currencyCode
 *         - amount
 *         - paidInvoices
 *
 *     PayrollOvertime:
 *       type: object
 *       properties:
 *         days:
 *           type: number
 *           description: Número de días con horas extra
 *         hoursTypeCode:
 *           type: string
 *           description: Código del tipo de horas (01=Dobles, 02=Triples)
 *         extraHours:
 *           type: number
 *           description: Número de horas extra trabajadas
 *         amountPaid:
 *           type: number
 *           description: Monto pagado por las horas extra
 *       required:
 *         - days
 *         - hoursTypeCode
 *         - extraHours
 *         - amountPaid
 *
 *     PayrollStockOptions:
 *       type: object
 *       properties:
 *         marketPrice:
 *           type: number
 *           description: Precio de mercado de la acción
 *         grantPrice:
 *           type: number
 *           description: Precio de ejercicio de la acción
 *       required:
 *         - marketPrice
 *         - grantPrice
 *
 *     PayrollEarning:
 *       type: object
 *       properties:
 *         earningTypeCode:
 *           type: string
 *           description: Código del tipo de percepción. Catálogo SAT c_TipoPercepcion
 *         code:
 *           type: string
 *           description: Clave de control interno de la percepción
 *         concept:
 *           type: string
 *           description: Concepto de la percepción
 *         taxedAmount:
 *           type: number
 *           description: Monto gravado de la percepción
 *         exemptAmount:
 *           type: number
 *           description: Monto exento de la percepción
 *         overtime:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PayrollOvertime'
 *         stockOptions:
 *           $ref: '#/components/schemas/PayrollStockOptions'
 *       required:
 *         - earningTypeCode
 *         - code
 *         - concept
 *         - taxedAmount
 *         - exemptAmount
 *
 *     PayrollBalanceCompensation:
 *       type: object
 *       properties:
 *         favorableBalance:
 *           type: number
 *           description: Saldo a favor
 *         year:
 *           type: number
 *           description: Año del saldo a favor
 *         remainingFavorableBalance:
 *           type: number
 *           description: Saldo a favor remanente
 *       required:
 *         - favorableBalance
 *         - year
 *         - remainingFavorableBalance
 *
 *     PayrollOtherPayment:
 *       type: object
 *       properties:
 *         otherPaymentTypeCode:
 *           type: string
 *           description: Código del tipo de otro pago. Catálogo SAT c_TipoOtroPago
 *         code:
 *           type: string
 *           description: Clave de control interno del otro pago
 *         concept:
 *           type: string
 *           description: Concepto del otro pago
 *         amount:
 *           type: number
 *           description: Monto del otro pago
 *         subsidyCaused:
 *           type: number
 *           description: Subsidio causado (para tipo 002)
 *         balanceCompensation:
 *           $ref: '#/components/schemas/PayrollBalanceCompensation'
 *       required:
 *         - otherPaymentTypeCode
 *         - code
 *         - concept
 *         - amount
 *
 *     PayrollRetirement:
 *       type: object
 *       properties:
 *         totalOneTime:
 *           type: number
 *           description: Total de pago único
 *         totalInstallments:
 *           type: number
 *           description: Total de parcialidades
 *         dailyAmount:
 *           type: number
 *           description: Monto diario
 *         accumulableIncome:
 *           type: number
 *           description: Ingreso acumulable
 *         nonAccumulableIncome:
 *           type: number
 *           description: Ingreso no acumulable
 *
 *     PayrollSeverance:
 *       type: object
 *       properties:
 *         totalPaid:
 *           type: number
 *           description: Total pagado
 *         yearsOfService:
 *           type: number
 *           description: Años de servicio
 *         lastMonthlySalary:
 *           type: number
 *           description: Último sueldo mensual ordinario
 *         accumulableIncome:
 *           type: number
 *           description: Ingreso acumulable
 *         nonAccumulableIncome:
 *           type: number
 *           description: Ingreso no acumulable
 *       required:
 *         - totalPaid
 *         - yearsOfService
 *         - lastMonthlySalary
 *         - accumulableIncome
 *         - nonAccumulableIncome
 *
 *     PayrollEarnings:
 *       type: object
 *       properties:
 *         earnings:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PayrollEarning'
 *         otherPayments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PayrollOtherPayment'
 *         retirement:
 *           $ref: '#/components/schemas/PayrollRetirement'
 *         severance:
 *           $ref: '#/components/schemas/PayrollSeverance'
 *
 *     PayrollDeduction:
 *       type: object
 *       properties:
 *         deductionTypeCode:
 *           type: string
 *           description: Código del tipo de deducción. Catálogo SAT c_TipoDeduccion
 *         code:
 *           type: string
 *           description: Clave de control interno de la deducción
 *         concept:
 *           type: string
 *           description: Concepto de la deducción
 *         amount:
 *           type: number
 *           description: Monto de la deducción
 *       required:
 *         - deductionTypeCode
 *         - code
 *         - concept
 *         - amount
 *
 *     PayrollDisability:
 *       type: object
 *       properties:
 *         disabilityDays:
 *           type: number
 *           description: Número de días de incapacidad
 *         disabilityTypeCode:
 *           type: string
 *           description: Código del tipo de incapacidad. Catálogo SAT c_TipoIncapacidad
 *         monetaryAmount:
 *           type: number
 *           description: Monto monetario de la incapacidad
 *       required:
 *         - disabilityDays
 *         - disabilityTypeCode
 *
 *     PayrollComplement:
 *       type: object
 *       properties:
 *         version:
 *           type: string
 *           description: Versión del complemento de nómina. Default 1.2
 *         payrollTypeCode:
 *           type: string
 *           description: Código del tipo de nómina (O=Ordinaria, E=Extraordinaria)
 *         paymentDate:
 *           type: string
 *           description: Fecha de pago de la nómina
 *         initialPaymentDate:
 *           type: string
 *           description: Fecha inicial del periodo de pago
 *         finalPaymentDate:
 *           type: string
 *           description: Fecha final del periodo de pago
 *         daysPaid:
 *           type: number
 *           description: Número de días pagados
 *         earnings:
 *           $ref: '#/components/schemas/PayrollEarnings'
 *         deductions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PayrollDeduction'
 *         disabilities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PayrollDisability'
 *       required:
 *         - payrollTypeCode
 *         - paymentDate
 *         - initialPaymentDate
 *         - finalPaymentDate
 *         - daysPaid
 *
 *     Complement:
 *       type: object
 *       properties:
 *         localTaxes:
 *           $ref: '#/components/schemas/LocalTaxesComplement'
 *         payment:
 *           $ref: '#/components/schemas/PaymentComplement'
 *         payroll:
 *           $ref: '#/components/schemas/PayrollComplement'
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
 *           deprecated: true
 *           description: Lista de pagos relacionados a la factura (solo para CFDI 3.3, usar complementos de pago para CFDI 4.0)
 *           items:
 *             $ref: '#/components/schemas/Payment'
 *         complement:
 *           $ref: '#/components/schemas/Complement'
 *           description: Complementos de la factura (nómina, pago, impuestos locales)
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
 * /api/invoices/create/payroll/by-values:
 *   post:
 *     summary: Crear factura con complemento de nómina por valores
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Factura con complemento de nómina creada exitosamente
 *       500:
 *         description: Error al crear factura con complemento de nómina
 */
router.post('/create/payroll/by-values', createPayrollComplementByValues);

/**
 * @swagger
 * /api/invoices/create/payroll/by-references:
 *   post:
 *     summary: Crear complemento de nómina por referencias
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Complemento de nómina creado exitosamente
 *       500:
 *         description: Error al crear complemento de nómina
 */
router.post('/create/payroll/by-references', createPayrollByReferences);

/**
 * @swagger
 * /api/invoices/create/local-taxes/by-values:
 *   post:
 *     summary: Crear factura con complemento de impuestos locales por valores
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Factura con complemento de impuestos locales creada exitosamente
 *       500:
 *         description: Error al crear factura con complemento de impuestos locales
 */
router.post('/create/local-taxes/by-values', createLocalTaxesComplementByValues);

/**
 * @swagger
 * /api/invoices/create/local-taxes/by-reference:
 *   post:
 *     summary: Crear factura con complemento de impuestos locales por referencias
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Factura con complemento de impuestos locales creada exitosamente
 *       500:
 *         description: Error al crear factura con complemento de impuestos locales
 */
router.post('/create/local-taxes/by-reference', createLocalTaxesInvoiceByReference);

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

/**
 * @swagger
 * /api/invoices/create/carta-porte:
 *   post:
 *     summary: Crear factura con complemento carta porte (lading complement)
 *     tags: [Invoices]
 *     description: Crea una factura de ingreso con complemento carta porte (CCP 3.1) incluyendo ubicaciones, mercancías, autotransporte y figuras de transporte
 *     responses:
 *       200:
 *         description: Factura con complemento carta porte creada exitosamente
 *       500:
 *         description: Error al crear factura con complemento carta porte
 */
router.post('/create/carta-porte', createLadingComplement);

/**
 * @swagger
 * /api/invoices/create/carta-porte-por-referencia:
 *   post:
 *     summary: Crear factura con complemento carta porte (lading complement) por referencia
 *     tags: [Invoices]
 *     description: Crea una factura de ingreso con complemento carta porte (CCP 3.1) incluyendo ubicaciones, mercancías, autotransporte y figuras de transporte
 *     responses:
 *       200:
 *         description: Factura con complemento carta porte creada exitosamente
 *       500:
 *         description: Error al crear factura con complemento carta porte
 */
router.post('/create/carta-porte-por-referencia', createLadingComplementByReference);

export default router;