import Modal from "./Modal";

import "../styles/DeleteConfirmation.css";

const DeleteConfirmation = ({ onCancel, onAction }) => {
  return (
    <Modal>
      <div className="confirmation">
        <div className="container">
          <h3>Are you sure?</h3>
          <div className="button-container">
            <button onClick={onCancel}>Cancel</button>
            <button onClick={onAction}>Delete</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
