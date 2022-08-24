import TodoItem from "./TodoItem";

import "../styles/TodoList.css";

const TodoList = ({
  todos,
  onToggleEditTodo,
  onCompleteTodo,
  onDeleteTodo,
}) => {
  const overdue = [];
  const dateless = [];
  const tomorrow = [];
  const nextWeek = [];
  const nextMonth = [];
  const later = [];

  const communPorps = {
    onCompleteTodo: onCompleteTodo,
    onToggleEditTodo: onToggleEditTodo,
    onDeleteTodo: onDeleteTodo,
  };

  let addToDueList = (todo) => {
    const todoDate = new Date(todo.date).getTime();
    const today = new Date();
    const dueTimes = {
      today: today.getTime(),
      tomorrow: today.setDate(today.getDate() + 1),
      nextWeek: today.setDate(today.getDate() + 6),
      nextMonth: today.setMonth(today.getMonth() + 1, today.getDate() - 7),
    };

    if (todoDate < dueTimes.today) overdue.push(todo);
    else if (todoDate < dueTimes.tomorrow) tomorrow.push(todo);
    else if (todoDate < dueTimes.nextWeek) nextWeek.push(todo);
    else if (todoDate < dueTimes.nextMonth) nextMonth.push(todo);
    else later.push(todo);
  };
  const organizeTodos = () => {
    todos.forEach((todoList) => {
      todoList.todos.forEach((todo) => {
        if (todo.date) {
          addToDueList({ ...todo, list: todoList.list });
        } else {
          dateless.push({ ...todo, list: todoList.list });
        }
      });
    });
  };

  organizeTodos();

  return (
    <div className="todolist ">
      {overdue.length > 0 && <p className="overdue">Overdue</p>}
      {overdue.map((todo, index) => (
        <TodoItem {...communPorps} key={index} todo={todo} overdue />
      ))}
      {tomorrow.length > 0 && <p className="">Tomorrow</p>}
      {tomorrow.map((todo, index) => (
        <TodoItem {...communPorps} key={index} todo={todo} />
      ))}
      {nextWeek.length > 0 && <p className="">Next week</p>}
      {nextWeek.map((todo, index) => (
        <TodoItem {...communPorps} key={index} todo={todo} />
      ))}
      {nextMonth.length > 0 && <p className="">Next month</p>}
      {nextMonth.map((todo, index) => (
        <TodoItem {...communPorps} key={index} todo={todo} />
      ))}
      {later.length > 0 && <p className="">Later</p>}
      {later.map((todo, index) => (
        <TodoItem {...communPorps} key={index} todo={todo} />
      ))}
      {dateless.length > 0 && <p className="">Dateless</p>}
      {dateless.map((todo, index) => (
        <TodoItem {...communPorps} key={index} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
