import { createSlice } from "@reduxjs/toolkit";

// const SERVER_DOMAIN = "http://localhost:8080";
const SERVER_DOMAIN = process.env.REACT_APP_BACKEND_URI;

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
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    toggleItem: (state, action) => {
      const selectedItem = state.items.find(
        (item) => item._id === action.payload
      );
      const currentStatus = selectedItem.status;
      const newStatus =
        currentStatus === "in progress" ? "done" : "in progress";
      selectedItem.status = newStatus;
    },
    reorderItems: (state, action) => {
      const { source, destination } = action.payload;
      const itemsCopy = [...state.items];
      const sourceIndex = itemsCopy.findIndex(
        (item) => item._id === source._id
      );
      const destinationIndex = itemsCopy.findIndex(
        (item) => item._id === destination._id
      );
      const [reorderedItem] = itemsCopy.splice(sourceIndex, 1);
      itemsCopy.splice(destinationIndex, 0, reorderedItem);
      state.items = itemsCopy;
    },
    clearComplete: (state, action) => {
      const updatedItems = state.items.filter((item) => item.status !== "done");
      state.items = updatedItems;
    },
  },
});

// original actions
export const {
  setItems,
  setFilter,
  addItem,
  removeItem,
  toggleItem,
  reorderItems,
  clearComplete,
} = todoSlice.actions;

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

export const saveItems = (callback) => async (dispatch, getState) => {
  const userToken = getState().auth.token;
  const items = getState().todo.items;
  fetch(SERVER_DOMAIN + "/todo/save", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ items: items }),
  })
    .then((res) => {
      if (res.status !== 202) {
        res.json().then((errorData) => {
          callback();
          console.log(errorData);
        });
      } else {
        res.json().then((data) => {
          callback();
          console.log(data);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default todoSlice.reducer;
