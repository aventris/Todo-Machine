import Footer from "./components/Footer";
import Header from "./components/Header";
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";
import NewList from "./components/NewList";

import "./styles/App.css";

import useTodos from "./hooks/useTodos";
import useUI from "./hooks/useUI";

function App() {
  const {
    todoFormIsOpen,
    todoEditForm,
    listFormIsOpen,
    toggleAddForm,
    toggleEditForm,
    toggleNewListForm,
  } = useUI();

  const {
    todos,
    addNewTodo,
    handleCompleteTodo,
    handleEditTodo,
    handleDeleteTodo,
    handleNewList,
    handleSearchInput,
    handleFilter,
    getCurrentTodos,
  } = useTodos(toggleEditForm, toggleAddForm);

  return (
    <div className="App">
      <Header
        todos={todos}
        onOpenListForm={toggleNewListForm}
        onSearch={handleSearchInput}
        onFilter={handleFilter}
      />
      <TodoList
        todos={getCurrentTodos()}
        onToggleEditTodo={toggleEditForm}
        onCompleteTodo={handleCompleteTodo}
        onDeleteTodo={handleDeleteTodo}
      />
      <Footer onOpenForm={toggleAddForm} />
      {todoFormIsOpen && (
        <NewTodo
          onAddNewTodo={addNewTodo}
          onCloseForm={toggleAddForm}
          todos={todos}
          onToggleListForm={toggleNewListForm}
        />
      )}
      {todoEditForm && (
        <NewTodo
          isEdit
          data={todoEditForm}
          onEditTodo={handleEditTodo}
          onCloseForm={toggleEditForm}
          todos={todos}
          onToggleListForm={toggleNewListForm}
          onDeleteTodo={handleDeleteTodo}
        />
      )}
      {listFormIsOpen && (
        <NewList
          onAddList={handleNewList}
          onToggleListForm={toggleNewListForm}
        />
      )}
    </div>
  );
}

export default App;
