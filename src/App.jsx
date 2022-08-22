import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";
import NewList from "./components/NewList";

import "./styles/App.css";

const TODOS = [
  {
    list: "Default",
    todos: [
      {
        id: 0,
        description: "Default Todo 1",
        date: "",
        time: "",
        finished: false,
      },
      {
        id: 1,
        description: "Default Todo 2",
        date: "",
        time: "",
        finished: false,
      },
      {
        id: 2,
        description: "Default Todo 3",
        date: "2022-08-31",
        time: "11:50",
        finished: false,
      },
    ],
  },
  {
    list: "Shopping",
    todos: [
      {
        id: 0,
        description: "Shopping Todo 1",
        date: "2022-07-19",
        time: "",
        finished: true,
      },
    ],
  },
  { list: "Personal", todos: [] },
  { list: "Work", todos: [] },
];

function App() {
  const [todos, setTodos] = useState(TODOS);
  const [todoFormIsOpen, setTodoFormIsOpen] = useState(false);
  const [todoEditForm, setTodoEditForm] = useState(false);
  const [toggleListForm, setToggleListForm] = useState(false);

  const addNewTodo = (newTodo) => {
    console.log(newTodo, todos);
    const { list, ...todo } = newTodo;
    //Get index todo list index
    const todoListIndex = todos.findIndex((todoList) => todoList.list === list);
    console.log(todoListIndex);
    //Get the last ID of current todo list
    let newId = 0;
    todos[todoListIndex].todos.forEach((todo) => {
      if (todo.id >= newId) newId = todo.id + 1;
    });
    // Push new todo into todo list
    const newTodoInList = [
      ...todos[todoListIndex].todos,
      { ...todo, id: newId },
    ];
    console.log(newTodoInList);
    const newTodos = [...todos];
    newTodos[todoListIndex] = {
      ...newTodos[todoListIndex],
      todos: newTodoInList,
    };
    setTodoFormIsOpen(false);
    setTodos(newTodos);

    /*  setTodos([ ...todos, todos[todoListIndex]:newTodoInList]); */
  };

  const handleOpenForm = (todoData = null) => {
    console.log("Click add");
    setTodoFormIsOpen((prev) => !prev);
  };

  const toggleEditForm = (todo = null) => {
    if (todo) setTodoEditForm(todo);
    else {
      setTodoEditForm(false);
    }
  };

  const handleEditTodo = (todo = null) => {
    console.log("Edit todo", todo);
    const { list, ...newTodo } = todo;
    const todoListIndex = todos.findIndex((todoList) => todoList.list === list);

    const newTodoList = [...todos[todoListIndex].todos];
    const todoIndex = newTodoList.findIndex((todo) => todo.id === newTodo.id);
    newTodoList[todoIndex] = newTodo;

    const updatedTodos = [...todos];
    updatedTodos[todoListIndex].todos = newTodoList;

    setTodoEditForm(false);
    setTodos(updatedTodos);
  };

  const handleCompleteTodo = (todo) => {
    console.log("Mark as completed", todo);
    const { list, ...newTodo } = todo;
    newTodo.finished = !newTodo.finished;

    const todoListIndex = todos.findIndex((todoList) => {
      return todoList.list === list;
    });
    const newTodosList = todos[todoListIndex].todos;
    const todoIndex = newTodosList.findIndex((todo) => newTodo.id === todo.id);

    newTodosList[todoIndex] = newTodo;
    const updatedTodos = [...todos];
    updatedTodos[todoListIndex].todos = newTodosList;

    setTodos(updatedTodos);
  };

  const handleNewList = (list) => {
    console.log("New list", list);
    const newTodoList = { list: list, todos: [] };
    const newTodos = [...todos, newTodoList];
    console.log(newTodos);
    setTodos(newTodos);
  };

  const toggleNewListForm = () => {
    setToggleListForm((prev) => !prev);
  };

  return (
    <div className="App">
      <Header todos={todos} onOpenListForm={toggleNewListForm} />
      <TodoList
        todos={todos}
        onToggleEditTodo={toggleEditForm}
        onCompleteTodo={handleCompleteTodo}
      />
      <Footer onOpenForm={handleOpenForm} />
      {todoFormIsOpen && (
        <NewTodo
          onAddNewTodo={addNewTodo}
          onCloseForm={handleOpenForm}
          todos={todos}
          onToggleListForm={toggleNewListForm}
        />
      )}
      {todoEditForm && (
        <NewTodo
          isEdit
          data={todoEditForm}
          onEditTodo={handleEditTodo}
          onCloseForm={toggleEditForm}
          todos={todos}
          onToggleListForm={toggleNewListForm}
        />
      )}
      {toggleListForm && (
        <NewList
          onAddList={handleNewList}
          onToggleListForm={toggleNewListForm}
        />
      )}
    </div>
  );
}

export default App;
