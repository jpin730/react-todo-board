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
    if (titleInput.trim().length === 0) return;

    if (editMode) {
      const newTitle = titleInput.trim();
      editTodo({ ...todo, title: newTitle });
      setTitleInput(newTitle);
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const toggleTodo = () => {
    editTodo({ ...todo, isDone: !isDone });
  };

  const handleCancelEdit = () => {
    setTitleInput(title);
    setEditMode(false);
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
            className='btn border-0 text-primary-emphasis'
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
              ref={(input) => {
                input?.focus();
              }}
              onChange={(e) => setTitleInput(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleEdit()}
              onBlur={handleEdit}
              disabled={titleInput.trim().length === 0}
            />
          ) : (
            <span>{title}</span>
          )}
          <span className='flex-grow-1'></span>
          {editMode && (
            <button className='btn border-0 text-primary-emphasis' onClick={handleCancelEdit}>
              <i className='bi-arrow-counterclockwise'></i>
            </button>
          )}
          <button className='btn border-0 text-primary-emphasis' onClick={handleEdit}>
            <i className='bi-pencil-fill'></i>
          </button>
          <button
            className='btn border-0 text-primary-emphasis'
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
