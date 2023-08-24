import { Todo } from '../types/Todo';

export const createTodo = (title: string): Todo => ({ id: Date.now(), isDone: false, title });
