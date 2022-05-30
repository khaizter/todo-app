import React, { Fragment } from "react";
import MainContainer from "./components/layout/MainContainer/MainContainer";
import Header from "./components/layout/Header/Header";
import Todo from "./components/layout/Todo/Todo";
import { TodoContextProvider } from "./store/todo-context";

function App() {
  return (
    <TodoContextProvider>
      <MainContainer>
        <Header />
        <Todo />
      </MainContainer>
    </TodoContextProvider>
  );
}

export default App;
