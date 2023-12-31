import { create } from 'zustand';

import { Todo } from '../types/Todo';
import { createTodo } from '../utils/createTodo';

type TodosState = {
  todos: Todo[];
};

type TodosActions = {
  todos: Todo[];
  initTodos: () => void;
  setTodos: (todos: Todo[]) => void;
  addTodo: (newTodo: string) => void;
  editTodo: (newTodo: Todo) => void;
  removeTodo: (todoId: number) => void;
};

export const useTodosStore = create<TodosState & TodosActions>((set) => ({
  todos: [],
  initTodos: () => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    set(() => ({ todos: [...storedTodos] }));
  },
  setTodos: (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
    set(() => ({ todos: [...todos] }));
  },
  addTodo: (newTodo) =>
    set(({ todos }) => {
      const newTodos = [...todos, createTodo(newTodo)];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
  editTodo: (newTodo) =>
    set(({ todos }) => {
      const index = todos.findIndex(({ id }) => id === newTodo.id);
      const newTodos = [...todos];
      newTodos[index] = newTodo;
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
  removeTodo: (todoId) =>
    set(({ todos }) => {
      const newTodos = todos.filter(({ id }) => id !== todoId);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    }),
}));
