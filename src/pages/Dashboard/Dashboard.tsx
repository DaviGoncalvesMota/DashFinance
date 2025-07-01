import { useEffect, useMemo, useState } from "react";
import { BarChart, LineChart, PieChart, RadarChart } from "@mui/x-charts";
import type { IProducts } from "../../interfaces/IProducts";
import { Box, Typography, useTheme, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export const isAuthenticated = () => {
  const navigate = useNavigate();
  if (!!localStorage.getItem("authUser")) {
    navigate("/login");
  };
  return true
};

const Dashboard = () => {

  const theme = useTheme();
  const [products, setProducts] = useState<IProducts[]>([]);
  const params = useParams().id;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3001/products?userId=" + params);
      const data: IProducts[] = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const productsSaida = useMemo(
    () => products.filter((product) => product.moveType === "Saída"),
    [products]
  );

  const productsEntrada = useMemo(
    () => products.filter((product) => product.moveType === "Entrada"),
    [products]
  );

  const totalEntradas = useMemo(
    () => productsEntrada.reduce((acc, curr) => acc + curr.cost, 0),
    [productsEntrada]
  );

  const totalSaidas = useMemo(
    () => productsSaida.reduce((acc, curr) => acc + curr.cost, 0),
    [productsSaida]
  );

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

  // Contagem de categorias de saída
  const groupSaleCategories = useMemo(() => {
    const contagem: Record<string, number> = {};
    productsSaida.forEach((product) => {
      contagem[product.category] = (contagem[product.category] || 0) + 1;
    });
    return contagem;
  }, [productsSaida]);

  const mostRepeatedCategories = useMemo(() => {
    const ordenadas = Object.entries(groupSaleCategories).sort(
      (a, b) => b[1] - a[1]
    );
    return ordenadas.slice(0, 5); // top 5 categorias
  }, [groupSaleCategories]);

  const radarMetrics = mostRepeatedCategories.map(([category]) => category);
  const radarSeries = [
    {
      label: "Frequência de Saídas",
      data: mostRepeatedCategories.map(([, count]) => count),
    },
  ];

  // Pegar um ano da API
  const expansesForYear = useMemo(() => {
    return products
      .filter((product) => product.moveType === "Saída")
      .reduce((acc: Record<string, number>, product) => {
        const year = new Date(product.date).getFullYear().toString();
        acc[year] = (acc[year] || 0) + product.cost;
        return acc;
      }, {});
  }, [products]);

  const years = Object.keys(expansesForYear).sort();
  const values = years.map((year) => expansesForYear[year]);

  const chartSetting = {
    yAxis: [{ label: "Valores por mês", width: 60 }],
    height: 300,
  };

  return (
    <>
      <Typography
        variant="h3"
        align="center"
        sx={{
          mb: 4,
          fontWeight: "bold",
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Dashboard
      </Typography>

      <Box sx={{ p: 4 }}>
        {/* Valor total de entradas */}
        <Paper
          elevation={3}
          sx={{ mb: 4, p: 3, borderRadius: 3, textAlign: "center" }}
        >
          <Typography variant="h6">Total de Entradas</Typography>
          <Typography
            sx={{
              color: theme.palette.success.light,
              p: 2,
              borderRadius: 2,
              textAlign: "center",
              boxShadow: 2,
            }}
            variant="h4"
          >
            R$ {totalEntradas.toFixed(2)}
          </Typography>
        </Paper>

        {/* Valor total de saídas */}
        <Paper
          elevation={3}
          sx={{ mb: 4, p: 3, borderRadius: 3, textAlign: "center" }}
        >
          <Typography variant="h6">Total de Saídas</Typography>
          <Typography
            sx={{
              color: theme.palette.error.light,
              p: 2,
              borderRadius: 2,
              textAlign: "center",
              boxShadow: 2,
            }}
            variant="h4"
          >
            R$ {totalSaidas.toFixed(2)}
          </Typography>
        </Paper>

        {/* Gráficos de pizza */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            mb: 6,
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 2,
              width: 320,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Saídas
            </Typography>
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
          </Paper>

          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 2,
              width: 320,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Entradas
            </Typography>
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
          </Paper>
        </Box>

        {/* Gráfico de Barras */}
        <Paper sx={{ mb: 6, p: 2, borderRadius: 3 }} elevation={2}>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Entradas vs Saídas por Mês
          </Typography>
          <BarChart
            dataset={dataset}
            xAxis={[{ dataKey: "month" }]}
            series={[
              { dataKey: "expense", label: "Saída" },
              { dataKey: "receive", label: "Entrada" },
            ]}
            {...chartSetting}
          />
        </Paper>

        {/* Gráfico de Radar */}
        <Paper sx={{ p: 2, borderRadius: 3 }} elevation={2}>
          <Typography variant="h6" textAlign="center" gutterBottom>
            Categorias mais recorrentes nas Saídas
          </Typography>
          <RadarChart
            height={300}
            series={radarSeries}
            radar={{
              metrics: radarMetrics,
            }}
          />
        </Paper>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            mb: 6,
            mt: 6,
          }}
        >
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 2,
              width: 320,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              PIX
            </Typography>
            <PieChart
              series={[
                {
                  data: productsSaida
                    .filter((product) => product.payment === "Pix")
                    .map((product) => ({
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
          </Paper>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 2,
              width: 320,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Cartão de Crédito
            </Typography>
            <PieChart
              series={[
                {
                  data: productsSaida
                    .filter(
                      (product) => product.payment === "Cartão de Crédito"
                    )
                    .map((product) => ({
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
          </Paper>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 2,
              width: 320,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Cartão de Débito
            </Typography>
            <PieChart
              series={[
                {
                  data: productsSaida
                    .filter((product) => product.payment === "Cartão de Débito")
                    .map((product) => ({
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
          </Paper>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            mb: 6,
            mt: 6,
          }}
        >
          <Paper
            sx={{ mb: 6, p: 4, borderRadius: 3, width: "90%" }}
            elevation={2}
          >
            <Typography variant="h5" textAlign="center" gutterBottom>
              Despesas por Ano
            </Typography>
            <LineChart
              xAxis={[{ data: years }]}
              series={[{ data: values }]}
              height={400}
              width={800} // ou "100%" se quiser responsivo
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
