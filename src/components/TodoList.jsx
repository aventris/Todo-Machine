import TodoItem from "./TodoItem";

import "../styles/TodoList.css";
const TodoList = ({ todos, onToggleEditTodo }) => {
  return (
    <div className="todolist">
      <p className="overdue">Overdue</p>
      <p className="">Tomorrow</p>
      <p className="">Next week</p>
      <p className="">Next month</p>
      <p className="">Dateless</p>
      {todos.flatMap((todoList) =>
        todoList.todos.map((todo, index) => (
          <TodoItem
            key={todoList.list + index}
            todo={{ ...todo, list: todoList.list }}
            onToggleEditTodo={onToggleEditTodo}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
