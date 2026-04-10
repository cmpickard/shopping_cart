import EditProductForm from "./EditProductForm";
import type { Product } from "../types";
import { useState } from "react";
import ProductActions from "./ProductActions";
import ProductItem from "./ProductItem";

interface InteractableProductProps {
  product: Product,
  onDeleteProduct: (productId: string) => Promise<void>,
  onEditProduct: (productId: string, editedProduct: {
    title: string;
    price: number;
    quantity: number;
  }) => Promise<void>,
  onAddToCart: (productId: string) => Promise<void>
}


function InteractableProduct({product, onDeleteProduct, onEditProduct, onAddToCart}: InteractableProductProps) {
  const [viewEdit, setViewEdit] = useState(false)

  function handleToggleAddProduct(bool: boolean) {
    setViewEdit(bool);
  }

  return (
    <div className="product-details">
      <ProductItem product={product}/>
      <ProductActions onToggleEditProduct={handleToggleAddProduct}
                      product={product}
                      onDeleteProduct={onDeleteProduct}
                      onAddToCart={onAddToCart}/>

      {viewEdit ? <EditProductForm onEditProduct={onEditProduct}
                               product={product}
                               onToggleAddProduct={handleToggleAddProduct}/>
                : <></>}
    </div>
  );
}

export default InteractableProduct