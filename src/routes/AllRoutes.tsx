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

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/insertmoves" element={<InsertFinanceMoves />} />
          <Route path="/table" element={<Table />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
