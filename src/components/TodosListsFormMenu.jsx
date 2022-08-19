import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

import { RiMenuAddFill } from "react-icons/ri";

import "../styles/TodosListsFormMenu.css";

const TodosListsFormMenu = ({
  options,
  value,
  onChange: handleListSelection,
}) => {
  const [toggleList, setToggleList] = useState(false);
  const [selection, setSelection] = useState(null);

  const handleToggleList = (e) => {
    e.stopPropagation();
    setToggleList(!toggleList);
  };
  const boxRef = useRef(null);

  const handleSelection = (value) => {
    setToggleList(false);
    setSelection(value);
    handleListSelection(value);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setToggleList(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelection(value);
  }, [value]);

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
        {options.map((option, index) => (
          <li key={index} onClick={() => handleSelection(option.value)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosListsFormMenu;
