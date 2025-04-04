# FiscalAPI Samples Express

[![Express.js](https://img.shields.io/badge/express-4.x-blue.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![FiscalAPI](https://img.shields.io/badge/fiscalapi-4.0.0-green.svg)](https://fiscalapi.com)

Ejemplos de integración con FiscalAPI para la generación de CFDI (Comprobantes Fiscales Digitales por Internet) utilizando Express.js y TypeScript.

## 📋 Descripción

Este proyecto proporciona ejemplos prácticos de cómo integrar FiscalAPI en una aplicación Express.js para generar facturas electrónicas (CFDI) cumpliendo con los requisitos del SAT (Servicio de Administración Tributaria) en México.

## ✨ Características

- Gestión completa de facturas CFDI 4.0
- Ejemplos de diferentes tipos de facturación (IVA 16%, IVA exento, tasa cero)
- Creación de complementos de pago
- Notas de crédito
- Manejo de diferentes monedas (MXN, USD, EUR)
- Cancelación de facturas
- Generación de PDF y XML
- Envío por correo electrónico
- Documentación completa con Swagger

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/FiscalAPI/fiscalapi-samples-express

# Entrar al directorio
cd fiscalapi-samples-express

# Instalar dependencias
npm install

# Copiar y configurar variables de entorno
cp .env.example .env
# (Editar .env con tus credenciales de FiscalAPI) https://docs.fiscalapi.com/credentials-info

# Iniciar la aplicación en modo desarrollo
npm run dev
```

La documentación swagger de la ejemplo está disponible en:

```
http://localhost:3000/api-docs
```


## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
PORT=3000
FISCALAPI_API_KEY=tu_api_key
FISCALAPI_TENANT=tu_tenant
FISCALAPI_API_URL=https://api.fiscalapi.com
```

## 📚 Estructura del Proyecto

```
├── src
│   ├── app.ts                   # Punto de entrada de la aplicación
│   ├── config                   # Configuraciones
│   │   ├── config.ts            # Configuración principal
│   │   └── swagger.ts           # Configuración de Swagger
│   ├── controllers              # Controladores
│   │   ├── invoiceController.ts # Controlador de facturas
│   │   ├── productController.ts # Controlador de productos
│   │   └── todoController.ts    # Controlador de tareas
│   ├── models                   # Modelos
│   ├── routes                   # Rutas
│   │   ├── invoiceRoutes.ts     # Rutas de facturas
│   │   ├── productRoutes.ts     # Rutas de productos
│   │   └── todoRoutes.ts        # Rutas de tareas
│   └── services                 # Servicios
│       └── fiscalapi.service.ts # Servicio de FiscalAPI
```

## 🔍 Ejemplos de Uso

### Crear una Factura con IVA 16%

```bash
curl -X POST http://localhost:3000/api/invoices/create/iva-16
```

### Crear una Nota de Crédito

```bash
curl -X POST http://localhost:3000/api/invoices/create/credit-note/by-values
```

### Generar un PDF de Factura

```bash
curl -X GET http://localhost:3000/api/invoices/pdf/123456
```

## 📖 Documentación API

La documentación swagger de la ejemplo está disponible en:

```
http://localhost:3000/api-docs
```

Utiliza Swagger UI para probar todos los endpoints disponibles.

## 🔧 Tecnologías Utilizadas

- **Express.js**: Framework web para Node.js
- **TypeScript**: Superset tipado de JavaScript
- **FiscalAPI SDK**: SDK para interactuar con FiscalAPI
- **Swagger**: Documentación de API
- **Luxon**: Manejo de fechas y horas
- **UUID**: Generación de identificadores únicos
- **dotenv**: Gestión de variables de entorno

## 🤝 Contribuir
1. Haz un fork del repositorio.  
2. Crea una rama para tu feature: `git checkout -b feature/AmazingFeature`.  
3. Realiza commits de tus cambios: `git commit -m 'Add some AmazingFeature'`.  
4. Sube tu rama: `git push origin feature/AmazingFeature`.  
5. Abre un Pull Request en GitHub.

## 🐛 Reportar Problemas
1. Asegúrate de usar la última versión del SDK.  
2. Verifica si el problema ya fue reportado.  
3. Proporciona un ejemplo mínimo reproducible.  
4. Incluye los mensajes de error completos.

## 📄 Licencia
Este proyecto está licenciado bajo la Licencia **MPL-2.0**. Consulta el archivo [LICENSE](LICENSE.txt) para más detalles.

## 🔗 Enlaces Útiles

- [Documentación Oficial](https://docs.fiscalapi.com)  
- [Pagina de FiscalAPI](https://fiscalapi.com)
- [Ejemplos Express](https://github.com/FiscalAPI/fiscalapi-samples-express)
- [Ejemplos NestJs](https://github.com/FiscalAPI/fiscalapi-samples-nest)
- [Más Ejemplos en NodeJs](https://github.com/FiscalAPI/fiscalapi-node/blob/main/examples/all-samples.ts)  

---
Desarrollado con ❤️ por [Fiscalapi](https://www.fiscalapi.com)
