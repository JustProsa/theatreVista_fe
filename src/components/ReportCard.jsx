import React from "react";
import { Card, Button } from "react-bootstrap";
import AxiosClient from "../client/client";

const client = new AxiosClient();
const token = localStorage.getItem("loggedInUser");

const ReportCard = ({ text, user, object, createdAt, email, id, name }) => {
  const formatCreatedAt = (createdAt) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Date(createdAt).toLocaleString("it-IT", options);
  };

  const handleDeleteReport = async () => {
    if (window.confirm("Sei sicuro di voler eliminare questa segnalazione?")) {
      try {
        const response = await client.delete(`/reports/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Report deleted:", response);
      } catch (error) {
        console.error("Error deleting report", error);
      }
    }
  };

  return (
    <Card key={id} className="mb-2">
      <Card.Header className="flex justify-between">
        <div>
          {object} {name} {"-"} {user}
        </div>
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p> {text} </p>
          <footer className="blockquote-footer">
            {user?.email || email} {"-"}{" "}
            <cite title="Source Title">{formatCreatedAt(createdAt)}</cite>
          </footer>
        </blockquote>
        <Button
          variant="outline-danger"
          className="mt-2"
          onClick={handleDeleteReport}
        >
          Elimina
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ReportCard;
