import React from "react";
import { Routes, Route, withRouter } from "react-router-dom";
import Footer from "../layout_component/footer/Footer";
import Header from "../layout_component/header/Header";
import Home from "./home_page/Home";
import MainWrapper from "./MainStyle";
import MainStyle from "./MainStyle";

const MainComponent = () => {
  return (
    <MainWrapper>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </MainWrapper>
  );
};

export default MainComponent;
