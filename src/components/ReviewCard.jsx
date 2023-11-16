import React from "react";
import { Container, Navbar, Card, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const ReviewCard = ({
  userAvatar,
  comment,
  rating,
  user,
  showTitle,
  showId,
  createdAt,
  userId,
}) => {
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
        </Card.Body>
      </Card>
    </>
  );
};

export default ReviewCard;
