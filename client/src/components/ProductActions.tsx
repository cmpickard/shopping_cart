import type { SyntheticEvent } from "react";
import type { Product } from "../types";

interface ProductActionsProps {
  product: Product,
  setViewEdit: React.Dispatch<React.SetStateAction<boolean>>,
  onDeleteProduct: (productId: string) => Promise<void>,
  onAddToCart: (productId: string) => Promise<void>
}

 function ProductActions({product, setViewEdit, onDeleteProduct, onAddToCart}: ProductActionsProps) {
  function handleOpenEdit(event: SyntheticEvent) {
    event.preventDefault();
    setViewEdit(true);
  }

  return (
    <>
      <div className="actions product-actions">
        <button className="add-to-cart"
                onClick={() => {
                  if (product.quantity < 1) return;
                  onAddToCart(product._id);
                }}>
          Add to Cart
        </button>
        <button className="edit" onClick={handleOpenEdit}>Edit</button>
      </div>
      <div className="product">
        <button className="delete-button"
                onClick={() => onDeleteProduct(product._id)}>
          <span>X</span>
        </button>
      </div>
    </>
  );
}

export default ProductActions;

