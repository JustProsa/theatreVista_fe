import React, { useState, useEffect } from "react";
import {
  Form,
  Card,
  Button,
  Container,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import AxiosClient from "../client/client";
import UpdateShowModal from "./UpdateShowModal";

const client = new AxiosClient();
const token = localStorage.getItem("loggedInUser");

const FindAndUpdateShows = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [shows, setShows] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredShows, setFilteredShows] = useState([]);

  const fetchShows = async (page) => {
    try {
      const response = await client.get(`/shows?page=${currentPage}`);
      setShows(response.shows);
      setFilteredShows(response.shows);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching shows", error);
    }
  };

  useEffect(() => {
    // Carica gli spettacoli all'avvio

    fetchShows(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = () => {
    // Filtra gli spettacoli in base al termine di ricerca
    const filtered = shows.filter((show) =>
      show.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredShows(filtered);
    setIsSearchActive(true);
  };

  const handleDeleteShow = async (showId) => {
    if (window.confirm("Sei sicuro di voler eliminare questo spettacolo?")) {
      try {
        const response = await client.delete(`/shows/${showId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Rimuovi lo spettacolo dalla lista dopo l'eliminazione
        setFilteredShows((prevShows) =>
          prevShows.filter((show) => show._id !== showId)
        );

        console.log("Show deleted:", response);
      } catch (error) {
        console.error("Error deleting show", error);
      }
    }
  };

  return (
    <Container>
      <Row className="mt-5 mb-5">
        <Col>
          <Form.Control
            type="text"
            placeholder="Cerca spettacoli"
            onChange={handleSearchChange}
          />
        </Col>
        <Col>
          <Button variant="primary" onClick={handleSearchButtonClick}>
            Cerca
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Pagination className="justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>

      <Row className="mt-3">
        {isSearchActive
          ? filteredShows.map((show) => (
              <Col key={show._id} xs={12} sm={12} md={6}>
                <Card
                  style={{
                    maxWidth: "18rem",
                    backgroundColor: "transparent",
                    border: "1px solid black",
                  }}
                  className="mb-3"
                >
                  <Card.Img variant="top" src={show.cover} />
                  <Card.Body>
                    <Card.Title>{show.title}</Card.Title>
                    <UpdateShowModal
                      title={show.title}
                      by={show.by}
                      description={show.description}
                      cover={show.cover}
                      actors={show.actors}
                      startDate={show.startDate}
                      endDate={show.endDate}
                      location={show.location}
                      duration={show.duration}
                      exhibition={show.exhibition}
                      direction={show.direction}
                      production={show.production}
                      dramaturgy={show.dramaturgy}
                      showId={show._id}
                    />
                    <Button
                      variant="danger"
                      className="m-2"
                      onClick={() => handleDeleteShow(show._id)}
                    >
                      Elimina
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : shows.map((show) => (
              <Col key={show._id} xs={12} sm={12} md={6}>
                <Card
                  style={{
                    maxWidth: "18rem",
                    backgroundColor: "transparent",
                    border: "1px solid black",
                  }}
                  className="mb-3"
                >
                  <Card.Img variant="top" src={show.cover} />
                  <Card.Body>
                    <Card.Title>{show.title}</Card.Title>
                    <UpdateShowModal
                      title={show.title}
                      by={show.by}
                      description={show.description}
                      cover={show.cover}
                      actors={show.actors}
                      startDate={show.startDate}
                      endDate={show.endDate}
                      location={show.location}
                      duration={show.duration}
                      exhibition={show.exhibition}
                      direction={show.direction}
                      production={show.production}
                      dramaturgy={show.dramaturgy}
                      showId={show._id}
                    />
                    <Button
                      variant="danger"
                      className="m-2"
                      onClick={() => handleDeleteShow(show._id)}
                    >
                      Elimina
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default FindAndUpdateShows;
