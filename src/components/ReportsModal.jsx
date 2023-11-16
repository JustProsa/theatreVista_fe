import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AxiosClient from "../client/client";

const client = new AxiosClient();

const ReportsModal = () => {
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [notUserData, setNotUserData] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [reportData, setReportData] = useState({
    object: "",
    text: "",
    name: "",
    email: "",
  });
  const handleCloseModal = () => setShowReportsModal(false);
  const handleShowModal = () => setShowReportsModal(true);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("loggedInUser");
      if (token) {
        const user = await client.get("/users/details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(user);
        setIsUserLoggedIn(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isUserLoggedIn) {
        // Se l'utente è loggato, imposta il campo 'user' con l'_id dell'utente
        reportData.user = userData._id;
        // setReportData({ user: userData._id });
      }

      const response = await client.post("/reports", reportData);

      console.log("Report submitted successfully:", response);

      // Puoi aggiungere ulteriori logiche o azioni qui se necessario

      handleCloseModal();
      window.alert("Segnalazione inviata con successo!");
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShowModal}
        className="reports-button"
      >
        Contattaci
      </Button>

      <Modal show={showReportsModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          {isUserLoggedIn ? (
            <Modal.Title>Dicci tutto, {userData.username}!</Modal.Title>
          ) : (
            <Modal.Title>Dicci tutto!</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReportSubmit}>
            <Form.Group className="mb-3" controlId="object">
              <Form.Label>Oggetto della segnalazione</Form.Label>
              <Form.Control
                type="text"
                name="object"
                value={reportData.object}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="text">
              <Form.Label>La parola a te</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="text"
                value={reportData.text}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            {!isUserLoggedIn && (
              <>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={reportData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={reportData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Chiudi
              </Button>
              <Button variant="primary" type="submit">
                Invia
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReportsModal;
