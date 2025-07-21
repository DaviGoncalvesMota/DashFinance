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
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

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

  const handleRegister = async () => {
    try {
      const user = {
        name,
        email,
        password,
        bio,
        phone,
        avatar,
      };
      const res = await fetch("http://127.0.0.1:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        alert("Cadastro realizado com sucesso!");
        setName("")
        setEmail("");
        setPassword("");
        setBio("");
        setPhone("");
        setAvatar("");
        setConfirmPassword("");
        // Redireciona para a página de login após o cadastro
        navigate("/login");
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <IconButton
          onClick={toggleTheme}
          sx={{ position: "absolute", top: 16, right: 16 }}
          color="inherit"
        >
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        <Card
          sx={{
            maxWidth: 800,
            width: "100%",
            p: 4,
            borderRadius: 4,
            boxShadow: 6,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h5" fontWeight={600}>
              Criar Conta
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Preencha seus dados para continuar
            </Typography>
          </Box>

          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ flex: 1, mr: 1 }}>
                <TextField
                  fullWidth
                  label="Nome"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Box>
              <Box sx={{ flex: 1, ml: 1 }}>
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ flex: 1, mr: 1 }}>
                <TextField
                  fullWidth
                  label="Biografia"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  margin="normal"
                  minRows={2}
                  size="medium"
                  disabled={false}
                />
              </Box>
              <Box sx={{ flex: 1, ml: 1 }}>
                <TextField
                  fullWidth
                  label="Telefone"
                  margin="normal"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Box>
              <Box sx={{ flex: 1, ml: 1 }}>
                <TextField
                  fullWidth
                  label="Avatar URL"
                  margin="normal"
                  type="tel"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  required
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ flex: 1, mr: 1 }}>
                <TextField
                  fullWidth
                  label="Senha"
                  type="password"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>
              <Box sx={{ flex: 1, ml: 1 }}>
                <TextField
                  fullWidth
                  label="Confirme a Senha"
                  type="password"
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Box>
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleRegister}
            >
              Cadastrar
            </Button>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, textAlign: "center" }}
            >
              <Button
                color="primary"
                onClick={() => navigate("/login")}
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

export default Register;
