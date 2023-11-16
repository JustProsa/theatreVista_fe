import React, { useState } from "react";
import { Container, Form, Button, Navbar } from "react-bootstrap";
import AxiosClient from "../client/client";
import logo from "../imgs/TheatreVista-logo-png.png";
import { Link, Navigate } from "react-router-dom";

const client = new AxiosClient();

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Le password non corrispondono");
      return;
    }

    try {
      const response = await client.post("/users", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "user",
        avatar: "",
      });

      console.log(response);

      // Esegue automaticamente il login dopo la registrazione riuscita
      const loginResponse = await client.post("/login", {
        username: formData.username,
        password: formData.password,
      });

      if (loginResponse.token) {
        console.log(loginResponse.token);
        localStorage.setItem("loggedInUser", loginResponse.token);

        const userToken = localStorage.getItem("loggedInUser");
        const userData = await client.get("/users/details", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        console.log("Dettagli dell'utente:", userData);

        setRegistrationSuccess(true);
      } else {
        console.log("OOOOPS!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Se la registrazione è riuscita, reindirizza l'utente alla Home
  if (registrationSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar
        expand="lg"
        style={{ backgroundColor: "#dbd5c9" }}
        className="fixed-top"
      >
        <Container>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Navbar.Brand href="#">Home</Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
      <div
        style={{
          backgroundColor: "#dbd5c9",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo del sito"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Conferma password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <div style={{ textAlign: "center", margin: "20px" }}>
              <Button variant="outline-dark" type="submit">
                Registrati
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Registration;
