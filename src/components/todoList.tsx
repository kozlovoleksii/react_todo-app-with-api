import classNames from 'classnames';
import { Todo, TypeTodoList } from '../types/Todo';
import React, { useEffect, useRef, useState } from 'react';
import { deleteTodo, updateTodo} from '../api/todos';
import { sendErrorMessage } from './errorsUnderFooter';

export const TodoList: React.FC<TypeTodoList> = ({
  filteredTodoList,
  deletingTodos,
  handleToggleCompletion,
  handleDeleteTodo,
  handleUpdateTodo,
  setTodoList,
  setErrorMessage,
  setLoader,
  setDeletingTodos
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const refInputUpdate = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (refInputUpdate.current) {
      refInputUpdate.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEditedTitle(
          filteredTodoList.find(t => t.id === editingId)?.title || '',
        );
        setEditingId(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editingId, editedTitle]);

  const handleEditStart = (todo: Todo) => {
    setEditingId(todo.id);
    setEditedTitle(todo.title);
  };

  async function handleEditSubmit(todo: Todo) {
    setLoader(true);

    const updatedTodo = { ...todo, title: editedTitle.trim() };

    if (editedTitle.trim() === '') {
      setDeletingTodos(prev => [...prev, todo.id]);

      try {
        await deleteTodo(updatedTodo.id);
        setTodoList(prevTodoList =>
          prevTodoList.filter(todo => todo.id !== updatedTodo.id),
        );
        // if (refInputUpdate.current) {
        //   refInputUpdate.current.focus();
        // }
        setEditingId(null);
        setEditedTitle('');
       
      } catch (error) {

        sendErrorMessage('Unable to update a todo', setErrorMessage);
        throw error;
        
      }
      finally {
        setDeletingTodos(prev => prev.filter(id => id !== todo.id));
        setLoader(false)
      }

    } else {
      updateTodo(updatedTodo)
        .then(updatedTodo => {
          setTodoList(prevTodoList =>
            prevTodoList.map(t => (t.id === updatedTodo.id ? updatedTodo : t)),
          );

          setEditingId(null);
          setEditedTitle('');
        })
        .catch(error => {

          sendErrorMessage('Unable to update todo', setErrorMessage);
          throw error;
        })
        .finally(() => setLoader(false));
    }
  }
 
  return (
    <>
      {filteredTodoList.map(todo => {
        const { id, title, completed } = todo;
        return (
          <div
            data-cy="Todo"
            className={classNames('todo', {
              completed: completed,
              'todo--loading': deletingTodos.includes(id),
            })}
            key={todo.id}
          >
            {/* eslint-disable-next-line */}
            <label className="todo__status-label" htmlFor={`todo-status-${id}`}>
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                id={`todo-status-${todo.id}`}
                onChange={() => {
                  const updateTodo = { ...todo, completed: !completed };
                  handleToggleCompletion(id);
                  handleUpdateTodo(updateTodo);
                }}
                disabled={deletingTodos.includes(id)}
              />
            </label>

            {editingId !== id ? (
              <>
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => handleEditStart(todo)}
    
                >
                  {title}
                </span>
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => handleDeleteTodo(id)}
                  disabled={deletingTodos.includes(id)}
                >
                  ×
                </button>
              </>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleEditSubmit(todo);
                }}
              >
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  value={editedTitle}
                  ref={refInputUpdate}
                  onChange={e => setEditedTitle(e.target.value)}
                  onBlur={() => handleEditSubmit(todo)}
                  placeholder="Empty todo will be deleted"
                />
              </form>
            )}

            <div
              data-cy="TodoLoader"
              className={classNames('modal overlay', {
                'is-active': deletingTodos.includes(id),
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}
    </>
  );
};
