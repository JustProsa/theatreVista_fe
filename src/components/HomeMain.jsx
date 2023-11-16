// import React from "react";
// import { Row, Col, Card } from "react-bootstrap";
// import "./navbar.css";
// import "../style/global.css";
// import img1 from "../imgs/moschette.jpg";
// import img2 from "../imgs/hypergaia.jpg";
// import img3 from "../imgs/qanon.jpg";
// import img4 from "../imgs/vitamorterivoluzione.jpg";
// import img5 from "../imgs/stillalive.jpg";
// import img6 from "../imgs/lidodissea.jpg";
// import img7 from "../imgs/hotelborges.jpg";
// import img8 from "../imgs/Sergio.jpg";

// const images = [img1, img2, img3, img4, img5, img6, img7, img8];

// const HomeMain = () => {
//   return (
//     <>
//       <h1
//         className="text-center"
//         style={{ marginTop: "2rem", marginBottom: "2rem" }}
//       >
//         I PIU' VOTATI
//       </h1>
//       <Row className=" p-0 m-0">
//         <Col sm={12} md={6} className="mb-2">
//           <Card
//             className="bg-dark text-white"
//             style={{ maxHeight: "350px", overflow: "hidden" }}
//           >
//             <Card.Img
//               src={images[0]}
//               alt="Card image"
//               style={{ opacity: "0.4" }}
//             />
//             <Card.ImgOverlay>
//               <Card.Title>Card title</Card.Title>
//               <Card.Text>
//                 This is a wider card with supporting text below as a natural
//                 lead-in to additional content. This content is a little bit
//                 longer.
//               </Card.Text>
//               <Card.Text>Last updated 3 mins ago</Card.Text>
//             </Card.ImgOverlay>
//           </Card>
//         </Col>
//         <Col sm={12} md={6} className="mb-2">
//           <Card
//             className="bg-dark text-white"
//             style={{ maxHeight: "350px", overflow: "hidden" }}
//           >
//             <Card.Img
//               src={images[1]}
//               alt="Card image"
//               style={{ opacity: "0.4" }}
//             />
//             <Card.ImgOverlay>
//               <Card.Title>Card title</Card.Title>
//               <Card.Text>
//                 This is a wider card with supporting text below as a natural
//                 lead-in to additional content. This content is a little bit
//                 longer.
//               </Card.Text>
//               <Card.Text>Last updated 3 mins ago</Card.Text>
//             </Card.ImgOverlay>
//           </Card>
//         </Col>
//         <Col sm={12} md={6} className="mb-2">
//           <Card
//             className="bg-dark text-white"
//             style={{ maxHeight: "350px", overflow: "hidden" }}
//           >
//             <Card.Img
//               src={images[2]}
//               alt="Card image"
//               style={{ opacity: "0.4" }}
//             />
//             <Card.ImgOverlay>
//               <Card.Title>Card title</Card.Title>
//               <Card.Text>
//                 This is a wider card with supporting text below as a natural
//                 lead-in to additional content. This content is a little bit
//                 longer.
//               </Card.Text>
//               <Card.Text>Last updated 3 mins ago</Card.Text>
//             </Card.ImgOverlay>
//           </Card>
//         </Col>
//         <Col sm={12} md={6} className="mb-2">
//           <Card
//             className="bg-dark text-white"
//             style={{ maxHeight: "350px", overflow: "hidden" }}
//           >
//             <Card.Img
//               src={images[3]}
//               alt="Card image"
//               style={{ opacity: "0.4" }}
//             />
//             <Card.ImgOverlay>
//               <Card.Title>Card title</Card.Title>
//               <Card.Text>
//                 This is a wider card with supporting text below as a natural
//                 lead-in to additional content. This content is a little bit
//                 longer.
//               </Card.Text>
//               <Card.Text>Last updated 3 mins ago</Card.Text>
//             </Card.ImgOverlay>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default HomeMain;

import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import AxiosClient from "../client/client";

const client = new AxiosClient();

const HomeMain = () => {
  const [topRatedShows, setTopRatedShows] = useState([]);

  useEffect(() => {
    // Chiamata API per ottenere gli spettacoli ordinati per valutazione
    const fetchTopRatedShows = async () => {
      try {
        const response = await client.get("/shows", {
          params: { pageSize: 4 },
        });
        setTopRatedShows(response.shows);
      } catch (error) {
        console.error("Error fetching top-rated shows:", error);
      }
    };

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
                <Card.Text className="text-limit">{show.description}</Card.Text>
                <Card.Text>
                  Valutazione Media:{" "}
                  {(show.totalRating / show.totalVotes || 0).toFixed(1)}
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeMain;
