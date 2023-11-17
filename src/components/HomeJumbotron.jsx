import React, { useState, useEffect } from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import JumbotronFooter from "./JumbotronFooter";
import AxiosClient from "../client/client";

const client = new AxiosClient();

const HomeJumbotron = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Nuova chiamata API per ottenere gli spettacoli ordinati per valutazione
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
    let intervalId;

    if (isHovered) {
      intervalId = setInterval(() => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % topRatedShows.length);
      }, 200);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered, topRatedShows]);

  useEffect(() => {
    fetchTopRatedShows();
  }, []);

  return (
    <>
      <Container fluid>
        <Row className="home-container no-gutters align-items-center justify-content-center">
          <Col className="text-center" sm={12} md={12} lg={4}>
            <h1 className="jumbotron-title">Theatre</h1>
          </Col>
          <Col className="text-center m-0 p-0" sm={12} md={12} lg={4}>
            <div
              className="shadow-sm images-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isLoading ? (
                <div
                  style={{
                    height: "100%",
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
                <img
                  src={topRatedShows[currentImage]?.cover}
                  alt="Immagine"
                  className="img-fluid shadow-sm"
                  style={{ height: "100%" }}
                />
              )}
            </div>
          </Col>
          <Col className="text-center m-0 p-0" sm={12} md={12} lg={4}>
            <h1 className="jumbotron-title">Vista</h1>
          </Col>
          <Col sm={12} className="text-center">
            <JumbotronFooter />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeJumbotron;
