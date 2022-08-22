import { BsSearch } from "react-icons/bs";
import { RiTodoLine } from "react-icons/ri";
import "../styles/Header.css";
import TodosListsHeaderMenu from "./TodosListsHeaderMenu";

const Header = ({ todos, onOpenListForm }) => {
  const selectOptions = todos.map((todoList) => ({
    value: todoList.list,
    label: todoList.list,
    length: todoList.todos.length,
  }));
  const totalTodos = todos.reduce((acc, value) => {
    return acc + value.todos.length;
  }, 0);

  const completedTodos = todos.reduce(
    (acc, value) =>
      acc +
      value.todos.reduce((acc, todo) => {
        if (todo.finished) return acc + 1;
        return acc;
      }, 0),
    0
  );
  return (
    <div className="header">
      <RiTodoLine className="logo-icon" color="white" />
      <TodosListsHeaderMenu
        options={selectOptions}
        total={totalTodos}
        completed={completedTodos}
        onOpenListForm={onOpenListForm}
      />

      <BsSearch className="search-icon" color="white" />
    </div>
  );
};

export default Header;
