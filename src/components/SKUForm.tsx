import { useState } from "react";
import { SKU } from "../types";

interface SKUFormProps {
  onSubmit: (sku: SKU) => void;
}

const SKUForm: React.FC<SKUFormProps> = ({ onSubmit }) => {
  const [sku, setSku] = useState<SKU>({ id: "", name: "", price: 0, cost: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSku((prev) => ({
      ...prev,
      [name]: name === "price" || name === "cost" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(sku);
    setSku({ id: "", name: "", price: 0, cost: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          name="name"
          value={sku.name}
          onChange={handleChange}
          placeholder="SKU Name"
          className="border p-2 w-1/4"
          required
        />

        <input
          type="number"
          name="cost"
          value={sku.cost || ""}
          onChange={handleChange}
          placeholder="Cost"
          className="border p-2 w-1/4"
          required
        />

        <input
          type="number"
          name="price"
          value={sku.price || ""}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 w-1/4"
          required
        />

        <button type="submit" className="btn btn-success p-2 w-1/4 m-2">
          Add SKU
        </button>
      </div>
    </form>
  );
};

export default SKUForm;
