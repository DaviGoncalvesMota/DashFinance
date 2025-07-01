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

export const isAuthenticated = () => {
  const navigate = useNavigate();
  if (!!localStorage.getItem("authUser")) {
    navigate("/login");
  };
  return true
};

const Profile = () => {
  const [user, setUser] = useState<IUser[]>([]);
  const [dialog, setDialog] = useState<React.ReactNode>();
  const params = useParams().id;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3001/users?id=" + params);
      const data: IUser[] = await response.json();
      setUser(data);
    };

    fetchProducts();
  }, []);

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
          {/* Cabeçalho */}
          {user.map((user) => (
            <Card
              key={user.id}
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
                <Button onClick={() => setDialog(<Dialog onClose={() => setDialog(false)} label="Usuários" id={user.id} />)} sx={{ mt: 2 }} variant="outlined">
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
                </Box>
              </CardContent>
            </Card>
          ))}
        </Card>
      </Box>
    </>
  );
};

export default Profile;
// This is the Profile page where user information will be displayed.
