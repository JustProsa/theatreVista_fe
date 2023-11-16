import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AxiosClient from "../client/client";

const client = new AxiosClient();

const AddReviewModal = ({ showId, userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddReview = async () => {
    const token = localStorage.getItem("loggedInUser");
    console.log(token);
    try {
      await client.post(
        "/reviews",
        {
          userId,
          showId,
          rating: parseInt(rating),
          comment,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error adding review:", error.response);
    }
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        Aggiungi una recensione
      </Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Recensione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRating">
              <Form.Label>Voto</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Commento</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="outline-success" onClick={handleAddReview}>
            Aggiungi Recensione
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddReviewModal;
