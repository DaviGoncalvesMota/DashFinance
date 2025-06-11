import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import type { IProducts } from "../../interfaces/IProducts";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    // Simulating an API call to fetch products
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/products");
      const data: IProducts[] = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>Dashboard</h1>
      <PieChart
        series={[
          {
            data: products.map((product) => ({
              id: product.id,
              value: product.price,
              label: product.name,
            })),
          },
        ]}
        width={200}
        height={200}
      />
    </Box>
  );
};

export default Dashboard;
