import Header from "./components/Header";
/* import NewTodo from "./components/NewTodo"; */
import TodoList from "./components/TodoList";

import "./styles/App.css";

const todos = [
  {
    name: "Default",
    todos: [{ todo: "First Todo example", date: null, finished: false }],
  },
  { name: "Shopping", todos: [] },
  { name: "Personal", todos: [] },
  { name: "Work", todos: [] },
];

function App() {
  return (
    <div className="App">
      <Header todos={todos} />
      <TodoList todos={todos} />
      {/*  <NewTodo /> */}
    </div>
  );
}

export default App;
