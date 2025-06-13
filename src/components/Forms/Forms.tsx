import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Forms = () => {
  return (
    <>
      <TextField label="Descrição" type="text" variant="outlined" fullWidth />
      <TextField label="Custo" type="number" variant="outlined" fullWidth />
      <TextField label="Local" type="text" variant="outlined" fullWidth />
      <FormControl fullWidth>
        <InputLabel>Pagamento</InputLabel>
        <Select label="Pagamento">
          <MenuItem value="pix">Pix</MenuItem>
          <MenuItem value="creditcard">Cartão de Crédito</MenuItem>
          <MenuItem value="debitcard">Cartão de Débito</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Constante</InputLabel>
        <Select label="Constante">
          <MenuItem value={1}>Sim</MenuItem>
          <MenuItem value={2}>Não</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Data" />
      </LocalizationProvider>
      <FormControl fullWidth>
        <InputLabel>Categoria</InputLabel>
        <Select label="Categoria">
          <MenuItem value={1}> Alimentação </MenuItem>
          <MenuItem value={2}> Moradia </MenuItem>
          <MenuItem value={3}> Contas </MenuItem>
          <MenuItem value={4}> Transporte </MenuItem>
          <MenuItem value={5}> Saúde </MenuItem>
          <MenuItem value={6}> Lazer </MenuItem>
          <MenuItem value={7}> Assinaturas </MenuItem>
          <MenuItem value={8}> Multas </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
export default Forms;
// This code defines a simple React component for the "Forms" page.
