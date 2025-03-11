import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SKU } from "../types";

// Sample data for stores (you can replace with your actual data)
const stores = [
    { id: "ST035", label: "San Francisco Bay Trends", city: "San Francisco", state: "CA" },
    { id: "ST046", label: "Phoenix Sunwear", city: "Phoenix", state: "AZ" },
    { id: "ST064", label: "Dallas Ranch Supply", city: "Dallas", state: "TX" },
    { id: "ST066", label: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
    { id: "ST073", label: "Nashville Melody Music Store", city: "Nashville", state: "TN" },
    { id: "ST074", label: "New York Empire Eats", city: "New York", state: "NY" },
    { id: "ST091", label: "Denver Peaks Outdoor", city: "Denver", state: "CO" },
    { id: "ST094", label: "Philadelphia Liberty Market", city: "Philadelphia", state: "PA" },
    { id: "ST097", label: "Boston Harbor Books", city: "Boston", state: "MA" },
    { id: "ST101", label: "Austin Vibe Co.", city: "Austin", state: "TX" },
    { id: "ST131", label: "Los Angeles Luxe", city: "Los Angeles", state: "CA" },
    { id: "ST150", label: "Houston Harvest Market", city: "Houston", state: "TX" },
    { id: "ST151", label: "Portland Evergreen Goods", city: "Portland", state: "OR" },
    { id: "ST156", label: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
    { id: "ST163", label: "Las Vegas Neon Treasures", city: "Las Vegas", state: "NV" },
    { id: "ST175", label: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
    { id: "ST176", label: "Miami Breeze Apparel", city: "Miami", state: "FL" },
    { id: "ST177", label: "San Diego Wave Surf Shop", city: "San Diego", state: "CA" },
    { id: "ST193", label: "Charlotte Queen’s Closet", city: "Charlotte", state: "NC" },
    { id: "ST208", label: "Detroit Motor Gear", city: "Detroit", state: "MI" },
];

// SKU template
const skus: SKU[] = [
    { id: "SKU001", name: "Product A", price: 10, cost: 5 },
    { id: "SKU002", name: "Product B", price: 12, cost: 6 },
    { id: "SKU003", name: "Product C", price: 8, cost: 4 },
    { id: "SKU004", name: "Product D", price: 9, cost: 5 },
    { id: "SKU005", name: "Product E", price: 11, cost: 7 },
    { id: "SKU006", name: "Product F", price: 14, cost: 6 },
    { id: "SKU007", name: "Product G", price: 13, cost: 6 },
    { id: "SKU008", name: "Product H", price: 7, cost: 3 },
    { id: "SKU009", name: "Product I", price: 15, cost: 8 },
    { id: "SKU010", name: "Product J", price: 10, cost: 4 },
];

// Random number generator utility
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Chart = () => {
  const [selectedStore, setSelectedStore] = useState<string>(stores[0].id);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate random sales data for the selected store
    const generateRandomData = () => {
      const storeSalesData = Array.from({ length: 3 }, (_, i) => {
        const weekNumber = i + 1;
        
        // Generate random sales units for each SKU (unique per SKU)
        const salesUnitsBySKU = skus.reduce((acc, sku) => {
          acc[sku.id] = getRandomInt(10, 50); // Random sales units between 10 and 50 for each SKU
          return acc;
        }, {} as { [key: string]: number });

        // Calculate GM Dollars for each SKU in the week
        const totalSalesDollars = skus.reduce((total, sku) => {
          const salesUnits = salesUnitsBySKU[sku.id]; // Get the sales units for the SKU
          const variablePrice = sku.price * (getRandomInt(90, 110) / 100); // Price varies by 10% randomly
          return total + (salesUnits * variablePrice);
        }, 0);

        const totalGmDollars = skus.reduce((total, sku) => {
          const salesUnits = salesUnitsBySKU[sku.id];
          const variableCost = sku.cost * (getRandomInt(90, 110) / 100); // Cost varies by 10% randomly
          return total + (salesUnits * (sku.price - variableCost));
        }, 0);

        // Calculate GM Percentage for each week
        const gmPercentage = totalSalesDollars > 0 ? (totalGmDollars / totalSalesDollars) * 100 : 0;

        return {
          week: `Week ${weekNumber}`,
          GM_Dollars: totalGmDollars,
          GM_Percentage: gmPercentage,
        };
      });

      return storeSalesData;
    };

    setChartData(generateRandomData());
  }, [selectedStore]);

  return (
    <div>
      <h2>Select a Store</h2>
      <select
        value={selectedStore}
        onChange={(e) => setSelectedStore(e.target.value)}
      >
        {stores.map((store) => (
          <option key={store.id} value={store.id}>
            {store.label}
          </option>
        ))}
      </select>

      <h2>GM Dollars and GM Percentage</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="GM_Dollars" fill="#8884d8" name="GM Dollars" />
          <Bar yAxisId="right" dataKey="GM_Percentage" fill="#82ca9d" name="GM %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
