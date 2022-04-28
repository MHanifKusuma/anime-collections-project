import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../main_components/MainStyle";
// import Navbar from "../navbar/Navbar";
import { HeaderWrapper } from "./HeaderStyle";

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>
        <Link to="/">Anillections</Link>
      </h1>

      <Link to="/my-collections">
        <Button>My Collections</Button>
      </Link>
      {/* <Navbar /> */}
    </HeaderWrapper>
  );
};

export default Header;
