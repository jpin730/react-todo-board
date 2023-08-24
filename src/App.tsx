import { FC, useEffect, useState } from 'react';

import { AddTodoInput } from './components/AddTodoInput';
import { createTodo } from './utils/createTodo';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    setTodos(storedTodos);
  }, []);

  const handleNewTodo = (newTodo: string) => {
    const newTodos = [...todos, createTodo(newTodo)];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div className='min-vh-100 py-3'>
      <div className='container'>
        <h1 className='text-center mb-3'>React Todo Board</h1>

        <div className='mb-3'>
          <AddTodoInput onAddTodo={handleNewTodo} />
        </div>

        <TodoList todos={todos} />
      </div>
    </div>
  );
};
