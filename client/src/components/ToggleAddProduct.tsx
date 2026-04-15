import AddProduct from "./AddProduct";
import type { NewProduct } from "../types";
import useToggle from "../hooks/useToggle";

interface ToggleableAddProductProps {
  onAddProduct(newProduct: NewProduct, resetAddForm: () => void): Promise<void>
}

function ToggleableAddProduct({onAddProduct}: ToggleableAddProductProps) {
  let { visibility: showAddProduct, toggle: setShowAddProduct } = useToggle(false);

  function handleShowAddForm() {
    setShowAddProduct();
  }

  return (
    <AddProduct
      showAddProduct={showAddProduct}
      onShowAddForm={handleShowAddForm}
      onAddProduct={onAddProduct}/>
  )
}

export default ToggleableAddProduct;

