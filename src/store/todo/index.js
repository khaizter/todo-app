import { createSlice } from "@reduxjs/toolkit";

// const SERVER_DOMAIN = "http://localhost:8080";
const SERVER_DOMAIN = "https://todo-express-mongodb-backend.herokuapp.com";

const initialState = {
  items: [],
  filter: "all",
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    setItems: (state, action) => {
      // mutate items
      state.items = action.payload;
    },
    setFilter: (state, action) => {
      // state.filter = payload.filter
      state.filter = action.payload;
    },
  },
});

// original actions
export const { setItems, setFilter } = todoSlice.actions;

// thunks

export const fetchItems = () => async (dispatch, getState) => {
  const userToken = getState().auth.token;
  fetch(SERVER_DOMAIN + "/todo", {
    headers: {
      Authorization: "Bearer " + userToken,
    },
    credentials: "include",
  })
    .then((res) => {
      if (res.status !== 200) {
        res.json().then((errorData) => {
          console.log(errorData);
        });
      } else {
        res.json().then((data) => {
          dispatch(setItems(data.items));
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const syncItems = (newItems) => async (dispatch, getState) => {
  const userToken = getState().auth.token;
  const items = getState().todo.items;
  fetch(SERVER_DOMAIN + "/todo/overwrite-items", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ items: newItems || items }),
  })
    .then((res) => {
      console.log(res);
      dispatch(fetchItems());
    })
    .catch((err) => console.log(err));
};

export const createTask = (item) => async (dispatch, getState) => {
  const userToken = getState().auth.token;
  fetch(SERVER_DOMAIN + "/todo/add-task", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      task: item.task,
      status: item.status,
    }),
  })
    .then((res) => {
      console.log(res);
      dispatch(fetchItems());
    })
    .catch((err) => console.log(err));
};

export const deleteTask = (_id) => async (dispatch, getState) => {
  const userToken = getState().auth.token;
  fetch(SERVER_DOMAIN + "/todo/remove-task/" + _id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + userToken,
    },
    credentials: "include",
  })
    .then((res) => {
      console.log(res);
      dispatch(fetchItems());
    })
    .catch((err) => console.log(err));
};

export const toggleTaskStatus =
  (_id, currentStatus) => async (dispatch, getState) => {
    const userToken = getState().auth.token;
    const newStatus = currentStatus === "in progress" ? "done" : "in progress";
    fetch(SERVER_DOMAIN + "/todo/update-task/" + _id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + userToken,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        status: newStatus,
      }),
    })
      .then((res) => {
        console.log(res);
        dispatch(fetchItems());
      })
      .catch((err) => console.log(err));
  };

export const clearCompleteTask = () => async (dispatch, getState) => {
  const userToken = getState().auth.token;
  const items = getState().todo.items;
  const updatedItems = items.filter((item) => item.status !== "done");
  fetch(SERVER_DOMAIN + "/todo/overwrite-items", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ items: updatedItems }),
  })
    .then((res) => {
      console.log(res);
      dispatch(fetchItems());
    })
    .catch((err) => console.log(err));
};

export const reorderTasks =
  (source, destination) => async (dispatch, getState) => {
    const items = getState().todo.items;
    const itemsCopy = [...items];
    const sourceIndex = itemsCopy.findIndex((item) => item === source);
    const destinationIndex = itemsCopy.findIndex(
      (item) => item === destination
    );
    const [reorderedItem] = itemsCopy.splice(sourceIndex, 1);
    itemsCopy.splice(destinationIndex, 0, reorderedItem);
    dispatch(setItems(itemsCopy));
    dispatch(syncItems(itemsCopy));
  };

export default todoSlice.reducer;
