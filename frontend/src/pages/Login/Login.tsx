import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import type { IUser } from "../../interfaces/IUsers";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      navigate("/dashboard");
    }
  }, [navigate]);


  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  const handleLogin = () => {
    const verifyLogin = async () => {
      try {
        // FIND USER BY EMAIL AND PASSWORD
        const res = await fetch("http://localhost:3001/users?email=" + email + "&senha=" + password);
        const data: IUser[] = await res.json();
        if (data.length > 0) {
          localStorage.setItem("authUser", data[0].id);
          navigate("/dashboard/" + data[0].id);
        }
        else {
          localStorage.removeItem("authUser");
          alert("Usuário ou senha incorretos!");
        }
      }
      catch (error) {
        console.error("Erro:", error);
      }
    }

    verifyLogin();

  };

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          backgroundColor: theme.palette.background.default,
          position: "relative",
        }}
      >
        {/* Botão de alternar tema */}
        <IconButton
          onClick={toggleTheme}
          sx={{ position: "absolute", top: 16, right: 16 }}
          color="inherit"
        >
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <Card
          sx={{
            maxWidth: 400,
            width: "100%",
            p: 4,
            borderRadius: 4,
            boxShadow: 6,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h5" fontWeight={600}>
              Bem-vindo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Faça login para continuar
            </Typography>
          </Box>

          <CardContent>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              margin="normal"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleLogin}
            >
              Entrar
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Não tem uma conta?{" "}
              <Button
                color="primary"
                onClick={() => navigate("/register")}
                sx={{ textTransform: "none" }}
              >
                Cadastre-se
              </Button>
            </Typography>
            {/* Crie uma opçao de "Esqueceu a Senha" */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, textAlign: "center" }}
            >
              <Button
                color="primary"
                onClick={() => navigate("/forgot-password")}
                sx={{ textTransform: "none" }}
              >
                Esqueceu a Senha?
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
