import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bem-Vindo ao DashFinance</h1>
      <p> a sua solução para controle financeiro</p>
      <Link to="/dashboard/:id">
        <Button variant="contained">Ir para Dashboard</Button>
      </Link>
    </div>
  );
};

export default Home;
// This is the Home page that serves as the landing page for the DashFinance application.
