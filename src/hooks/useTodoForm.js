import { useEffect, useRef, useState } from "react";

const useTodoForm = ({
  onAddNewTodo: handleNewTodo,
  isEdit,
  onCloseForm,
  data,
  onEditTodo: handleEditTodo,
  todos,
  onToggleListForm: handleToggleListForm,
  onDeleteTodo,
}) => {
  const datePicker = useRef(null);
  const timePicker = useRef(null);
  const [animation, setAnimation] = useState(false);
  const [toggleConfirmation, setToggleConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    date: "",
    time: "",
    list: "Default",
    finished: false,
  });

  useEffect(() => {
    if (isEdit) {
      setFormData({ ...data });
    }
  }, [isEdit, data]);

  useEffect(() => {
    setAnimation(true);
  }, []);

  const selectOptions = todos.map((todos) => ({
    value: todos.list,
    label: todos.list,
  }));

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const toggleDatePicker = () => {
    datePicker.current.showPicker();
  };
  const toggleTimePicker = () => {
    timePicker.current.showPicker();
  };
  const removeDate = () => {
    setFormData({ ...formData, date: "", time: "" });
  };
  const removeTime = () => {
    setFormData({ ...formData, time: "" });
  };
  const handleList = (value) => {
    setFormData({ ...formData, list: value });
  };
  const handleFinished = (value) => {
    setFormData({ ...formData, finished: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      if (formData.description) {
        handleNewTodo(formData);
      }
    } else {
      handleEditTodo(formData);
    }
    handleCloseForm();
  };

  const handleDelete = () => {
    onDeleteTodo(data);
    handleToggleConfirmation();
    setAnimation(false);
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setAnimation(false);
    setTimeout(() => {
      onCloseForm();
    }, 500);
  };

  const handleToggleConfirmation = () => {
    setToggleConfirmation((prevState) => !prevState);
  };
  return {
    animation,
    formData,
    datePicker,
    timePicker,
    selectOptions,
    handleInput,
    handleFinished,
    handleList,
    handleCloseForm,
    handleToggleConfirmation,
    handleToggleListForm,
    handleSubmit,
    handleDelete,
    toggleConfirmation,
    toggleDatePicker,
    toggleTimePicker,
    removeDate,
    removeTime,
  };
};

export default useTodoForm;
