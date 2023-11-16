import React from "react";
import ReportsModal from "./ReportsModal";

const Footer = () => {
  const contactEmail = "tuoindirizzo@email.com";

  return (
    <footer className="footer">
      <div className="p-5" style={{ backgroundColor: "#dbd5c9" }}>
        <p style={{ fontSize: "2.4rem" }}>
          Sai di uno spettacolo non inserito su questo sito o hai bisogno di
          aiuto per qualsiasi necessità?
        </p>
        <p style={{ textAlign: "center" }}>
          <ReportsModal />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
