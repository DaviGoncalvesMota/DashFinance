import { useState, useMemo } from "react";
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleRecover = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      // FIND USER BY EMAIL
      const resGet = await fetch(`http://127.0.0.1:8000/users/finduserbyemail/${email}`);
      const users = await resGet.json();

      if (users.length === 0) {
        alert("Usuário não encontrado.");
        return;
      }

      const userId = users._id;

      // FORGOT PASSWORD
      const resPut = await fetch(`http://127.0.0.1:8000/users/forgotpassword/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...users[0], 
          password: password,
        }),
      });

      if (resPut.ok) {
        alert("Senha alterada com sucesso!");
        window.location.href = "/login";
      } else {
        alert("Erro ao alterar a senha. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      alert("Erro ao alterar a senha.");
    }
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
              Recuperar Senha
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Informe seu e-mail para redefinir sua senha
            </Typography>
          </Box>

          <CardContent>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Nova Senha"
              type="password"
              margin="normal"
              placeholder="Digite sua nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              margin="normal"
              placeholder="Confirme sua nova senha"
              required
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleRecover}
            >
              Alterar Senha
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Lembrou sua senha?{" "}
              <Button
                color="primary"
                href="/login"
                sx={{ textTransform: "none" }}
              >
                Voltar para Login
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default ForgotPassword;
