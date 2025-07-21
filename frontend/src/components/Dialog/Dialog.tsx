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
  const [userId, setUserId] = useState("");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchProducts = async () => {
      // GET PRODUCT BY ID
      const res = await fetch(`http://127.0.0.1:8000/products/${id}`);
      const data = await res.json();
      setName(data.name);
      setDesc(data.desc);
      setCost(data.cost);
      setPlace(data.place);
      setPayment(data.payment);
      setConstant(data.constant);
      setDate(data.date ? dayjs(data.date, "YYYY-MM-DD") : null);
      setMoveType(data.moveType);
      setCategory(data.category);
      setUserId(data.userId);
    };

    // GET USER BY ID
    const fetchUser = async () => {
      const res = await fetch(`http://127.0.0.1:8000/users/${id}`);
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
        // UPDATE USER
        const response = await fetch(`http://127.0.0.1:8000/users/${id}`, {
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
      const updateProduct = {
        name,
        desc,
        cost,
        place,
        payment,
        constant,
        date: date && date.isValid() ? date.format("YYYY-MM-DD") : null,
        moveType,
        category,
        userId,
      };

      try {
        // UPDATE PRODUCT
        const response = await fetch(`http://127.0.0.1:8000/products/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateProduct),
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
              userId={userId}
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
              label={label ?? ""}
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
