import { Request, Response } from 'express';
import { Todo } from '../models/Todo';
import { todoRepository } from '../models/TodoRepository';
import { v4 as uuidv4 } from 'uuid';

// Obtener todos los todos
export const getAllTodos = (req: Request, res: Response): void => {
  const todos = todoRepository.findAll();
  res.status(200).json(todos);
};

// Obtener un todo por ID
export const getTodoById = (req: Request, res: Response): void => {
  const id = req.params.id;
  const todo = todoRepository.findById(id);
  
  if (!todo) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }
  
  res.status(200).json(todo);
};

// Crear un nuevo todo
export const createTodo = (req: Request, res: Response): void => {
  const { title, priority } = req.body;
  
  if (!title || typeof priority !== 'number') {
    res.status(400).json({ message: 'Title (string) and priority (number) are required' });
    return;
  }
  
  const newTodo: Todo = {
    id: uuidv4(),
    title,
    priority
  };
  
  const createdTodo = todoRepository.create(newTodo);
  res.status(201).json(createdTodo);
};

// Actualizar un todo
export const updateTodo = (req: Request, res: Response): void => {
  const id = req.params.id;
  const { title, priority } = req.body;
  
  if (!title || typeof priority !== 'number') {
    res.status(400).json({ message: 'Title (string) and priority (number) are required' });
    return;
  }
  
  const updatedTodo: Todo = {
    id,
    title,
    priority
  };
  
  const result = todoRepository.update(id, updatedTodo);
  
  if (!result) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }
  
  res.status(200).json(result);
};

// Eliminar un todo
export const deleteTodo = (req: Request, res: Response): void => {
  const id = req.params.id;
  const deleted = todoRepository.delete(id);
  
  if (!deleted) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }
  
  res.status(204).send();
};