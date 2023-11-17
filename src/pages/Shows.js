import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Pagination, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import AxiosClient from "../client/client";
import NavbarLayout from "../layouts/NavbarLayout";

const client = new AxiosClient();

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchShows = async (page) => {
    try {
      setIsLoading(true);
      const response = await client.get(
        `/shows/bystartdate?page=${page}&sortBy=startDate`
      );
      const { currentPage, totalPages, shows } = response;
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
      setShows(shows);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchShows(currentPage);
  }, [currentPage]);
  return (
    <NavbarLayout>
      {isLoading ? (
        // Se isLoading è true, mostra lo spinner centrato
        <div
          style={{
            backgroundColor: "#dbd5c9",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        // Se isLoading è false, mostra il contenuto della pagina
        <div
          className="m-0"
          style={{ height: "100%", backgroundColor: "#dbd5c9" }}
        >
          <h2 className="p-3">Gli Spettacoli</h2>

          <Row className="p-0 m-0">
            <Col>
              <Pagination
                className="justify-content-center pagination"
                bsPrefix="shows-pagination"
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                    className="pagination-item"
                    bsPrefix="shows-pagination-link"
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>

          {shows.map((show) => {
            const showStartDate = show ? new Date(show.startDate) : null;
            const showEndDate = show ? new Date(show.endDate) : null;
            const formattedStartDate = showStartDate
              ? showStartDate.toLocaleDateString("it-IT")
              : null;
            const formattedEndDate = showEndDate
              ? showEndDate.toLocaleDateString("it-IT")
              : null;

            return (
              <Card
                key={show._id}
                className="m-3 mb-0"
                style={{ backgroundColor: "transparent" }}
              >
                <Row className="p-0 m-0">
                  <Col xs={12} md={6} lg={3} className="p-0">
                    <Card.Img
                      variant="top"
                      src={show.cover}
                      alt={show.title}
                      style={{ maxWidth: "20rem" }}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={9} className="p-0">
                    <Card.Body>
                      <Card.Title>
                        {show.title}{" "}
                        <span
                          style={{
                            color:
                              show.totalRating / show.totalVotes >= 0 &&
                              show.totalRating / show.totalVotes <= 2.5
                                ? "#dc3545"
                                : show.totalRating / show.totalVotes > 2.5 &&
                                  show.totalRating / show.totalVotes < 4
                                ? "#007bff"
                                : "#198754",
                          }}
                        >
                          {(show.totalRating / show.totalVotes).toFixed(1)}
                        </span>{" "}
                        {"/5"}
                      </Card.Title>

                      <Card.Text className="text-limit">
                        {show.description}
                      </Card.Text>
                      <Card.Text>
                        {formattedStartDate} {"-"} {formattedEndDate}
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
            );
          })}
        </div>
      )}
    </NavbarLayout>
  );
};

export default Shows;
