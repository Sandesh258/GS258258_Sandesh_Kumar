import { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the modules explicitly
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Define SKU type
export interface SKU {
  id: string;
  name: string;
  price: number;
  cost: number;
  salesDollars?: number; // Optional properties
  gmDollars?: number;    // Optional properties
  gmPercentage?: number; // Optional properties
}

// Sample Data for Stores and SKUs
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

// Helper function to generate weeks for a given month
const generateWeeksForMonth = (month: number) => {
  const weeks: string[] = [];
  const startDate = new Date(2025, month, 1); // Start of the month
  const endDate = new Date(2025, month + 1, 0); // End of the month

  let weekStartDate = new Date(startDate);
  let weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekStartDate.getDate() + 6); // A week duration

  while (weekStartDate <= endDate) {
    weeks.push(`${weekStartDate.getDate()} - ${weekEndDate.getDate()}`);
    weekStartDate.setDate(weekStartDate.getDate() + 7); // Move to the next week
    weekEndDate.setDate(weekEndDate.getDate() + 7);
  }

  return weeks;
};

// Define Row Data type to accommodate dynamic keys
interface RowData {
  storeName: string;
  [skuId: string]: number | string | undefined; // Dynamically indexed fields
}

const Planning = () => {
  const [rowData, setRowData] = useState<RowData[]>(() => {
    const initialRowData = stores.map((store) => {
      const storeData: RowData = { storeName: store.label };

      skus.forEach((sku) => {
        const randomSalesUnits = Math.floor(Math.random() * 21); // Random sales units between 0 and 20
        storeData[sku.id] = randomSalesUnits;
        storeData[`${sku.id}_salesDollars`] = randomSalesUnits * sku.price;
        storeData[`${sku.id}_gmDollars`] = randomSalesUnits * (sku.price - sku.cost);
        storeData[`${sku.id}_gmPercentage`] = (storeData[`${sku.id}_gmDollars`] as number) / (storeData[`${sku.id}_salesDollars`] as number);
      
      });

      

      return storeData;
    });

    return initialRowData;
  });

  const calculateFields = (data: RowData) => {
    skus.forEach((sku) => {
      const skuId = sku.id;
      let salesUnits = data[skuId] as number;

      // Ensure salesUnits are not NaN or undefined
      if (isNaN(salesUnits)) salesUnits = 0;

      const salesDollars = salesUnits * sku.price;
      const gmDollars = salesDollars - salesUnits * sku.cost;
      const gmPercentage = salesDollars > 0 ? gmDollars / salesDollars : 0;

      data[`${skuId}_salesDollars`] = salesDollars;
      data[`${skuId}_gmDollars`] = gmDollars;
      data[`${skuId}_gmPercentage`] = gmPercentage;
    });

    return data;
  };

  const months = [generateWeeksForMonth(0), generateWeeksForMonth(1), generateWeeksForMonth(2)]; // Assuming three months

  const columnDefs: ColDef[] = useMemo(() => {
    const weekColumns = months.flatMap((weeks, monthIndex) => {
      return weeks.map((week, weekIndex) => ({
        headerName: `Week ${week}`,
        field: `week_${monthIndex}_${weekIndex}_salesUnits`,
        editable: true,
        cellRendererFramework: (params: any) => (
          <input
            type="number"
            value={params.value || 0}
            onChange={(e) => {
              params.setValue(Number(e.target.value));
              // Trigger recalculation after sales units are updated
              const updatedRowData = [...rowData];
              const updatedData = calculateFields({ ...params.data });
              updatedRowData[params.node.rowIndex] = updatedData;
              setRowData(updatedRowData); // Update the row data state
            }}
          />
        ),
      }));
    });

    return [
      { headerName: "Store Name", field: "storeName", editable: false },
      ...skus.map((sku) => ({
        headerName: sku.name,
        field: sku.id,
        editable: true,
        cellRendererFramework: (params: any) => (
          <input
            type="number"
            value={params.value || 0}
            onChange={(e) => {
              params.setValue(Number(e.target.value));
              // Trigger recalculation after sales units are updated
              const updatedRowData = [...rowData];
              const updatedData = calculateFields({ ...params.data });
              updatedRowData[params.node.rowIndex] = updatedData;
              setRowData(updatedRowData); // Update the row data state
            }}
          />
        ),
      })),
      ...skus.map((sku) => ({
        headerName: `${sku.name} Sales Dollars`,
        field: `${sku.id}_salesDollars`,
        valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
        editable: false,
      })),
      ...skus.map((sku) => ({
        headerName: `${sku.name} GM Dollars`,
        field: `${sku.id}_gmDollars`,
        valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
        editable: false,
      })),
      ...skus.map((sku) => ({
        headerName: `${sku.name} GM %`,
        field: `${sku.id}_gmPercentage`,
        valueFormatter: (params: any) => `${(params.value * 100).toFixed(2)}%`,
        editable: false,
        cellStyle: (params: any) => {
          const gmPercentage = params.value * 100;
          if (gmPercentage >= 40) return { backgroundColor: "green", color: "white" };
          if (gmPercentage >= 10) return { backgroundColor: "yellow" };
          if (gmPercentage >= 5) return { backgroundColor: "orange" };
          return { backgroundColor: "red", color: "white" };
        },
      })),
      ...weekColumns, // Adding week columns dynamically
    ];
  }, [rowData]);

  return (
    <div className="container mt-4">
      <h2>Planning</h2>
      <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default Planning;
