import { useContext } from "react";
import type { Product } from "../types";
import { CurrencyContext } from "../providers/CurrencyProvider";

interface ProductProps {
  product: Product,
}

function ProductItem({product}: ProductProps) {
  const { currency } = useContext(CurrencyContext);
  
  return (
    <>
      <h3>{product.title}</h3>
      <p className="price">{ currency === 'USD' ? '$' : '€' }{product.price}</p>
      <p className={`quantity${product.quantity === 0 ? ' none-left' : ''}`}>{product.quantity} remaining in inventory</p>
    </>
  );
}

export default ProductItem;

