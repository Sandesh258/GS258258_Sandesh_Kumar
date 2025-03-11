import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteStore, reorderStores } from "../store/storeslice";
import { FaTrash, FaEdit, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useState } from "react";
import StoreForm from "../components/StoreForm";

interface Store {
  id: string;
  label: string;
  city: string;
  state: string;
}

const StorePage = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.store.stores);

  // State for editing store
  const [editingStore, setEditingStore] = useState<Store | null>(null);

  // Handle delete
  const handleDelete = (id: string) => {
    dispatch(deleteStore(id));
  };

  // Handle reorder
  const handleReorder = (fromIndex: number, toIndex: number) => {
    if (toIndex >= 0 && toIndex < stores.length) {
      dispatch(reorderStores({ fromIndex, toIndex }));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Stores</h2>

      {/* Store Form */}
      <StoreForm editingStore={editingStore} setEditingStore={setEditingStore} />

      {/* Store Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Label</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store, index) => (
            <tr key={store.id}>
              <td>{store.id}</td>
              <td>{store.label}</td>
              <td>{store.city}</td>
              <td>{store.state}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => setEditingStore(store)}>
                  <FaEdit />
                </button>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(store.id)}>
                  <FaTrash />
                </button>
                {index > 0 && (
                  <button className="btn btn-secondary me-2" onClick={() => handleReorder(index, index - 1)}>
                    <FaArrowUp />
                  </button>
                )}
                {index < stores.length - 1 && (
                  <button className="btn btn-secondary" onClick={() => handleReorder(index, index + 1)}>
                    <FaArrowDown />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StorePage;
