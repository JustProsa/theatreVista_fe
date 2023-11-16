import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import AxiosClient from "../client/client";

const client = new AxiosClient();
// Recupera il token dal localStorage
const token = localStorage.getItem("loggedInUser");

const AddShowModal = () => {
  const [showData, setShowData] = useState({
    title: "",
    by: "",
    description: "",
    cover: "",
    dramaturgy: "",
    direction: "",
    actors: "",
    production: "",
    location: "",
    exhibition: "",
    startDate: "",
    endDate: "",
    duration: "",
  });
  const [lgShow, setLgShow] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCoverChange = (e) => {
    setShowData((prevData) => ({
      ...prevData,
      cover: e.target.files[0],
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cover", showData.cover);

    try {
      // Upload cover to cloud
      const coverResponse = await client.post("/shows/cloudUpload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const coverUrl = coverResponse.cover;

      // Update showData with the cloud cover URL
      setShowData((prevData) => ({
        ...prevData,
        cover: coverUrl,
      }));

      // Post show data to the database
      await client.post(
        "/shows",
        { ...showData, cover: coverUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset form after successful submission
      setShowData({
        title: "",
        by: "",
        description: "",
        cover: null,
        dramaturgy: "",
        direction: "",
        actors: "",
        production: "",
        location: "",
        exhibition: "",
        startDate: "",
        endDate: "",
        duration: "",
      });

      alert("Show added successfully!");
    } catch (error) {
      console.error("Error adding show", error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setLgShow(true)}
        variant="outline-dark"
        className="p-3 mt-2"
      >
        Aggiungi uno spettacolo
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Aggiungi uno Spettacolo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit} encType="multipart/form-data">
            {/* Add form fields for show data */}
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Titolo dello spettacolo"
                name="title"
                value={showData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="by" className="mb-3">
              <Form.Label>Compagnia teatrale:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Compagnia teatrale"
                name="by"
                value={showData.by}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Sinossi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={showData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="dramaturgy" className="mb-3">
              <Form.Label>Scritto da:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="dramaturgy"
                value={showData.dramaturgy}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="direction" className="mb-3">
              <Form.Label>Regia:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="direction"
                value={showData.direction}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="actors" className="mb-3">
              <Form.Label>Attori</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="actors"
                value={showData.actors}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="production" className="mb-3">
              <Form.Label>Prodotto da</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="production"
                value={showData.production}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="location" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="location"
                value={showData.location}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="exhibition" className="mb-3">
              <Form.Label>Rassegna</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="exhibition"
                value={showData.exhibition}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="startDate" className="mb-3">
              <Form.Label>Dal:</Form.Label>
              <Form.Control
                type="datetime-local"
                name="startDate"
                value={showData.startDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="endDate" className="mb-3">
              <Form.Label>Al:</Form.Label>
              <Form.Control
                type="datetime-local"
                name="endDate"
                value={showData.endDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="duration" className="mb-3">
              <Form.Label>Durata</Form.Label>
              <Form.Control
                type="text"
                placeholder="Durata dello spettacolo in minuti"
                name="duration"
                value={showData.duration}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Add more form fields for other show data */}

            <Form.Group controlId="formCover" className="mb-3">
              <Form.Label>Cover</Form.Label>
              <Form.Control
                type="file"
                name="cover"
                onChange={handleCoverChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={() => setLgShow(false)}
            >
              Add Show
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddShowModal;
