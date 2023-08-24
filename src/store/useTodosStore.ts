import { create } from 'zustand';

import { Todo } from '../types/Todo';
import { createTodo } from '../utils/createTodo';

type TodosState = {
  todos: Todo[];
};

type TodosActions = {
  todos: Todo[];
  initTodos: () => void;
  addTodo: (newTodo: string) => void;
};

export const useTodosStore = create<TodosState & TodosActions>((set) => ({
  todos: [],
  initTodos: () => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    set(() => ({ todos: [...storedTodos] }));
  },
  addTodo: (newTodo) =>
    set(({ todos }) => {
      const newTodos = [...todos, createTodo(newTodo)];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
}));
