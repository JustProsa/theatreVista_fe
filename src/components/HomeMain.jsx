import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import AxiosClient from "../client/client";

const client = new AxiosClient();

const HomeMain = () => {
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Chiamata API per ottenere gli spettacoli ordinati per valutazione
  const fetchTopRatedShows = async () => {
    try {
      setIsLoading(true);
      const response = await client.get("/shows", {
        params: { pageSize: 4 },
      });
      setTopRatedShows(response.shows);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching top-rated shows:", error);
    }
  };

  useEffect(() => {
    fetchTopRatedShows();
  }, []);

  return (
    <div style={{ backgroundColor: "black" }}>
      <h1
        className="text-center"
        style={{
          paddingTop: "2rem",
          paddingBottom: "2rem",
          color: "#dbd5c9",
          fontSize: "5.6rem",
        }}
      >
        I PIU' VOTATI
      </h1>
      {isLoading ? (
        <div
          style={{
            backgroundColor: "black",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row className=" pb-2 m-0">
          {topRatedShows.map((show) => (
            <Col sm={12} md={6} className="mt-2" key={show._id}>
              <Card
                className="bg-dark text-white"
                style={{ maxHeight: "350px", overflow: "hidden" }}
              >
                <Card.Img
                  src={show.cover} // Assumi che show abbia un campo "cover" con il percorso dell'immagine
                  alt="Card image"
                  style={{ opacity: "0.4" }}
                />
                <Card.ImgOverlay>
                  <Card.Title>{show.title}</Card.Title>
                  <Card.Text className="text-limit">
                    {show.description}
                  </Card.Text>
                  <Card.Text>
                    Valutazione Media:{" "}
                    {(show.totalRating / show.totalVotes || 0).toFixed(1)}
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeMain;
