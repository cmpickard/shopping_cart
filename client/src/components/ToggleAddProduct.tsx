import { useState, type SyntheticEvent } from "react";
import AddProduct from "./AddProduct";
import type { NewProduct } from "../types";

interface ToggleableAddProductProps {
  onAddProduct(newProduct: NewProduct, resetAddForm: () => void): Promise<void>
}

function ToggleableAddProduct({onAddProduct}: ToggleableAddProductProps) {
  const [showAddProduct, setShowAddProduct] = useState(false);

  function handleShowAddProduct(event: SyntheticEvent) {
    event.preventDefault();

    setShowAddProduct((prev) => !prev);
  }

  return (
    <>
      <button onClick={handleShowAddProduct}>Add Product</button>
      <AddProduct showAddProduct={showAddProduct} setShowAddProduct={setShowAddProduct} onAddProduct={onAddProduct}/>
    </>
  )
}

export default ToggleableAddProduct;