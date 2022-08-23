import TodosListsFormMenu from "./TodosListsFormMenu";

import { BiArrowBack, BiCalendarEvent } from "react-icons/bi";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import {
  AiFillClockCircle,
  AiFillDelete,
  AiFillCloseCircle,
} from "react-icons/ai";

import { BsCheck } from "react-icons/bs";

import "../styles/NewTodo.css";
import { useEffect, useRef, useState } from "react";
/* import NewList from "./NewList"; */

const NewTodo = ({
  onAddNewTodo: handleNewTodo,
  isEdit,
  onCloseForm,
  data,
  onEditTodo: handleEditTodo,
  todos,
  onToggleListForm,
}) => {
  const datePicker = useRef(null);
  const timePicker = useRef(null);
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
    datePicker.current.value = "";
    setFormData({ ...formData, date: "" });
    removeTime();
  };
  const removeTime = () => {
    timePicker.current.value = "";
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
  };

  return (
    <div className="newtodo">
      <div className="title">
        <BiArrowBack onClick={() => onCloseForm()} />
        <h3>{isEdit ? "Update todo" : "New Todo"}</h3>
        {isEdit ? <AiFillDelete /> : <span className="blank-space"></span>}
      </div>
      <form onSubmit={handleSubmit} className="data">
        <div className="input-row">
          <label htmlFor="description">What is to be done?</label>
          <input
            onChange={handleInput}
            value={formData.description}
            type="text"
            id="description"
            placeholder="Enter task"
            required
          />
        </div>
        {isEdit && (
          <div className="checkbox">
            {formData.finished ? (
              <ImCheckboxChecked
                onClick={() => handleFinished(false)}
                id="finished"
              />
            ) : (
              <ImCheckboxUnchecked
                onClick={() => handleFinished(true)}
                id="finished"
              />
            )}
            <label htmlFor="finished">Is it finished</label>
          </div>
        )}

        <div className="input-row time">
          <label>Due date</label>
          <div className="date-time">
            <input
              onChange={handleInput}
              value={formData.date}
              onClick={toggleDatePicker}
              ref={datePicker}
              className="picker"
              type="date"
              id="date"
            />
            <BiCalendarEvent onClick={toggleDatePicker} />
            {formData.date && <AiFillCloseCircle onClick={removeDate} />}
          </div>
          {formData.date && (
            <>
              <label>Time</label>
              <div className="date-time">
                <input
                  onChange={handleInput}
                  value={formData.time}
                  onClick={toggleTimePicker}
                  className="picker"
                  ref={timePicker}
                  type="time"
                  id="time"
                />
                <AiFillClockCircle onClick={toggleTimePicker} />
                {formData.time && <AiFillCloseCircle onClick={removeTime} />}
              </div>
            </>
          )}
        </div>
        <div className="input-row list">
          <label htmlFor="list">Add to list</label>
          <TodosListsFormMenu
            onChange={handleList}
            value={formData.list}
            options={selectOptions}
            onToggleListForm={onToggleListForm}
          />
        </div>
        <button type="submit">
          <BsCheck />
        </button>
      </form>
    </div>
  );
};

export default NewTodo;
