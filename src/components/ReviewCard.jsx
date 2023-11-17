import React, { useState, useEffect } from "react";
import { Navbar, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AxiosClient from "../client/client";

const client = new AxiosClient();
const token = localStorage.getItem("loggedInUser");

const ReviewCard = ({
  userAvatar,
  comment,
  rating,
  user,
  showTitle,
  showId,
  createdAt,
  userId,
  reviewId,
}) => {
  const [loggedUser, setLoggedUser] = useState({});

  const getUserDetails = async () => {
    try {
      const userData = await client.get(`/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoggedUser(userData);
    } catch (error) {
      console.log("Errore nella get dei dati utente");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (
      window.confirm("Sei sicuro di voler eliminare questa recensione?") &&
      userId === loggedUser?._id
    ) {
      try {
        const response = await client.delete(`/reviews/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Review deleted:", response);
        window.alert("Recensione eliminata con successo!");
      } catch (error) {
        console.error("Error deleting report", error);
        window.alert(
          "OPS! A quanto pare c'è un problema, ma potrebbe non essere colpa tua."
        );
      }
    }
  };

  const formatCreatedAt = (createdAt) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Date(createdAt).toLocaleString("it-IT", options);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Card
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          border: "none",
          borderRadius: "14px",
        }}
        className="m-4 mb-0"
      >
        <Card.Header>
          <Navbar
            className="p-0"
            style={{
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <Navbar.Brand
              href="#home"
              style={{
                display: "flex",
                alignItems: "center",
                color: "white",
              }}
              className="p-0 m-0"
            >
              <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
                <img
                  alt=""
                  src={userAvatar}
                  width="50"
                  height="50"
                  className="d-inline-block align-top rounded"
                />{" "}
                <span className="px-3">{user}</span>
              </Link>
            </Navbar.Brand>
          </Navbar>
        </Card.Header>
        <Card.Body>
          <Link
            style={{ color: "white" }}
            to={`/show-details/${showTitle}/${showId}`}
          >
            <Card.Title>{showTitle}</Card.Title>
          </Link>
          <Card.Text style={{ color: "white" }}>{comment}</Card.Text>
          <Card.Text style={{ color: "white" }}>{rating} /5</Card.Text>
          <Card.Text style={{ color: "white", fontSize: "0.8rem" }}>
            {formatCreatedAt(createdAt)}
          </Card.Text>
          {userId === loggedUser?._id && (
            <Card.Text style={{ color: "white", fontSize: "0.8rem" }}>
              <Button
                variant="danger"
                onClick={() => handleDeleteReview(reviewId)}
              >
                Elimina recensione
              </Button>
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default ReviewCard;
