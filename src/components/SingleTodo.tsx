import { FC, useState } from 'react';

import { Todo } from '../types/Todo';
import { useTodosStore } from '../store/useTodosStore';

interface Props {
  todo: Todo;
}

export const SingleTodo: FC<Props> = ({ todo }) => {
  const { title, isDone } = todo;

  const { editTodo } = useTodosStore();

  const [editMode, setEditMode] = useState(false);
  const [titleInput, setTitleInput] = useState(title);

  const handleEdit = () => {
    if (titleInput.trim().length === 0) return;
    if (editMode) {
      const editedTodo = { ...todo, title: titleInput.trim() };
      editTodo(editedTodo);
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const handleCancelEdit = () => {
    setTitleInput(title);
    setEditMode(false);
  };

  return (
    <div className='alert alert-primary d-flex align-items-center'>
      <button className='btn border-0 text-primary-emphasis' disabled={editMode}>
        <i className={`bi-check-square${isDone ? '-fill' : ''}`}></i>
      </button>

      {editMode ? (
        <>
          <input
            type='text'
            className='form-control bg-primary-subtle me-2'
            value={titleInput}
            ref={(input) => {
              input?.focus();
            }}
            onChange={(e) => setTitleInput(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleEdit()}
            disabled={titleInput.trim().length === 0}
          />
        </>
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
      <button className='btn border-0 text-primary-emphasis' disabled={editMode}>
        <i className='bi-trash-fill'></i>
      </button>
    </div>
  );
};
