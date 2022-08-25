import TodoItem from "./TodoItem";

import "../styles/TodoList.css";

const TodoList = ({
  todos,
  onToggleEditTodo,
  onCompleteTodo,
  onDeleteTodo,
}) => {
  const overdue = [];
  const today = [];
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
    const dateString = `${todo.date} ${todo.time ? todo.time : "00:00"}`;
    const todoDate = new Date(dateString).getTime();
    const todayDate = new Date();

    const dueTimes = {
      overdue: todayDate.getTime(),
      today: todayDate.setHours(23, 59, 59),
      tomorrow: todayDate.setDate(todayDate.getDate() + 1),
      nextWeek: todayDate.setDate(todayDate.getDate() + 6),
      nextMonth: todayDate.setMonth(
        todayDate.getMonth() + 1,
        todayDate.getDate() - 7
      ),
    };

    if (todoDate < dueTimes.overdue) overdue.push(todo);
    else if (todoDate < dueTimes.today) today.push(todo);
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
      {overdue.map((todo) => (
        <TodoItem
          {...communPorps}
          key={todo.list + todo.id}
          todo={todo}
          overdue
        />
      ))}
      {today.length > 0 && <p className="">Today</p>}
      {today.map((todo) => (
        <TodoItem {...communPorps} key={todo.list + todo.id} todo={todo} />
      ))}
      {tomorrow.length > 0 && <p className="">Tomorrow</p>}
      {tomorrow.map((todo) => (
        <TodoItem {...communPorps} key={todo.list + todo.id} todo={todo} />
      ))}
      {nextWeek.length > 0 && <p className="">Next week</p>}
      {nextWeek.map((todo) => (
        <TodoItem {...communPorps} key={todo.list + todo.id} todo={todo} />
      ))}
      {nextMonth.length > 0 && <p className="">Next month</p>}
      {nextMonth.map((todo) => (
        <TodoItem {...communPorps} key={todo.list + todo.id} todo={todo} />
      ))}
      {later.length > 0 && <p className="">Later</p>}
      {later.map((todo) => (
        <TodoItem {...communPorps} key={todo.list + todo.id} todo={todo} />
      ))}
      {dateless.length > 0 && <p className="">Dateless</p>}
      {dateless.map((todo) => (
        <TodoItem {...communPorps} key={todo.list + todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
