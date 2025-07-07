import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

  const IsAuthenticated = () => {
    const navigate = useNavigate();
    if (!localStorage.getItem("authUser")) {
      navigate("/login");
    }
    return true;
  };

  IsAuthenticated();

  const userId = localStorage.getItem("authUser");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bem-Vindo ao DashFinance</h1>
      <p> a sua solução para controle financeiro</p>
      <Link to={`/dashboard/` + userId}>
        <Button variant="contained">Ir para Dashboard</Button>
      </Link>
    </div>
  );
};

export default Home;
// This is the Home page that serves as the landing page for the DashFinance application.
