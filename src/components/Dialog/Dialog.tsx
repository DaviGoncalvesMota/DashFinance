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
  id?: string;
  label?: string; // Optional label prop for dynamic form labels
}

const Dialog = ({ onClose, id, label }: IDialogProps) => {
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

  useEffect(() => {
    if (!id) return;
    const fetchProducts = async () => {
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

    const fetchUser = async () => {
      const res = await fetch(`http://localhost:3001/users/${id}`);
      const data = await res.json();
      setUserName(data.name);
      setUserEmail(data.email);
      setUserPassword(data.password);
      setUserBio(data.bio);
      setUserPhone(data.phone);
      setAvatar(data.avatar);
    };

    fetchProducts();
    fetchUser();
  }, [id]);

  if (!id) {
    return null; // If no ID is provided, do not render the dialog
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (label === "Usuários") {
      const updatedUser = {
        name: userName,
        email: userEmail,
        password: userPassword,
        bio: userBio,
        phone: userPhone,
        avatar,
      };

      try {
        const response = await fetch(`http://localhost:3001/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
          throw new Error("Erro ao atualizar o produto");
        }

        const result = await response.json();
        console.log("Usuário atualizado:", result);
        onClose();
        window.location.reload();
      } catch (error) {
        console.error("Erro ao atualizar o usuário:", error);
        alert("Erro ao atualizar o usuário. Por favor, tente novamente.");
      }
    }

    if (label === "Produtos") {
      const updatedUser = {
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
          body: JSON.stringify(updatedUser),
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
              label={label ?? ""} // Adjust label as needed
            />
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} type="submit">
          {" "}
          Concluir{" "}
        </Button>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </DialogComponent>
  );
};

export default Dialog;
