import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
const useTodos = () => {
  const { getDataFromLocalStorage, setDataToLocalStorage } = useLocalStorage();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const todosData = getDataFromLocalStorage();
    setTodos(todosData);
    // eslint-disable-next-line
  }, []);

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

    setTodos(newTodos);
    setDataToLocalStorage(newTodos);
  };

  const handleEditTodo = (todo = null) => {
    const { list, ...newTodo } = todo;
    const todoListIndex = todos.findIndex((todoList) => todoList.list === list);

    const newTodoList = [...todos[todoListIndex].todos];
    const todoIndex = newTodoList.findIndex((todo) => todo.id === newTodo.id);
    newTodoList[todoIndex] = newTodo;

    const updatedTodos = [...todos];
    updatedTodos[todoListIndex].todos = newTodoList;

    setTodos(updatedTodos);
    setDataToLocalStorage(updatedTodos);
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
    setDataToLocalStorage(updatedTodos);
  };

  const handleNewList = (list) => {
    const newTodoList = { list: list, todos: [] };
    const newTodos = [...todos, newTodoList];
    setTodos(newTodos);
    setDataToLocalStorage(newTodos);
  };

  const getCurrentTodos = () => {
    const todoFilter = filter.toLowerCase();
    const todoSearch = search.toLowerCase();

    let filteredTodos = null;
    if (todoFilter === "all") {
      let uncompletedTodos = [];
      todos.forEach((todoList) => {
        const tempTodoList = todoList.todos.filter((todo) => !todo.finished);
        uncompletedTodos.push({ ...todoList, todos: tempTodoList });
      });
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
    setDataToLocalStorage(newTodos);
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
