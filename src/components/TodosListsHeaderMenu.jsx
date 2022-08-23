import { FaAngleDown } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { TiInputChecked } from "react-icons/ti";
import { RiMenuAddFill } from "react-icons/ri";

import "../styles/TodosListMenu.css";
import React, { useState, useEffect, useRef } from "react";

const TodosListMenu = ({
  options,
  total,
  completed,
  onOpenListForm,
  onFilterChange,
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [filter, setFilter] = useState("All");

  const elementRef = useRef(null);

  /*  const currentSelection = "Default"; */
  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };

  const handleFilter = (type) => {
    setFilter(type);
    onFilterChange(type);
    handleToggleMenu();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (elementRef.current && !elementRef.current.contains(e.target)) {
        setToggleMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="todoslistmenu" ref={elementRef}>
        <div className="current" onClick={handleToggleMenu}>
          <span>{filter}</span>

          <FaAngleDown
            color="white"
            className={`icon${toggleMenu ? " rotate" : ""}`}
          />
        </div>
        <ul className={`lists${toggleMenu ? "" : " hidden"}`}>
          <li className="default" onClick={() => handleFilter("All")}>
            <div className="iconcontainer">
              <AiFillHome />
            </div>
            <span>All lists</span>
            <span>{total}</span>
          </li>
          {options.map((option, index) => (
            <li
              key={index}
              className="listitem"
              onClick={() => handleFilter(option.label)}
            >
              <div className="iconcontainer">
                <BsCardChecklist color="white" />
              </div>
              <span>{option.label}</span>
              <span>{option.length}</span>
            </li>
          ))}
          <li className="default" onClick={() => handleFilter("Completed")}>
            <div className="iconcontainer">
              <TiInputChecked width="50" height="25" />
            </div>
            <span>Completed</span>
            <span>{completed}</span>
          </li>
          <li className="default" onClick={onOpenListForm}>
            <div className="iconcontainer">
              <RiMenuAddFill />
            </div>
            <span>Add list</span>
            <span></span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default TodosListMenu;
