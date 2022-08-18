import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

import { RiMenuAddFill } from "react-icons/ri";

import "../styles/TodosListsFormMenu.css";

const TodosListsFormMenu = ({ options }) => {
  const [toggleList, setToggleList] = useState(false);
  const [selection, setSelection] = useState(options[0].label);

  const handleToggleList = (e) => {
    e.stopPropagation();

    console.log("toggle List", toggleList);
    setToggleList(!toggleList);
  };
  const boxRef = useRef(null);

  const handleClickOutside = (e) => {
    if (!boxRef.current.contains(e.target) && toggleList) {
      setToggleList(false);
      console.log("click outside");
    }
  };

  const handleSelection = (value) => {
    setToggleList(false);
    setSelection(value);
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <div className="todoslist-addtodo">
      <div className="selection">
        <div onClick={handleToggleList}>
          <span>{selection}</span>
          <FaAngleDown />
        </div>
        <RiMenuAddFill />
      </div>
      <ul ref={boxRef} className={`${toggleList ? "" : "hidden"}`}>
        {options.map((option) => (
          <li onClick={() => handleSelection(option.value)}>{option.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodosListsFormMenu;
