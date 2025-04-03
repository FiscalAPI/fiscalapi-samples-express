import { Todo } from './Todo';

class TodoRepository {
  private todos: Map<string, Todo>;

  constructor() {
    this.todos = new Map<string, Todo>();
  }

  findAll(): Todo[] {
    return Array.from(this.todos.values());
  }

  findById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  create(todo: Todo): Todo {
    this.todos.set(todo.id, todo);
    return todo;
  }

  update(id: string, todo: Todo): Todo | undefined {
    if (!this.todos.has(id)) {
      return undefined;
    }
    this.todos.set(id, todo);
    return todo;
  }

  delete(id: string): boolean {
    return this.todos.delete(id);
  }
}

// Singleton para mantener los datos en memoria durante la ejecución
export const todoRepository = new TodoRepository();