import { RiMenuAddFill } from "react-icons/ri";
import { BiArrowBack, BiCalendarEvent } from "react-icons/bi";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { AiFillClockCircle } from "react-icons/ai";

import "../styles/NewTodo.css";
import { useRef } from "react";

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
      </div>
      <form action="" className="data">
        {/* <div className="input-row"></div> */}
        <div className="input-row">
          <label htmlFor="todo">What is to be done?</label>
          <input type="text" id="todo" placeholder="Enter task" />
        </div>

        <div className="checkbox">
          <ImCheckboxUnchecked id="finished" />
          <label htmlFor="finished">Is it finished</label>
        </div>

        <div className="input-row">
          <label htmlFor="date">Deadline date</label>
          <div className="input-wrapper">
            <input
              onClick={toggleDatePicker}
              ref={datePicker}
              className="picker"
              type="date"
              id="date"
            />
            <BiCalendarEvent onClick={toggleDatePicker} />
          </div>

          <label htmlFor="hour">Deadline time</label>
          <div className="input-wrapper">
            <input className="picker" ref={timePicker} type="time" id="hour" />
            <AiFillClockCircle onClick={toggleTimePicker} />
          </div>
        </div>
        <label htmlFor="list">Add to list</label>
        <select name="list" id="list">
          <option value="defualt">Default</option>
          <option value="defualt">Shopping list</option>
          <option value="defualt">Work</option>
          <option value="defualt">Personal</option>
        </select>
        <button>
          <RiMenuAddFill />
        </button>
      </form>
    </div>
  );
};

export default NewTodo;
