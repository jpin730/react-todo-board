import { FC, useEffect } from 'react';

import { AddTodoInput } from './components/AddTodoInput';
import { TodoList } from './components/TodoList';
import { useTodosStore } from './store/useTodosStore';

export const App: FC = () => {
  const { initTodos } = useTodosStore();

  useEffect(() => {
    initTodos();
  }, []);

  return (
    <div className='min-vh-100 py-3'>
      <div className='container'>
        <h1 className='text-center mb-3'>React Todo Board</h1>

        <div className='mb-3'>
          <AddTodoInput />
        </div>

        <TodoList />
      </div>
    </div>
  );
};
