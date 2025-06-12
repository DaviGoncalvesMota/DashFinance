import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Box width={{ width: "70%" }} mx="auto" my={4}>
        <h1>Sobre Nós</h1>
        <p>
          Olá! Meu nome é Davi Gonçalves Mota e sou o criador deste dashboard
          financeiro. Desenvolvi esta plataforma com o objetivo de facilitar o
          controle de gastos do dia a dia de forma simples, prática e visual.
          Sei, por experiência própria, como é importante acompanhar as finanças
          de perto — e foi isso que me motivou a transformar uma necessidade
          pessoal em uma ferramenta útil. Aqui você pode registrar seus custos,
          organizar por categorias, acompanhar datas e formas de pagamento, além
          de ter uma visão clara dos seus hábitos financeiros. Tudo foi pensado
          com cuidado para ajudar quem, como eu, quer ter mais controle,
          planejamento e tranquilidade financeira. Esse projeto é feito com
          dedicação, aprendizados constantes e o desejo de ajudar outras pessoas
          a cuidarem melhor do próprio dinheiro.
        </p>
        <Link to="/dashboard">
          <Button variant="contained">Ir para Dashboard</Button>
        </Link>
      </Box>
    </>
  );
};

export default About;
// This is the About page where users can learn more about the application and its purpose.
