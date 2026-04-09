import type { Cart } from "../types";
import CartProduct from "./CartProduct";

interface CartListProps {
  cart: Cart,
  onCheckout: () => Promise<void>
}

function CartList({ cart, onCheckout }: CartListProps) {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  })

  return (
    <>
      <table className="cart-itesm">
        <thead>
          <tr>
            <th scope="col">Title</th><th scope="col">Quantity</th><th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => {
            return <CartProduct item={item}/>
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="total">Total: ${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
          <button className="checkout"
                  onClick={() => onCheckout()}>
            Checkout
          </button>
      </div>
    </>
  );
}

export default CartList;

