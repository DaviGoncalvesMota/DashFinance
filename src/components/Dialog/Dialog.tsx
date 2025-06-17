import {
  Button,
  Dialog as DialogComponent,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
} from "@mui/material";

import Forms from "../../components/Forms/Forms";
import { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface IDialogProps {
  onClose: () => void;
  id: string;
}

const Dialog = ({ onClose, id }: IDialogProps) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState<number>(0);
  const [place, setPlace] = useState("");
  const [payment, setPayment] = useState("");
  const [constant, setConstant] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [moveType, setMoveType] = useState("")
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3001/products/${id}`);
      const data = await res.json();
      setName(data.name);
      setDesc(data.desc);
      setCost(data.cost);
      setPlace(data.place);
      setPayment(data.payment);
      setConstant(data.constant);
      setDate(data.date ? dayjs(data.date, "DD-MM-YYYY") : null);
      setMoveType(data.moveType);
      setCategory(data.category);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!name || !desc || !cost || !place || !payment || !constant || !date || !moveType ||!category) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const updatedData = {
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

  try {
    const response = await fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar o produto");
    }

    const result = await response.json();
    console.log("Produto atualizado:", result);
    onClose();
    window.location.reload();
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
    alert("Erro ao atualizar o produto. Por favor, tente novamente.");
  }
};

  return (
    <DialogComponent
      open
      onClose={onClose}
      slotProps={{
        paper: {
          component: "form",
        },
      }}
      fullWidth
    >
      <DialogTitle sx={{ textAlign: "center" }}> Editar </DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="standard">
          <Stack spacing={2}>
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
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} type="submit"> Concluir </Button>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </DialogComponent>
  );
};

export default Dialog;
