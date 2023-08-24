import { FC } from 'react';

import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
}

export const SingleTodo: FC<Props> = ({ todo }) => {
  const { title, isDone } = todo;

  return (
    <div className='alert alert-primary d-flex align-items-center'>
      <button className='btn text-primary-emphasis'>
        <i className={`bi bi-check-square${isDone ? '-fill' : ''}`}></i>
      </button>
      <span>{title}</span>

      <span className='flex-grow-1'></span>

      <button className='btn text-primary-emphasis'>
        <i className='bi bi-pencil-fill'></i>
      </button>
      <button className='btn text-primary-emphasis'>
        <i className='bi bi-trash-fill'></i>
      </button>
    </div>
  );
};
