import React, { useState, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import Logo from "../imgs/TheatreVista-logo-png.png";
import "./navbar.css";
import AxiosClient from "../client/client";
import LoginModal from "./LoginModal";
import { Link, useNavigate } from "react-router-dom";

const client = new AxiosClient();

const Navigation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    // Pulisci lo stato dell'utente o esegui altre operazioni di logout necessarie
    setUser(null);
    // Rimuovi il token di autenticazione dallo storage locale
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const getUserDetails = async () => {
    const token = localStorage.getItem("loggedInUser");
    try {
      const userData = await client.get("/users/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(userData);

      console.log("Dettagli dell'utente:", userData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Navbar
      expand="lg"
      className="px-0 mx-0 navbar"
      style={{
        backgroundColor: "#dbd5c9",
        width: "100%",
        margin: "0",
        padding: "0",
      }}
    >
      <Container>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <img
            src={Logo}
            width="90"
            height="90"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0 gap-5 flex-wrap"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {user && user.role === "user" && (
              <>
                <Link to={"/shows"} style={{ textDecoration: "none" }}>
                  <Nav.Link href="#spettacoli">Spettacoli</Nav.Link>
                </Link>
                <Link
                  to={`/myArea/${user.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <Nav.Link href="#area-personale">Area Personale</Nav.Link>
                </Link>
              </>
            )}
            {user && user.role === "admin" && (
              <>
                <Link to={"/area-admin"} style={{ textDecoration: "none" }}>
                  <Nav.Link href="#area-admin">Area Admin</Nav.Link>
                </Link>
                <Link to={"/shows"} style={{ textDecoration: "none" }}>
                  <Nav.Link href="#spettacoli">Spettacoli</Nav.Link>
                </Link>
                <Link
                  to={`/myArea/${user.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <Nav.Link href="#area-personale">Area Personale</Nav.Link>
                </Link>
              </>
            )}
            {!user && (
              <Link to={"/registration"} style={{ textDecoration: "none" }}>
                <Nav.Link href="#registrati">Registrati</Nav.Link>
              </Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <Button variant="outline-success" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <LoginModal onLogin={setUser} />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
