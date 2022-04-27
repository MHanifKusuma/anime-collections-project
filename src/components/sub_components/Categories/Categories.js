import React from "react";
import { Button } from "../../main_components/MainStyle";
import { CategoriesWrapper } from "./CategoriesStyle";

const Categories = ({ changeSeason, season }) => {
  return (
    <CategoriesWrapper>
      <Button
        onClick={() => changeSeason("WINTER")}
        className={`${season === "WINTER" ? "active" : ""}`}
      >
        Winter
      </Button>
      <Button
        onClick={() => changeSeason("SPRING")}
        className={`${season === "SPRING" ? "active" : ""}`}
      >
        Spring
      </Button>
      <Button
        onClick={() => changeSeason("SUMMER")}
        className={`${season === "SUMMER" ? "active" : ""}`}
      >
        Summer
      </Button>
      <Button
        onClick={() => changeSeason("FALL")}
        className={`${season === "FALL" ? "active" : ""}`}
      >
        Fall
      </Button>
    </CategoriesWrapper>
  );
};

export default Categories;
