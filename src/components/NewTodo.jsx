import { RiMenuAddFill } from "react-icons/ri";
import "../styles/NewTodo.css";

const NewTodo = () => {
  return (
    <div className="newtodo">
      <label htmlFor="todo">What is to be done?</label>
      <input type="text" name="todo" />
      <input type="checkbox" name="finished" />
      <label htmlFor="finished">Is it finished</label>
      <label htmlFor="date">Deadline</label>
      <input type="text" name="date" />
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
    </div>
  );
};

export default NewTodo;
