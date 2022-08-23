import { useState } from "react";

const useUI = () => {
  const [todoFormIsOpen, setTodoFormIsOpen] = useState(false);
  const [todoEditForm, setTodoEditForm] = useState(false);
  const [listFormIsOpen, setListFormIsOpen] = useState(false);

  const toggleAddForm = () => {
    setTodoFormIsOpen((prev) => !prev);
  };

  const toggleEditForm = (todo = null) => {
    if (todo) setTodoEditForm(todo);
    else {
      setTodoEditForm(false);
    }
  };

  const toggleNewListForm = () => {
    setListFormIsOpen((prev) => !prev);
  };

  return {
    todoFormIsOpen,
    todoEditForm,
    listFormIsOpen,
    toggleAddForm,
    toggleEditForm,
    toggleNewListForm,
  };
};

export default useUI;
