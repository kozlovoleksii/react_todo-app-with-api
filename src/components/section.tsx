import { TodoList } from './todoList';
import { TypeTodoList } from '../types/Todo';
import { TempTodo } from './tempTodo';

export const MainSection: React.FC<TypeTodoList> = ({
  filteredTodoList,
  deletingTodos,
  handleToggleCompletion,
  handleDeleteTodo,
  tempTodo,
  // handleUpdateTodo,
  setTitle,
  setTodoList,
  setErrorMessage,
  setLoader,
  setTempTodo,
  setDeletingTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoList
        filteredTodoList={filteredTodoList}
        deletingTodos={deletingTodos}
        handleToggleCompletion={handleToggleCompletion}
        handleDeleteTodo={handleDeleteTodo}
        setTitle={setTitle}
        setTodoList={setTodoList}
        setErrorMessage={setErrorMessage}
        setLoader={setLoader}
        setTempTodo={setTempTodo}
        setDeletingTodos={setDeletingTodos}
      />

      <TempTodo tempTodo={tempTodo} />
    </section>
  );
};
