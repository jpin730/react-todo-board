import { FC, useState } from 'react';

interface Props {
  onAddTodo: (value: string) => void;
}

export const AddTodoInput: FC<Props> = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onAddTodo(newTodo);
    setNewTodo('');
  };

  return (
    <form className='d-flex gap-3' onSubmit={handleSubmit}>
      <input
        type='text'
        className='form-control'
        placeholder='Enter a task'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className='btn btn-primary px-5' disabled={newTodo.length === 0}>
        Add
      </button>
    </form>
  );
};
