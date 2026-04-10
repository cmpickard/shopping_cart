import { useState, type SyntheticEvent } from "react";
import type { NewProduct } from "../types";

interface AddProductProps {
  showAddProduct: boolean,
  onAddProduct(newProduct: NewProduct, resetAddForm: () => void): Promise<void>,
  onShowAddForm: () => void
}

function AddProduct({onShowAddForm, showAddProduct, onAddProduct}: AddProductProps) {
  const [newProduct, setNewProduct] = useState<NewProduct>({ title: '',
                                                             quantity: 0,
                                                             price: 0 });

  function handleChange(prop: 'title' | 'quantity' | 'price') {
    return (event: SyntheticEvent) => {
      let target = event.target as HTMLInputElement;

      setNewProduct((prev) => {
        let copy = { ...prev };

        if (prop === 'title') {
          copy.title = target.value;
        } else if (prop === 'quantity') {
          copy.quantity = Number(target.value);
        } else if (prop === 'price') {
          copy.price = Number(target.value);
        }
        
        return copy;
      })
    }
  }

  function resetAddForm() {
    onShowAddForm();
    setNewProduct({ title: '', price: 0, quantity: 0 });
  }

  return (
    <div className={showAddProduct ? "add-form visible" : "add-form"}>
      <h3>Add Product</h3>
      <form>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            onChange={handleChange('title')}
            value={newProduct.title}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            onChange={handleChange('price')}
            value={newProduct.price}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            onChange={handleChange('quantity')}
            value={newProduct.quantity}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit" onClick={(e) => {
            e.preventDefault();
            onAddProduct(newProduct, resetAddForm);
            }}>Add</button>
          <button type="button" onClick={(e) => {
            e.preventDefault();
            onShowAddForm();
          }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;

