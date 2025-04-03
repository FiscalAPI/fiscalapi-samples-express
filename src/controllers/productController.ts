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