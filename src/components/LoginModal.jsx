import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AxiosClient from "../client/client";

const client = new AxiosClient();

const LoginModal = ({ onLogin }) => {
  const [show, setShow] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [login, setLogin] = useState(null);
  const [showBanModal, setshowBanModal] = useState(false);
  const [user, setUser] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    try {
      const response = await client.post("/login", loginData);
      // const data = response.data;

      if (response.token) {
        console.log(response.token);
        localStorage.setItem("loggedInUser", response.token);

        const userToken = localStorage.getItem("loggedInUser");
        const userData = await client.get("/users/details", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        console.log("Dettagli dell'utente:", userData);
        onLogin(userData);
        setUser(userData);
      } else {
        console.log("OOOOPS!");
      }

      setLogin(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <Form className="bg-dark text-light">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>USERNAME</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>PASSWORD</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                name="password"
                onChange={handleInputChange}
                autoFocus
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="outline-success"
            onClick={() => {
              onSubmit();
              handleClose();
            }}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
