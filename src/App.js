import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import MyArea from "./pages/MyArea";
import AdminArea from "./pages/AdminArea";
import Shows from "./pages/Shows";
import ShowDetails from "./pages/ShowDetails";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/myArea/:username" element={<MyArea />} />
          <Route path="/area-admin" element={<AdminArea />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/show-details/:title/:id" element={<ShowDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
