import { useState } from "react";

const TODOS = [
  {
    list: "Default",
    todos: [
      {
        id: 0,
        description: "Default Todo 1",
        date: "",
        time: "",
        finished: true,
      },
      {
        id: 1,
        description: "Default Todo 2",
        date: "",
        time: "",
        finished: true,
      },
      {
        id: 2,
        description: "Default Todo 3",
        date: "2022-08-31",
        time: "11:50",
        finished: true,
      },
      {
        id: 3,
        description: "Tomorrow 1",
        date: "2022-08-25",
        time: "11:50",
        finished: false,
      },
      {
        id: 4,
        description: "Next Month 1",
        date: "2022-09-12",
        time: "11:50",
        finished: false,
      },
      {
        id: 5,
        description: "Later",
        date: "2022-10-31",
        time: "11:50",
        finished: false,
      },
      {
        id: 6,
        description: "Overdue",
        date: "2022-08-23",
        time: "11:50",
        finished: false,
      },
      {
        id: 7,
        description: "Next week 1",
        date: "2022-08-27",
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
      {
        id: 1,
        description: "Shopping Todo 2",
        date: "2022-10-19",
        time: "",
        finished: false,
      },
    ],
  },
  { list: "Personal", todos: [] },
  { list: "Work", todos: [] },
];

const useTodos = (toggleEditForm, toggleAddForm) => {
  const [todos, setTodos] = useState(TODOS);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const addNewTodo = (newTodo) => {
    const { list, ...todo } = newTodo;
    //Get index todo list index
    const todoListIndex = todos.findIndex((todoList) => todoList.list === list);
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

    const newTodos = [...todos];
    newTodos[todoListIndex] = {
      ...newTodos[todoListIndex],
      todos: newTodoInList,
    };
    toggleAddForm();
    setTodos(newTodos);
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

    toggleEditForm();
    setTodos(updatedTodos);
  };

  const handleCompleteTodo = (todo) => {
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

  const getCurrentTodos = () => {
    //console.log("Filtering list...", { filter, search });
    const todoFilter = filter.toLowerCase();
    const todoSearch = search.toLowerCase();

    let filteredTodos = null;
    if (todoFilter === "all") {
      let uncompletedTodos = [];
      todos.forEach((todoList) => {
        const tempTodoList = todoList.todos.filter((todo) => !todo.finished);
        uncompletedTodos.push({ ...todoList, todos: tempTodoList });
      });
      /*  console.log("Uncompleted", uncompletedTodos); */
      filteredTodos = [...uncompletedTodos];
    } else if (todoFilter === "completed") {
      const completedTodoList = [];
      todos.forEach((todoList) => {
        const tempList = todoList.todos.filter((todo) => todo.finished);
        completedTodoList.push({ ...todoList, todos: tempList });
      });
      filteredTodos = completedTodoList;
    } else {
      const todoListIndex = todos.findIndex((todoList) => {
        return todoList.list.toLowerCase() === filter.toLowerCase();
      });
      const uncompletedTodos = todos[todoListIndex].todos.filter(
        (todo) => !todo.finished
      );

      filteredTodos = [{ ...todos[todoListIndex], todos: uncompletedTodos }];
    }

    if (todoSearch) {
      const searchedTodos = [];
      filteredTodos.forEach((todoList) => {
        const tempList = todoList.todos.filter((todo) =>
          todo.description.toLowerCase().includes(todoSearch)
        );
        searchedTodos.push({ ...todoList, todos: tempList });
      });

      return searchedTodos;
    }
    return filteredTodos;
  };

  const handleSearchInput = (text) => {
    setSearch(text);
  };

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const handleDeleteTodo = (todo) => {
    const { list, ...todoInfo } = todo;
    const todoListIndex = todos.findIndex((todoList) => todoList.list === list);

    const todoIndex = todos[todoListIndex].todos.findIndex(
      (todo) => todo.id === todoInfo.id
    );

    const newTodoList = [...todos[todoListIndex].todos];
    newTodoList.splice(todoIndex, 1);

    const newTodos = [...todos];
    newTodos[todoListIndex].todos = newTodoList;

    setTodos(newTodos);
  };

  return {
    todos,
    setTodos,
    addNewTodo,
    handleEditTodo,
    handleDeleteTodo,
    handleCompleteTodo,
    handleNewList,
    handleSearchInput,
    handleFilter,
    getCurrentTodos,
  };
};

export default useTodos;
