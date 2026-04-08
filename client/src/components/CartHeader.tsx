import CartList from "./CartList";
import type { Cart } from "../types";

interface CartHeaderProps {
  cart: Cart
}

function CartHeader({ cart }: CartHeaderProps) {
  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        { cart.length === 0 ? <>
                                <p>Your cart is empty</p>
                                <p>Total: $0</p>
                                <button className="checkout" disabled>Checkout</button>
                              </>
                            : <CartList cart={cart}/>}

      </div>  
    </header>
  );
}

export default CartHeader;
