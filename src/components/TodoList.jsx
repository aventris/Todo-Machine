import TodoItem from "./TodoItem";

import "../styles/TodoList.css";
const TodoList = () => {
  return (
    <div className="todolist">
      <p className="overdue">Overdue</p>
      <p className="">Tomorrow</p>
      <p className="">Next week</p>
      <p className="">Next month</p>
      <p className="">Dateless</p>
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </div>
  );
};

export default TodoList;
