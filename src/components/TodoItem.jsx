import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

import "../styles/TodoItem.css";

const TodoItem = () => {
  return (
    <div className="todoitem">
      <ImCheckboxUnchecked className="completed" />
      <div className="data">
        <span className="description">
          Todo test with a moderate long task to test when there is an overflow
          in todo text. Let's write some more words to make it longer
        </span>
        <span className="date">Vie., 30 sep. 2022</span>
        <span className="list">Shopping list</span>
      </div>
    </div>
  );
};

export default TodoItem;
