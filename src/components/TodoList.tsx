import { FC, useMemo } from 'react';

import { SingleTodo } from './SingleTodo';
import { useTodosStore } from '../store/useTodosStore';
import { StrictModeDroppable } from './StrictModeDroppable';

export const TodoList: FC = () => {
  const { todos } = useTodosStore();

  const [doneTodos, activeTodos] = useMemo(
    () => [todos.filter(({ isDone }) => isDone), todos.filter(({ isDone }) => !isDone)],
    [todos],
  );

  return (
    <div className='row gy-3'>
      <div className='col-12 col-md-6'>
        <StrictModeDroppable droppableId='activeTodos'>
          {(provided) => (
            <div
              className='border rounded p-3'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2 className='text-center mb-3'>Active Todos</h2>
              <hr />

              <div>
                {activeTodos.map((todo, index) => (
                  <SingleTodo key={todo.id} todo={todo} index={index} />
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </div>

      <div className='col-12 col-md-6'>
        <StrictModeDroppable droppableId='doneTodos'>
          {(provided) => (
            <div
              className='border rounded p-3'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2 className='text-center mb-3'>Done Todos</h2>
              <hr />

              {doneTodos.map((todo, index) => (
                <SingleTodo key={todo.id} todo={todo} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </div>
    </div>
  );
};
