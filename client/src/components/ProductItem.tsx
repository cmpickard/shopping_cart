import type { Product } from "../types";

interface ProductProps {
  product: Product,
}

function ProductItem({product}: ProductProps) {
  return (
    <>
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
      <p className="quantity">{product.quantity} remaining in inventory</p>
    </>
  );
}

export default ProductItem;

