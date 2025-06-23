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
}

const Forms = ({
  name,
  setName,
  desc,
  setDesc,
  cost,
  setCost,
  place,
  setPlace,
  payment,
  setPayment,
  constant,
  setConstant,
  date,
  setDate,
  moveType,
  setMoveType,
  category,
  setCategory,
}: IFormsProps) => {
  return (
    <>
      <TextField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Descrição"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        type="text"
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Valor"
        value={cost}
        onChange={(e) => setCost(Number(e.target.value))}
        type="number"
        variant="outlined"
        fullWidth
      />
      <TextField
        label="Local"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        type="text"
        variant="outlined"
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Pagamento</InputLabel>
        <Select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          label="Pagamento"
        >
          <MenuItem value="Pix">Pix</MenuItem>
          <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
          <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Constante</InputLabel>
        <Select
          value={constant}
          onChange={(e) => setConstant(e.target.value)}
          label="Constante"
        >
          <MenuItem value="Sim"> Sim </MenuItem>
          <MenuItem value="Não"> Não </MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={date}
          onChange={(newDate) => setDate(newDate)}
          label="Data"
        />
      </LocalizationProvider>
      <FormControl fullWidth>
        <InputLabel>Entrada ou Saída</InputLabel>
        <Select
          value={moveType}
          onChange={(e) => setMoveType(e.target.value)}
          label="Entrada ou Saída"
        >
          <MenuItem value="Entrada"> Entrada </MenuItem>
          <MenuItem value="Saída"> Saída </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Categoria</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Categoria"
        >
          <MenuItem value="Alimentação"> Alimentação </MenuItem>
          <MenuItem value="Moradia"> Moradia </MenuItem>
          <MenuItem value="Contas"> Contas </MenuItem>
          <MenuItem value="Transporte"> Transporte </MenuItem>
          <MenuItem value="Saúde"> Saúde </MenuItem>
          <MenuItem value="Lazer"> Lazer </MenuItem>
          <MenuItem value="Assinaturas"> Assinaturas </MenuItem>
          <MenuItem value="Multas"> Multas </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
export default Forms;
// This code defines a simple React component for the "Forms" page.
