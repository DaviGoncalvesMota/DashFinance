import { useState } from "react"
import { useParams } from "react-router-dom";

  const IA = () => {  

    const [ask, setAsk] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

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
        setAnswer("Erro ao obter resposta da IA." + (error instanceof Error ? " " + error.message : ""));
      } finally {
        setLoading(false);
      }
    };

    return (
      <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
        <h2>Chat com IA</h2>
        <textarea
          value={ask}
          onChange={(e) => setAsk(e.target.value)}
          placeholder="Digite sua pergunta..."
          rows={4}
          style={{ width: "100%" }}
        />
        <button onClick={handleEnviar} disabled={loading} style={{ marginTop: 10 }}>
          {loading ? "Carregando..." : "Enviar"}
        </button>

        {answer && (
          <div style={{ marginTop: 20 }}>
            <strong>Resposta:</strong>
            <p>{answer}</p>
          </div>
        )}
      </div>
    );
  }

  export default IA
