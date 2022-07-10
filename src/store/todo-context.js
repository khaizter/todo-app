import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  userToken: null,
  currentUser: null,
  signup: () => {},
  signin: () => {},
  logout: () => {},
});

const SERVER_DOMAIN = "http://localhost:8080";

export const TodoContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("dark");
  const [userToken, setUserToken] = useState();
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  const fetchItems = async () => {
    fetch(SERVER_DOMAIN + "/todo", {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          res.json().then((errorData) => {
            console.log(errorData);
          });
        } else {
          res.json().then((data) => {
            setItems(data.items);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // sync items to db by order
  const syncItems = (newItems) => {
    return fetch(SERVER_DOMAIN + "/todo/overwrite-items", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: newItems || items }),
    });
  };

  useEffect(() => {
    if (!userToken) return;
    fetchItems();
  }, [userToken]);

  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.status === filter);

  const createTodoHandler = async (item) => {
    fetch(SERVER_DOMAIN + "/todo/add-task", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: item.task,
        status: item.status,
      }),
    })
      .then((res) => {
        fetchItems();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const deleteTodoHandler = (_id) => {
    fetch(SERVER_DOMAIN + "/todo/remove-task/" + _id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((res) => {
        fetchItems();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const toggleTodoStatusHandler = (_id, currentStatus) => {
    const newStatus = currentStatus === "in progress" ? "done" : "in progress";

    fetch(SERVER_DOMAIN + "/todo/update-task/" + _id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    })
      .then((res) => {
        fetchItems();
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const clearCompleteHandler = () => {
    const updatedItems = items.filter((item) => item.status !== "done");
    fetch(SERVER_DOMAIN + "/todo/overwrite-items", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: updatedItems }),
    })
      .then((res) => {
        fetchItems();
        console.log(res);
      })
      .catch((err) => console.log(err));
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
    syncItems(itemsCopy)
      .then((result) => {
        console.log(result);
        fetchItems();
      })
      .catch((err) => console.log(err));
  };

  const toggleThemeHandler = () => {
    setTheme((prevState) => (prevState === "dark" ? "light" : "dark"));
  };

  const signupHandler = (formData, setAsyncError) => {
    fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((error) => {
            console.log(error);
            if (error.data) {
              setAsyncError(error.data);
            }
          });
        } else {
          res.json().then((data) => {
            console.log(data);
            navigate("/auth/login", { replace: false });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const signinHandler = (formData, setAsyncError) => {
    fetch("http://localhost:8080/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((error) => {
            console.log(error);
            if (error.data) {
              setAsyncError(error.data);
            }
          });
        } else {
          res.json().then((data) => {
            console.log(data);
            // store user token

            setUserToken(data.token);
            setCurrentUser(data.userName);
            navigate("/todo", { replace: false });
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const logoutHandler = () => {
    setUserToken(null);
    setCurrentUser(null);
    navigate("/auth/login", { replace: false });
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
        userToken: userToken,
        currentUser: currentUser,
        signup: signupHandler,
        signin: signinHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
