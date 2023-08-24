import { FC, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { AddTodoInput } from './components/AddTodoInput';
import { TodoList } from './components/TodoList';
import { useTodosStore } from './store/useTodosStore';

export const App: FC = () => {
  const { todos, initTodos, setTodos } = useTodosStore();

  useEffect(() => {
    initTodos();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }

    const [doneTodos, activeTodos] = [
      todos.filter(({ isDone }) => isDone),
      todos.filter(({ isDone }) => !isDone),
    ];

    let draggedTodo;

    if (source.droppableId === 'activeTodos') {
      draggedTodo = activeTodos[source.index];
      activeTodos.splice(source.index, 1);
    } else {
      draggedTodo = doneTodos[source.index];
      doneTodos.splice(source.index, 1);
    }

    draggedTodo.isDone =
      destination.droppableId === source.droppableId ? draggedTodo.isDone : !draggedTodo.isDone;

    if (destination.droppableId === 'activeTodos') {
      activeTodos.splice(destination.index, 0, draggedTodo);
    } else {
      doneTodos.splice(destination.index, 0, draggedTodo);
    }

    setTodos([...activeTodos, ...doneTodos]);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='min-vh-100 py-3'>
        <div className='container'>
          <h1 className='text-center mb-3'>React Todo Board</h1>
          <div className='mb-3'>
            <AddTodoInput />
          </div>
          <TodoList />
        </div>
      </div>
    </DragDropContext>
  );
};
