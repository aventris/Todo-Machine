import { RiAddLine } from "react-icons/ri";

import "../styles/Footer.css";

const Footer = ({ onOpenForm: handleOpenForm }) => {
  return (
    <div className="footer">
      <input
        name="fast-note"
        className="fast-note"
        type="text"
        placeholder="Fast note"
      />
      <div className="add-note" onClick={handleOpenForm}>
        <RiAddLine color="#0276bf" />
      </div>
    </div>
  );
};

export default Footer;
