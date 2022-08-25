const STORAGE_KEY = "@todo-list/todos-info";
const INITIAL_LIST = [
  { list: "Default", todos: [] },
  { list: "Shopping", todos: [] },
  { list: "Personal", todos: [] },
  { list: "Work", todos: [] },
];
const useLocalStorage = () => {
  const getDataFromLocalStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return INITIAL_LIST;
    return JSON.parse(data);
  };

  const setDataToLocalStorage = (data) => {
    const dataString = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, dataString);
  };

  return {
    getDataFromLocalStorage,
    setDataToLocalStorage,
  };
};

export default useLocalStorage;
