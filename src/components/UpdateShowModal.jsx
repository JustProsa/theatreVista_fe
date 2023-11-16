import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import AxiosClient from "../client/client";

const client = new AxiosClient();
const token = localStorage.getItem("loggedInUser");

const UpdateShowModal = ({
  showId,
  title,
  by,
  description,
  cover,
  dramaturgy,
  direction,
  actors,
  production,
  location,
  exhibition,
  startDate,
  endDate,
  duration,
}) => {
  const [lgShow, setLgShow] = useState(false);
  const [coverFile, setCoverFile] = useState(null);

  const [showData, setShowData] = useState({
    title: "",
    by: "",
    description: "",
    dramaturgy: "",
    direction: "",
    actors: "",
    production: "",
    location: "",
    exhibition: "",
    startDate: "",
    endDate: "",
    duration: "",
  });

  useEffect(() => {
    // Aggiorna i dati dello show quando il modal viene visualizzato
    if (lgShow) {
      setShowData({
        title,
        by,
        description,
        dramaturgy,
        direction,
        actors,
        production,
        location,
        exhibition,
        startDate,
        endDate,
        duration,
      });
    }
  }, [
    lgShow,
    title,
    by,
    description,
    dramaturgy,
    direction,
    actors,
    production,
    location,
    exhibition,
    startDate,
    endDate,
    duration,
  ]);

  const handlePatchField = async (fieldName) => {
    try {
      if (fieldName === "cover" && coverFile) {
        // Upload della nuova immagine della copertina
        const formData = new FormData();
        formData.append("cover", coverFile);

        const uploadResponse = await client.post(
          "/shows/cloudUpload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Patch dell'URL della nuova immagine della copertina
        const updatedData = { cover: uploadResponse.cover };
        const response = await client.patch(`/shows/${showId}`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Aggiorna lo stato o compi altre azioni necessarie in seguito all'aggiornamento
        console.log(`${fieldName} updated:`, response);
      } else {
        // Patch standard per gli altri campi
        const updatedData = { [fieldName]: showData[fieldName] };
        const response = await client.patch(`/shows/${showId}`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Aggiorna lo stato o compi altre azioni necessarie in seguito all'aggiornamento
        console.log(`${fieldName} updated:`, response);
      }
    } catch (error) {
      console.error(`Error updating ${fieldName}`, error);
    }
  };

  const handleCoverChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  return (
    <>
      <Button onClick={() => setLgShow(true)} className="m-2">
        Modifica
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Modifica questo Spettacolo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form encType="multipart/form-data">
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Titolo</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Titolo dello spettacolo"
                    name="title"
                    onChange={(e) =>
                      setShowData({ ...showData, title: e.target.value })
                    }
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("title")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Compagnia teatrale</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Compagnia teatrale"
                    name="by"
                    onChange={(e) =>
                      setShowData({ ...showData, by: e.target.value })
                    }
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("by")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Sinossi</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Descrizione dello spettacolo"
                    name="description"
                    onChange={(e) =>
                      setShowData({ ...showData, description: e.target.value })
                    }
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("description")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Scritto da</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Autore"
                    name="dramaturgy"
                    onChange={(e) =>
                      setShowData({ ...showData, dramaturgy: e.target.value })
                    }
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("dramaturgy")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Regia</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Diretto da"
                    name="direction"
                    onChange={(e) =>
                      setShowData({ ...showData, direction: e.target.value })
                    }
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("direction")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Attori</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Con"
                    name="actors"
                    onChange={(e) =>
                      setShowData({ ...showData, actors: e.target.value })
                    }
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("actors")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Produzione</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Prodotto da"
                    name="production"
                    onChange={(e) =>
                      setShowData({ ...showData, production: e.target.value })
                    }
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("production")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Dove"
                    name="location"
                    onChange={(e) =>
                      setShowData({ ...showData, location: e.target.value })
                    }
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("location")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Rassegna</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Rassegna teatrale"
                    name="exhibition"
                    onChange={(e) =>
                      setShowData({ ...showData, exhibition: e.target.value })
                    }
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("exhibition")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Dal</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="datetime-local"
                    name="startDate"
                    onChange={(e) =>
                      setShowData({ ...showData, startDate: e.target.value })
                    }
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("startDate")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Al</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="datetime-local"
                    name="endDate"
                    onChange={(e) =>
                      setShowData({ ...showData, endDate: e.target.value })
                    }
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("endDate")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Durata</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    placeholder="Durata dello spettacolo in minuti (Es. 105')"
                    name="duration"
                    onChange={(e) =>
                      setShowData({ ...showData, duration: e.target.value })
                    }
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("duration")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Cover</Form.Label>
              <Row>
                <Col xs={9}>
                  <Form.Control
                    type="file"
                    name="cover"
                    onChange={handleCoverChange}
                  />
                </Col>
                <Col xs={3}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handlePatchField("cover")}
                  >
                    Modifica
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateShowModal;
