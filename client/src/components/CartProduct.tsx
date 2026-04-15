import { useContext } from "react";
import type { CartProduct as CartProductType } from "../types";
import { CurrencyContext } from "../providers/CurrencyProvider";

interface CartProductProps {
  item: CartProductType
}

function CartProduct({item}: CartProductProps) {
  const { currency } = useContext(CurrencyContext);

  return (
    <>
      <td>{item.title}</td>
      <td>{item.quantity}</td>
      <td>{ currency === 'USD' ? '$' : '€' }{item.price}</td>
    </>
  );
}

export default CartProduct;