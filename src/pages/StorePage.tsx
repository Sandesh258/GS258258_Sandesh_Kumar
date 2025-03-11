import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteStore, reorderStores } from "../store/storeSlice";
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

  const [editingStore, setEditingStore] = useState<Store | null>(null);

  const handleDelete = (id: string) => {
    dispatch(deleteStore(id));
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    if (toIndex >= 0 && toIndex < stores.length) {
      dispatch(reorderStores({ fromIndex, toIndex }));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Stores</h2>

      <StoreForm editingStore={editingStore} setEditingStore={setEditingStore} />

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
                <button
                  className="btn btn-warning me-2"
                  type="button"
                  onClick={() => setEditingStore(store)}
                  aria-label={`Edit ${store.label}`}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger me-2"
                  type="button"
                  onClick={() => handleDelete(store.id)}
                  aria-label={`Delete ${store.label}`}
                >
                  <FaTrash />
                </button>
                {index > 0 && (
                  <button
                    className="btn btn-secondary me-2"
                    type="button"
                    onClick={() => handleReorder(index, index - 1)}
                    aria-label={`Move ${store.label} up`}
                  >
                    <FaArrowUp />
                  </button>
                )}
                {index < stores.length - 1 && (
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => handleReorder(index, index + 1)}
                    aria-label={`Move ${store.label} down`}
                  >
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
