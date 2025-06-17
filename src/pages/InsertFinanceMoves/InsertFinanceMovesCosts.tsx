import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import Forms from "../../components/Forms/Forms";
import { useState } from "react";
import type { Dayjs } from "dayjs";

const InsertCosts = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState<number>(0);
  const [place, setPlace] = useState("");
  const [payment, setPayment] = useState("");
  const [constant, setConstant] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [moveType, setMoveType] = useState("");
  const [category, setCategory] = useState("");

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
