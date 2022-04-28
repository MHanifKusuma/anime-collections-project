import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../layout_component/footer/Footer";
import Header from "../layout_component/header/Header";
import CollectionList from "./collection_list_page/CollectionList";
import AnimeDetail from "./detail_page/AnimeDetail";
import Home from "./home_page/Home";
import MainWrapper from "./MainStyle";

const MainComponent = () => {
  if (!localStorage.getItem("collections")) {
    const newCollection = {
      animeCollections: [],
    };
    localStorage.setItem("collections", JSON.stringify(newCollection));
  }

  return (
    <MainWrapper>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime-detail/:id/:animeTitle" element={<AnimeDetail />} />
        <Route path="/my-collections" element={<CollectionList />} />
      </Routes>

      <Footer />
    </MainWrapper>
  );
};

export default MainComponent;
