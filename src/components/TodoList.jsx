import TodoItem from "./TodoItem";

import "../styles/TodoList.css";
const TodoList = ({ todos, onToggleEditTodo, onCompleteTodo }) => {
  const overdue = [];
  const dateless = [];
  const tomorrow = [];
  const nextWeek = [];
  const nextMonth = [];
  const later = [];

  todos.forEach((todoList) => {
    todoList.todos.forEach((todo) => {
      if (todo.date) {
        const todoDate = new Date(todo.date);
        const today = new Date();
        const controlDate = new Date();

        if (todoDate.getTime() < today.getTime())
          overdue.push({ ...todo, list: todoList.list });
        controlDate.setDate(controlDate.getDate() + 1);
        if (
          todoDate.getTime() < controlDate.getTime() &&
          todoDate.getTime() > today.getTime()
        )
          tomorrow.push({ ...todo, list: todoList.list });
        controlDate.setDate(controlDate.getDate() + 6);
        if (
          todoDate.getTime() < controlDate.getTime() &&
          todoDate.getTime() > today.getTime()
        )
          nextWeek.push({ ...todo, list: todoList.list });
        controlDate.setDate(controlDate.getDate() - 7);
        controlDate.setMonth(controlDate.getMonth() + 1);
        if (
          todoDate.getTime() < controlDate.getTime() &&
          todoDate.getTime() > today.getTime()
        )
          nextMonth.push({ ...todo, list: todoList.list });
        if (todoDate.getTime() > controlDate.getTime())
          later.push({ ...todo, list: todoList.list });
      } else {
        dateless.push({ ...todo, list: todoList.list });
      }
    });
  });

  return (
    <div className="todolist ">
      {overdue.length > 0 && <p className="overdue">Overdue</p>}
      {overdue.map((todo, index) => (
        <TodoItem
          onCompleteTodo={onCompleteTodo}
          key={index}
          todo={todo}
          onToggleEditTodo={onToggleEditTodo}
          overdue
        />
      ))}
      {tomorrow.length > 0 && <p className="">Tomorrow</p>}
      {tomorrow.map((todo, index) => (
        <TodoItem
          onCompleteTodo={onCompleteTodo}
          key={index}
          todo={todo}
          onToggleEditTodo={onToggleEditTodo}
        />
      ))}
      {nextWeek.length > 0 && <p className="">Next week</p>}
      {nextWeek.map((todo, index) => (
        <TodoItem
          onCompleteTodo={onCompleteTodo}
          key={index}
          todo={todo}
          onToggleEditTodo={onToggleEditTodo}
        />
      ))}
      {nextMonth.length > 0 && <p className="">Next month</p>}
      {nextMonth.map((todo, index) => (
        <TodoItem
          onCompleteTodo={onCompleteTodo}
          key={index}
          todo={todo}
          onToggleEditTodo={onToggleEditTodo}
        />
      ))}
      {later.length > 0 && <p className="">Later</p>}
      {later.map((todo, index) => (
        <TodoItem
          onCompleteTodo={onCompleteTodo}
          key={index}
          todo={todo}
          onToggleEditTodo={onToggleEditTodo}
        />
      ))}
      {dateless.length > 0 && <p className="">Dateless</p>}
      {dateless.map((todo, index) => (
        <TodoItem
          onCompleteTodo={onCompleteTodo}
          key={index}
          todo={todo}
          onToggleEditTodo={onToggleEditTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
