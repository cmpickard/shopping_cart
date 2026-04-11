import type { SyntheticEvent } from "react";
import type { Product } from "../types";

interface ProductActionsProps {
  product: Product,
  onDeleteProduct: (productId: string) => Promise<void>,
  onAddToCart: (productId: string) => Promise<void>,
  onToggleEditProduct: (bool: boolean) => void
}

 function ProductActions({product, onDeleteProduct, onAddToCart, onToggleEditProduct}: ProductActionsProps) {
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
        <button className="edit"
                onClick={(e: SyntheticEvent) => {
                  e.preventDefault();
                  onToggleEditProduct(true);
                }}>
          Edit
        </button>
      </div>
      <button className="delete-button"
              onClick={() => onDeleteProduct(product._id)}>
        <span>X</span>
      </button>
    </>
  );
}

export default ProductActions;

