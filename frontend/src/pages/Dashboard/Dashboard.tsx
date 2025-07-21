import { useEffect, useMemo, useState } from "react";
import { BarChart, LineChart, PieChart, RadarChart } from "@mui/x-charts";
import type { IProducts } from "../../interfaces/IProducts";
import { Box, Typography, useTheme, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const Dashboard = () => {
  const IsAuthenticated = () => {
    const navigate = useNavigate();
    if (!localStorage.getItem("authUser")) {
      navigate("/login");
    }
    return true;
  };

  IsAuthenticated();

  const theme = useTheme();
  const [products, setProducts] = useState<IProducts[]>([]);
  const params = useParams().id;

  const today = new Date();
  const currentYear = today.getFullYear();

  const december = today.getMonth() === 11 && today.getFullYear() === currentYear;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/products/findbyuserid/" + params
      );
      const data: IProducts[] = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [params]);

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

  const groupEnterCategories = useMemo(() => {
    const contagem: Record<string, number> = {};
    productsEntrada.forEach((product) => {
      contagem[product.category] = (contagem[product.category] || 0) + 1;
    });
    return contagem;
  }, [productsEntrada]);

  const mostRepeatedSaleCategories = useMemo(() => {
    const ordenadas = Object.entries(groupSaleCategories).sort(
      (a, b) => b[1] - a[1]
    );
    return ordenadas.slice(0, 5); // top 5 categorias
  }, [groupSaleCategories]);

  const mostRepeatedEnterCategories = useMemo(() => {
    const ordenadas = Object.entries(groupEnterCategories).sort(
      (a, b) => b[1] - a[1]
    );
    return ordenadas.slice(0, 5); // top 5 categorias
  }, [groupEnterCategories]);

  const radarMetricsSale = mostRepeatedSaleCategories.map(
    ([category]) => category
  );
  const radarSeriesSale = [
    {
      label: "Frequência de Saídas",
      data: mostRepeatedSaleCategories.map(([, count]) => count),
    },
  ];

  const radarMetricsEnter = mostRepeatedEnterCategories.map(
    ([category]) => category
  );
  const radarSeriesEnter = [
    {
      label: "Frequência de Entradas",
      data: mostRepeatedEnterCategories.map(([, count]) => count),
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

      <Typography
        variant="h6"
        align="center"
        sx={{ mb: 4}}
      >
        Conforme os cadastros vão sendo feitos, as Dashboards vão sendo criadas
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

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            mb: 6,
          }}
        >
          {productsSaida.length > 0 && (
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
              {productsSaida.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: productsSaida.map((product) => ({
                        id: product._id,
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
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Não há saídas registradas.
                </Typography>
              )}
            </Paper>
          )}

          {productsEntrada.length > 0 && (
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
              {productsEntrada.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: productsEntrada.map((product) => ({
                        id: product._id,
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
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Não há entradas registradas.
                </Typography>
              )}
            </Paper>
          )}

        </Box>

        {/* Gráfico de Barras */}
        {products.length > 0 && (
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
        )}

        {productsSaida.filter((p) => p.category).length > 3 && (
          <Paper sx={{ p: 2, borderRadius: 3 }} elevation={2}>
            <Typography variant="h6" textAlign="center" gutterBottom>
              Categorias mais recorrentes nas Saídas
            </Typography>
            {radarMetricsSale.length >= 3 ? (
              <RadarChart
                height={300}
                series={radarSeriesSale}
                radar={{
                  metrics: radarMetricsSale,
                }}
              />
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                Não há categorias suficientes para exibir o gráfico de radar.
              </Typography>
            )}
          </Paper>
        )}

        {productsEntrada.filter((p) => p.category).length > 3 && (
          <Box sx={{ mb: 6, mt: 6 }}>
            <Paper sx={{ p: 2, borderRadius: 3 }} elevation={2}>
              <Typography variant="h6" textAlign="center" gutterBottom>
                Categorias mais recorrentes nas Entradas
              </Typography>
              {radarMetricsEnter.length >= 3 ? (
                <RadarChart
                  height={300}
                  series={radarSeriesEnter}
                  radar={{
                    metrics: radarMetricsEnter,
                  }}
                />
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  Não há categorias suficientes para exibir o gráfico de radar.
                </Typography>
              )}
            </Paper>
          </Box>
        )}

        {/* Gráficos de pagamento - Saídas e Entradas */}
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
          {productsSaida.filter((p) => p.payment === "Pix").length > 0 && (
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, width: 320, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>Saídas - PIX</Typography>
              {productsSaida.filter((p) => p.payment === "Pix").length > 0 ? (
                <PieChart
                  series={[{
                    data: productsSaida.filter(p => p.payment === "Pix").map((p) => ({
                      id: p._id,
                      value: p.cost,
                      label: p.name,
                    })),
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                  }]}
                  width={300}
                  height={300}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">Nenhuma saída via PIX.</Typography>
              )}
            </Paper>
          )}

          {productsSaida.filter((p) => p.payment === "Cartão de Débito").length > 0 && (
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, width: 320, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>Saídas - Débito</Typography>
              {productsSaida.filter((p) => p.payment === "Cartão de Débito").length > 0 ? (
                <PieChart
                  series={[{
                    data: productsSaida.filter(p => p.payment === "Cartão de Débito").map((p) => ({
                      id: p._id,
                      value: p.cost,
                      label: p.name,
                    })),
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                  }]}
                  width={300}
                  height={300}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">Nenhuma saída via Débito.</Typography>
              )}
            </Paper>
          )}

          {productsSaida.filter((p) => p.payment === "Cartão de Crédito").length > 0 && (
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, width: 320, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>Saídas - Crédito</Typography>
              {productsSaida.filter((p) => p.payment === "Cartão de Crédito").length > 0 ? (
                <PieChart
                  series={[{
                    data: productsSaida.filter(p => p.payment === "Cartão de Crédito").map((p) => ({
                      id: p._id,
                      value: p.cost,
                      label: p.name,
                    })),
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                  }]}
                  width={300}
                  height={300}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">Nenhuma saída via Crédito.</Typography>
              )}
            </Paper>
          )}

          {productsEntrada.filter((p) => p.payment === "Pix").length > 0 && (
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, width: 320, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>Entradas - PIX</Typography>
              {productsEntrada.filter((p) => p.payment === "Pix").length > 0 ? (
                <PieChart
                  series={[{
                    data: productsEntrada.filter(p => p.payment === "Pix").map((p) => ({
                      id: p._id,
                      value: p.cost,
                      label: p.name,
                    })),
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                  }]}
                  width={300}
                  height={300}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">Nenhuma entrada via Pix.</Typography>
              )}
            </Paper>
          )}

          {productsEntrada.filter((p) => p.payment === "Cartão de Débito").length > 0 && (
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, width: 320, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>Entradas - Débito</Typography>
              {productsEntrada.filter((p) => p.payment === "Cartão de Débito").length > 0 ? (
                <PieChart
                  series={[{
                    data: productsEntrada.filter(p => p.payment === "Cartão de Débito").map((p) => ({
                      id: p._id,
                      value: p.cost,
                      label: p.name,
                    })),
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                  }]}
                  width={300}
                  height={300}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">Nenhuma entrada via Débito.</Typography>
              )}
            </Paper>
          )}

          {productsEntrada.filter((p) => p.payment === "Cartão de Crédito").length > 0 && (
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2, width: 320, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>Entradas - Crédito</Typography>
              {productsEntrada.filter((p) => p.payment === "Cartão de Crédito").length > 0 ? (
                <PieChart
                  series={[{
                    data: productsEntrada.filter(p => p.payment === "Cartão de Crédito").map((p) => ({
                      id: p._id,
                      value: p.cost,
                      label: p.name,
                    })),
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                  }]}
                  width={300}
                  height={300}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">Nenhuma entrada via Crédito.</Typography>
              )}
            </Paper>
          )}
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
          {years.length > 0 && december && (
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
                width={800}
              />
            </Paper>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
