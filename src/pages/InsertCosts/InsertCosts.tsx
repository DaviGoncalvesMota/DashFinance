import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import Forms from "../../components/Forms/Forms";

const InsertCosts = () => {
  return (
    <>
      <Card sx={{ width: "50%" }}>
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
            <Forms />
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
