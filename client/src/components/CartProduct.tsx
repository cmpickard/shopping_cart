import type { CartProduct as CartProductType } from "../types";

interface CartProductProps {
  item: CartProductType
}

function CartProduct({item}: CartProductProps) {
  return (
    <tr key={item._id}>
      <td>{item.title}</td>
      <td>{item.quantity}</td>
      <td>{item.price}</td>
    </tr>
  );
}

export default CartProduct;