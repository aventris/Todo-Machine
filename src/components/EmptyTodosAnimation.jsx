import { GoArrowDown } from "react-icons/go";

import "../styles/EmptyTodosAnimation.css";
const EmptyTodosAnimation = () => {
  return (
    <div className="addtodo-animation">
      <h2>Create a new todo</h2>
      <GoArrowDown />
    </div>
  );
};

export default EmptyTodosAnimation;
