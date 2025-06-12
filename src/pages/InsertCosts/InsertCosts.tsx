import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const InsertCosts = () => {
  return (
    <>
      <Card sx={{width: "50%"}}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Cadastro de Custos
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Descrição"
              type="text"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Custo"
              type="number"
              variant="outlined"
              fullWidth
            />
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
                <MenuItem value={2}> Contas </MenuItem>
                <MenuItem value={2}> Transporte </MenuItem>
                <MenuItem value={2}> Saúde </MenuItem>
                <MenuItem value={2}> Lazer </MenuItem>
                <MenuItem value={2}> Assinaturas </MenuItem>
                <MenuItem value={2}> Multas </MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary">
              Cadastrar
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default InsertCosts;
// This code defines a simple React component for the "Insert Costs" page.
