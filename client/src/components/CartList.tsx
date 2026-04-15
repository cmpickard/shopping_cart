import { useContext } from "react";
import type { Cart } from "../types";
import CartProduct from "./CartProduct";
import { CurrencyContext } from "../providers/CurrencyProvider";

interface CartListProps {
  cart: Cart,
  onCheckout: () => Promise<void>
}

function CartList({ cart, onCheckout }: CartListProps) {
  const {currency} = useContext(CurrencyContext)

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  })

  return (
    <>
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Title</th><th scope="col">Quantity</th><th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => {
            return <tr key={item._id}><CartProduct item={item}/></tr>
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="total">Total: { currency === 'USD' ? '$' : '€' }{total.toFixed(2)}</td>
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

