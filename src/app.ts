import express, { Application, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import todoRoutes from './routes/todoRoutes';
import config from './config/config';
import productRoutes from './routes/productRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
// Crear aplicación express
const app: Application = express();
const PORT: number = config.port;

// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Ruta principal
app.get('/', (req: Request, res: Response) => {
  res.send('API de Todos - Utiliza /api-docs para ver la documentación');
});

// Rutas para el recurso todos
app.use('/api/todos', todoRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);

// Middleware para manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Ocurrió un error en el servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
  console.log(`Documentación Swagger: http://localhost:${PORT}/api-docs`);
});

export default app;