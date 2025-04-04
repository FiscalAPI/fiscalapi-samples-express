/**
 * ┌───────────────────────────────────────────────────────────────────────────────┐
 * │                          IMPORTANTE - AVISO                                   │
 * │                                                                               │
 * │ Este controlador ha sido creado con fines exclusivamente demostrativos.       │
 * │                                                                               │
 * │ La mayoría de los datos están hardcodeados directamente en las acciones       │
 * │ del controlador para facilitar las pruebas inmediatas sin necesidad de        │
 * │ configurar cuerpos de peticiones. Esto permite probar la funcionalidad        │
 * │ simplemente haciendo clic en el botón "Probar" de Swagger.                    │
 * │                                                                               │
 * │ En esta aplicación de ejemplo solo se han creado dos controladores:           │
 * │ el de productos y el de factura, para demostrar el funcionamiento             │
 * │ básico de la API. Si desea ver ejemplos de todos los recursos                 │
 * │ disponibles en la API, visite los ejemplos completos de Node.js en:           │
 * │ https://github.com/FiscalAPI/fiscalapi-node/blob/main/examples/all-samples.ts │
 * │                                                                               │
 * │ Este código NO representa una arquitectura limpia ni sigue las mejores        │
 * │ prácticas para aplicaciones en producción. Aunque el SDK de FiscalAPI         │
 * │ implementa las mejores prácticas internamente, esta aplicación de             │
 * │ ejemplo está diseñada priorizando la simplicidad y facilidad de prueba.       │
 * │                                                                               │
 * │ En un entorno de producción, se recomienda utilizar una arquitectura          │
 * │ apropiada con separación de responsabilidades, validación adecuada,           │
 * │ manejo de errores, autenticación, autorización, etc.                          │
 * └───────────────────────────────────────────────────────────────────────────────┘
 */

import { Request, Response } from 'express';
import { Product } from 'fiscalapi';
import { createFiscalApiClient } from '../services/fiscalapi.service';

const fiscalapi = createFiscalApiClient(); 

// Obtener todos los todos
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    //Listsar productos, pagina 1, 50 productos por pagina
  const apiResponse = await fiscalapi.products.getList(1,50);
  res.status(200).json(apiResponse);
};

// Obtener un todo por ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  console.log('id', id);

  const apiResponse = await fiscalapi.products.getById(id);
  
  if (!apiResponse.succeeded) {
    res.status(404).json(apiResponse);
    return;
  }

  res.status(200).json(apiResponse);
};

// Crear un nuevo todo
export const createProduct = async (req: Request, res: Response): Promise<void> => {
 const product = req.body as Product;
 
 console.log('product', product);


  const apiResponse = await fiscalapi.products.create(product);

  if (!apiResponse.succeeded) {
    res.status(400).json(apiResponse);
    return;
  }

  res.status(200).json(apiResponse);
};

// Actualizar un todo
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const product = req.body as Product;
  

  console.log('product', product);

  const apiResponse = await fiscalapi.products.update(product);

  if (!apiResponse.succeeded) {
    res.status(400).json(apiResponse);
    return;
  }
  
  res.status(200).json(apiResponse);
};

// Eliminar un todo
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const apiResponse = await fiscalapi.products.delete(id);
  
  if (!apiResponse.succeeded) {
    res.status(400).json(apiResponse);
    return;
  }
  
res.status(200).json(apiResponse);
};