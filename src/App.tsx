import { FC } from 'react';

import { AddTodoInput } from './components/AddTodoInput';

export const App: FC = () => {
  const handleNewTodo = (newTodo: string) => {
    console.log(newTodo);
  };

  return (
    <div className='min-vh-100 py-3'>
      <div className='container'>
        <h1 className='text-center mb-3'>React Todo Board</h1>

        <AddTodoInput onAddTodo={handleNewTodo} />
      </div>
    </div>
  );
};
