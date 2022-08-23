import { useEffect } from "react";

const SearchInput = ({ onChange, onCloseSearch, boxRef }) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        onCloseSearch();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [boxRef, onCloseSearch]);

  return <input onChange={onChange} type="text" placeholder="Search Todo" />;
};

export default SearchInput;
