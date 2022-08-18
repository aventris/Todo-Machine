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
import { useRef } from "react";
/* import NewList from "./NewList"; */

const todos = [
  {
    name: "Default",
    todos: [{ todo: "First Todo example", date: null, finished: false }],
  },
  { name: "Shopping", todos: [] },
  { name: "Personal", todos: [] },
  { name: "Work", todos: [] },
];

const selectOptions = todos.map((todos) => ({
  value: todos.name,
  label: todos.name,
}));

const NewTodo = () => {
  const datePicker = useRef(null);
  const timePicker = useRef(null);

  const toggleDatePicker = () => {
    datePicker.current.showPicker();
  };
  const toggleTimePicker = () => {
    timePicker.current.showPicker();
  };
  return (
    <div className="newtodo">
      <div className="title">
        <BiArrowBack />
        <h3>New Todo</h3>
        <AiFillDelete />
      </div>
      <form action="" className="data">
        <div className="input-row">
          <label htmlFor="todo">What is to be done?</label>
          <input type="text" id="todo" placeholder="Enter task" />
        </div>

        <div className="checkbox">
          <ImCheckboxUnchecked id="finished" />
          <label htmlFor="finished">Is it finished</label>
        </div>

        <div className="input-row">
          <label>Due date</label>
          <div className="date-time">
            <input
              onClick={toggleDatePicker}
              ref={datePicker}
              className="picker"
              type="date"
              id="date"
            />
            <BiCalendarEvent onClick={toggleDatePicker} />
            <AiFillCloseCircle />
          </div>

          <label>Time</label>
          <div className="date-time">
            <input
              onClick={toggleTimePicker}
              className="picker"
              ref={timePicker}
              type="time"
              id="hour"
            />
            <AiFillClockCircle onClick={toggleTimePicker} />
            <AiFillCloseCircle />
          </div>
        </div>
        <div className="input-row list">
          <label htmlFor="list">Add to list</label>
          <TodosListsFormMenu options={selectOptions} growFromBottom />
        </div>
        <button>
          <BsCheck />
        </button>
      </form>
      {/* <NewList /> */}
    </div>
  );
};

export default NewTodo;
