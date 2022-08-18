import { createPortal } from "react-dom";
import "../styles/Modal.css";

const Modal = ({ children }) => {
  return createPortal(children, document.getElementById("modal"));
};

export default Modal;
