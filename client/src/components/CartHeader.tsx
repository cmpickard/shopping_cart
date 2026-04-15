import CartList from "./CartList";
import type { Cart } from "../types";
import { useContext } from "react";
import { ThemeContext } from "../providers/ModeProvider";
import { CurrencyContext } from "../providers/CurrencyProvider";

interface CartHeaderProps {
  cart: Cart,
  onCheckout: () => Promise<void>
}

function CartHeader({ cart, onCheckout }: CartHeaderProps) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currency, toggleCurrency} = useContext(CurrencyContext);

  return (
    <header>
      <h1>The Shop!</h1>
      <div className="header-controls">
        <button className="icon-btn" title="Toggle theme" onClick={() => { if (toggleTheme) toggleTheme() }}>{ theme === 'light' ? '🌑' : '☀️'}</button>
        <button className="icon-btn" title="Toggle currency" onClick={() => { if (toggleCurrency) toggleCurrency()}}>{ currency === 'EUR' ? 'USD' : 'EUR' }</button>
      </div>
      <div className="cart">
        <h2>Your Cart</h2>
        { cart.length === 0 ? <>
                                <p>Your cart is empty</p>
                                <p>Total: { currency === 'USD' ? '$' : '€' }0</p>
                                <button className="checkout" disabled>Checkout</button>
                              </>
                            : <CartList cart={cart} onCheckout={onCheckout}/>}

      </div>  
    </header>
  );
}

export default CartHeader;
