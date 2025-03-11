import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStore, updateStore } from "../store/storeslice";

interface Store {
  id: string;
  label: string;
  city: string;
  state: string;
}

interface StoreFormProps {
  editingStore: Store | null;
  setEditingStore: (store: Store | null) => void;
}

const StoreForm: React.FC<StoreFormProps> = ({ editingStore, setEditingStore }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Store>(
    editingStore || { id: "", label: "", city: "", state: "" }
  );

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStore) {
      dispatch(updateStore(formData));
      setEditingStore(null);
    } else {
      dispatch(addStore(formData));
    }
    setFormData({ id: "", label: "", city: "", state: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row">
        <div className="col">
          <input type="text" name="id" className="form-control" placeholder="ID" value={formData.id} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="text" name="label" className="form-control" placeholder="Label" value={formData.label} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="text" name="city" className="form-control" placeholder="City" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="col">
          <input type="text" name="state" className="form-control" placeholder="State" value={formData.state} onChange={handleChange} required />
        </div>
        <div className="col">
          <button type="submit" className="btn btn-primary">{editingStore ? "Update" : "Add"}</button>
        </div>
      </div>
    </form>
  );
};

export default StoreForm;
