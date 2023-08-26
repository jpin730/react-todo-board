import { FC, useState } from 'react';

import { Todo } from '../types/Todo';
import { useTodosStore } from '../store/useTodosStore';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  todo: Todo;
  index: number;
}

export const SingleTodo: FC<Props> = ({ todo, index }) => {
  const { id, title, isDone } = todo;

  const { editTodo, removeTodo } = useTodosStore();

  const [editMode, setEditMode] = useState(false);
  const [titleInput, setTitleInput] = useState(title);

  const handleEdit = () => {
    const newTitle = titleInput.trim();

    setEditMode(false);

    if (newTitle.length === 0) {
      setTitleInput(title);
      return;
    }

    editTodo({ ...todo, title: newTitle });
    setTitleInput(newTitle);
  };

  const toggleTodo = () => {
    editTodo({ ...todo, isDone: !isDone });
  };

  return (
    <Draggable draggableId={id.toString()} index={index} key={id}>
      {(provided) => (
        <div
          className={`alert alert-${isDone ? 'success' : 'info'} d-flex align-items-center`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <button
            className={`btn border-0 ${editMode ? 'text-secondary' : 'text-primary-emphasis'}`}
            disabled={editMode}
            onClick={toggleTodo}
          >
            <i className={`bi-check-square${isDone ? '-fill' : ''}`}></i>
          </button>
          {editMode ? (
            <input
              type='text'
              className={`form-control bg-${isDone ? 'success' : 'info'}-subtle me-2`}
              value={titleInput}
              onBlur={handleEdit}
              ref={(el) => el?.focus()}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          ) : (
            <span className='ms-2'>{title}</span>
          )}
          <span className='flex-grow-1'></span>

          <button
            className={`btn border-0 ${editMode ? 'text-secondary' : 'text-primary-emphasis'}`}
            onClick={() => setEditMode(true)}
            disabled={editMode}
          >
            <i className='bi-pencil-fill'></i>
          </button>
          <button
            className={`btn border-0 ${editMode ? 'text-secondary' : 'text-primary-emphasis'}`}
            disabled={editMode}
            onClick={() => removeTodo(id)}
          >
            <i className='bi-trash-fill'></i>
          </button>
        </div>
      )}
    </Draggable>
  );
};
