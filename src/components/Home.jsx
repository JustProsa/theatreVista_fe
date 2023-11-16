import React from "react";
import "./navbar.css";
import "../style/global.css";
import NavbarLayout from "../layouts/NavbarLayout";
import HomeJumbotron from "./HomeJumbotron";
import HomeMain from "./HomeMain";

const Home = () => {
  return (
    <>
      <NavbarLayout>
        <HomeJumbotron />
      </NavbarLayout>
      <HomeMain />
    </>
  );
};

export default Home;
