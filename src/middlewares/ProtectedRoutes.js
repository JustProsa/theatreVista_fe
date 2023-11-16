import { Outlet } from "react-router-dom";
import Homepage from "../pages/Homepage";

export const isAuth = () => {
  return !!localStorage.getItem("loggedInUser");
};

const ProtectedRoutes = () => {
  const auth = isAuth();

  return auth ? <Outlet /> : <Homepage />; //Se l'utente è autenticato lo fa accedere, altrimenti lo riporta in homepage
};

export default ProtectedRoutes;
