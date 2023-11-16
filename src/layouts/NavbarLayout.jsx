import React from "react";
import Navigation from "../components/Navbar";

const NavbarLayout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default NavbarLayout;
