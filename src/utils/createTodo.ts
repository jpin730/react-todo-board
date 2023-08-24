import { Todo } from '../types/Todo';

export const createTodo = (todo: string): Todo => ({ id: Date.now(), isDone: false, todo });
