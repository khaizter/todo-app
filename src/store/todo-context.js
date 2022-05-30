import React, { useState } from "react";

const TodoContext = React.createContext({
  items: [{}],
  filteredItems: [{}],
  createTodo: () => {},
  deleteTodo: () => {},
  toggleTodoStatus: () => {},
  clearComplete: () => {},
  setFilter: () => {},
  reorderItems: () => {},
  theme: "",
  toggleTheme: () => {},
});

const DUMMY_ITEMS = [
  { id: "2001", todo: "Complete online Javascript course", status: "complete" },
  { id: "2002", todo: "10 minutes meditation", status: "active" },
  { id: "2003", todo: "12 minutes meditation", status: "active" },
  { id: "2004", todo: "13 minutes meditation", status: "active" },
  {
    id: "2005",
    todo: "Complete Todo App on Frontend Mentor",
    status: "active",
  },
];

export const TodoContextProvider = ({ children }) => {
  const [items, setItems] = useState(DUMMY_ITEMS);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("dark");

  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.status === filter);

  const createTodoHandler = (item) => {
    setItems((prevState) => [...prevState, item]);
  };
  const deleteTodoHandler = (id) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
  };

  const toggleTodoStatusHandler = (id) => {
    setItems((prevState) => {
      let selectedItem = prevState.find((item) => item.id === id);
      const selectedItemIndex = prevState.findIndex(
        (item) => item === selectedItem
      );
      const previousStatus = selectedItem.status;
      const newStatus = previousStatus === "active" ? "complete" : "active";
      selectedItem = { ...selectedItem, status: newStatus };
      prevState[selectedItemIndex] = selectedItem;
      return [...prevState];
    });
  };

  const clearCompleteHandler = () => {
    setItems((prevState) => {
      return prevState.filter((item) => item.status !== "complete");
    });
  };

  const setFilterHandler = (filter) => {
    setFilter(filter);
  };

  const reorderItemsHandler = (source, destination) => {
    const itemsCopy = [...items];
    const sourceIndex = itemsCopy.findIndex((item) => item === source);
    const destinationIndex = itemsCopy.findIndex(
      (item) => item === destination
    );
    const [reorderedItem] = itemsCopy.splice(sourceIndex, 1);
    itemsCopy.splice(destinationIndex, 0, reorderedItem);
    setItems(itemsCopy);
  };

  const toggleThemeHandler = () => {
    setTheme((prevState) => (prevState === "dark" ? "light" : "dark"));
  };

  return (
    <TodoContext.Provider
      value={{
        items: items,
        filteredItems: filteredItems,
        createTodo: createTodoHandler,
        deleteTodo: deleteTodoHandler,
        toggleTodoStatus: toggleTodoStatusHandler,
        clearComplete: clearCompleteHandler,
        setFilter: setFilterHandler,
        reorderItems: reorderItemsHandler,
        theme: theme,
        toggleTheme: toggleThemeHandler,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
