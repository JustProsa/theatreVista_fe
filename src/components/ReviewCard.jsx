import React from "react";
import { Container, Navbar, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ReviewCard = ({
  userAvatar,
  comment,
  rating,
  user,
  showTitle,
  showId,
  userId,
}) => {
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
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Navbar.Brand
                href="#home"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                }}
                className="p-0 m-0"
              >
                <img
                  alt=""
                  src={userAvatar}
                  width="50"
                  height="50"
                  className="d-inline-block align-top rounded"
                />{" "}
                <p className="p-2">{user}</p>
              </Navbar.Brand>
            </Link>
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
        </Card.Body>
      </Card>
    </>
  );
};

export default ReviewCard;
