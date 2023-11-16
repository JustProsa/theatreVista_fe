import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AxiosClient from "../client/client";
import NavbarLayout from "../layouts/NavbarLayout";

const client = new AxiosClient();

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchShows = async () => {
    try {
      const response = await client.get("/shows");
      const { currentPage, totalPages, shows } = response;
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
      setShows(shows);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const truncateDescription = (text, maxLines) => {
    const lines = text.split("\n");
    if (lines.length > maxLines) {
      const truncatedText = lines.slice(0, maxLines).join("\n");
      return (
        <>
          {truncatedText}{" "}
          <span style={{ color: "blue", cursor: "pointer" }}>...</span>
        </>
      );
    }
    return text;
  };

  return (
    <NavbarLayout>
      <div
        className="m-0"
        style={{ height: "100%", backgroundColor: "#dbd5c9" }}
      >
        <h2 className="p-3">Gli Spettacoli</h2>
        {shows.map((show) => (
          <Card
            key={show._id}
            className="mt-3"
            style={{ backgroundColor: "transparent" }}
          >
            <Row>
              <Col xs={12} md={6} lg={3}>
                <Card.Img
                  variant="top"
                  src={show.cover}
                  alt={show.title}
                  style={{ maxWidth: "20rem" }}
                />
              </Col>
              <Col xs={12} md={6} lg={9}>
                <Card.Body>
                  <Card.Title>{show.title}</Card.Title>
                  <Card.Text>
                    {truncateDescription(show.description, 3)}
                  </Card.Text>
                  <Link
                    to={`/show-details/${encodeURIComponent(show.title)}/${
                      show._id
                    }`}
                  >
                    <Button variant="outline-success">Scopri di più</Button>
                  </Link>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </NavbarLayout>
  );
};

export default Shows;
