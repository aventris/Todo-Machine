import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { RiTodoLine } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import "../styles/Header.css";
import TodosListsHeaderMenu from "./TodosListsHeaderMenu";
import SearchInput from "./SearchInput";

const Header = ({ todos, onOpenListForm, onSearch, onFilter }) => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [input, setInput] = useState("");
  const boxRef = useRef(null);

  const getUncompletedCount = (todos) => {
    return todos.filter((todo) => !todo.finished).length;
  };

  const selectOptions = todos.map((todoList) => ({
    value: todoList.list,
    label: todoList.list,
    length: getUncompletedCount(todoList.todos),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  const handleToggleSearch = () => {
    setToggleSearch((prev) => {
      return !prev;
    });
  };
  const handleInput = (e) => {
    setInput(e.currentTarget.value);
  };
  const handleFilter = (filter) => {
    onSearch("");
    onFilter(filter);
  };
  return (
    <div className="header">
      {toggleSearch ? (
        <form ref={boxRef} onSubmit={handleSubmit} className="search">
          <BiArrowBack className="return-icon" onClick={handleToggleSearch} />
          <SearchInput
            boxRef={boxRef}
            onCloseSearch={handleToggleSearch}
            onChange={handleInput}
          />
          <button type="submit">
            <BsSearch className="search-icon" color="white" type="submit" />
          </button>
        </form>
      ) : (
        <div className="main">
          <RiTodoLine className="logo-icon" color="white" />
          <TodosListsHeaderMenu
            options={selectOptions}
            total={totalTodos}
            completed={completedTodos}
            onOpenListForm={onOpenListForm}
            onFilterChange={handleFilter}
          />
          <BsSearch
            onClick={(e) => {
              e.stopPropagation();
              handleToggleSearch();
            }}
            className="search-icon"
            color="white"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
