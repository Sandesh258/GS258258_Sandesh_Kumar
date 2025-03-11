import { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// SKU type definition
export interface SKU {
  id: string;
  name: string;
  price: number;
  cost: number;
  salesDollars?: number;
  gmDollars?: number;
  gmPercentage?: number;
  salesUnits?: number;
}

// Sample SKU Data
const skus: SKU[] = [
  { id: "SKU001", name: "Product A", price: 10, cost: 5 },
  { id: "SKU002", name: "Product B", price: 15, cost: 7 },
];

// Initialize row data with SKU fields
const PlanningGrid = () => {
  const [rowData, setRowData] = useState<SKU[]>(() => {
    return skus.map(sku => ({
      ...sku,
      salesDollars: 0,
      gmDollars: 0,
      gmPercentage: 0,
    }));
  });

  // Calculate fields dynamically
  const calculateFields = (data: SKU) => {
    const updatedData = { ...data };
    const salesUnits = updatedData.salesUnits || 0; // Default to 0 if undefined
    
    updatedData.salesDollars = updatedData.price * salesUnits;
    updatedData.gmDollars = updatedData.salesDollars - updatedData.cost * salesUnits;
    updatedData.gmPercentage = updatedData.salesDollars > 0 ? (updatedData.gmDollars / updatedData.salesDollars) : 0;

    return updatedData;
  };

  // Column definitions
  const columnDefs: ColDef[] = useMemo(() => [
    { headerName: "ID", field: "id", editable: false },
    { headerName: "Name", field: "name", editable: true },
    { headerName: "Price", field: "price", editable: true },
    { headerName: "Cost", field: "cost", editable: true },
    {
      headerName: "Sales Units",
      field: "salesUnits",
      editable: true,
      cellRendererFramework: (params: any) => (
        <input
          type="number"
          value={params.value || 0}
          onChange={(e) => {
            const updatedRowData = [...rowData];
            const updatedData = calculateFields({
              ...params.data,
              salesUnits: Number(e.target.value),
            });
            updatedRowData[params.node.rowIndex] = updatedData;
            setRowData(updatedRowData); // Update row data state
          }}
        />
      ),
    },
    {
      headerName: "Sales Dollars",
      field: "salesDollars",
      valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
      editable: false,
    },
    {
      headerName: "GM Dollars",
      field: "gmDollars",
      valueFormatter: (params: any) => `$${params.value.toFixed(2)}`,
      editable: false,
    },
    {
      headerName: "GM %",
      field: "gmPercentage",
      valueFormatter: (params: any) => `${(params.value * 100).toFixed(2)}%`,
      editable: false,
    },
  ], [rowData]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default PlanningGrid;
