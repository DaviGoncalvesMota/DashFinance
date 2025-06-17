import { useEffect, useMemo, useState } from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import type { IProducts } from "../../interfaces/IProducts";
import { Box } from "@mui/material";

const Dashboard = () => {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3001/products");
      const data: IProducts[] = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const productsSaida = useMemo(() => {
    return products.filter((product) => product.moveType === "Saída");
  }, [products]);

  const productsEntrada = useMemo(() => {
    return products.filter((product) => product.moveType === "Entrada");
  }, [products]);

  const dataset = useMemo(() => {
    const meses = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dadosPorMes: Record<string, { expense: number; receive: number }> =
      {};
    meses.forEach((mes) => {
      dadosPorMes[mes] = { expense: 0, receive: 0 };
    });

    productsSaida.forEach((product) => {
      const mes = meses[new Date(product.date).getMonth()];
      dadosPorMes[mes].expense += product.cost;
    });

    productsEntrada.forEach((product) => {
      const mes = meses[new Date(product.date).getMonth()];
      dadosPorMes[mes].receive += product.cost;
    });

    return meses.map((mes) => ({
      month: mes,
      expense: dadosPorMes[mes].expense,
      receive: dadosPorMes[mes].receive,
    }));
  }, [productsEntrada, productsSaida]);

  const chartSetting = {
    yAxis: [
      {
        label: "Valores por mês",
        width: 60,
      },
    ],
    height: 300,
  };

  return (
    <>
      <h1 style={{marginRight: "8%"}}>Dashboard</h1>

      <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{marginRight: "25%"}}>Saídas</h3>
          <PieChart
            series={[
              {
                data: productsSaida.map((product) => ({
                  id: product.id,
                  value: product.cost,
                  label: product.name,
                })),
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            width={300}
            height={300}
          />
        </Box>

        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{marginRight: "25%"}}>Entradas</h3>
          <PieChart
            series={[
              {
                data: productsEntrada.map((product) => ({
                  id: product.id,
                  value: product.cost,
                  label: product.name,
                })),
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            width={300}
            height={300}
          />
        </Box>
      </Box>

      <br />
      <br />

      <BarChart
        dataset={dataset}
        xAxis={[{ dataKey: "month" }]}
        series={[
          {
            dataKey: "expense",
            label: "Saída",
          },
          {
            dataKey: "receive",
            label: "Entrada",
          },
        ]}
        {...chartSetting}
      />
    </>
  );
};

export default Dashboard;
