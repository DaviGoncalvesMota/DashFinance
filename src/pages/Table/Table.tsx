// MUI
import {
  Paper,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  IconButton,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import TableComponent from "@mui/material/Table";
import Dialog from "../../components/Dialog/Dialog";

// React
import React, { useEffect, useMemo, useState } from "react";

// Interfaces
import type { IProducts } from "../../interfaces/IProducts";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

export const isAuthenticated = () => {
  const navigate = useNavigate();
  if (!!localStorage.getItem("authUser")) {
    navigate("/login");
  };
  return true
};

const Table = () => {
  const [items, setItems] = useState<IProducts[]>([]);
  const [dialog, setDialog] = useState<React.ReactNode>();
  const [checkedCost, setCheckedCost] = useState(false);
  const [checkedReceive, setCheckedReceive] = useState(false);

  const params = useParams().id;

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const res = await fetch("http://localhost:3001/products?userId=" + params);
        const data: IProducts[] = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Erro ao buscar os itens:", error);
      }
    };
    fetchItens();
  }, []);

  const deleteItem = async (id: string) => {
    try {
      await fetch("http://localhost:3001/products/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      window.location.reload();
    } catch (error) {
      console.error("Erro ao deletar o item:", error);
    }
  };

  const itemsSaida = useMemo(() => {
    return items.filter((item) => item.moveType === "Saída");
  }, [items]);

  const itemsEntrada = useMemo(() => {
    return items.filter((item) => item.moveType === "Entrada");
  }, [items]);

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedCost(e.target.checked);
  };

  const handleReceiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedReceive(e.target.checked);
  };

  const renderHeader = () => (
    <TableRow>
      <TableCell align="left" sx={{ fontWeight: "bold" }}>Nome</TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold" }}>Descrição</TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold" }}>Custo</TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold" }}>Local</TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold" }}>Pagamento</TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold" }}>Constante</TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold" }}>Data</TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold" }}>Categoria</TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold" }}>Ações</TableCell>
    </TableRow>
  );

  const renderRows = (list: IProducts[]) =>
    list.map((item) => (
      <TableRow key={item.id} hover sx={{ "&:hover": { backgroundColor: "#fafafa" } }}>
        <TableCell align="left">{item.name}</TableCell>
        <TableCell align="center">{item.desc}</TableCell>
        <TableCell align="center">R$ {item.cost}</TableCell>
        <TableCell align="center">{item.place}</TableCell>
        <TableCell align="center">{item.payment}</TableCell>
        <TableCell align="center" sx={{ color: item.constant === "Sim" ? "green" : "red" }}>
          {item.constant}
        </TableCell>
        <TableCell align="center">
          {new Date(item.date).toLocaleDateString()}
        </TableCell>
        <TableCell align="center">{item.category}</TableCell>
        <TableCell align="center">
          <IconButton onClick={() => setDialog(<Dialog onClose={() => setDialog(undefined)} id={item.id} label="Produtos" />)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => deleteItem(item.id)}>
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    ));

  return (
    <>
      {dialog}
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Tabelas</h1>

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FormControlLabel
          control={<Checkbox checked={checkedReceive} onChange={handleReceiveChange} />}
          label="Entrada"
        />
        <FormControlLabel
          control={<Checkbox checked={checkedCost} onChange={handleCostChange} />}
          label="Saída"
        />
      </Box>

      <br />

      {checkedCost && (
        <>
          <h3>Saídas</h3>
          <TableContainer component={Paper} sx={{ width: "90%", margin: "auto", borderRadius: 3, boxShadow: 3 }}>
            <TableComponent>
              <TableHead>{renderHeader()}</TableHead>
              <TableBody>{renderRows(itemsSaida)}</TableBody>
            </TableComponent>
          </TableContainer>
          <br />
          <br />
        </>
      )}

      {checkedReceive && (
        <>
          <h3>Entradas</h3>
          <TableContainer component={Paper} sx={{ width: "90%", margin: "auto", borderRadius: 3, boxShadow: 3 }}>
            <TableComponent>
              <TableHead>{renderHeader()}</TableHead>
              <TableBody>{renderRows(itemsEntrada)}</TableBody>
            </TableComponent>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default Table;
