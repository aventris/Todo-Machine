import { RiAddLine } from "react-icons/ri";

import "../styles/Footer.css";

const Footer = ({ onOpenForm: handleOpenForm }) => {
  return (
    <div className="footer">
      <div className="add-note" onClick={handleOpenForm}>
        <RiAddLine color="#0276bf" />
      </div>
    </div>
  );
};

export default Footer;
