import type { SyntheticEvent } from "react";
import type { Product, EditedProduct} from "../types";
import findProductIdx from "../utilities/findProductIdx";
import {useState} from 'react';

interface ProductProps {
  product: Product,
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  products: Array<Product>,
  setViewEdit: React.Dispatch<React.SetStateAction<boolean>>
}

function EditProduct({product, setProducts, setViewEdit}: ProductProps) {
  const [editedProduct, setEditedProduct] = useState<EditedProduct>({
    price: product.price,
    quantity: product.quantity,
    title: product.title
  });

  function handleUpdate(event: SyntheticEvent) {
    event.preventDefault();
    let prodAfterEdits: Product = { _id: product._id, ...editedProduct};

    setProducts((prev) => {
      let productIdx = findProductIdx(prev, product);
      let productsCopy = [... prev];
      productsCopy[productIdx] = prodAfterEdits;
      return productsCopy;
    });
    setViewEdit(false);
  }

  function handleChange(event: SyntheticEvent) {
    let target = event.target as HTMLInputElement;
    let inputType = target.className;
    if (inputType === 'title') {
      setEditedProduct((prev) => { return {...prev, title: target.value} });
    } else if (inputType === 'price') {
      let value = Number(target.value);
      if (value < 0) {
        alert('Price cannot be less than $0.00!');
      }

      setEditedProduct((prev) => { return {...prev, price: value} });
    } else if (inputType === 'quantity') {
      let value = Number(target.value);
      if (value < 0) {
        alert('Quantity of item cannot be less than 0!');
      }

      setEditedProduct((prev) => { return {...prev, quantity: value} });
    }

  }

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label>Product Name:
            <input type="text"
                   id="product-name"
                   name="product-name"
                   required
                   className="title"
                   value={editedProduct.title}
                   onChange={handleChange}/>
          </label>
        </div>
        <div className="input-group">
          <label>Price:
            <input type="number"
                   id="product-price"
                   name="product-price"
                   min="0"
                   step="0.01"
                   required
                   className="price"
                   value={editedProduct.price}
                   onChange={handleChange}/>
          </label>
        </div>
        <div className="input-group">
          <label>Quantity:
            <input type="number"
                   id="product-quantity"
                   name="product-quantity"
                   min="0"
                   required
                   className="quantity"
                   value={editedProduct.quantity}
                   onChange={handleChange}/>
          </label>
        </div>
        <div className="actions form-actions">
          <button type="submit" onClick={handleUpdate}>Edit</button>
          <button type="button"
                  onClick={(e) => { e.preventDefault(); setViewEdit(false) }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;

