import { createSlice } from "@reduxjs/toolkit";
import { setErrors } from "../error";

const SERVER_DOMAIN = "http://localhost:8080";

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

export const signUp = (formData) => async (dispatch, getState) => {
  fetch(SERVER_DOMAIN + "/auth/signup", {
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
            dispatch(setErrors(error.data));
          }
        });
      } else {
        res.json().then((data) => {
          console.log(data);
          dispatch(setToken(data.token));
          dispatch(setName(data.userName));
        });
      }
    })
    .catch((err) => console.log(err));
};

export const signIn = (formData) => async (dispatch, getState) => {
  fetch(SERVER_DOMAIN + "/auth/signin", {
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
            dispatch(setErrors(error.data));
          }
        });
      } else {
        res.json().then((data) => {
          console.log(data);
          dispatch(setToken(data.token));
          dispatch(setName(data.userName));
        });
      }
    })
    .catch((err) => console.log(err));
};

export const signOut = () => async (dispatch, getState) => {
  dispatch(setToken(null));
  dispatch(setName(null));
};

export default authSlice.reducer;
