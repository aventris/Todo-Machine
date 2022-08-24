import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";

import "../styles/TodoItem.css";
import { useEffect, useRef, useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";

const TodoItem = ({
  todo,
  onToggleEditTodo,
  onDeleteTodo,
  onCompleteTodo,
  overdue,
}) => {
  const [completed, setCompleted] = useState(null);
  const [toggleConfirmation, setToggleConfirmation] = useState(false);
  const elRef = useRef(null);

  const getDateTimeString = () => {
    let string = "";
    if (todo.date) {
      const date = new Date(todo.date);
      string += date.toDateString();
      if (todo.time) string = string + ", " + todo.time;
    }
    return string;
  };

  const handleCompleteTodo = (e) => {
    setCompleted((prevState) => !prevState);
    e.currentTarget.parentNode.className = `${e.currentTarget.parentNode.className} hidden`;
    setTimeout(() => {
      onCompleteTodo(todo);
    }, 500);
  };
  const handleToggleConfirmation = () => {
    setToggleConfirmation((prevState) => !prevState);
  };

  const handleDelete = () => {
    setToggleConfirmation(false);
    elRef.current.className = `${elRef.current.className} hidden`;
    setTimeout(() => {
      onDeleteTodo(todo);
    }, 500);
  };

  useEffect(() => {
    setCompleted(todo.finished);
  }, [todo]);

  return (
    <>
      <div className="todoitem" ref={elRef}>
        {completed ? (
          <ImCheckboxChecked
            className="completed"
            onClick={() => onCompleteTodo(todo)}
          />
        ) : (
          <ImCheckboxUnchecked
            className="completed"
            onClick={handleCompleteTodo}
          />
        )}
        <div className="data" onClick={() => onToggleEditTodo(todo)}>
          <span className="description">{todo.description}</span>
          <span className={`date${overdue ? " overdue" : ""}`}>
            {getDateTimeString()}
          </span>
          <span className="list">{todo.list}</span>
        </div>
        <AiFillDelete className="delete" onClick={handleToggleConfirmation} />
      </div>
      {toggleConfirmation && (
        <DeleteConfirmation
          onCancel={handleToggleConfirmation}
          onAction={handleDelete}
        />
      )}
    </>
  );
};

export default TodoItem;
