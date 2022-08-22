import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

import "../styles/TodoItem.css";

const TodoItem = ({ todo, onToggleEditTodo, onCompleteTodo }) => {
  const getDateTimeString = () => {
    let string = "";
    if (todo.date) {
      const date = new Date(todo.date);
      string += date.toDateString();
      if (todo.time) string = string + "," + todo.time;
    }
    return string;
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
          onClick={() => onCompleteTodo(todo)}
        />
      )}
      <div className="data" onClick={() => onToggleEditTodo(todo)}>
        <span className="description">{todo.description}</span>
        <span className="date">{getDateTimeString()}</span>
        <span className="list">{todo.list}</span>
      </div>
    </div>
  );
};

export default TodoItem;
