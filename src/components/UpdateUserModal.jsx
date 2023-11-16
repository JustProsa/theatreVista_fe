import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import AxiosClient from "../client/client";

const client = new AxiosClient();
const token = localStorage.getItem("loggedInUser");

const UpdateUserModal = ({
  userId,
  username,
  firstName,
  lastName,
  birthDay,
  email,
  avatar,
}) => {
  const [lgShow, setLgShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const [userData, setUserData] = useState({
    username,
    firstName,
    lastName,
    birthDay,
    email,
    avatar,
  });

  useEffect(() => {
    // Aggiorna i dati dell'utente quando il modal viene visualizzato
    if (lgShow) {
      setUserData({
        username: "",
        firstName: "",
        lastName: "",
        birthDay: "",
        email: "",
        avatar: "",
      });
      setPassword("");
      setConfirmPassword("");
    }
  }, [lgShow, username, firstName, lastName, birthDay, email, avatar]);

  const handlePatchField = async (fieldName) => {
    try {
      //   // Verifica che l'utente autenticato stia modificando solo i propri dati
      //   const loggedInUser = client.getUserInfo();

      //   if (loggedInUser.userId !== userId) {
      //     console.error("Unauthorized: You can only update your own data.");
      //     return;
      //   }

      if (fieldName === "avatar" && avatarFile) {
        // Upload della nuova immagine della copertina
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const uploadResponse = await client.post(
          "/users/cloudUpload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Patch dell'URL della nuova immagine della copertina
        const updatedData = { avatar: uploadResponse.avatar };
        const response = await client.patch(`/users/${userId}`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Aggiorna lo stato o compi altre azioni necessarie in seguito all'aggiornamento
        console.log(`${fieldName} updated:`, response);
      } else {
        // Patch standard per gli altri campi
        const updatedData = { [fieldName]: userData[fieldName] };
        const response = await client.patch(`/users/${userId}`, updatedData, {
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

  const handlePasswordChange = async () => {
    try {
      // Verifica che l'utente autenticato stia modificando solo i propri dati
      const loggedInUser = client.getUserInfo();
      if (loggedInUser.userId !== userId) {
        console.error("Unauthorized: You can only update your own data.");
        return;
      }

      // Verifica che le due password coincidano
      if (password !== confirmPassword) {
        console.error("Passwords do not match.");
        return;
      }

      // Patch della password
      const updatedData = { password };
      const response = await client.patch(`/users/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Aggiorna lo stato o compi altre azioni necessarie in seguito all'aggiornamento della password
      console.log("Password updated:", response);

      // Resetta i campi delle password dopo l'aggiornamento
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating password", error);
    }
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  return (
    <>
      <Form>
        {/* ... (rest of the form fields for non-sensitive data) */}
        <Form.Group controlId="formTitle" className="mb-3 p-0">
          <Form.Label>Nome</Form.Label>
          <Row className="m-0 p-0">
            <Col xs={12} md={9} className="p-0">
              <Form.Control
                type="text"
                placeholder=""
                name="firstName"
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
              />
            </Col>
            <Col xs={12} md={3} className="text-center mt-1">
              <Button
                variant="outline-primary"
                onClick={() => handlePatchField("firstName")}
              >
                Modifica
              </Button>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formTitle" className="mb-3 p-0">
          <Form.Label>Cognome</Form.Label>
          <Row className="m-0 p-0">
            <Col xs={12} md={9} className="p-0">
              <Form.Control
                type="text"
                placeholder=""
                name="lastName"
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
            </Col>
            <Col xs={12} md={3} className="text-center mt-1">
              <Button
                variant="outline-primary"
                onClick={() => handlePatchField("lastName")}
              >
                Modifica
              </Button>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formTitle" className="mb-3 p-0">
          <Form.Label>Data di nascita</Form.Label>
          <Row className="m-0 p-0">
            <Col xs={12} md={9} className="p-0">
              <Form.Control
                type="date"
                name="birthDay"
                onChange={(e) =>
                  setUserData({ ...userData, birthDay: e.target.value })
                }
              />
            </Col>
            <Col xs={12} md={3} className="text-center mt-1">
              <Button
                variant="outline-primary"
                onClick={() => handlePatchField("birthDay")}
              >
                Modifica
              </Button>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formTitle" className="mb-3 p-0">
          <Form.Label>Email</Form.Label>
          <Row className="m-0 p-0">
            <Col xs={12} md={9} className="p-0">
              <Form.Control
                type="email"
                name="email"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </Col>
            <Col xs={12} md={3} className="text-center mt-1">
              <Button
                variant="outline-primary"
                onClick={() => handlePatchField("email")}
              >
                Modifica
              </Button>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formTitle" className="mb-3 p-0">
          <Form.Label>Avatar</Form.Label>
          <Row className="m-0 p-0">
            <Col xs={12} md={9} className="p-0">
              <Form.Control
                type="file"
                name="avatar"
                onChange={handleAvatarChange}
              />
            </Col>
            <Col xs={12} md={3} className="text-center mt-1">
              <Button
                variant="outline-primary"
                onClick={() => handlePatchField("avatar")}
              >
                Modifica
              </Button>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3 p-0">
          <Form.Label>Nuova Password</Form.Label>
          <Row className="m-0 p-0">
            <Col xs={12} md={9} className="p-0">
              <Form.Control
                type="password"
                placeholder="Nuova password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
            <Col xs={12} md={3} className="text-center mt-1">
              <Button variant="outline-primary" onClick={handlePasswordChange}>
                Modifica
              </Button>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formConfirmPassword" className="mb-3 p-0">
          <Form.Label>Conferma Password</Form.Label>
          <Row className="m-0 p-0">
            <Col xs={12} md={9} className="p-0">
              <Form.Control
                type="password"
                placeholder="Conferma password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
            <Col xs={12} md={3} className="text-center mt-1 p-0"></Col>
          </Row>
        </Form.Group>
      </Form>
    </>
  );
};

export default UpdateUserModal;
