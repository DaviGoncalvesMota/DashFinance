import { Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

const IA = () => {
  const [ask, setAsk] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const params = useParams().id;

  const handleEnviar = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/ia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ask, user_id: params }),
      });

      if (!res.ok) {
        throw new Error("Erro ao chamar a IA");
      }

      const data = await res.json();
      setAnswer(data.resposta);
    } catch (error) {
      setAnswer(
        "Erro ao obter resposta da IA." +
          (error instanceof Error ? " " + error.message : "")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Typography    
        variant="h3"
        align="center"
        sx={{
          mb: 4,
          fontWeight: "bold",
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
        Chat com IA
      </Typography>
      <textarea
        value={ask}
        onChange={(e) => setAsk(e.target.value)}
        placeholder="Digite sua pergunta..."
        rows={4}
        style={{ width: "100%" }}
      />
      <Button
        variant="contained"
        onClick={handleEnviar}
        disabled={loading}
        style={{ marginTop: 10 }}
      >
        {loading ? "Carregando..." : "Enviar"}
      </Button>

      {answer && (
        <div style={{ marginTop: 20 }}>
          <Typography sx={{fontWeight: "bold"}} variant="subtitle2" gutterBottom> Resposta: </Typography>
          <Typography variant="body2" gutterBottom> {answer} </Typography>
        </div>
      )}
    </div>
  );
};

export default IA;
