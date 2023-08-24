import { FC } from 'react';

import { Todo } from '../types/Todo';
import { SingleTodo } from './SingleTodo';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <SingleTodo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
