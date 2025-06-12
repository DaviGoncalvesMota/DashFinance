import { PieChart } from "@mui/x-charts/PieChart";
import type { IProducts } from "../../interfaces/IProducts";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    // Simulating an API call to fetch products
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3001/products");
      const data: IProducts[] = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <PieChart
        series={[
          {
            data: products.map((product) => ({
              id: product.id,
              value: product.price,
              label: product.name,
            })),
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        width={200}
        height={200}
      />
    </>
  );
};

export default Dashboard;
