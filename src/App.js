import React from "react";
import MainContainer from "./components/layout/MainContainer/MainContainer";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import { TodoContextProvider } from "./store/todo-context";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./components/routes/MainRouter";

function App() {
  return (
    <BrowserRouter>
      <TodoContextProvider>
        <MainContainer>
          <Header />
          <MainRouter />
          <Footer />
        </MainContainer>
      </TodoContextProvider>
    </BrowserRouter>
  );
}

export default App;
