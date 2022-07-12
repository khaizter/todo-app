import React from "react";
import MainContainer from "./components/layout/MainContainer/MainContainer";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./components/routes/MainRouter";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MainContainer>
          <Header />
          <MainRouter />
          <Footer />
        </MainContainer>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
