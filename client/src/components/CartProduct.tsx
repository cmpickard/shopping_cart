import type { CartProduct as CartProductType } from "../types";

interface CartProductProps {
  item: CartProductType
}

function CartProduct({item}: CartProductProps) {
  return (
    <>
      <td>{item.title}</td>
      <td>{item.quantity}</td>
      <td>{item.price}</td>
    </>
  );
}

export default CartProduct;