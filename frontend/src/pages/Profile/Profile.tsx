import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import type { IUser } from "../../interfaces/IUsers";
import Dialog from "../../components/Dialog/Dialog";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const IsAuthenticated = () => {
    const navigate = useNavigate();
    if (!localStorage.getItem("authUser")) {
      navigate("/login");
    }
    return true;
  };

  IsAuthenticated();

  const [user, setUser] = useState<IUser>({} as IUser);
  const [dialog, setDialog] = useState<React.ReactNode>();
  const params = useParams().id;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://127.0.0.1:8000/users/" + params);
      const data: IUser = await response.json();
      setUser(data);
    };

    fetchProducts();
  }, [params]);

  return (
    <>
      {dialog}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            width: "100%",
            p: 3,
            borderRadius: 4,
            boxShadow: 6,
          }}
        >
            <Card
              key={user._id}
              sx={{
                maxWidth: 600,
                width: "100%",
                p: 3,
                borderRadius: 4,
                boxShadow: 6,
                mb: 4,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Avatar
                  src={user.avatar}
                  sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
                />
                <Typography variant="h5" fontWeight={600}>
                  {user.name}
                </Typography>
                <Typography color="text.secondary">{user.email}</Typography>
                <Button
                  onClick={() =>
                    setDialog(
                      <Dialog
                        onClose={() => setDialog(false)}
                        label="Usuários"
                        id={user._id}
                      />
                    )
                  }
                  sx={{ mt: 2 }}
                  variant="outlined"
                >
                  Editar Perfil
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Conteúdo Dinâmico */}
              <CardContent>
                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Biografia
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {user.bio}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Telefone
                  </Typography>
                  <Typography variant="body2">{user.phone}</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => {
                      localStorage.removeItem("authUser");
                      window.location.href = "/login";
                    }}
                  >
                    Sair da Conta
                  </Button>
                </Box>
              </CardContent>
            </Card>
        </Card>
      </Box>
    </>
  );
};

export default Profile;
// This is the Profile page where user information will be displayed.
