import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

import "../styles/TodoItem.css";

const TodoItem = ({ todo, onToggleEditTodo, onCompleteTodo, overdue }) => {
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
    e.currentTarget.parentNode.className = `${e.currentTarget.parentNode.className} hidden`;
    setTimeout(() => {
      onCompleteTodo(todo);
    }, 500);
  };

  return (
    <div className="todoitem">
      {todo.finished ? (
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
    </div>
  );
};

export default TodoItem;
