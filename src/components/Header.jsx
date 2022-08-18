import { useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { RiTodoLine } from "react-icons/ri";
import Select from "react-select";
import "../styles/Header.css";
import TodosListMenu from "./TodosListMenu";

const Header = ({ todos }) => {
  const selectOptions = todos.map((todoList) => ({
    value: todoList.name,
    label: todoList.name,
  }));
  return (
    <div className="header">
      <RiTodoLine className="logo-icon" color="white" />
      <TodosListMenu options={selectOptions} />

      <BsSearch className="search-icon" color="white" />
    </div>
  );
};

export default Header;
