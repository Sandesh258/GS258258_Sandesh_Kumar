import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SKU } from "../types";

interface ChartComponentProps {
  data: SKU[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const transformedData = data.map((sku) => ({
    name: sku.name,
    gmDollars: sku.price - sku.cost,
    gmPercent: ((sku.price - sku.cost) / sku.price) * 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={transformedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="gmDollars" fill="#8884d8" name="GM Dollars" />
        <Bar yAxisId="right" dataKey="gmPercent" fill="#82ca9d" name="GM %" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;