import { createSlice } from "@reduxjs/toolkit";
import { setErrors } from "../error";

// const SERVER_DOMAIN = "http://localhost:8080";
const SERVER_DOMAIN = "https://todo-express-mongodb-backend.herokuapp.com";

const initialState = {
  token: null,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

// original actions
export const { setToken, setName } = authSlice.actions;

export const signUp = (formData, callback) => async (dispatch, getState) => {
  fetch(SERVER_DOMAIN + "/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        res.json().then((error) => {
          callback();
          console.log(error);
          if (error.data) {
            dispatch(setErrors(error.data));
          }
        });
      } else {
        res.json().then((data) => {
          callback();
          console.log(data);
          dispatch(setToken(data.token));
          dispatch(setName(data.userName));
        });
      }
    })
    .catch((err) => console.log(err));
};

export const signIn = (formData, callback) => async (dispatch, getState) => {
  fetch(SERVER_DOMAIN + "/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        res.json().then((error) => {
          callback();
          console.log(error);
          if (error.data) {
            dispatch(setErrors(error.data));
          }
        });
      } else {
        res.json().then((data) => {
          callback();
          console.log(data);
          dispatch(setToken(data.token));
          dispatch(setName(data.userName));
        });
      }
    })
    .catch((err) => console.log(err));
};

export const refreshToken = () => async (dispatch, getState) => {
  fetch(SERVER_DOMAIN + "/auth/refresh", {
    method: "POST",
    credentials: "include",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      dispatch(setToken(data.token));
      dispatch(setName(data.userName));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signOut = () => async (dispatch, getState) => {
  fetch(SERVER_DOMAIN + "/auth/signout", {
    method: "POST",
    credentials: "include",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      dispatch(setToken(null));
      dispatch(setName(null));
    })
    .catch((err) => console.log(err));
};

export default authSlice.reducer;
