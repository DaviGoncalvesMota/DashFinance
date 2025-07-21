import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";

interface IFormsProps {
  name: string;
  setName: (value: string) => void;
  desc: string;
  setDesc: (value: string) => void;
  cost: number;
  setCost: (value: number) => void;
  place: string;
  setPlace: (value: string) => void;
  payment: string;
  setPayment: (value: string) => void;
  constant: string;
  setConstant: (value: string) => void;
  date: Dayjs | null;
  setDate: (value: Dayjs | null) => void;
  moveType: string;
  setMoveType: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  userName: string;
  setUserName: (value: string) => void;
  userEmail: string;
  setUserEmail: (value: string) => void;
  userPassword: string;
  setUserPassword: (value: string) => void;
  userBio: string;
  setUserBio: (value: string) => void;
  userPhone: string;
  setUserPhone: (value: string) => void;
  avatar: string;
  setAvatar: (value: string) => void;
  userId: string; 
  label: string;
}

const Forms = ({
  name, setName,
  desc, setDesc,
  cost, setCost,
  place, setPlace,
  payment, setPayment,
  constant, setConstant,
  date, setDate,
  moveType, setMoveType,
  category, setCategory,
  userName, setUserName,
  userEmail, setUserEmail,
  userPassword, setUserPassword,
  userBio, setUserBio,
  userPhone, setUserPhone,
  avatar, setAvatar,
  userId,
  label,
}: IFormsProps) => {
  const categoriasEntrada = [
    "Salário", "Freelance", "Investimentos", "Rendimentos",
    "Venda de Itens", "Reembolso", "Outros"
  ];

  const categoriasSaida = [
    "Alimentação", "Moradia", "Contas", "Transporte", "Saúde",
    "Lazer", "Assinaturas", "Multas", "Educação", "Compras",
    "Doações", "Impostos", "Outros"
  ];

  if (label === "Usuários") {
    return (
      <>
        <TextField label="Nome de Usuário" value={userName} onChange={(e) => setUserName(e.target.value)} fullWidth />
        <TextField label="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} type="email" fullWidth />
        <TextField label="Senha" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} type="password" fullWidth />
        <TextField label="Biografia" value={userBio} onChange={(e) => setUserBio(e.target.value)} fullWidth />
        <TextField label="Telefone" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} fullWidth />
        <TextField label="Avatar URL" value={avatar} onChange={(e) => setAvatar(e.target.value)} fullWidth />
      </>
    );
  }

  if (label === "Produtos") {
    return (
      <>
        <input type="hidden" value={userId} />
        <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Descrição" value={desc} onChange={(e) => setDesc(e.target.value)} fullWidth />
        <TextField label="Valor" value={cost} onChange={(e) => setCost(Number(e.target.value))} type="number" fullWidth />
        <TextField label="Local" value={place} onChange={(e) => setPlace(e.target.value)} fullWidth />

        <FormControl fullWidth>
          <InputLabel>Pagamento</InputLabel>
          <Select value={payment} onChange={(e) => setPayment(e.target.value)} label="Pagamento">
            <MenuItem value="Pix">Pix</MenuItem>
            <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
            <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Constante</InputLabel>
          <Select value={constant} onChange={(e) => setConstant(e.target.value)} label="Constante">
            <MenuItem value="Sim">Sim</MenuItem>
            <MenuItem value="Não">Não</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Data"
            value={date}
            onChange={(newDate) => setDate(newDate)}
          />
        </LocalizationProvider>

        <FormControl fullWidth>
          <InputLabel>Entrada ou Saída</InputLabel>
          <Select value={moveType} onChange={(e) => setMoveType(e.target.value)} label="Entrada ou Saída">
            <MenuItem value="Entrada">Entrada</MenuItem>
            <MenuItem value="Saída">Saída</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Categoria</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Categoria"
            disabled={!moveType}
          >
            {!moveType && (
              <MenuItem disabled value="">
                Selecione "Entrada" ou "Saída" primeiro
              </MenuItem>
            )}
            {moveType === "Entrada" && categoriasEntrada.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
            {moveType === "Saída" && categoriasSaida.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </>
    );
  }

  return null;
};

export default Forms;
