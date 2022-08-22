import { useState } from "react";
import Modal from "./Modal";

import "../styles/NewList.css";

const NewList = ({ onAddList, onToggleListForm }) => {
  const [listName, setListName] = useState("");

  const handleInput = (e) => {
    setListName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (listName) onAddList(listName);
    onToggleListForm();
  };
  return (
    <Modal>
      <div className="modal">
        <form className="newlist" onSubmit={handleSubmit}>
          <h3>New List</h3>
          <input onChange={handleInput} type="text" placeholder="List name" />
          <div>
            <button type="submit">Add</button>
            <button onClick={onToggleListForm}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewList;
