// MUI
import {
  Paper,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  IconButton,
} from "@mui/material";
import TableComponent from "@mui/material/Table";
import Dialog from "../../components/Dialog/Dialog";

// React
import React, { useEffect, useState } from "react";

// Interfaces
import type { IProducts } from "../../interfaces/IProducts";
import { Delete, Edit } from "@mui/icons-material";

const Table = () => {
  const [items, setItems] = useState<IProducts[]>([]);
  const [dialog, setDialog] = useState<React.ReactNode>();

  useEffect(() => {
    // API GET
    const fetchItens = async () => {
      try {
        const res = await fetch("http://localhost:3001/products");
        const data: IProducts[] = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Erro ao buscar os itens:", error);
      }
    };

    fetchItens();
  }, []);

  return (
    <>
      {dialog}
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Tabela de Custos
      </h2>

      <TableContainer
        component={Paper}
        sx={{ width: "90%", margin: "auto", borderRadius: 3, boxShadow: 3 }}
      >
        <TableComponent>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Nome
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Descrição
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Custo
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Local
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Pagamento
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Constante
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Data
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Categoria
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items &&
              items.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{ "&:hover": { backgroundColor: "#fafafa" } }}
                >
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="center">{item.desc}</TableCell>
                  <TableCell align="center">R$ {item.cost}</TableCell>
                  <TableCell align="center">{item.place}</TableCell>
                  <TableCell align="center">{item.payment}</TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: item.constant ? "green" : "red" }}
                  >
                    {item.constant ? "Sim" : "Não"}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">{item.category}</TableCell>
                  <TableCell align="center">
                    {/* Placeholder for action buttons */}
                    <IconButton
                      onClick={() =>
                        setDialog(
                          <Dialog onClose={() => setDialog(undefined)} />
                        )
                      }
                    >
                      <Edit />
                    </IconButton>
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TableComponent>
      </TableContainer>
    </>
  );
};

export default Table;
// This code defines a simple React component for a "Table" page.
