import React, { useEffect } from "react";
import MainContainer from "./components/layout/MainContainer/MainContainer";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./components/routes/MainRouter";
import { useDispatch } from "react-redux";
import { refreshToken } from "./store/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  return (
    <BrowserRouter>
      <MainContainer>
        <Header />
        <MainRouter />
        <Footer />
      </MainContainer>
    </BrowserRouter>
  );
}

export default App;
