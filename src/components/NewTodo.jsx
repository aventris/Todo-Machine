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

import DeleteConfirmation from "./DeleteConfirmation";

import useTodoForm from "../hooks/useTodoForm";

const NewTodo = (props) => {
  const {
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
  } = useTodoForm(props);
  return (
    <>
      <div className={`newtodo${animation ? " visible" : " hidden"}`}>
        <div className="title">
          <BiArrowBack onClick={handleCloseForm} />
          <h3>{props.isEdit ? "Update todo" : "New Todo"}</h3>
          {props.isEdit ? (
            <AiFillDelete onClick={handleToggleConfirmation} />
          ) : (
            <span className="blank-space"></span>
          )}
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
          {props.isEdit && (
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
              onToggleListForm={handleToggleListForm}
            />
          </div>
          <button type="submit">
            <BsCheck />
          </button>
        </form>
      </div>
      {toggleConfirmation && (
        <DeleteConfirmation
          onCancel={handleToggleConfirmation}
          onAction={handleDelete}
        />
      )}
    </>
  );
};

export default NewTodo;
