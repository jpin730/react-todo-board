import { FC } from 'react';

import { SingleTodo } from './SingleTodo';
import { useTodosStore } from '../store/useTodosStore';

export const TodoList: FC = () => {
  const { todos } = useTodosStore();

  return (
    <div>
      {todos.map((todo) => (
        <SingleTodo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
