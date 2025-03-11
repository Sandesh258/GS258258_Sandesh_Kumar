import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteSKU, updateSKU, addSKU } from "../store/skuSlice";
import { FaTrash } from "react-icons/fa";
import { SKU } from "../types";
import SKUForm from "../components/SKUForm";

const SKUs = () => {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.sku.skus);

  // Handle Add SKU
  const handleAddSKU = (sku: SKU) => {
    dispatch(addSKU(sku));
  };

  // Handle Delete SKU
  const handleDeleteSKU = (id: string) => {
    dispatch(deleteSKU(id));
  };

  // Handle Update SKU
  const handleUpdateSKU = (updatedSKU: SKU) => {
    dispatch(updateSKU(updatedSKU));
  };

  return (
    <div className="container mt-4">
      <h2>SKU Dimension</h2>
      <SKUForm onSubmit={handleAddSKU} />

      <div className="mt-4">
        <h3>Existing SKUs</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skus.map((sku) => (
              <tr key={sku.id}>
                <td>
                  <input
                    type="text"
                    value={sku.name}
                    onChange={(e) =>
                      handleUpdateSKU({ ...sku, name: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={sku.price}
                    onChange={(e) =>
                      handleUpdateSKU({
                        ...sku,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={sku.cost}
                    onChange={(e) =>
                      handleUpdateSKU({
                        ...sku,
                        cost: parseFloat(e.target.value),
                      })
                    }
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteSKU(sku.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SKUs;
