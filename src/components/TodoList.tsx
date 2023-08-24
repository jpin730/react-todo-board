import { FC, useMemo } from 'react';

import { SingleTodo } from './SingleTodo';
import { useTodosStore } from '../store/useTodosStore';

export const TodoList: FC = () => {
  const { todos } = useTodosStore();

  const [doneTodos, activeTodos] = useMemo(
    () => [todos.filter(({ isDone }) => isDone), todos.filter(({ isDone }) => !isDone)],
    [todos],
  );

  return (
    <div className='row gy-3'>
      <div className='col-12 col-md-6'>
        <div className='border rounded p-3'>
          <h2 className='text-center mb-3'>Active Todos</h2>
          <hr />

          {activeTodos.map((todo) => (
            <SingleTodo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>

      <div className='col-12 col-md-6'>
        <div className='border rounded p-3'>
          <h2 className='text-center mb-3'>Done Todos</h2>
          <hr />

          {doneTodos.map((todo) => (
            <SingleTodo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
};
