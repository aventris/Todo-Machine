import Modal from "./Modal";

import "../styles/NewList.css";

const NewList = () => {
  return (
    <Modal>
      <div className="newlist">
        <h3>New List</h3>
        <input type="text" placeholder="List name" />
        <div>
          <button>Add</button>
          <button>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default NewList;
