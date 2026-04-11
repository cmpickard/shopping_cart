import { useState } from "react";
import AddProduct from "./AddProduct";
import type { NewProduct } from "../types";

interface ToggleableAddProductProps {
  onAddProduct(newProduct: NewProduct, resetAddForm: () => void): Promise<void>
}

function ToggleableAddProduct({onAddProduct}: ToggleableAddProductProps) {
  const [showAddProduct, setShowAddProduct] = useState(false);

  function handleShowAddForm() {
    setShowAddProduct((prev) => !prev);
  }

  return (
    <AddProduct
      showAddProduct={showAddProduct}
      onShowAddForm={handleShowAddForm}
      onAddProduct={onAddProduct}/>
  )
}

export default ToggleableAddProduct;

