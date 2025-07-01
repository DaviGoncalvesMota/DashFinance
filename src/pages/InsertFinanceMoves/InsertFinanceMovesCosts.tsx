import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import Forms from "../../components/Forms/Forms";
import { useState } from "react";
import type { Dayjs } from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

export const isAuthenticated = () => {
  const navigate = useNavigate();
  if (!!localStorage.getItem("authUser")) {
    navigate("/login");
  };
  return true
};

const InsertCosts = () => {

  const params = useParams().id;

  const userId = params
  
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState<number>(0);
  const [place, setPlace] = useState("");
  const [payment, setPayment] = useState("");
  const [constant, setConstant] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [moveType, setMoveType] = useState("");
  const [category, setCategory] = useState("");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const insert = async () => {
    const data = {
      name,
      desc,
      cost,
      place,
      payment,
      constant,
      date: date ? date.format("DD-MM-YYYY") : null,
      moveType,
      category,
      userId
    };

    const res = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Movimento cadastrado com sucesso!");
      console.log(data);
      setName("");
      setDesc("");
      setCost(0);
      setPlace("");
      setPayment("");
      setConstant("");
      setDate(null);
      setMoveType("")
      setCategory("");
    } else {
      alert("Erro ao cadastrar movimento.");
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card sx={{ width: "50%" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Cadastro de Movimento Financeiro
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Forms
                name={name}
                setName={setName}
                desc={desc}
                setDesc={setDesc}
                cost={cost}
                setCost={setCost}
                place={place}
                setPlace={setPlace}
                payment={payment}
                setPayment={setPayment}
                constant={constant}
                setConstant={setConstant}
                date={date}
                setDate={setDate}
                moveType={moveType}
                setMoveType={setMoveType}
                category={category}
                setCategory={setCategory}
                userName={userName}
                setUserName={setUserName}
                userEmail={userEmail}
                setUserEmail={setUserEmail}
                userPassword={userPassword}
                setUserPassword={setUserPassword}
                userBio={userBio}
                setUserBio={setUserBio}
                userPhone={userPhone}
                setUserPhone={setUserPhone}
                avatar={avatar}
                setAvatar={setAvatar}
                userId={userId}
                label="Produtos"
              />
              <Button variant="contained" color="primary" onClick={insert}>
                Cadastrar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default InsertCosts;
// This code defines a simple React component for the "Insert Costs" page.
