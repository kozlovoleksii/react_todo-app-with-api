import { TypeTodoList } from '../types/Todo';
import { TempTodo } from './TempTodo';
import { TodoList } from './TodoList';

export const MainSection: React.FC<TypeTodoList> = ({
  filteredTodoList,
  deletingTodos,
  handleToggleCompletion,
  handleDeleteTodo,
  tempTodo,
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
