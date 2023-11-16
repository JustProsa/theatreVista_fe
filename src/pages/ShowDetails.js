import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AxiosClient from "../client/client";
import NavbarLayout from "../layouts/NavbarLayout";
import AddReviewModal from "../components/AddReviewModal";
import ReviewList from "../components/ReviewsListComponent";

const client = new AxiosClient();

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [user, setUser] = useState(null);

  const getUserDetails = async () => {
    const token = localStorage.getItem("loggedInUser");
    try {
      const userData = await client.get(`/users/details`, {
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

  const fetchShowDetails = async () => {
    try {
      const response = await client.get(`/shows/${id}`);
      setShow(response.show);
    } catch (error) {
      console.error("Error fetching show details:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
    fetchShowDetails();
  }, [id]);

  return (
    <>
      <NavbarLayout>
        <div
          className="m-0"
          style={{ height: "100%", backgroundColor: "#dbd5c9" }}
        >
          {show ? (
            <>
              <Card
                style={{
                  textAlign: "center",
                  backgroundColor: "transparent",
                  border: "none",
                }}
              >
                <Card.Img
                  variant="top"
                  src={show.cover}
                  alt={show.title}
                  style={{ maxWidth: "40rem", margin: "2rem auto" }}
                />
                <Card.Body>
                  <Card.Title>
                    <h1>{show.title}</h1>
                  </Card.Title>
                  <Card.Text style={{ fontSize: "1.4rem" }}>
                    {show.description}
                  </Card.Text>

                  {user && <AddReviewModal showId={id} userId={user._id} />}
                </Card.Body>
              </Card>

              <div className="mb-0 p-0">
                <h2 className="mt-5 mb-0 text-center">
                  Le Recensioni di {show.title}
                </h2>
                <div>
                  <ReviewList showId={id} />
                </div>
              </div>
            </>
          ) : (
            <p>Loading show details...</p>
          )}
        </div>
      </NavbarLayout>
    </>
  );
};

export default ShowDetails;
