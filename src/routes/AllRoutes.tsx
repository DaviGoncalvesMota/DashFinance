import { Route, Routes } from "react-router-dom";
import About from "../pages/About/About";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import App from "../App";
import Table from "../pages/Table/Table";
import Home from "../pages/Home/Home";
import InsertFinanceMoves from "../pages/InsertFinanceMoves/InsertFinanceMovesCosts";
import PrivateRoutes from "../components/PrivateRoutes/PrivateRoutes";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PrivateRoutes><Home /></PrivateRoutes>} />
          <Route path="/insertmoves/:id" element={<PrivateRoutes><InsertFinanceMoves /></PrivateRoutes>} />
          <Route path="/table/:id" element={<PrivateRoutes><Table /></PrivateRoutes>} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard/:id" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
          <Route path="/profile/:id" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
